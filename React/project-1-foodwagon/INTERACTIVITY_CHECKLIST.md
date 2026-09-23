# Interactivity Checklist — Phase 7.5

Audit of every clickable/interactive element. Status after this phase.

## Auth

| Element | Was broken? | Fix |
|---------|-------------|-----|
| Navbar Login button | Yes — no-op | → `/login`; AuthContext mock login |
| Login form submit | N/A (missing) | Client validation + mock delay + localStorage user |
| Signup form | N/A (missing) | `/signup` with name/email/password validation |
| Logged-in avatar / name | N/A (missing) | Dropdown with Logout → clears auth, → `/` |
| Mobile menu Login | Yes — no-op | Same Auth wiring as desktop |

## Navbar

| Element | Was broken? | Fix |
|---------|-------------|-----|
| Logo | Working | Still → `/` via `<Link>` |
| Deliver-to text | Display only | Intentional (location display) |
| Desktop/mobile search | Yes — input did nothing | Submit → `/?q=…`, Home runs meal search |
| Cart icon | Working | Still → `/order` |
| Hamburger menu | Working | Still toggles panel |

## Home

| Element | Was broken? | Fix |
|---------|-------------|-----|
| Hero Delivery / Pickup tabs | Yes — no-op | Toggle active mode (visual state) |
| Hero Find Food / Enter | Working | Still searches meals |
| PromoCard | Dead card | Click → `/meal/:id` |
| PopularItemCard / Order Now | Working | Still → `/meal/:id` |
| RestaurantCard | Working | Still → `/meal/:id` |
| View All (Featured restaurants) | Missing / dead | Added → `/restaurants` |
| Category circles | Working | Still filters by category |
| Scroll arrows | Working | Still `scrollBy` smooth |
| Clear search / Show all | Working | Clears results + URL `q` |
| PromoBanner PROCEED TO ORDER | Yes — no-op | → `/order` |

## Footer

| Element | Was broken? | Fix |
|---------|-------------|-----|
| City links | Dead spans | → `/page-not-built?title=…` |
| Company / Contact / Legal links | Linked to `/` only | → `/page-not-built?title=…` |
| Social icons | External `<a>` | `target="_blank"` + `rel="noopener noreferrer"` |
| Subscribe | Prevent-default only | Shows mock success message |

## Meal Details

| Element | Was broken? | Fix |
|---------|-------------|-----|
| Back | Working | `navigate(-1)` |
| Qty +/- | Working | State update |
| Read more | Working | Toggle instructions |
| Proceed to Order | Working | `addToCart` + → `/order` |
| Browse more meals | Working | → `/` |

## Order

| Element | Was broken? | Fix |
|---------|-------------|-----|
| Qty +/- / Remove | Working | CartContext |
| Place Order | Working | Modal + `clearCart` |
| Browse meals (empty) | Working | → `/` |
| Back to Home (success) | Working | → `/` |

## New routes

| Route | Purpose |
|-------|---------|
| `/login` | Mock login |
| `/signup` | Mock signup |
| `/restaurants` | Full restaurant list |
| `/page-not-built` | Coming soon for footer/marketing links |
| `*` | 404 NotFound with Back to Home |

## Router hygiene

- All in-app navigation uses `<Link>` or `navigate()` (no full reloads).
- External social links intentionally use `<a target="_blank">`.
- Catch-all `*` renders `NotFound` (not Phase 1 placeholder text).
