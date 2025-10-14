import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 🔹 Upload to Cloudinary (image or file) — Always preserve extension
async function uploadToCloudinary(file: File, folder: string, resourceType: "image" | "auto") {
  const buffer = Buffer.from(await file.arrayBuffer());

  const originalName = file.name;
  const ext = originalName.split(".").pop()?.toLowerCase();
  const baseName = originalName.split(".").slice(0, -1).join(".");

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: `${baseName}.${ext}`, // ✅ preserve original name + extension
        format: ext, // ensure extension in URL
        use_filename: true,
        unique_filename: false, // so that filename is kept readable
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

// 🔹 Save DOC/PDF locally (optional fallback)
// async function saveLocalFile(file: File) {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const uploadDir = path.join(process.cwd(), "public", "uploads");

//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//   const filename = `${Date.now()}-${file.name}`;
//   const filePath = path.join(uploadDir, filename);

//   fs.writeFileSync(filePath, buffer);
//   return `/uploads/${filename}`;
// }

export async function POST(req: Request) {
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
      typeof category !== "string" ||
      !image ||
      !(image instanceof File)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    // ✅ Upload image to Cloudinary
    const imgUpload = await uploadToCloudinary(image, "my-blog-app", "image");

    // ✅ Handle file upload logic
    let fileUrl: string | null = null;

    if (file && file instanceof File) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const isDocument = ["doc", "docx", "ppt", "pptx", "pdf", "xls", "xlsx"].includes(ext!);

      if (isDocument) {
        // 🔹 Upload documents also to Cloudinary (with extension preserved)
        const fileUpload = await uploadToCloudinary(file, "my-blog-app/blog-files", "auto");
        fileUrl = fileUpload.secure_url;
      } else {
        // Non-doc (video/audio etc.)
        const fileUpload = await uploadToCloudinary(file, "my-blog-app/blog-files", "auto");
        fileUrl = fileUpload.secure_url;
      }
    }

    // ✅ Create blog entry in DB
    const blog = await prisma.blog.create({
      data: {
        title,
        summary,
        img: imgUpload.secure_url,
        category: category.split(",").map((c) => c.trim()),
        fileUrl,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error("Blog creation error:", (error as Error).message || error);
    return NextResponse.json({ error: "Failed to create blog post." }, { status: 500 });
  }
}
