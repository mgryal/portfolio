import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { palette } from "@/styles/palette";

export const dynamic = "force-static";
export const alt = getContent("es").seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { profile, brand } = getContent("es");
  const c = palette.dark;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: c.bg,
          color: c.fg,
          fontFamily: "monospace",
          border: `2px solid ${c.accent}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: c.accent2 }}>{brand.prompt}</div>
        <div style={{ display: "flex", fontSize: 96, marginTop: 24, color: c.fg }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 44, marginTop: 8, color: c.accent }}>{profile.title}</div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 40, color: c.fg }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
