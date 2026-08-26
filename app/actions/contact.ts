"use server";

import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
    // 1. Send the inquiry to YOUR email
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Change to your verified domain later
      to: "ishaancodes01@gmail.com",
      subject: `New Opportunity/Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // 2. Send the auto-acknowledgment to the RECRUITER/USER
    await resend.emails.send({
      from: "Ishaan Mishra <hello@ishaanmishra.dev>",
      to: email,
      subject: "Message Received - Ishaan Mishra",
      text: `Hi ${name},\n\nThank you for reaching out! This is an automated acknowledgment to let you know I've received your message. \n\nI will review it and get back to you as soon as possible.\n\nBest regards,\nIshaan Mishra\nhttps://ishaanmishra.dev`,
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to send email. Please try again later." };
  }
}