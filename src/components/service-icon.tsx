const paths: Record<string, string> = {
  "print-and-paper": "M11 14V5h18v9M10 29H5V15h30v14h-5M11 23h18v13H11zM28 19h3",
  "branding-and-signage": "M6 7h28v22H6zM13 36l7-7 7 7M13 21l7-8 7 8M20 13v12",
  "merch-and-packaging":
    "M13 7l-9 6 5 9 5-3v16h13V19l5 3 5-9-10-6c0 7-14 7-14 0z",
};

/**
 * Line icons ported from the mockup's inline SVGs (path data only, no
 * raster image, so the "never ship unread text in an image" rule does
 * not apply here).
 */
export function ServiceIcon({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="h-[34px] w-[34px] stroke-accent stroke-[1.2] fill-none"
    >
      <path d={paths[slug]} />
    </svg>
  );
}
