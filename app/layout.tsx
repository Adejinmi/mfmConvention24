import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ 
  weight:'400',  
  subsets: ["latin"] 
  });

export const metadata: Metadata = {
  title: "MFM Convention 2024",
  description: "Registration for Mountain of Fire and Miracles Ministries Convention, 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
