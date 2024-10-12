import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Therad Login",
  description: "Login and Register page for thread app",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}
