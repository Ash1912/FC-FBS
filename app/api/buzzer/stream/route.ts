// app/api/buzzer/stream/route.ts
import { prisma } from "@/lib/prisma";
import { clients } from "./utils";
import { getNextClientId } from "./utils";
import type { BuzzPayload, BroadcastMessage } from "./types";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId") || undefined;

  const stream = new ReadableStream<string>({
    async start(controller) {
      const id = getNextClientId(); // ✅ safely incremented
      clients.push({ id, sessionId, controller });

      if (sessionId) {
        try {
          const responses = await prisma.buzzerResponse.findMany({
            where: { sessionId },
            orderBy: { buzzTime: "asc" },
          });

          const session = await prisma.buzzerSession.findUnique({
            where: { id: sessionId },
          });

          const payload: BuzzPayload[] = responses.map((r) => ({
            teamName: r.teamName,
            buzzTime: r.buzzTime.toISOString(),
            timeTaken: session
              ? (r.buzzTime.getTime() - session.createdAt.getTime()) / 1000
              : undefined,
          }));

          const initMsg: BroadcastMessage = {
            type: "init",
            sessionId,
            payload,
          };
          controller.enqueue(`data: ${JSON.stringify(initMsg)}\n\n`);
        } catch (err) {
          console.error("Failed to fetch initial buzzes:", err);
        }
      }

      const removeClient = () => {
        const index = clients.findIndex((c) => c.id === id);
        if (index !== -1) clients.splice(index, 1);
      };

      req.signal.addEventListener("abort", removeClient);

      const keepAlive = setInterval(() => controller.enqueue(`:\n\n`), 20000);
      req.signal.addEventListener("abort", () => clearInterval(keepAlive));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

// Required to avoid Next.js App Router type errors
export const config = {};
