import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Format the form data for email
    const formatData = (data: any) => {
      let formattedData = "";

      for (const [key, value] of Object.entries(data)) {
        if (key === "styleWords" && typeof value === "object") {
          formattedData += `Style Words: ${(value as any).word1}, ${(value as any).word2}, ${(value as any).word3}\n\n`;
          continue;
        }

        if (Array.isArray(value)) {
          formattedData += `${key}: ${value.join(", ")}\n\n`;
        } else if (value !== null && value !== undefined && value !== "") {
          formattedData += `${key}: ${value}\n\n`;
        }
      }

      return formattedData;
    };

    // Create email content
    const emailHtml = `
      <h1>New Cosmic Fits Survey Submission</h1>
      <p>You've received a new survey submission with the following details:</p>
      <pre style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
${formatData(data)}
      </pre>
    `;

    // Send email
    await resend.emails.send({
      from: "Survey <survey@bullish.design>",
      to: "ash@bullish.design",
      subject: "New Cosmic Fits Survey Submission",
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
