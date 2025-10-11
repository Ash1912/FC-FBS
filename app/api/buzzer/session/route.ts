import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Session name required" }, { status: 400 });
    }

    const session = await prisma.buzzerSession.create({
      data: { name: name.trim() },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sessions = await prisma.buzzerSession.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
