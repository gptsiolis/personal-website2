import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "George Panos Tsiolis",
  description: "Personal website of George Panos Tsiolis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
