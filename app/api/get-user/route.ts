import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    
    console.log("API /api/get-user called with email:", email);
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { name: true, email: true, id: true }
    });
    
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      return NextResponse.json(
        { 
          error: "User not found",
          message: "Please sign up first" 
        }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      name: user.name, 
      email: user.email 
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}