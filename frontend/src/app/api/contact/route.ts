import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();

  const lead = {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    service_type: data.get("service_type"),
    amount: data.get("amount"),
    message: data.get("message"),
    created_at: new Date().toISOString(),
  };

  console.log("CONTACT LEAD:", lead);

  return NextResponse.json({
    success: true,
    message: "Message submitted successfully",
  });
}