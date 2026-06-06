# LLM Engineering Course — Project Guide

## Purpose

This is a self-paced, browser-based course that teaches **modern LLM engineering and fine-tuning** from complete beginner to advanced practitioner. Every decision — content, design, UX, and code — serves one goal: make complex technical concepts genuinely accessible to people who learn differently.

## Target Audience

**Neurodiverse learners: autistic, ADHD, and AuDHD people.**

This is not a "nice to have" consideration. It is the reason the project exists and the lens through which every decision should be made. Specifically:

- **Autistic learners** benefit from predictable structure, explicit context, low sensory load, and clear signposting. Surprises and inconsistency create friction.
- **ADHD learners** benefit from short chunks, time awareness, visible progress, easy re-entry after breaks, and a single clear next action at all times.
- **AuDHD learners** need both simultaneously — structure and momentum, calm and forward motion.

When in doubt, ask: *does this help someone who gets overwhelmed, loses their place, or struggles with "just read the docs"?*

---

## Project Structure

```
llms-course/
├── full-course/
│   ├── index.html              # App shell — minimal, loads content then app.js
│   ├── app.js                  # Course engine — routing, rendering, quiz, progress
│   ├── styles.css              # All styles — themes, layout, components
│   ├── content-1-foundations.js
│   ├── content-2-datasets.js
│   ├── content-3-finetuning.js
│   ├── content-4-inference.js
│   ├── content-5-ecosystem.js
│   ├── content-6-rag.js
│   ├── content-7-agents.js
│   ├── content-8-modeltypes.js
│   ├── content-9-deployment.js
│   ├── content-10-evaluation.js
│   └── content-11-realworld.js
└── CLAUDE.md
```

**Tech stack**: Vanilla JS, zero dependencies, zero build step. All persistence via `localStorage`. Served as static files.

---

## Design Principles

### 1. Calm over clever
No gradients for decoration, no attention-grabbing animations, no noise. Every visual element earns its place by communicating something useful.

### 2. Predictable always
Every topic has the same shape. The sidebar always looks the same. The topbar never moves. Predictability is not boring — for neurodiverse learners it is safety.

### 3. Low sensory load
- Warm off-white default (Paper theme), not stark white
- Three themes: Paper (default), Sepia (lowest contrast), Slate (dark/warm)
- Reduce motion setting that kills all transitions to 0.001ms
- Focus mode that hides the sidebar for distraction-free reading
- No autoplay, no flashing, no pop-ups

### 4. The learner controls their pace
Time estimates on every topic. Progress saves automatically. Resume exactly where you left off. Mark complete or un-complete any topic at any time. No forced sequences.

### 5. Accessible by default, not by afterthought
- WCAG AA contrast minimum across all three themes
- Touch targets ≥ 44px on mobile (WCAG 2.5.5)
- Decorative SVGs carry `aria-hidden="true"`
- Keyboard navigation (arrow keys between topics, Escape closes settings)
- `data-motion="reduced"` system respects user preferences

---

## Content Guidelines

### Topic structure (mandatory, in order)

Every topic must contain all six blocks. Do not add new block types without a strong reason.

| Block | Field | Purpose |
|---|---|---|
| Meta | `title`, `time`, `tagline` | What is this, how long, one-line hook |
| Lesson | `lesson` | The actual teaching — HTML prose |
| Analogy | `analogy` | One everyday-life comparison |
| Mental model | `mentalModel` | One sentence that captures the core concept |
| Mistakes | `mistakes` | Array of 2–4 common errors |
| Exercise | `exercise` | Practical mini-project with `goal`, `steps[]`, `stretch` |
| Quiz | `quiz` | Array of 1–3 multiple-choice questions |

### Voice and tone

- **Plain English first.** Write as if explaining to a curious, intelligent adult who has never encountered this topic before.
- **Short sentences.** If a sentence has more than two clauses, split it.
- **Short paragraphs.** 3–4 sentences maximum. One idea per paragraph.
- **Active voice.** "The model predicts the next word" not "the next word is predicted by the model."
- **No hedging.** Don't write "it's worth noting that" or "it can sometimes be the case." State things directly.
- **No jargon without definition.** Every technical term must be defined when first used in a topic. Use `<span class='term'>term</span>` for the first occurrence in `lesson`.

