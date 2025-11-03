import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🗓 Registration Window
const REGISTRATION_START = new Date("2025-10-30T06:00:00+05:30"); // 6:00 AM IST
const REGISTRATION_END = new Date("2025-11-03T20:00:00+05:30");   // 8:00 PM IST

// 🟩 POST → Register a FinQuest team
export async function POST(req: Request) {
  try {
    const now = new Date();

    // 🕒 Check if registration is outside allowed window
    if (now < REGISTRATION_START) {
      return NextResponse.json(
        { error: "🕓 Registration hasn't opened yet. It starts on 30th October 2025 at 12:00 AM." },
        { status: 403 }
      );
    }

    if (now > REGISTRATION_END) {
      return NextResponse.json(
        { error: "⏰ Registration is closed. The deadline was 3rd November 2025, 8:00 PM." },
        { status: 403 }
      );
    }
    const data = await req.json();
    const {
      teamName,
      member1Name, member1Email, member1Section, member1Phone, member1Year, member1PGP,
      member2Name, member2Email, member2Section, member2Phone, member2Year, member2PGP,
      member3Name, member3Email, member3Section, member3Phone, member3Year, member3PGP,
    } = data;

    if (!teamName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🔹 Find or create FinQuest 2025 event
    const event = await prisma.finQuestEvent.upsert({
      where: { title: "FinQuest 2025" },
      update: {
        semiFinalDate: new Date("2025-11-04T09:00:00.000Z"),
        finalDate: new Date("2025-11-06T09:00:00.000Z"),
      },
      create: {
        title: "FinQuest 2025",
        description: "FinQuest 2025: Semi-Final on 4th Nov, Final on 6th Nov.",
        semiFinalDate: new Date("2025-11-04T09:00:00.000Z"),
        finalDate: new Date("2025-11-06T09:00:00.000Z"),
      },
    });

    // 🔍 Check if team name already exists for this event
    const existingTeam = await prisma.finQuestRegistration.findFirst({
      where: {
        teamName: {
          equals: teamName,
          mode: "insensitive", // case-insensitive check (optional)
        },
        eventId: event.id,
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "A team with this name has already registered. Please choose another name." },
        { status: 409 } // Conflict
      );
    }

    // 🔹 Create registration
    const registration = await prisma.finQuestRegistration.create({
      data: {
        teamName,
        eventId: event.id,
        member1Name, member1Email, member1Section, member1Phone, member1Year, member1PGP,
        member2Name, member2Email, member2Section, member2Phone, member2Year, member2PGP,
        member3Name, member3Email, member3Section, member3Phone, member3Year, member3PGP,
      },
    });

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating registration:", error);
    return NextResponse.json({ error: "Failed to register team" }, { status: 500 });
  }
}

// 🟦 GET → Fetch event details and registration stats
export async function GET() {
  try {
    const event = await prisma.finQuestEvent.findFirst({
      where: { title: "FinQuest 2025" },
      include: {
        registrations: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Format dates neatly for frontend display
    const formattedEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      semiFinalDate: event.semiFinalDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      finalDate: event.finalDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      totalRegistrations: event.registrations.length,
    };

    return NextResponse.json({ success: true, event: formattedEvent }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching event details:", error);
    return NextResponse.json({ error: "Failed to fetch event details" }, { status: 500 });
  }
}
