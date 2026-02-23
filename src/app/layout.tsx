import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bob Xu Portfolio",
  description: "Bob Xu - Creative Planner & Content Creator Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white antialiased">
        <div className="overflow-x-hidden w-full">{children}</div>
      </body>
    </html>
  );
}
