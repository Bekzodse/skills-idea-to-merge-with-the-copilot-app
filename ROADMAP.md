# Mona's Bookmark Manager App Roadmap

## Product direction

Make saving and revisiting personal links fast, dependable, and pleasant without requiring an account or a backend. Mona's Bookmark Manager should remain a static Astro app with browser-local persistence, clear accessibility, and a small surface area that is easy to understand and maintain.

## Current baseline

The app currently provides:

- URL capture with normalization for inputs with or without a protocol.
- A locally generated `mona-` base62 slug for every bookmark.
- A saved list showing the original URL and slug with the exact ` :: ` separator.
- One-click slug copying and a guarded "Clear all" action.
- Defensive loading from the `mona-bookmarks` `localStorage` key.
- Static Astro output with browser-only persistence contained in the client script.
- A responsive, keyboard-friendly interface using the existing Monaspace fonts.

## Principles

1. **Local-first by default** — bookmarks work offline and stay on the user's device.
2. **Safe data handling** — malformed browser storage must never break rendering or submission.
3. **Fast capture** — adding a bookmark should take one focused interaction.
4. **Accessible clarity** — controls, status changes, and empty states should work with keyboard and assistive technology.
5. **Small, testable changes** — prefer pure helpers and focused UI behavior over a larger framework or service.

## Phased roadmap

### Phase 1 — Reliable capture and revisit

**Priority: Now**

- Add inline validation feedback for invalid or unsupported URLs.
- Preserve the user's input when validation fails and announce the error accessibly.
- Make duplicate handling explicit, either by preventing duplicates or offering a clear duplicate state.
- Add a delete action for an individual bookmark with a reversible confirmation pattern.
- Keep the most recently added bookmark easy to find after saving.

**Done when:** a user can add, reject, copy, and remove one bookmark without a page reload, and every failure has a visible and screen-reader-friendly explanation.

### Phase 2 — Organize a growing list

**Priority: Next**

- Add search across saved URLs and slugs.
- Add deterministic sorting options such as newest, oldest, and alphabetical.
- Add lightweight tags or folders stored in the same validated local schema.
- Show a useful count and a tailored empty state for both the full list and filtered results.
- Keep list interactions usable on narrow screens and with long URLs.

**Done when:** a user with dozens of saved links can locate a bookmark in a few keystrokes and understands why a filtered list is empty.

### Phase 3 — Improve everyday usability

**Priority: Later**

- Add a compact light/dark appearance preference that persists locally.
- Add keyboard shortcuts for focusing capture, searching, and copying the focused slug.
- Improve clipboard feedback with a consistent status region and fallback behavior.
- Add import and export using a documented JSON format, with validation before import.
- Offer a print-friendly view for users who want an offline reference.

**Done when:** returning users can tailor the interface, move their local data between browser profiles, and complete common actions without relying on pointer input.

### Phase 4 — Resilience and polish

**Priority: Ongoing**

- Expand unit coverage for schema migrations, duplicate behavior, sorting, filtering, and import/export.
- Add browser-level checks for the highest-value capture and persistence flows.
- Track storage-capacity and clipboard failures with user-visible, actionable messages.
- Review semantic markup, focus order, contrast, reduced motion, and responsive layouts.
- Keep production builds static and ensure browser APIs remain behind the client boundary.

**Done when:** the app has reliable automated coverage for its data rules and core interactions, and accessibility checks pass for the supported UI states.

## Explicitly out of scope

This roadmap does not include accounts, a hosted API, cloud synchronization, cross-device sharing, or a server-side URL shortener. Those would change the app's privacy, deployment, and persistence model and should be considered only as a separate product direction.

## Success signals

- Adding and revisiting a bookmark requires no account and no network request.
- Invalid input and corrupted local data recover without a broken page or lost valid bookmarks.
- Core flows remain keyboard accessible and understandable with assistive technology.
- The production build remains static, fast, and free of browser-API access during SSR.
- New features are covered by focused tests for pure data behavior and critical UI flows.
