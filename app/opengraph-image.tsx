import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/data";

export const dynamic = "force-static";
export const alt = "Rutvik Umak — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "portrait-wide.webp"));
  const src = `data:image/webp;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#1f1e1d",
          color: "#faf9f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#a3a198", textTransform: "uppercase", display: "flex" }}>
            {profile.name} · {profile.role}
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.08, marginTop: 28, display: "flex", flexWrap: "wrap" }}>
            I build the part of the product people <span style={{ color: "#e08a6b", marginLeft: 18, fontStyle: "italic" }}>touch</span>
          </div>
          <div style={{ fontSize: 28, color: "#a3a198", marginTop: 34, display: "flex" }}>
            React.js · Next.js · TypeScript · Pune, India
          </div>
        </div>
        <img src={src} width={400} height={400} alt="" style={{ borderRadius: 200, border: "8px solid #3a2e28" }} />
      </div>
    ),
    size,
  );
}
