import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Vaquita",
    default: "Vaquita | Premium Digital Solutions",
  },
  description: "Vaquita helps startups, businesses, creators, and freelancers grow online through modern web design, digital marketing, freelancing support, and branding services.",
  keywords: ["Web Development", "Digital Marketing", "Freelancing Services", "Branding", "UI/UX Design", "Vaquita"],
  authors: [{ name: "Vaquita Team" }],
  robots: "index, follow",
};

import BackgroundOrbs from "@/components/BackgroundOrbs";
import LoadingScreen from "@/components/LoadingScreen";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-brand-blue/30 selection:text-white relative">
        <ThemeProvider>
          <BackgroundOrbs />
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