### Analogies

- **Must be from daily life**, not from other tech fields. "It's like a database" is not an analogy — it swaps one abstraction for another.
- Good sources: cooking, driving, sports, weather, building things, growing things, conversations.
- One analogy per topic. Keep it in one or two sentences.
- The analogy block uses `<p>` tags. It can include `<i>` for the example phrase (e.g., the autocomplete example).

### Mental model

- Exactly one sentence. No longer.
- Should work as a memorable anchor — something the learner can hold onto.
- Write it so it could appear on a sticky note on a monitor.

### Mistakes

- 2–4 items maximum. More than 4 becomes overwhelming.
- Each mistake should describe a *specific* wrong belief, not vague advice.
- Format: state the wrong belief, then briefly explain what is true instead.
- Use `<b>` to highlight the mistake concept for scannability.

### Exercise

- **`goal`**: One sentence describing what the learner will have done when finished.
- **`steps`**: 3–6 concrete actions. Start each with a verb.
- **`stretch`**: Optional harder variant. One sentence. Label it "Stretch:" in the data.
- Exercises should require **no setup** where possible. Use free browser tools, existing accounts, or things already in the course.
- Avoid exercises that require installing software in the early sections.

### Quiz

- 1–3 questions per topic.
- 4 options each (A/B/C/D).
- One correct answer (`answer` is a 0-indexed integer).
- Wrong options should be *plausible*, not obviously ridiculous. The goal is learning, not tricking.
- **`why`**: A short explanation of why the correct answer is right. This shows after answering and is the most valuable part — write it carefully.
- Feedback tone: "Yes — that's it." for correct, "Good try." for wrong. Never "Incorrect!" or "Wrong."

### Time estimates

- The `time` field is in minutes of comfortable reading.
- Be realistic. 4 minutes = ~600 words of prose at a relaxed pace, accounting for pauses.
- Most topics should be 3–6 minutes. A complex topic can go to 8. Nothing should exceed 10.

---

## Code Conventions

### Content files (`content-N-name.js`)

- Each file pushes exactly one section object into `window.COURSE`.
- Section object shape: `{ id, title, blurb, topics: [] }`
- Topic `id` values are kebab-case and **must never change** after a topic is published — they are used as localStorage keys for saved progress.
- `blurb` is 1 sentence describing the section for the home page syllabus.

### `app.js`

- Vanilla JS IIFE, strict mode, zero deps.
- localStorage namespace: `llmcourse.v1.` — bump the version suffix only for breaking schema changes.
- All SVG icons live in the `const I` object at the top with `aria-hidden="true"` on every `<svg>`.
- The `go(id)` function is the single navigation entry point — always route through it.
- `renderHome()` and `renderTopic(id)` are the two render paths — keep them separate.

### `styles.css`

- All colours are CSS custom properties defined per-theme (`[data-theme="paper"]`, `[data-theme="sepia"]`, `[data-theme="slate"]`).
- Use `oklch()` for all colour values — it enables perceptually uniform adjustments.
- Font weight on **serif** elements (`.prose`, headings): use `400`, `600`, or `700` only. Intermediate weights (550, 650) are for sans-serif only, where system fonts support variable weight.
- Reading width is capped at `64ch` via `--maxread`. Do not widen it.
- Sidebar width is `320px` via `--sidebar-w`.
- All transitions reference `var(--speed)` and `var(--ease)` — do not hardcode durations.

---

## What "done" looks like for a new topic

A topic is complete when:
1. All six blocks are present and non-empty
2. The analogy uses a daily-life comparison, not a tech comparison
3. The mental model is one sentence
4. At least one quiz question has a meaningful `why` explanation
5. The exercise can be attempted with no installs (or clearly states the prerequisite)
6. The `time` estimate is realistic
7. The topic `id` is kebab-case and unique across the entire course
