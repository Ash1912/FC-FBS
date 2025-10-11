import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { broadcast } from "../stream/utils";
import type { BroadcastMessage} from "../stream/types";

export async function POST(req: Request) {
  try {
    const { sessionId } = (await req.json()) as { sessionId?: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    const session = await prisma.buzzerSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 404 }
      );
    }

    const deleted = await prisma.buzzerResponse.deleteMany({
      where: { sessionId },
    });

    const message: BroadcastMessage = {
      type: "reset",
      sessionId,
      payload: { clearedCount: deleted.count },
    };

    broadcast(message);

    return NextResponse.json({
      success: true,
      message: `Round reset successfully. Cleared ${deleted.count} responses.`,
    });
  } catch (error) {
    console.error("Error resetting round:", error);
    return NextResponse.json(
      { error: "Failed to reset round" },
      { status: 500 }
    );
  }
}
