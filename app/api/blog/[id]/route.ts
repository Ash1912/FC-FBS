import { prisma } from "@/app/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image");

    if (!title || !summary || !category) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (image && typeof image !== "string") {
      const arrayBuffer = await (image as File).arrayBuffer();
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

      imageUrl = uploadResult.secure_url;
    } else if (typeof image === "string") {
      imageUrl = image;
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title,
        summary,
        category: category.split(",").map((c) => c.trim()),
        img: imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
