/**
 * Renders nothing while pricing is undecided (IMPLEMENTATION.md open
 * items). Kept as its own component so the day pricing is confirmed, the
 * change is one field in services.ts, not a new component threaded
 * through every service page.
 */
export function PriceFrom({ amount }: { amount?: number }) {
  if (amount === undefined) return null;

  return (
    <p className="text-sm text-dim">
      From{" "}
      <span className="font-medium text-paper">
        KES {amount.toLocaleString("en-KE")}
      </span>
    </p>
  );
}
