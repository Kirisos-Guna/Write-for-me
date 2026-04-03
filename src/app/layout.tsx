import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Write for Me – IEEE Research Paper Generator",
  description:
    "Generate original, plagiarism-free IEEE-formatted research papers with AI. Upload your requirements and receive a complete paper with verified 0% plagiarism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
