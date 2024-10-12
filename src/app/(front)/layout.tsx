import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
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
     <ThemeProvider
     >
        <BaseComponent >
         {children}
        </BaseComponent>
        <Toaster />
    </ThemeProvider>
  );
}
