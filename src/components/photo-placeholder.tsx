/**
 * Stands in for real photography wherever the mockup carries a shot.
 * IMPLEMENTATION.md: the shoot is confirmed but not delivered, and the
 * hard rule against shipping unread text in images means the mockup's
 * placeholder concept imagery cannot travel into production as-is. This
 * renders the correct box (aspect ratio, radius) with a plain label so
 * layout is real now and next/image drops in later without touching
 * spacing.
 */
const tones = {
  light: "border-line-light bg-paper-tint text-dim-light",
  dark: "border-line bg-panel text-dim",
};

export function PhotoPlaceholder({
  label,
  className = "",
  rounded = "rounded-card",
  tone = "dark",
}: {
  label: string;
  className?: string;
  rounded?: string;
  tone?: "light" | "dark";
}) {
  const [border, bg, text] = tones[tone].split(" ");
  return (
    <div
      className={`flex items-center justify-center border text-center ${border} ${bg} ${rounded} ${className}`}
    >
      <span className={`px-4 text-[12px] leading-[1.4] tracking-[1.2px] ${text}`}>
        {label}
      </span>
    </div>
  );
}
