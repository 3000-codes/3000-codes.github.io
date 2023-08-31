import "./globals.css";
import type { Metadata } from "next";
import Texture from "@/components/Texture";

export const metadata: Metadata = {
  title: "一晌贪欢",
  description: "wellcome to my blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Texture />
        {children}
      </body>
    </html>
  );
}
