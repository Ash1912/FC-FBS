import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        summary: true,
        img: true,
        category: true,
        fileUrl: true, // ✅ include content URL
      },
    });

    return NextResponse.json(blogs);
  } catch (error: unknown) {
    console.error("Failed to fetch blogs:", (error as Error).message || error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
