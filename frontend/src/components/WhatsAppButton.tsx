"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919849141518"
      target="_blank"
      rel="noopener noreferrer"
      className="
      fixed bottom-6 right-6 z-50
      group
      flex items-center
      justify-end
      w-16 hover:w-72
      h-16
      rounded-full
      bg-gradient-to-r from-green-500 to-green-600
      shadow-[0_0_25px_rgba(34,197,94,0.5)]
      overflow-hidden
      transition-all duration-500 ease-out
      "
    >
      <span
        className="
        opacity-0
        group-hover:opacity-100
        mr-4
        text-white
        font-semibold
        whitespace-nowrap
        transition-all duration-300
        "
      >
        Chat on WhatsApp
      </span>

      <div className="w-16 h-16 flex items-center justify-center text-3xl">
        💬
      </div>
    </a>
  );
}