import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({ name, email, message }: ContactEmailPayload) {
  if (!resend) {
    throw new Error("Email service is not configured. Set RESEND_API_KEY.");
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "donibutt2112@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
