# Czech A2/B1 Flashcards

Offline Czech vocabulary flashcards for A2 and B1 exam practice, with English plus
Hindi or Urdu meanings.

## Product Architecture

This repo now keeps the existing static web app and adds a mobile-first product
foundation:

- `apps/mobile` is an Expo + TypeScript React Native app scaffold.
- `packages/shared` contains shared card types, review intervals, deck filters,
  CSV parsing, and generated seed data.
- `supabase/migrations` contains the Supabase/Postgres schema for auth-backed
  progress sync, server-side streaks, custom cards, reminders, and future friend
  streak sharing.

The mobile app is guest-first: study data is stored locally in SQLite and queued
for sync. When Supabase credentials and auth are added, queued reviews/settings
can be flushed to the backend.

## Run

```bash
npm start
```

Then open `http://127.0.0.1:5173`.

You can also run it without npm:

```bash
python3 -m http.server 5173
```

## Study Flow

- Tap or press `R` to reveal the English meaning, Hindi/Urdu meaning, Czech example sentence, and English translation of that example.
- Swipe left or press `ArrowLeft` for **Again**.
- Press **Hard** or `H` when you know the word but it still needs practice.
- Swipe right or press `ArrowRight` for **Good**.
- Press **Easy** or `E` when the word is already comfortable.
- Unknown words return soon. Easy words return after a longer interval.
- Use **Play word** or **Play example** for Czech pronunciation when your browser supports speech synthesis.

## Deck Size

- `700` curated Czech vocabulary lemmas.
- `1361` source-backed extended Czech lemmas from frequency-prioritized Wiktionary data.
- `2061` unique non-number Czech word lemmas.
- `1586` generated Czech verb-form cards for B1 conjugation practice.
- `2001` generated number cards from `0` to `2000`.
- **A2 exam** mode keeps the practical core vocabulary, custom/imported words, and basic number practice up to `100`.
- **B1 exam** mode includes the full study set, including extended lemmas, generated verb forms, and all numbers.

## Study Tools

- **Shuffle due** reshuffles cards that are currently due in the selected deck.
- **Daily goal** tracks how many cards you reviewed today.
- **Search words** lets you browse the selected exam/deck and send a word straight into review.
- **Export deck** downloads the currently selected deck as JSON.

## Add Your Own Words

Use the in-app **Add your own word** form to save a Czech word, English meaning,
Hindi meaning, optional Urdu meaning, Czech example sentence, English example
translation, and deck tag. Custom words are stored in your browser and appear
immediately in the **My words** deck.

Recent custom words appear under the form, where mistakes can be deleted.

## Import CSV

Use this column order:

```csv
czech,english,hindi,urdu,sentence,sentence_en,tags
```

The older five-column format still works:

```csv
czech,english,hindi,sentence,tags
```

Tags can include `custom`, `daily`, `extended`, `work`, `travel`, `health`, `verbs`, `forms`, or `numbers`.

Use the **Exam** selector to switch between A2 and B1 study mode. Use
**Core words** for normal word study. Use **Verb forms** for B1 conjugation
practice. Use **All study cards** when you also want generated number practice.

Use the **Meaning** selector to switch answers between Hindi and Urdu.

## Backup And Restore

- **Export progress** downloads review state, imported cards, and custom words.
- **Restore JSON** loads a previous export back into the browser.

## Deploy Later

This app is static and deployable as-is. Upload these files to any static host:

- `index.html`
- `styles.css`
- `app.js`
- `data/vocabulary.js`
- `data/extended-lemmas.js`
- `data/verb-forms.js`
- `manifest.webmanifest`
- `sw.js`

Before deploying, run:

```bash
npm run check
```

The check includes syntax validation plus `scripts/validate-data.js`, which catches
duplicate real words, missing required fields, bad filler examples, mojibake, and
unexpected A2/B1 count drops.

## Mobile App Scaffold

The Expo app lives in `apps/mobile`.

```bash
cd apps/mobile
npm install
npm run ios
```

Set these before enabling Supabase sync:

```bash
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

Local notification support is scaffolded for daily reminders, streak-risk
reminders, and review-due reminders. Location-based notifications are intentionally
out of scope for v1.

## Shared Seed Data

The shared seed is generated from the current web vocabulary files:

```bash
npm run seed:shared
```

`npm run check` verifies that `packages/shared/data/vocabulary.seed.json` is still
in sync with `data/vocabulary.js`, `data/extended-lemmas.js`, and
`data/verb-forms.js`.
