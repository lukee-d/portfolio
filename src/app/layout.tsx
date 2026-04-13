import type { Metadata } from "next";
import CursorGlow from "@/components/CursorGlow";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke | Portfolio",
  description: "CS student, problem solver, builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
