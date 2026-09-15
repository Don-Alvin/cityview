/**
 * IMPLEMENTATION.md open item: pricing is undecided. Renders nothing
 * while `amount` is undefined, so the day pricing is confirmed, it's a
 * data change in services.ts, not a component to build or a page to
 * rework.
 */
export function PriceFrom({ amount }: { amount?: number }) {
  if (amount === undefined) return null;

  return (
    <p className="text-body-sm text-white/70">
      From <span className="font-medium text-white">KES {amount.toLocaleString("en-KE")}</span>
    </p>
  );
}
