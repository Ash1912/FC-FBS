import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, name, message } = await req.json();

  if (!email || !name || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New message from Finance Committee Waitlist",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response("Failed to send message", { status: 500 });
  }
}
