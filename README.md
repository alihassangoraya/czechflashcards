# Czech A2/B1 Flashcards

An offline-first Czech flashcard product for A2 and B1 study. It has a static
progressive web app and an Expo React Native mobile app that share vocabulary
data and spaced-review logic.

Meanings are available in English, Hindi, and Urdu. Urdu is the default
secondary meaning language.

## Repository

The active repository is [`alihassangoraya/czechflashcards`](https://github.com/alihassangoraya/czechflashcards).

## What Is Included

### Web app

- Static HTML, CSS, and JavaScript app at the repository root.
- A2/B1 mode, deck filters, daily goals, review queue, known/learning/due
  counts, search, custom vocabulary, CSV import, progress backup/restore, and
  deck export.
- `A2 Focus 1000` and `B1 Focus 1000` are separate, non-overlapping study
  decks. B1 starts after the A2 foundation rather than repeating greetings and
  other beginner vocabulary. `My list` lets learners bookmark existing cards
  like a playlist and study only those saved words.
- Tap a card to reveal its meanings and example sentence.
- Swipe left or press `ArrowLeft` for **Again**; swipe right or press
  `ArrowRight` for **Known**. Swipe feedback appears as a large diagonal stamp
  across the card.
- Press `R` to reveal and `U` to undo the most recent review.
- Czech pronunciation for the word and example sentence when browser speech
  synthesis is available.
- A top-right pencil button on each card opens a local correction form for the
  word, meanings, and example sentences. Seed-card corrections are stored as
  local overrides; custom cards are edited in place. Corrections are included
  in progress backups.
- Service-worker caching for offline use after the site has first loaded over
  HTTPS.

### Mobile app

- Expo + TypeScript app in `apps/mobile`.
- Same shared seed vocabulary, review intervals, deck semantics, card editing,
  search, both Focus 1000 decks, saved-word list, custom words, swipe study
  flow, daily goals, and Urdu/Hindi setting as the web app.
- SQLite-backed offline storage for cards, review state, daily progress, custom
  cards, card corrections, settings, and a sync queue.
- Local notification scheduling for daily reminders, streak-risk reminders,
  and review-due reminders, subject to device permission.
- Guest-first use works without an account or network connection.

### Shared and backend foundation

- `packages/shared` contains card types, review grading, filtering,
  normalization, and CSV helpers used by mobile and tested against current web
  behavior.
- `packages/shared/data/vocabulary.seed.json` is generated from the web data;
  it keeps mobile and web vocabulary identical.
- `supabase/migrations` contains the Postgres/Supabase schema for profiles,
  cards, review state, streaks, custom cards, notification preferences,
  sync-events, and future friendship/privacy features.
- Supabase sync configuration and queue flushing exist in mobile. An in-app
  authentication screen and friend-sharing UI are not implemented yet.

## Vocabulary

The current validated study data contains:

- `700` core Czech word lemmas.
- `1361` extended Czech lemmas.
- `2061` unique non-number Czech word lemmas.
- `1159` generated Czech verb-form cards.
- `2001` generated number cards from `0` to `2000`.
- `5221` cards in the complete shared seed.

All card examples are checked for missing translations, encoding issues, and
known generic/template-style sentences.

## Local Web Development

```bash
npm start
```

Open `http://127.0.0.1:5173`.

The web app has no build step. Its production files are:

```text
index.html
styles.css
app.js
sw.js
manifest.webmanifest
data/
```

## Mobile Development

```bash
cd apps/mobile
npm install
npm run ios
```

Other useful commands:

```bash
npm run android
npm run web
npm run typecheck
```

To enable the Supabase client, set the following Expo variables:

```text
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

Apply the migration in `supabase/migrations` to the matching Supabase project
before enabling authenticated sync.

## Custom Vocabulary and Import

Custom words can be added from the `+` control. Only the Czech word and English
meaning are required; Hindi, Urdu, and example sentences can be added later by
using the card's edit button. For CSV imports, use:

```csv
czech,english,hindi,urdu,sentence,sentence_en,tags
```

The older format remains supported:

```csv
czech,english,hindi,sentence,tags
```

Tags include `custom`, `daily`, `extended`, `work`, `travel`, `health`,
`verbs`, `forms`, and `numbers`.

## Data and Verification

Regenerate the shared seed after changing a web vocabulary source:

```bash
npm run seed:shared
```

Run all web/data/shared tests:

```bash
npm run check
```

Run mobile type checking:

```bash
npm --prefix apps/mobile run typecheck
```

`npm run check` validates syntax, data quality, A2/B1 counts, the generated
shared seed, review behavior, deck filtering, and CSV compatibility.

## Production Deployment

The static web app is currently deployed through PM2 as `czech-flashcards` on
port `8045`, serving files from `/var/www/czech-flashcards`.

For a domain, configure the existing reverse proxy to forward HTTPS traffic to
that PM2 service, then point the Cloudflare DNS record at the server. Do not
serve the public PWA only over plain HTTP: service workers and offline caching
require HTTPS outside localhost.

A typical PM2 deployment can use:

```bash
pm2 serve /var/www/czech-flashcards 8045 --name czech-flashcards
pm2 save
```

Keep the public domain on ports `80` and `443` through the reverse proxy. The
internal PM2 port can be closed from the public firewall once the proxy route
is confirmed.

## Agent Guide

This section is the operational guide for AI agents and contributors working in
this repository. Read it before changing product behavior or deployment files.

### Product Rules

- Keep the static web app usable while extending the mobile app.
- Web and mobile must provide the same learner-facing study behavior wherever
  the platform allows it: card content, A2/B1 filtering, review scheduling,
  custom words, corrections, settings, and offline use.
- Urdu is the default secondary meaning language. English remains left-to-right;
  Urdu must use right-to-left layout without moving English content to the
  right.
- Preserve guest-first offline study. A network connection or Supabase account
  must never be required to review cards.
- Treat the existing vocabulary examples as learning content. Do not introduce
  generic template sentences, missing English translations, malformed Urdu, or
  placeholder meanings.
- Do not remove or overwrite a learner's local progress, custom words, or card
  corrections during product changes.

### Repository Map

| Path | Ownership |
| --- | --- |
| `index.html`, `app.js`, `styles.css` | Static web app UI and browser-local study state. |
| `data/vocabulary.js` | Core vocabulary source. |
| `data/extended-lemmas.js` | Extended vocabulary source and example sentences. |
| `data/focus-decks.js` | A2/B1 Focus curation layer; tags two separate 1,000-word decks. |
| `data/verb-forms.js` | Generated verb-form source. |
| `sw.js`, `manifest.webmanifest` | Web PWA and offline cache behavior. |
| `packages/shared/src` | Shared types, review scheduling, filtering, and CSV logic. |
| `packages/shared/data/vocabulary.seed.json` | Generated mobile seed. Never hand-edit it. |
| `apps/mobile/App.tsx` | Expo mobile UI and study flow. |
| `apps/mobile/src/database.ts` | SQLite schema, offline cards, corrections, review state, and sync queue. |
| `apps/mobile/src/notifications.ts` | Local-notification scheduling. |
| `apps/mobile/src/sync.ts` | Optional Supabase sync queue delivery. |
| `supabase/migrations` | Auth, sync, streak, notification, and friendship database foundation. |
| `scripts/export-shared-seed.js` | Generates the shared mobile vocabulary seed. |
| `scripts/validate-data.js` | Vocabulary and sentence-quality guardrails. |

### Vocabulary Change Workflow

1. Edit vocabulary source data in `data/vocabulary.js`, `data/extended-lemmas.js`,
   or `data/verb-forms.js`; adjust `data/focus-decks.js` when a focus-deck
   curation decision changes.
2. Keep each Czech example sentence specific to the word and provide a matching
   English translation.
3. Run `npm run seed:shared` to regenerate
   `packages/shared/data/vocabulary.seed.json`.
4. Run `npm run check`.
5. If a new generic sentence pattern is found, add a targeted rejection pattern
   to `rejectedPlaceholderExample` in `scripts/validate-data.js` and fix all
   existing occurrences before committing.

Do not manually edit `packages/shared/data/vocabulary.seed.json`; it is an
output file and must stay reproducible from the web sources.

### Focus Deck Curation

- `data/focus-decks.js` is the authoritative curation layer for
  `A2 Focus 1000` and `B1 Focus 1000`.
- A2 is the 700-card core plus 300 practical extensions. B1 is 1,000 remaining
  extended lemmas, with 61 deliberately niche items excluded. The decks must
  not overlap.
- `npm run check` enforces both 1,000-card counts, rejects A2 number/form cards,
  and requires every B1 Focus card to be an extended lemma.
- Curate for practical exam usefulness: work, study, housing, travel, health,
  communication, opinions, public life, and everyday connected text. Do not
  replace useful words with obscure technical terms just to preserve a count.

### Feature Change Workflow

For a learner-facing feature, make this sequence the default:

1. Inspect the existing web and mobile implementations before choosing an API or
   UI pattern.
2. Implement the web behavior in the static app.
3. Implement the equivalent mobile behavior in `apps/mobile` and persist it in
   SQLite when it affects study data, settings, or offline actions.
4. Put shared review/data behavior in `packages/shared` rather than duplicating
   scheduling logic.
5. Keep controls compact and touch-friendly. Use an icon button for familiar
   actions such as search, settings, add, edit, or undo; provide accessible
   labels/tooltips.
6. Validate with `npm run check` and
   `npm --prefix apps/mobile run typecheck`.

### Offline and Sync Rules

- The web app stores progress, custom words, and card corrections in browser
  local storage. It also stores the learner's saved-word list. Progress exports
  must include all of them.
- The mobile app uses SQLite as the source of truth while offline or signed out.
- Mobile review, custom-card, correction, and settings changes must be queued
  for future sync rather than discarded when Supabase is unavailable.
- Supabase is an optional authenticated sync layer, not a prerequisite for
  study. The server becomes the source of truth for synced streak history only
  after sign-in is implemented.
- Friends and shared streaks are database groundwork only. Do not add partial
  social UI without privacy controls and an authenticated design.

### PWA and Deployment Rules

- Keep `sw.js` aligned with the root assets needed to open the web app offline.
  Bump `CACHE_NAME` whenever cached asset behavior changes so existing users
  receive the new version after their next visit.
- Service workers require HTTPS in production. Do not describe an HTTP IP URL
  as offline-ready.
- The production static process is `czech-flashcards`, served by PM2 from
  `/var/www/czech-flashcards` on port `8045`.
- Keep the domain-facing reverse proxy on `80/443`; Cloudflare should point the
  domain to that proxy rather than expose the PM2 port to end users.
- Before a deployment, run `npm run check`, then deploy the root web assets and
  the full `data/` directory together. Verify `/` and `/sw.js` return `200`.
- The sole Git remote is `origin`:
  `https://github.com/alihassangoraya/czechflashcards.git`.

### Completion Checklist

Before reporting a task complete, confirm the applicable items:

- Web and mobile behavior are aligned.
- Shared seed is regenerated after vocabulary changes.
- `npm run check` passes.
- `npm --prefix apps/mobile run typecheck` passes when mobile files changed.
- Existing user data is preserved or a migration/compatibility path exists.
- PWA cache behavior is considered for web asset changes.
- README is updated when product behavior, commands, architecture, or
  deployment changes.
