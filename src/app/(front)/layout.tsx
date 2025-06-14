import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster"
import BaseComponent from "@/components/base/BaseComponent";

export const metadata: Metadata = {
  title: "Therad Home",
  description: "Home page for thread app",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BaseComponent>
        {children}
      </BaseComponent>
      <Toaster />
    </>
  );
}
