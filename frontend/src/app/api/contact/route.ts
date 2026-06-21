import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service_type") || "");
    const amount = String(data.get("amount") || "");
    const message = String(data.get("message") || "");

    const credentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS || "{}"
    );
    console.log(
      "GOOGLE_CREDENTIALS FOUND:",
      !!process.env.GOOGLE_CREDENTIALS
    );
    console.log(
      "CLIENT EMAIL:",
      credentials.client_email
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const date = new Date().toLocaleString("en-IN");

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1GsNdyG0Fcbk7Hy5aW2LHfgnHtz6bGHA2TU8Yl28ERvE",
      range: "Sheet1!A:G",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          name,
          email,
          phone,
          service,
          amount,
          message,
          date,
        ]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message submitted successfully",
    });
  } catch (error: any) {
    console.error("GOOGLE SHEETS ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}