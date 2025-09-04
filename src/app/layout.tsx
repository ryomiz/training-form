import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Training Application Form",
  description: "Training Application Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-dvh bg-purple-50 px-6 py-24 antialiased",
          "sm:py-30",
          inter.className,
        )}
      >
        <main className={"mx-auto max-w-[426px]"}>{children}</main>
      </body>
    </html>
  );
}
