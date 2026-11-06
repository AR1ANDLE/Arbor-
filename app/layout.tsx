import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arbor — Learn Git by growing a tree",
  description:
    "A hands-on Git playground where real repository history grows into a living tree.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const theme = localStorage.getItem("arbor-theme"); if (theme === "dark" || theme === "light") document.documentElement.dataset.theme = theme; } catch {}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
