import { NextResponse } from "next/server";

function getVaquitaReply(message: string) {
  const text = message.toLowerCase();

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("pricing")
  ) {
    return `
💰 Vaquita Pricing

🌐 Website Development:
₹5,000 – ₹100,000+

📈 Digital Marketing:
₹5,000 – ₹50,000+

🎨 Branding & Design:
Custom pricing based on requirements.

Tell me your project and I will guide you.
`;
  }

  if (
    text.includes("website") ||
    text.includes("web development")
  ) {
    return `
🌐 Website Development Services

✔ Business Websites
✔ Portfolio Websites
✔ E-Commerce Stores
✔ Landing Pages
✔ SEO Optimization
✔ Responsive Design

Tell me what type of website you need.
`;
  }

  if (
    text.includes("marketing") ||
    text.includes("seo")
  ) {
    return `
📈 Digital Marketing Services

✔ SEO
✔ Google Ads
✔ Facebook Ads
✔ Instagram Growth
✔ Lead Generation
✔ Content Marketing

Tell me your business niche.
`;
  }

  if (
    text.includes("contact") ||
    text.includes("phone")
  ) {
    return `
📞 Contact Vaquita

Phone:
+91 9849141518

Email:
vaquitadigitalsolutions@gmail.com

We usually reply within 24 hours.
`;
  }

  if (
    text.includes("hi") ||
    text.includes("hello") ||
    text.includes("hey")
  ) {
    return `
👋 Welcome to Vaquita Digital Solutions

How can I help you today?
`;
  }

  return `
🤖 Vaquita AI Assistant

You can ask me about:

• Website Development
• Pricing
• SEO
• Digital Marketing
• Branding
• Contact Information

Please type your question.
`;
}