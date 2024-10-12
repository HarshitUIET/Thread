import type { Metadata } from "next";
import "./globals.css";
import CustomProvider from "./CustomProvider";

export const metadata: Metadata = {
  title: "Therad App",
  description: "Thread app to share ideas and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <CustomProvider>
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
