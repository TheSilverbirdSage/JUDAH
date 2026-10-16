import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUDAH | AI solutions for real companies",
  description: "JUDAH builds practical AI solutions for real companies.",
  icons: {
    icon: [
      { url: "/judah-logo-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/judah-logo.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [{ url: "/judah-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
