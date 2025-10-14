import { prisma } from "@/app/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ----------------------------
// Cloudinary Upload Helper
// ----------------------------
async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "auto"
) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const originalName = file.name;
  const ext = originalName.split(".").pop()?.toLowerCase();
  const baseName = originalName.split(".").slice(0, -1).join(".");

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: `${baseName}`, // ✅ keep original name (without random hash)
        format: ext, // ✅ ensure Cloudinary keeps the extension
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url)
          return reject("Cloudinary returned no secure_url");
        resolve({ secure_url: result.secure_url });
      }
    );
    stream.end(buffer);
  });
}

// ----------------------------
// DELETE Blog
// ----------------------------
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete blog error:", (error as Error).message || error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// ----------------------------
// UPDATE Blog
// ----------------------------
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const summary = formData.get("summary");
    const category = formData.get("category");
    const image = formData.get("image");
    const file = formData.get("file");

    if (
      !title ||
      typeof title !== "string" ||
      !summary ||
      typeof summary !== "string" ||
      !category ||
      typeof category !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    // ----------------------------
    // Handle Image Upload
    // ----------------------------
    let imageUrl = "";
    if (image instanceof File) {
      const uploaded = await uploadToCloudinary(image, "my-blog-app", "image");
      imageUrl = uploaded.secure_url;
    } else if (typeof image === "string") {
      imageUrl = image;
    }

    // ----------------------------
    // Handle File Upload
    // ----------------------------
    let fileUrl: string | null = null;
    if (file instanceof File) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const isDocument = ["doc", "docx", "pdf", "ppt", "pptx", "xls", "xlsx"].includes(ext!);

      if (isDocument) {
        // ✅ Upload documents to Cloudinary with extension preserved
        const uploadedDoc = await uploadToCloudinary(file, "my-blog-app/blog-files", "auto");
        fileUrl = uploadedDoc.secure_url;
      } else {
        // ✅ Upload other files normally
        const uploadedOther = await uploadToCloudinary(file, "my-blog-app/blog-files", "auto");
        fileUrl = uploadedOther.secure_url;
      }
    }

    // ----------------------------
    // Update Blog in Database
    // ----------------------------
    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title,
        summary,
        category: category.split(",").map((c) => c.trim()),
        img: imageUrl,
        fileUrl: fileUrl || undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("Update blog error:", (error as Error).message || error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// ----------------------------
// GET Blog
// ----------------------------
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
  } catch (error: unknown) {
    console.error("Get blog error:", (error as Error).message || error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
