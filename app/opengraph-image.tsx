import { ImageResponse } from "next/og";
import { APP_CONFIG } from "@/lib/config/limits";

export const runtime = "edge";
export const alt = `${APP_CONFIG.name} — Split PDF Online Free`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563EB",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 20,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 64, fontWeight: 700 }}>{APP_CONFIG.name}</div>
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.92 }}>
          Split PDF Online Free — No Sign-Up, No Uploads
        </div>
      </div>
    ),
    { ...size },
  );
}