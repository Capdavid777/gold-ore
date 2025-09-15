import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // ensure not edge

export async function POST(req: Request) {
  const { name, email, telephone, message } = await req.json();

  // Basic validation (front-end also validates)
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465 (SSL). Use false if you switch to 587 (STARTTLS).
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Gold Ore Website" <${process.env.SMTP_USER}>`,
    to: 'info@goldoresa.com',
    replyTo: email,
    subject: 'New Contact Form Submission',
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Telephone: ${telephone || '(not provided)'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });

  return NextResponse.json({ ok: true });
}
