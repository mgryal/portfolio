import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { getContent } from "@/content";
import { buildMetadata, resolveSiteUrl } from "@/lib/metadata";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

const body = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const title = VT323({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const content = getContent("es");

export const metadata: Metadata = buildMetadata(
  content,
  resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_BASE_PATH ?? ""),
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={content.locale} data-theme="dark" suppressHydrationWarning className={`${body.variable} ${title.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SkipLink label={content.ui.skipToContent} />
        {children}
      </body>
    </html>
  );
}
