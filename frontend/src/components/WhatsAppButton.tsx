"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919849141518?text=Hello%20Vaquita%20Digital%20Solutions"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        width="32"
        height="32"
      >
        <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.737 5.58 2.137 8.018L0 32l7.812-2.094a15.92 15.92 0 008.188 2.25c8.836 0 16-7.164 16-16S24.836.396 16 .396z" />
      </svg>
    </a>
  );
}