import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { broadcast } from "../stream/utils";
import type { BroadcastMessage, BuzzPayload } from "../stream/types";

type ReqBody = { sessionId?: string; teamName?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { sessionId, teamName } = body;

    if (!sessionId || !teamName) {
      return NextResponse.json({ error: "sessionId and teamName are required" }, { status: 400 });
    }

    // Validate session exists
    const session = await prisma.buzzerSession.findUnique({ where: { id: sessionId } });
    if (!session) {
      return NextResponse.json({ error: "Invalid sessionId" }, { status: 404 });
    }

    const existing = await prisma.buzzerResponse.findFirst({
      where: { sessionId, teamName },
    });
    if (existing) {
      return NextResponse.json({ error: "Team already buzzed" }, { status: 409 });
    }

    const created = await prisma.buzzerResponse.create({
      data: { sessionId, teamName },
    });

    const timeTaken = (created.buzzTime.getTime() - session.createdAt.getTime()) / 1000;

    await prisma.buzzerResponse.update({
      where: { id: created.id },
      data: { timeTaken },
    });

    const payload: BuzzPayload = {
      teamName: created.teamName,
      buzzTime: created.buzzTime.toISOString(),
      timeTaken,
    };

    const message: BroadcastMessage = { type: "buzz", sessionId, payload };

    broadcast(message);

    return NextResponse.json({ success: true, data: created });
  } catch (err) {
    console.error("Error creating buzz:", err);
    return NextResponse.json({ error: "Failed to create buzz" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { sessionId, teamName } = body;

    if (!sessionId || !teamName) {
      return NextResponse.json({ error: "sessionId and teamName are required" }, { status: 400 });
    }

    const existing = await prisma.buzzerResponse.findFirst({
      where: { sessionId, teamName },
      orderBy: { buzzTime: "desc" },
    });

    if (!existing) {
      return NextResponse.json({ error: "No existing buzz to remove" }, { status: 404 });
    }

    await prisma.buzzerResponse.delete({ where: { id: existing.id } });

    const message: BroadcastMessage = {
      type: "unbuzz",
      sessionId,
      payload: { teamName },
    };

    broadcast(message);

    return NextResponse.json({ success: true, removed: existing.id });
  } catch (err) {
    console.error("Error removing buzz:", err);
    return NextResponse.json({ error: "Failed to remove buzz" }, { status: 500 });
  }
}
