import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();

  const review = {
    name: data.get("name"),
    role: data.get("role"),
    rating: data.get("rating"),
    text: data.get("text"),
    created_at: new Date().toISOString(),
  };

  console.log("REVIEW:", review);

  return NextResponse.json({
    success: true,
    message: "Review submitted successfully",
  });
}