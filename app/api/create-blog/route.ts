import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!title || !summary || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "my-blog-app" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        );

        stream.end(buffer);
      }
    );

    const blog = await prisma.blog.create({
      data: {
        title,
        summary,
        img: uploadResult.secure_url,
        category: category.split(",").map((c) => c.trim()),
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}
