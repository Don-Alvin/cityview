import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Same four-bar mark as icon.svg, generated as PNG
 * because Safari will not take an SVG here. Hexes repeat for the same
 * reason they do in opengraph-image.tsx: Satori resolves no CSS custom
 * properties. globals.css remains the source of truth.
 */
const bars = [46, 78, 108, 64];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 9,
          paddingBottom: 36,
          background: "#141312",
        }}
      >
        {bars.map((height) => (
          <div key={height} style={{ width: 20, height, background: "#eaa221", borderRadius: 3 }} />
        ))}
      </div>
    ),
    { ...size },
  );
}
