/**
 * Stands in for real photography (final_design.html's own images, and
 * any future CityView shots) wherever a slot doesn't have a file yet.
 * CLAUDE.md's rule against unread text in shipped images means the
 * mockup's inlined images can't travel across as-is even where a
 * plausible substitute exists; this renders the correct box (size,
 * radius) with a plain label so layout is real now and next/image drops
 * in later without touching spacing.
 */
const tones = {
  light: "border-hairline bg-surface text-ink-soft",
  dark: "border-white/20 bg-white/10 text-white/70",
};

export function PhotoPlaceholder({
  label,
  className = "",
  rounded = "rounded-card",
  tone = "light",
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
      <span className={`px-3 text-eyebrow ${text}`}>{label}</span>
    </div>
  );
}
