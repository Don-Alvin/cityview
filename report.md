# Report

Running log of things flagged during the build: judgment calls made where
a doc was silent, gaps found in DESIGN.md/IMPLEMENTATION.md, and
deviations from the mockup, each with what changed and why.

---

## Correction: the business is in Kisumu, not Nairobi

**What:** Alvin: "CityView is based in Kisumu." The entire site had been
built against Nairobi, which came from CLAUDE.md's own description of the
business. 25 occurrences replaced across 10 files: every page title and
meta description, all four service `metaTitle`/`metaDescription` pairs
(the most search-relevant strings on the site), `contact.ts`'s
`addressLocality` (which feeds the `LocalBusiness` JSON-LD and therefore
has to match the Google Business Profile byte for byte), the footer, the
mobile menu's location line, and the placeholder reviews. CLAUDE.md and
IMPLEMENTATION.md corrected too, so the next piece of work doesn't
reintroduce it.

**One place it was not a find-and-replace:** the hero banner's alt text
read "Nairobi skyline at sunset". Swapping the town would have asserted
the photograph shows Kisumu, which nobody has verified: it is a leftover
from the Skyline direction. It now reads "City skyline at sunset".

**Worth raising:** if that banner is a photograph of Nairobi, it is now
the first thing a Kisumu business shows its Kisumu customers. Same class
of problem as the old-branding photos already logged above, but more
pointed, and it isn't something the code can decide.

**File:** 10 files under `src/`, plus `CLAUDE.md` and `IMPLEMENTATION.md`

## Revision: /about, team section out, story timeline in

**What:** Alvin: there is no team, so the section goes; he wants a
chronological run from humble beginnings to a fully fledged business with
state-of-the-art equipment instead. Removed the "Meet the team"
placeholder entirely and added an ordered timeline in its place, fed by a
new `src/content/about.ts`.

