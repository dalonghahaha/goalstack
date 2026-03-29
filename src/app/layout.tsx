"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}