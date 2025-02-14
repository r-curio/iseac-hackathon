import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Authentication - Zen",
  description: "Authentication pages for Zen application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} h-screen w-screen bg-background text-foreground antialiased`}>
        <main className="flex h-full w-full items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}