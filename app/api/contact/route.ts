import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({ success: 'Message sent successfully!', data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
