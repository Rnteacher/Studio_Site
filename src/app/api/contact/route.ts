import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const { name, email, phone, service, category, message } =
      await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "שם, אימייל והודעה הם שדות חובה" },
        { status: 400 }
      );
    }

    const htmlBody = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>פנייה חדשה מטופס יצירת קשר</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">אימייל:</td><td style="padding: 8px;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${phone}</td></tr>` : ""}
          ${category ? `<tr><td style="padding: 8px; font-weight: bold;">קטגוריה:</td><td style="padding: 8px;">${category}</td></tr>` : ""}
          ${service ? `<tr><td style="padding: 8px; font-weight: bold;">שירות:</td><td style="padding: 8px;">${service}</td></tr>` : ""}
        </table>
        <h3>הודעה:</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${message}</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "סטודיו דוריאן <onboarding@resend.dev>",
        to: ["studio@chamama.org"],
        reply_to: email,
        subject: `פנייה חדשה מ${name} — סטודיו דוריאן`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return NextResponse.json(
        { success: false, error: `Resend error [${res.status}]` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
