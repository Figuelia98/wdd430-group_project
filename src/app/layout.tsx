import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WDD430 Group Project",
  description: "A Next.js application for WDD430 group project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
