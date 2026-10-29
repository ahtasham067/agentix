import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");

/** Forge Orange share image: dark canvas, warm glow, logo, label and page title. */
export async function renderOgImage({ title, label }: { title: string; label: string }) {
  const [bricolage, inter] = await Promise.all([
    readFile(join(fontDir, "BricolageGrotesque-Bold.ttf")),
    readFile(join(fontDir, "Inter-Medium.ttf")),
  ]);
  const size = title.length > 60 ? 60 : title.length > 40 ? 68 : 78;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(circle at 82% 22%, rgba(255,107,44,0.34), rgba(255,107,44,0) 55%), #1B1D21",
        color: "#F4F1EE",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#FF6B2C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 34 34">
            <circle cx="17" cy="10.2" r="2.1" fill="none" stroke="#1B1D21" strokeWidth="2.4" />
            <path
              d="M15.9 12.1 11 25.2M18.1 12.1 23 25.2"
              stroke="#1B1D21"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ fontFamily: "Bricolage", fontSize: 44 }}>Agentix</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 28, color: "#FFC15E" }}>{label}</div>
        <div
          style={{
            fontFamily: "Bricolage",
            fontSize: size,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
        <div style={{ color: "rgba(244,241,238,0.68)" }}>agentix.website</div>
        <div
          style={{
            display: "flex",
            background: "#FF6B2C",
            color: "#1B1D21",
            borderRadius: 14,
            padding: "12px 26px",
          }}
        >
          Get a quote
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}

/** Strips the trailing " | Agentix" brand for the image headline. */
export function ogTitle(title: string) {
  return title.replace(/\s*\|\s*Agentix$/, "");
}
