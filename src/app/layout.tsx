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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
