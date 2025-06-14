import type { Metadata } from "next";
import "./globals.css";
import CustomProvider from "./CustomProvider";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomProvider>
            {children}
          </CustomProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
