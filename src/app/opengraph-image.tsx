import { ImageResponse } from "next/og";

export const alt = "CityView Printers, print, branding and signage in Kisumu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * CLAUDE.md: Open Graph matters more than usual here, because the buyer
 * shares links in WhatsApp groups and a bare link with no card converts
 * nothing. Generated rather than shipped as a designed PNG so it stays
 * in sync with the wordmark and costs no binary asset, and so the text
 * is literal source that can be read letter by letter (CLAUDE.md's rule
 * about text rendered into images, after a mockup once shipped with
 * "TOMORIROW" printed on a bag).
 *
 * The colours below are the one place in the codebase that repeats a hex
 * instead of reading a token: Satori resolves no CSS custom properties,
 * so `var(--color-brand-deep)` would render as nothing. globals.css stays
 * the source of truth; if the client moves the brand colours, these two
 * values move with them. Flagged in report.md so that isn't a surprise.
 */
const BRAND_DEEP = "#141312";
const BRAND = "#eaa221";

const bars = [30, 52, 72, 42];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND_DEEP,
          color: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            {bars.map((height) => (
              <div key={height} style={{ width: 14, height, background: BRAND }} />
            ))}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            CityView
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.05, letterSpacing: "-0.03em", display: "flex" }}>
            Print, branding
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.05, letterSpacing: "-0.03em", display: "flex" }}>
            and signage.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 4, background: BRAND }} />
          <div style={{ fontSize: 30, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Kisumu, Kenya
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
