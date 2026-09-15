# Report

Running log of things flagged during the build: judgment calls made where
a doc was silent, gaps found in DESIGN.md/IMPLEMENTATION.md, and
deviations from the mockup, each with what changed and why.

---

## Step 2: Home page

### No error/danger colour token in DESIGN.md

**What:** DESIGN.md section 8 requires a quote form error state, but
section 1's token list has no `danger`/error colour (unlike the previous
direction's system, which had `--color-danger`). CLAUDE.md's hard rule is
never hardcode a hex not listed in DESIGN.md.

**Why it matters:** Built the error state without colour: a heavier
border (`border-2 border-ink` instead of `border-hairline`) plus explicit
error copy, rather than inventing a red. This is arguably better practice
regardless (not relying on colour alone to signal state), but it's a real
doc gap, not a stylistic preference, worth a token if the client ever asks
for a red error state specifically.

**File:** `src/components/quote-modal.tsx`

### Header nav diverges from the mockup's single-page anchors

**What:** `final_design.html` is a single-page mockup, so every nav link
is an in-page anchor (`#services`, `#showcase`, `#work`, `#contact`).
This is a real multi-route site, so `/work` and `/contact` now link to
their real pages; only `Services` and `Products` stay as home-page
anchors (`/#services`, `/#showcase`) since those sections only exist on
the home page.

**File:** `src/components/site-header.tsx`

### Trust section's id changed from `work` to `trust`

**What:** The mockup gives the trust/capability section `id="work"`,
reasonable in a single-page site where "see our work" meant scrolling to
that section. This site now has a real, separate `/work` portfolio route
(IMPLEMENTATION.md), so reusing `id="work"` here for an unrelated
home-page section would be confusing. Renamed the anchor to `#trust`;
nothing currently links to it by id, since the header's "Our Work" links
go to the real `/work` page instead.

**File:** `src/components/home/trust.tsx`

### content/contact.ts rewritten to loud placeholders

**What:** The previous direction's contact.ts used plausible-looking
fake values (`+254 7XX XXX XXX`). CLAUDE.md's new hard rule explicitly
forbids that: placeholders must be loud (`TODO_PHONE`, never a
plausible fake), specifically so `check:placeholders` can catch one
left in by accident. Rewritten to `TODO_PHONE`, `TODO_WHATSAPP`,
`TODO_ADDRESS`.

**Consequence worth knowing:** `npm run build` will now correctly FAIL
at the prebuild placeholder check as soon as any component renders one
of these (footer, header, WhatsApp links all will). That's the script
doing its job, not a bug: it's designed to block shipping with a
placeholder present, and it will keep failing honestly until real
contact details land. I verified component/CSS correctness separately
via `npx next build` (bypasses the npm prebuild hook) rather than
treating the gated failure as something to work around.

**File:** `src/content/contact.ts`

### Showcase photos carry the old Skyline branding

**What:** Three leftover assets from the previous Skyline direction,
used for the showcase section's product photos:
- `hero-5.png` (mug): old bold all-caps "CITYVIEW" wordmark with a
  skyline-bar icon.
- `hero-4.png` (tote bag): same old wordmark, plus an unrelated building
  graphic.
- `hero-6.png` (display banner): the most mismatched of the three, also
  carrying the old direction's tagline, "Printing a brighter tomorrow",
  which doesn't exist anywhere in the current site's copy.

None contain any misspelled or garbled text (each read letter by
letter before use), so the hard rule against unread text in shipped
images isn't in play here; the issue is brand consistency, not a typo.

**Decision:** used anyway for now, on your instruction, rather than left
as labelled placeholder boxes. Worth real on-brand photos before launch:
as-is, a close look at the site shows two different logo treatments (and
one extra tagline) on camera at once.

**File:** `src/components/home/showcase.tsx`

### Mini-slider and hero project card, same old-branding caveat

**What:** Same set of leftover Skyline-direction assets, wired into the
hero's mini-slider and project card: `hero-1.png` (business cards),
`hero-6.png` (display banners, reused from the showcase section),
`hero-3.png` (apparel, verified as the actual T-shirt photo after an
initial mismatch, `hero-2.png`, is the brochure/book photo), and
`hero-7.png` (packaging). Same caveat as the showcase photos: old logo
treatment, not the current Onest wordmark.

**File:** `src/components/home/mini-slider.tsx`, `src/components/home/hero.tsx`

### Hero title overflow on large screens

**What:** `.text-hero` used raw `12.5vw` with no upper bound. Every
rem-based size in this file stops scaling past the 1920px breakpoint
(the fluid root font-size media queries are all max-width), but `vw`
units aren't affected by that at all, so `.text-hero` kept growing
linearly past 1920px with nothing to stop it. Combined with
`white-space: nowrap` on "MAKE YOUR MARK", this overflowed the hero
card on very wide and ultra-wide monitors.

**Fix:** `font-size: min(12.5vw, 15rem)`. 15rem (240px) is what 12.5vw
already equals at 1920px, the fluid scale's own reference width, so
this caps growth at exactly the point the rest of the type scale
already stops growing, rather than an arbitrary new number.

**File:** `src/app/globals.css`

### backdrop-filter dropped from the mobile menu overlay

**What:** The mockup's `.burger`/`.close-circle` buttons use
`backdrop-filter: blur()`. DESIGN.md section 6 explicitly forbids
backdrop-filter on any fixed or sticky element, and the overlay itself is
`position: fixed`. Replaced with a solid `bg-white/15` on the buttons and
a flat `bg-brand-deep` on the overlay panel; visually near-identical on
this page (no complex background behind the overlay to blur), and avoids
the re-composite cost DESIGN.md flags.

**File:** `src/components/site-header.tsx`