**Years are loud placeholders.** The arc is Alvin's and the copy follows
it, but the dates are not known: `TODO_YEAR_FOUNDED`,
`TODO_YEAR_REPEAT`, `TODO_YEAR_LARGE_FORMAT` (the last entry reads
"Today", which needs no date and won't go stale). `check:placeholders`
blocks the build while they remain, exactly as it does for the phone
number. The wording of the two middle milestones is written for this
pass and needs the same confirmation services.ts's product lists do: it
should be the real history before it ships, not a plausible-sounding
invention.

**File:** `src/content/about.ts`, `src/app/about/page.tsx`

## Fix: the nav only existed on the home page

**What:** Alvin: "when you are on another page, you cannot navigate to
home." Correct, and worse than it sounds: `SiteHeader` was rendered
inside `<Hero />`, which only the home page uses, so /about, /contact,
/work, /quote and all four service pages had no nav, no logo, and no way
back to home except the browser's back button. Deep links shared over
WhatsApp land on exactly those pages.

**Why it wasn't a one-line move to the layout:** on home the header is
part of the hero. It sits inside the hero card, over the photograph, in
white. Rendering it from the layout instead would lift it out of the
photo onto the white gutter above the card, which changes the approved
design. So `SiteHeaderSlot` (a client component, since it needs
`usePathname`) returns null on "/" and renders the header everywhere
else, and `SiteHeader` gained a `tone` prop: `light` over the photo,
`ink` on the light page grounds, where white-on-white would otherwise be
invisible. Only the bar inverts; the overlay menu is its own brand-deep
surface either way.

**File:** `src/components/site-header-slot.tsx`,
`src/components/site-header.tsx`, `src/app/layout.tsx`

## Reversal: the preloader is built after all

**What:** CLAUDE.md's hard rules and DESIGN.md section 6 both said "no
preloader, do not build it". Alvin: "I think claude restricts it but I
want it." His call, his docs; both updated to say so, and why, rather
than left contradicting the code.

**What was ported and what was not.** The mockup's visual is all there:
full-screen brand-deep overlay, wordmark rising, the loading line filling
left to right, ~1.4s hold, 0.85s exit, its own timings and easing. The
mockup's *JavaScript* was not ported. That version waits on
`window.load`, which means waiting for every image on the page to finish
(2MB PNGs, mobile data), then adds `.done`, then removes the node, with a
4s timeout behind it for when that never arrives. That is precisely the
multi-second stall DESIGN.md objected to, and if the script fails the
whole site sits behind an opaque overlay forever.

This version is a single CSS keyframe with `forwards`. It starts and
finishes on its own timer, needs no script, and cannot strand the page.
`visibility` collapses at the end so the spent overlay can't swallow
clicks. The hero word reveals are held ~1.5s with `animation-delay`, not
the mockup's JS `.ready` class gate, so they resolve regardless. Under
`prefers-reduced-motion` the intro still appears, but without movement,
matching the mockup's own handling.

**The cost is real and accepted:** an opaque overlay over the viewport
means Largest Contentful Paint can't happen until it lifts, so LCP now
carries roughly the hold duration as a floor. That was the original
reason for the rule.

**File:** `src/app/globals.css`, `src/app/layout.tsx`, plus `CLAUDE.md`,
`DESIGN.md`, `CHECKLIST.md`

## Setup: source, 404, titles, og:image, h1s, favicon

**1. View source.** Taken as "the head and the served source should be
right", since the other five items are all things you check there.
Deleted the create-next-app leftovers still sitting in `public/`
(`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`), added
the home page's own `metadata` export (it had been inheriting the
layout's, which IMPLEMENTATION.md explicitly forbids), and added
canonical URLs to every route. Verified against the served HTML rather
than assumed. Say if you meant something else by it.

**2. 404.** `not-found.tsx`: real page, `noindex, follow`, its own title,
and rather than a bare "go home" it lists all four services, because the
broken links that reach it will mostly be stale service URLs forwarded
through WhatsApp. Confirmed it returns a real 404 status, not a 200.

**3. Page titles.** The layout now carries
`title.template: "%s | CityView Printers, Kisumu"`, so
IMPLEMENTATION.md's "location in every title tag" holds by construction
instead of by remembering. Pages with an already-tuned full title (the
four service pages, from services.ts, and home) opt out via
`title.absolute` so the town doesn't appear twice.

**4. og:image.** Generated by `opengraph-image.tsx` (`next/og`), 1200x630,
43KB, static at build. Generated rather than shipped as a designed PNG so
the text is literal source that can be read letter by letter, which is
what CLAUDE.md's rule about text in images asks for. Open Graph and
Twitter tags added in the layout; service pages override title and
description with their own.

**Known duplication:** `opengraph-image.tsx` and `apple-icon.tsx` are the
only files in the codebase that write a brand hex instead of reading a
token. Satori resolves no CSS custom properties, so `var(--color-brand)`
renders as nothing there. globals.css stays the source of truth; if the
client moves the brand colours, those two files need the same edit.

**5. H1s.** Audited all seven routes: exactly one h1 each, confirmed
against the served HTML. The home page's was worth a second look, though:
"MAKE YOUR MARK" is the site's only h1 and says nothing about what the
business does or where. Added an `sr-only` completion inside it, so it
reads "Make your mark: print, branding and signage in Kisumu" to screen
readers and crawlers, with no visual change.

**6. Favicon.** The site was still shipping create-next-app's default,
which is the Next.js logo. Deleted. Replaced with `icon.svg` (the
four-bar CityView mark, authored as SVG so the brand mark lives in
readable source) and a generated 180x180 `apple-icon.tsx` for iOS, which
will not take an SVG. No `.ico` fallback: modern browsers all take the
SVG, and the audience here is mobile.

**File:** `src/app/not-found.tsx`, `opengraph-image.tsx`, `icon.svg`,
`apple-icon.tsx`, `layout.tsx`, `page.tsx`, the four page metadata
exports, `src/components/home/hero.tsx`

## Revision: hero cards on mobile, image stretches, height trimmed 10%

**What:** Alvin: card sizes are right but trim 10% off the height, and
the vertical padding is too big, the image and content should sit inside
the card with the same padding as the horizontal. The padding was
already uniform (`p-1.5` on all four sides); what read as excess
vertical padding was the content row being `items-center` with a
fixed-size (`w-20`) image, so the photo sat small and centred in a much
taller box, with the leftover height showing as dead space above and
below it.

**Fix, per final_design.html's own `.project-card{align-items:stretch}`
and `.project-copy{justify-content:space-between}`:** the row is now
`items-stretch` and the image is `aspect-square h-full` rather than a
fixed `w-20`, so it grows to the full height of the card's content box
and the visible inset around it equals the horizontal padding. The
vertical rhythm inside the card (`gap-3`, the dot row's `mt-3`) dropped
to `1.5` on mobile to match the padding, stepping back up at `sm`.

**Height:** each mobile card is now `h-[calc((100%_-_1rem)*0.45)]`, i.e.
45% of the column instead of the `(100% - gap) / 2` ≈ 50% they split
before, exactly the 10% asked for. The freed space falls below the pair
rather than between them, so the two cards stay visually paired and the
tagline gets clearer separation. Desktop is untouched (`sm:h-full
sm:flex-1`).

**Also found in the mockup, not applied:** `.glass-card` carries
`box-shadow:0 .8rem 2rem #0003` and `backdrop-filter:blur(.75rem)` that
this port never had. The blur is permitted here (DESIGN.md section 6
forbids it only on fixed/sticky elements, and these are neither) but it
sits over the scrolling hero photograph on exactly the mid-range Android
hardware that section is written about, so it is flagged rather than
added silently.

**File:** `src/components/home/hero.tsx`, `src/components/home/mini-slider.tsx`

## Revision: Trust section carousel, ported straight from final_design.html

**What:** Alvin: the trust section's carousel card left "an abnormal
empty space" on mobile. First attempt (making the figure absolutely
centred at every breakpoint) improved the visual but wasn't checked
against the mockup, and Alvin correctly called that out ("you can
literally reference the final_design.html... THAT IS WHY IT IS THERE").
Extracted `.feature-card`/`.glass-caption` straight from the mockup's
source (a single 90,000-token minified line; located it via `grep -ob`
for a distinctive class name, then `awk`/`cut` a byte range around the
match, since the Read tool can't open a file that size and Grep can't
print the surrounding context on a line that long):

```css
.feature-card{position:relative;z-index:3;width:13rem;margin:1rem auto 0;
  transform:rotate(5deg);aspect-ratio:3/4;border-radius:var(--radius-card);
  overflow:hidden;background:var(--brand);box-shadow:0 1rem 3rem #0002}
.glass-caption{position:absolute;left:.75rem;right:.75rem;bottom:.75rem;
  border-radius:.75rem;background:#14131299;color:#fff;
  backdrop-filter:blur(.5rem);padding:.65rem .75rem}
/* @media (min-width:640px) */
.feature-card{position:absolute;width:16rem;left:50%;top:52%;margin:0;
  transform:translate(-50%,-50%) rotate(5deg)}
```

So the mockup itself never overlaps the card on mobile either (`position:
relative`, plain flow, `margin:1rem auto 0`); my first attempt had
invented that. Ported exactly instead: `bg-brand` fallback fill and the
soft shadow (both previously missing, permanent at every breakpoint),
`top:52%` (not an even 50%) once absolute at `sm`, and the caption's
actual translucent glass treatment (`brand-deep` at 60% opacity, not a
solid 90%, plus its `backdrop-blur`) rather than the solid panel I'd
improvised. Real photos per slide (`hero-1.png` cards, `hero-7.png`
packaging, `hero-4.png` merchandise) replace the mockup's own image,
consistent with the hero-image-to-product mapping used elsewhere.

**Deliberate deviation kept:** the caption's small role label is
`0.65rem` in the mockup; DESIGN.md's hard floor is `0.75rem` (`eyebrow`),
so that one value stays raised rather than pixel-matched. Also,
`backdrop-filter` here is fine under DESIGN.md section 6, which forbids
it only on fixed/sticky elements; this caption is neither.

**File:** `src/components/home/trust.tsx`

## Revision: hero card "huge vertical padding" was a height bug, not a padding value

**What:** Alvin: the hero cards on mobile still had huge vertical
padding, and it should match the horizontal. The `p-2` padding value
already applied equally on all four sides, so vertical and horizontal
were numerically identical; the actual cause was each card's own box
being forced to stretch (`h-full` on the mini-slider, `h-full flex-1` on
the 360° card) to fill the entire gap between the title and the tagline,
with `items-center` centring the short image+text row inside that tall
box. The padding never changed, but a small row inside a much taller box
reads as a huge inset top and bottom while the sides look normal.

**Fix:** each card now sizes to its own content on mobile (`h-full`/
`flex-1` moved behind `sm:`, so the stretch only applies once the layout
switches to the tall desktop cards), and the two-card column uses
`justify-between` to spread the two naturally-sized cards across the
gap instead. This keeps the earlier requirement (the pair still spans
from under the title to the tagline) without inflating either card's own
box, so the `p-2` padding now reads the same on every side, as asked.

**File:** `src/components/home/hero.tsx`, `src/components/home/mini-slider.tsx`

## Revision: vertical padding reduced ~15% site-wide, hero cards minimal on mobile

**What:** Alvin: "the vertical padding on the containers is just too
large... largely my fault, I opted for big fonts and big spaces." Two
parts: a general ~15% cut to vertical padding/margins/gaps across the
site, and the hero's mini-slider/360° cards specifically needing very
minimal padding on small screens where it was squeezing the images.

**How:** rather than computing exact 15% arbitrary values (messy numbers
like `py-[2.975rem]`, inconsistent with every other value in the codebase
being a plain Tailwind step), stepped every affected utility down one
notch on the existing spacing scale. That lands between about 12% and
25% per step depending on the two numbers involved, "about 15%" on
average, and keeps every class a normal Tailwind token instead of a
one-off. Applied via a one-off script (not committed) across every
`.tsx`/`.ts` file in `src/`, touching `py-*`/`pt-*`/`pb-*`/`p-*`/`mt-*`/
`gap-*` at 1.25rem and up: section padding (`py-16`→`py-14`, `py-20`→
`py-16`, `py-14`→`py-12`), major margins (`mt-16` down to `mt-6`, each
one step), and card padding (`p-8` down to `p-5`, each one step). Two
values the script's rule list missed on the first pass (`site-footer.tsx`'s
`pb-14`, `trust.tsx`'s `sm:mt-24`) were caught by a follow-up grep and
fixed by hand.

**Deliberately excluded:** tap-target padding (the filter pills' `py-3`,
close buttons' `p-1.5`, Pill's own arbitrary `py-[0.875rem]`) and small
typographic gaps (`mt-1` through `mt-5`, most `gap-2`/`gap-3`/`gap-4`).
DESIGN.md's 44px minimum tap target is a hard accessibility floor, not
something a cosmetic density pass should touch, and the small gaps were
already tight, tight typographic rhythm, not the "big spaces" being
complained about.

**Hero cards specifically:** the mini-slider and 360° card's own padding
(`p-4`, 1rem, wasn't touched by the general sweep since it's below the
1.25rem threshold) now reads `p-2 sm:p-4`, minimal on mobile where the
landscape layout has the least room, stepping back up at `sm` where the
cards are tall with room to spare.

**File:** every `.tsx` file under `src/components` and `src/app` that
carried a qualifying utility; see `git diff --stat` for the full list.

## Revision: hero mini-slider and 360° cards, tall on desktop, landscape on mobile

**What:** Alvin asked for the two hero cards ("Explore print" mini-slider,
"360°") to appear tall, top edge reaching up toward "MAKE YOUR MARK",
rather than the short strip previously pinned to the hero's bottom edge.
Restructured the hero's bottom row from a content-sized `mt-auto` strip to
a `flex-1` row that fills all the space between the title and the hero's
floor; the tagline keeps its natural height and stays bottom-pinned via
its own `mt-auto` (a real margin, not stretch), while the card column,
with nothing overriding stretch, fills the row's full height.

Follow-up: below `sm` these cards were previously hidden entirely
(`hidden sm:flex`), leaving an empty gap between the title and the
tagline once the row became `flex-1`. Alvin asked for them to show on
small screens too, landscape (image then writing, side by side) rather
than the desktop's tall portrait layout. Used `order-*` utilities to
decouple visual order from DOM order per breakpoint: the card column is
`order-1` (before the tagline) below `sm`, `sm:order-2` (after it) above;
within the 360° card specifically, the image and text swap `order-1`/
`order-2` between breakpoints too, since its desktop order (text above
image) differs from its mobile order (image beside text) even though the
DOM order is fixed. The mini-slider's own order already matched both
breakpoints (image first, text after) so it didn't need the same
override.

**File:** `src/components/home/hero.tsx`, `src/components/home/mini-slider.tsx`

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

### "Services" nav confirmed as intentional anchor, not a broken link

**What:** Flagged: "The services page is not really, it just directs me
to the services section." Checked `site-header.tsx`'s `navLinks`,
`home/services.tsx`, and `services/[slug]/page.tsx` before touching
anything. Finding: `/#services` in the nav is the home page's services
section (four rows), each of which links out to a real, separate,
statically generated page at `/services/[slug]` with its own metadata,
product list and WhatsApp CTA. There is no dedicated `/services` index
route, because none was ever specified: IMPLEMENTATION.md's route list
and CLAUDE.md's hard rule ("services are real pages, not a modal... the
mockup shows them as rows on the home page; those link out to
`/services/[slug]`") both describe exactly this shape, and
`final_design.html` itself has no services index either.

**Decision:** confirmed with you and kept as-is. No code change.

**File:** `src/components/site-header.tsx`, `src/components/home/services.tsx`

## Step 4: Quote form and WhatsApp

### Two "request a quote" paths now exist by design, not by accident

**What:** The header/footer/mobile-menu "Request a quote" pill already
opened `QuoteModal` (name, email, project) before this step, built in
step 2 to match the mockup's own quick-quote pattern. IMPLEMENTATION.md's
step 4 separately calls for `/quote`, "the structured alternative" to
WhatsApp, with the fuller field set the client needs to actually price a
job (service, size, quantity, finish, deadline, name, phone). Rather than
replacing the modal with the structured page (which would remove the
fast, low-friction path the modal gives from anywhere on the site), built
`/quote` as a genuinely separate page and linked it in from the one place
someone has already committed to a specific service: a text link under
each service page's WhatsApp CTA, "Prefer to fill in a form? Use our
detailed quote form", carrying `?service=<slug>` so the dropdown arrives
preselected. Left the header/footer pill wired to the modal, unchanged.

**File:** `src/components/quote-form.tsx`, `src/app/quote/page.tsx`,
`src/app/services/[slug]/page.tsx`

### `/quote` is server-rendered on demand, not statically generated

**What:** IMPLEMENTATION.md's stack section says "every route statically
generated." `/quote` reads `searchParams` (for `?service=`) in a Server
Component, which Next.js 16 can only do by rendering the route dynamically
per request, not at build time. Verified via `npx next build`, output
correctly marks `/quote` `ƒ` (dynamic) alongside the two API routes,
where every other page is `○` or `●` (static/SSG).

**Why it's the right trade:** the page has no per-user data and costs
nothing extra to serve (Vercel renders it fast on demand either way), and
the alternative, a client-only page reading `useSearchParams` behind a
`<Suspense>` boundary just to force static output, adds a loading flash
and a second rendering mode for one page for no real benefit. Flagging
since it's a literal deviation from a stated rule, not silently ignoring
it.

**File:** `src/app/quote/page.tsx`

## Step 5: About and contact

### `contact.ts`'s `hours` field was silently wrong, not just unconfirmed

**What:** Found while building `/contact`: `contact.hours` was set to
`"Nairobi, Kenya"`, rendered in the footer under the email address. That
is not opening hours, it is a location string, sitting in a field named
`hours` and read by nothing that treats it as one. Separately,
`openingHours` held `"Mo-Sa 08:00-18:00"`, a real-looking value, not the
loud placeholder CLAUDE.md requires, even though actual opening hours are
an explicit open item on the pre-launch checklist ("physical address and
opening hours"). Structured data (`LocalBusiness` JSON-LD) was about to
start reading that field as fact once `/contact` went live, which would
have shipped fabricated business hours to Google, a worse version of the
exact mistake the testimonial rule exists to prevent.

**Fix:** split into two loud placeholders: `hoursDisplay` (human-readable,
used in the footer and on `/contact`) and `openingHours` (schema.org
format, used only in the JSON-LD), both `TODO_HOURS`. Same loud-and-gated
treatment every other unconfirmed contact fact already gets, nothing
asymmetric.

**File:** `src/content/contact.ts`, `src/components/site-footer.tsx`

### `/about`'s team section is an honest placeholder, not invented people

**What:** IMPLEMENTATION.md step 5 lists "team" as part of `/about`, but
no real team data exists (blocked on the same client meeting as founding
year and address). CLAUDE.md's testimonial rule forbids fabricated
quotes as a "consumer protection exposure, not a content gap"; inventing
names and photos for a team section is the same problem, arguably worse
since it claims specific people exist. Built the section's layout now, a
single `PhotoPlaceholder` reading "Team profiles coming soon", the same
"ship the empty state first" approach already agreed for `/work` being
blocked on photography (CHECKLIST.md item 6), rather than skip the
section or fabricate content to fill it.

**File:** `src/app/about/page.tsx`

## Step 6: Work

### /work built now, on your instruction, using the existing hero-*.png set

**What:** CHECKLIST.md had `/work` marked blocked on photography, with
the build order's own fallback being to ship an empty state first. You
instructed using the existing hero-1 through hero-7 placeholder images
instead, so the full page (grid, service filter, hover crossfade) is real
and reviewable now. Built `src/content/work.ts` with four items, one per
service, each pairing two of the existing images for the crossfade
(e.g. business cards, hero-1, crossfades to a brochure detail, hero-2,
rather than a genuine flat/angled shot of the same product, since no such
pairs exist yet).

**Consequence worth knowing:** these are not real completed CityView
jobs, and there's no mechanical gate (like `check:placeholders`) stopping
this from shipping as-is, since none of it uses a `TODO_` token. The page
copy is deliberately worded ("the kind of work we do", not "recent
projects") to avoid implying otherwise, but CHECKLIST.md's existing
pre-launch item "Photography delivered, with end-client permission" is
what actually has to close this out before launch, the same as the
showcase/hero images already on the home page.

**File:** `src/content/work.ts`, `src/components/work/work-grid.tsx`,
`src/app/work/page.tsx`

## Step 7: Guides, suspended

**What:** Confirmed with you: Guides is not happening. IMPLEMENTATION.md
already flagged this step as optional, contingent on a real ongoing
writing commitment, since a blog with a few stale posts reads as
abandoned rather than as a feature. Marked `[~]` suspended in
CHECKLIST.md rather than deleted from the doc, so the decision and its
reasoning stay on record instead of just vanishing from the list.

**Consequence:** none on route count. Guides was always outside
IMPLEMENTATION.md's core "nine URLs, seven page files" (home, four
service pages, work, about, contact, quote); suspending it just confirms
that count is final rather than a floor a future phase adds to.

### backdrop-filter dropped from the mobile menu overlay

**What:** The mockup's `.burger`/`.close-circle` buttons use
`backdrop-filter: blur()`. DESIGN.md section 6 explicitly forbids
backdrop-filter on any fixed or sticky element, and the overlay itself is
`position: fixed`. Replaced with a solid `bg-white/15` on the buttons and
a flat `bg-brand-deep` on the overlay panel; visually near-identical on
this page (no complex background behind the overlay to blur), and avoids
the re-composite cost DESIGN.md flags.

**File:** `src/components/site-header.tsx`
