import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Entry Frame Intelligent Chatbot Technology",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-wrapper min-h-screen max-w-7xl mx-auto p-2 border-2">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
