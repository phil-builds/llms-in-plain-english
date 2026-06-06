# LLM Engineering Course

A self-paced, browser-based course covering modern LLM engineering and fine-tuning — from complete beginner to advanced practitioner.

Built specifically for **neurodiverse learners**: autistic, ADHD, and AuDHD. The design is calm and predictable. No flashing, no pop-ups, no forced sequences. You go at your own pace, save progress automatically, and pick up exactly where you left off.

> **This is a beta.** Content and design are actively being improved. Feedback is very welcome — see below.

---

## What's inside

96 topics across 11 sections:

1. **Foundations** — how LLMs work, tokens, context windows, embeddings
2. **Datasets & Training** — data collection, cleaning, formatting, annotation
3. **Fine-Tuning Techniques** — LoRA, QLoRA, DPO, RLHF, quantization
4. **Inference & Optimization** — batching, caching, serving, latency
5. **Local AI Ecosystem** — Ollama, vLLM, Hugging Face, MLX
6. **RAG & Memory** — retrieval-augmented generation, vector databases, chunking
7. **Agents & Workflows** — tool calling, agent loops, MCP, browser agents
8. **Model Types** — base vs instruct, reasoning models, multimodal, embeddings
9. **Deployment** — containerisation, APIs, scaling, cost management
10. **Evaluation** — benchmarks, human eval, LLM-as-judge, red teaming
11. **Real-World Skills** — prompting, cost estimation, safety, production patterns

---

## Running it locally

No install, no build step, no dependencies.

```bash
git clone https://github.com/phil-builds/llms-in-plain-english.git
cd llms-in-plain-english/full-course
python3 -m http.server 8765
```

Then open [http://localhost:8765](http://localhost:8765) in your browser.

Alternatively, just open `full-course/index.html` directly in your browser — it works without a server for most browsers.

---

## Design principles

- **Calm over clever** — no decorative gradients, no animations that serve no purpose
- **Predictable always** — every topic has the same structure, the sidebar never moves
- **Low sensory load** — warm off-white default, three themes (Paper / Sepia / Slate), reduce-motion setting
- **Learner controls the pace** — time estimates on every topic, resume exactly where you left off, mark complete or un-complete anything at any time

Progress is saved to your browser's `localStorage` — nothing is sent anywhere.

---

## Giving feedback

This is early and I want honest reactions. The most useful feedback:

- **Where did you get confused?** A topic, a sentence, a concept that didn't land.
- **Does the pacing feel right?** Too fast, too slow, too dense?
- **Does the design feel calm or busy?** Anything distracting or hard to read?
- **Did anything feel wrong or out of date?** Content accuracy matters.

Open a [GitHub Issue](../../issues) with whatever you noticed — a single line is fine, a paragraph is great. There's no wrong format.

---

## Tech stack

Vanilla JS · zero dependencies · zero build step · `localStorage` for persistence · static files only.
