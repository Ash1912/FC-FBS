import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🗓 Registration Window
const REGISTRATION_START = new Date("2026-01-15T19:30:00+05:30"); 
const REGISTRATION_END = new Date("2026-01-18T11:00:00+05:30");   

// 🟩 POST → Register a StockiFy team
export async function POST(req: Request) {
  try {
    const now = new Date();

    // 🕒 Check if registration is outside allowed window
    if (now < REGISTRATION_START) {
      return NextResponse.json(
        { error: "🕓 Registration hasn't opened yet. It starts on 15th January 2026 at 07:30 PM." },
        { status: 403 }
      );
    }

    if (now > REGISTRATION_END) {
      return NextResponse.json(
        { error: "⏰ Registration is closed. The deadline was 18th January 2026, 11:00 AM." },
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

    // 🔹 Find or create StockiFy 2025 event
    const event = await prisma.stockiFyEvent.upsert({
      where: { title: "StockiFy 2026" },
      update: {
        semiFinalDate: new Date("2026-01-19T09:00:00.000Z"),
        finalDate: new Date("2026-01-21T09:00:00.000Z"),
      },
      create: {
        title: "StockiFy 2026",
        description: "StockiFy 2026: Prelims on 19th Jan, Final on 21st Jan.",
        semiFinalDate: new Date("2026-01-19T09:00:00.000Z"),
        finalDate: new Date("2026-01-21T09:00:00.000Z"),
      },
    });

    // 🔍 Check if team name already exists for this event
    const existingTeam = await prisma.stockiFyRegistration.findFirst({
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
    const registration = await prisma.stockiFyRegistration.create({
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
    const event = await prisma.stockiFyEvent.findFirst({
      where: { title: "StockiFy 2026" },
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
