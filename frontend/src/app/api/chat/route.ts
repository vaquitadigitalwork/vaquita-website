import { NextResponse } from "next/server";

function getVaquitaReply(message: string) {
  const text = message.toLowerCase().trim();

  if (
    text.includes("hi") ||
    text.includes("hello") ||
    text.includes("hey")
  ) {
    return `
👋 Welcome to Vaquita Digital Solutions

We help businesses, startups, creators, and freelancers grow professionally online.

🌐 Website Design & Development
📈 Digital Marketing
💼 Freelancing Guidance
🎨 Branding & UI Design
🚀 Business Growth Support
`;
  }

  return `
🤖 Vaquita AI Assistant

I can help you with:

🌐 Website Development
📈 Digital Marketing
💼 Freelancing Guidance
🎨 Branding
🚀 Business Growth

Please ask your question in detail.
`;
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    reply: getVaquitaReply(body.message || ""),
  });
}