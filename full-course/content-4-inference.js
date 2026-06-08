/* Part 4 — Inference & Optimization */
window.COURSE.push({
  id: "inference",
  title: "Inference & Optimization",
  blurb: "Making models run fast, cheap, and smooth.",
  topics: [

    {
      id: "kv-cache",
      title: "KV cache",
      time: 5,
      tagline: "How models avoid redoing the same work every word.",
      lesson:
        "<p>Remember that a model generates text one token at a time, and for each new token it uses attention to look back at all the previous tokens. Naively, it would re-process the <i>entire</i> conversation again for every single new word. That's hugely wasteful.</p>" +
        "<p>The <span class='term'>KV cache</span> fixes this. As the model processes each token, it stores some intermediate results (called Keys and Values — the “K” and “V”) in memory. For the next token, it <b>reuses</b> those stored results instead of recomputing them.</p>" +
        "<p>The effect is dramatic: generation gets much faster, because each new token only does the small bit of new work, not the whole history again. Nearly every fast inference system relies on this.</p>" +
        "<p>The trade-off: the cache lives in memory (VRAM), and it grows with the length of the conversation. Long contexts mean a big KV cache — one reason very long chats use more memory and can slow down.</p>",
      analogy:
        "<p>Imagine adding numbers in a long list. Instead of re-adding the whole list each time a new number arrives, you keep a running total and just add the new number. The KV cache is that running total — it saves you from redoing all the earlier work.</p>",
      mentalModel:
        "KV cache = remembering past work so each new token is cheap. Big speed-up, but the cache grows with context length and eats memory.",
      mistakes: [
        "Forgetting the cache uses memory that grows with conversation length — a hidden cost of long contexts.",
        "Thinking it changes the model's answers. It only speeds up how they're computed; outputs are the same.",
        "Assuming it helps the very first pass. The big win is on each <b>subsequent</b> generated token.",
      ],
      exercise: {
        goal: "Feel the speed difference conceptually.",
        steps: [
          "Notice in any chatbot that the first few words can take a moment, then the rest stream out fast.",
          "Write down why: the model builds context once, then reuses cached work per token.",
          "Now picture a very long chat — explain why memory use climbs.",
          "Summarise in one sentence: what does the KV cache trade to gain speed?",
        ],
        stretch: "Read a serving tool's docs (like vLLM) for the phrase “KV cache” and note how much of their optimisation centres on managing it.",
      },
      quiz: [
        {
          q: "What problem does the KV cache solve?",
          options: ["Each new token requiring a separate API call to the server", "Re-processing the whole history for every new token", "Storing all past tokens in raw memory until the context fills", "Calculating attention scores twice per layer for reliability"],
          answer: 1,
          why: "It stores past intermediate results so each new token reuses them instead of recomputing everything.",
        },
        {
          q: "What's the main cost of the KV cache?",
          options: ["It changes the order in which tokens are processed", "It uses memory that grows with conversation length", "It improves output quality by re-ranking candidate tokens", "It compresses past tokens into a fixed-size summary vector"],
          answer: 1,
          why: "The cache lives in VRAM and grows with context, so long chats use more memory.",
        },
      ],
    },

    {
      id: "flash-attention",
      title: "Flash Attention",
      time: 4,
      tagline: "A smarter way to compute attention, with less memory.",
      lesson:
        "<p>Attention is powerful but expensive: comparing every token with every other token creates a lot of intermediate data. On long inputs, this can swamp a GPU's memory and slow everything down.</p>" +
        "<p><span class='term'>Flash Attention</span> is a clever re-engineering of <i>how</i> attention is calculated on the GPU. It produces the <b>exact same result</b>, but organises the math to use far less memory and run much faster — by being smart about how data moves around inside the chip.</p>" +
        "<p>You don't need the deep details. What matters: if a tool offers “Flash Attention,” turning it on usually makes training and inference faster and lets you handle longer contexts, for free, with no quality loss.</p>" +
        "<p>It's a great example of a recurring theme in this section: often the model stays identical, and the speed-up comes purely from doing the same computation more cleverly.</p>",
      analogy:
        "<p>Imagine doing your taxes by spreading every paper across the floor (slow, messy, runs out of room). Flash Attention is doing the same calculations on a tidy desk, handling one folder at a time. Same answer, far less space, much faster.</p>",
      mentalModel:
        "Flash Attention = same attention result, computed in a memory-smart way. Faster + longer contexts, no quality cost. Flip it on when offered.",
      mistakes: [
        "Thinking it changes accuracy. It's mathematically the same output — just computed efficiently.",
        "Assuming it works on any hardware. It needs compatible GPUs; older or CPU-only setups may not support it.",
        "Overthinking it. For most users it's simply a speed toggle in their tool of choice.",
      ],
      exercise: {
        goal: "Spot the optimisation in real tools.",
        steps: [
          "Search “enable flash attention” for a tool you might use (Unsloth, vLLM, transformers).",
          "Find the single setting or flag that turns it on.",
          "Note what benefit the docs claim (speed, memory, longer context).",
          "Write one line: why is “same result, less memory” such a common goal in inference?",
        ],
        stretch: "Read at a high level what hardware Flash Attention requires, and check whether a free cloud GPU you could use supports it.",
      },
      quiz: [
        {
          q: "What does Flash Attention change?",
          options: ["Which tokens the model attends to on each forward pass", "How attention is computed — faster and more memory-efficient, same result", "How many attention heads the model uses per layer", "The order in which transformer layers are processed during inference"],
          answer: 1,
          why: "It reorganises the attention math to be faster and use less memory, with identical output.",
        },
        {
          q: "What's a practical benefit of enabling it?",
          options: ["Improved output quality by reordering how tokens are scored", "Faster runs and support for longer contexts at no quality cost", "A smaller effective context window to reduce memory pressure", "A longer warm-up period before the first response is generated"],
          answer: 1,
          why: "It speeds things up and enables longer contexts without changing the result.",
        },
      ],
    },

    {
      id: "speculative-decoding",
      title: "Speculative decoding",
      time: 5,
      tagline: "A small model races ahead; a big one checks its work.",
      lesson:
        "<p>Generating text token-by-token with a big model is slow because each token waits for the full model to run. <span class='term'>Speculative decoding</span> speeds this up with a neat trick: use a <b>small, fast model to guess several tokens ahead</b>, then have the big model <b>verify</b> them all at once.</p>" +
        "<p>If the small model's guesses are right (which they often are for easy, predictable text), the big model accepts them in a single quick check — getting several tokens for the price of one. If a guess is wrong, the big model corrects it and they continue.</p>" +
        "<p>Crucially, the final output is <b>identical</b> to what the big model would have produced alone — the small model only proposes; the big model always has the final say. You get speed with no quality loss.</p>" +
        "<p>It's a favourite optimisation in serious serving systems, sometimes doubling speed on everyday text.</p>",
      analogy:
        "<p>Think of a fast junior assistant drafting the easy parts of a letter, and the expert quickly glancing over it. When the draft is fine, the expert just nods it through — much faster than writing every word themselves. The expert still catches and fixes any mistakes.</p>",
      mentalModel:
        "Speculative decoding = a quick model proposes several tokens, the big model verifies in one shot. Same final answer, often much faster.",
      mistakes: [
        "Thinking it lowers quality. The big model verifies everything, so output matches running it alone.",
        "Expecting big speed-ups on hard, unpredictable text — the small model guesses wrong more often there.",
        "Confusing the helper model's role. It only suggests; it never overrides the main model.",
      ],
      exercise: {
        goal: "Reason about when it helps most.",
        steps: [
          "List two kinds of text: very predictable (boilerplate) and very surprising (novel poetry).",
          "Predict where the small model's guesses succeed more often.",
          "Conclude where speculative decoding gives the biggest speed-up.",
          "Write one sentence on why quality is never sacrificed.",
        ],
        stretch: "Find a serving framework that supports speculative decoding and note what it calls the small helper (often “draft model”).",
      },
      quiz: [
        {
          q: "How does speculative decoding speed things up?",
          options: ["The big model generates a draft; a smaller model then scores and filters each token", "A small model proposes several tokens; the big model verifies them at once", "Both models run simultaneously and the faster one's output is used", "The big model skips layers when the input tokens are short"],
          answer: 1,
          why: "A fast draft model guesses ahead and the big model verifies in one pass, accepting correct guesses.",
        },
        {
          q: "What happens to output quality?",
          options: ["It improves slightly because the small model adds diverse candidate tokens", "It's identical — the big model always verifies and has final say", "It varies by task — creative tasks improve but factual tasks may degrade", "It degrades slightly because rejected tokens introduce noise into the context"],
          answer: 1,
          why: "The main model verifies everything, so the result matches running it alone.",
        },
      ],
    },

    {
      id: "inference-optimization",
      title: "Inference optimization",
      time: 5,
      tagline: "The toolbox for making models cheaper and faster to run.",
      lesson:
        "<p><span class='term'>Inference optimization</span> is the broad goal of making a trained model respond <b>faster and cheaper</b> without retraining it. The topics around this one — KV cache, Flash Attention, speculative decoding, batching, quantization — are all tools in this toolbox.</p>" +
        "<p>The common theme: the model's <i>knowledge</i> stays fixed; we just compute its answers more efficiently. Optimisation lives in the engineering layer, not the model's brain.</p>" +
        "<p>The main levers are: make each computation cheaper (quantization, Flash Attention), avoid redoing work (KV cache), serve many requests together (batching), and predict ahead (speculative decoding). Real systems stack several of these at once.</p>" +
        "<p>Why it matters: at scale, a 2× speed-up can halve your hardware bill and make an app feel instant instead of sluggish. For products, inference cost and latency are often the make-or-break factors.</p>",
      analogy:
        "<p>Think of optimising a kitchen during a dinner rush. You don't hire a better chef (retrain) — you prep ingredients ahead (cache), batch similar orders, use sharper knives (efficient math), and have a junior plate the easy dishes. Same menu, served faster and cheaper.</p>",
      mentalModel:
        "Inference optimization = serve the same model faster and cheaper using engineering tricks. The brain is fixed; the kitchen gets efficient.",
      mistakes: [
        "Thinking optimisation requires a better model. Most gains come from how you <b>run</b> the existing one.",
        "Optimising before you have a working baseline. Measure first, then improve the real bottleneck.",
        "Chasing speed so hard you quietly hurt quality (e.g. over-quantizing). Watch both numbers.",
      ],
      exercise: {
        goal: "Build a mental checklist of optimisation levers.",
        steps: [
          "List the 5 tools from this section (KV cache, Flash Attention, speculative decoding, batching, quantization).",
          "Next to each, write one word for what it saves (work, memory, time, cost…).",
          "Imagine a slow app and pick the first two levers you'd try.",
          "Note one quality risk to watch for each lever you'd use.",
        ],
        stretch: "Read a single serving framework's homepage and tick off which of your 5 levers it advertises.",
      },
      quiz: [
        {
          q: "What is the goal of inference optimization?",
          options: ["Fine-tune the model on domain data so it needs fewer tokens to answer", "Make the existing model respond faster and cheaper", "Increase batch size during the original training run to build in efficiency", "Add more attention heads to help the model skip irrelevant context"],
          answer: 1,
          why: "It improves how a fixed model is run, not the model's knowledge itself.",
        },
        {
          q: "What should you do before optimising?",
          options: ["Apply every available optimisation technique to cover all possible bottlenecks", "Measure to find the real bottleneck", "Switch to a newer model architecture that is inherently faster", "Reduce the context window so fewer tokens are processed per request"],
          answer: 1,
          why: "Measure first so you optimise the actual slow part rather than guessing.",
        },
      ],
    },

    {
      id: "model-serving",
      title: "Model serving",
      time: 5,
      tagline: "Turning a model file into a service people can call.",
      lesson:
        "<p>A model on disk does nothing by itself. <span class='term'>Model serving</span> is <b>running the model as a live service</b> that accepts requests and returns answers — usually behind an API other programs can call.</p>" +
        "<p>A serving system handles the unglamorous-but-vital jobs: loading the model into memory, receiving many users' requests, queuing and batching them, managing the KV cache, streaming answers back token by token, and staying up reliably.</p>" +
        "<p>Popular serving tools include <b>vLLM</b> (high-performance, for GPUs and scale) and <b>Ollama</b> (simple, local-first) — both covered in the next section. The serving layer is where all those optimisation tricks actually get applied.</p>" +
        "<p>Mental split: the <b>model</b> is the engine; <b>serving</b> is the car around it — steering, dashboard, doors — that lets real people actually use it.</p>",
      analogy:
        "<p>A great recipe (the model) feeds no one until there's a restaurant (serving) — a kitchen, waiters taking orders, a queue system, and plates going out. Serving is the whole operation that delivers the model's output to customers reliably.</p>",
      mentalModel:
        "Model serving = running the model as a reliable live API: load it, handle many requests, batch, cache, stream, stay up. The model is the engine; serving is the car.",
      mistakes: [
        "Confusing serving with the model. You can swap models behind the same serving setup.",
        "Ignoring concurrency. Handling one request is easy; handling hundreds at once is the real challenge.",
        "Forgetting reliability and monitoring. A model that crashes under load isn't serving anyone.",
      ],
      exercise: {
        goal: "Separate model from serving in your mind.",
        steps: [
          "Pick an AI app you like and name the <b>model</b> it might use.",
          "Now list 3 serving jobs happening behind the scenes (queuing, streaming, scaling…).",
          "Explain why the same model could power a fast app and a slow one.",
          "Write one line: what does a serving layer add that a bare model file lacks?",
        ],
        stretch: "Install Ollama later and run a model — you'll have created a tiny local serving setup with a real API endpoint.",
      },
      quiz: [
        {
          q: "What is model serving?",
          options: ["Packaging a model's weights into a compressed file for distribution", "Running a model as a live service that takes requests and returns answers", "Evaluating a model's accuracy on a held-out benchmark dataset", "Adapting a pre-trained model's parameters for a specific downstream task"],
          answer: 1,
          why: "Serving turns a static model file into a reliable, callable service, usually via an API.",
        },
        {
          q: "What's the hard part of serving compared to running once?",
          options: ["Loading the model's weights accurately from disk into GPU memory", "Handling many concurrent requests reliably with batching and caching", "Choosing the right quantization format before deployment", "Splitting the model across multiple files to reduce load time"],
          answer: 1,
          why: "Concurrency, reliability, and efficient resource use under load are the real challenges.",
        },
      ],
    },

    {
      id: "batch-inference",
      title: "Batch inference",
      time: 4,
      tagline: "Serving many requests together for big efficiency.",
      lesson:
        "<p><span class='term'>Batch inference</span> means processing <b>multiple requests at the same time</b> in one go, rather than one after another. GPUs are built for this — they're happiest doing lots of parallel math.</p>" +
        "<p>Running requests one-by-one leaves most of the GPU idle. Batching packs several together so the hardware does more useful work per pass. This dramatically raises <b>throughput</b> (total requests handled per second) and lowers cost per request.</p>" +
        "<p>There's a balance: bigger batches are more efficient overall, but an individual request might wait a moment for the batch to fill, slightly raising its <b>latency</b>. Smart serving systems use “continuous batching” to get the best of both.</p>" +
        "<p>For one person chatting, batching barely matters. For an app serving thousands, it's one of the biggest cost savers there is.</p>",
      analogy:
        "<p>Think of a bus versus individual taxis. Taxis (one request each) waste fuel and road space. A bus (a batch) carries many people in one trip — far more efficient per passenger, though each rider waits a little for it to fill and follow the route.</p>",
      mentalModel:
        "Batch inference = handle many requests in one parallel pass. Higher throughput, lower cost per request, with a small latency trade-off as batches fill.",
      mistakes: [
        "Thinking batching helps a single user. Its payoff is at scale, with many simultaneous requests.",
        "Making batches so large that individual requests wait too long — balance throughput and latency.",
        "Confusing throughput (total handled) with latency (one request's wait). Batching trades a bit of the latter for the former.",
      ],
      exercise: {
        goal: "Tell throughput and latency apart.",
        steps: [
          "Define each in your own words: throughput vs latency.",
          "For a chatbot used by one person, decide which matters more.",
          "For a service answering 10,000 requests a minute, decide which matters more.",
          "Write one line on how batching affects each.",
        ],
        stretch: "Read about “continuous batching” in vLLM and note how it adds new requests without waiting for the whole batch to finish.",
      },
      quiz: [
        {
          q: "What is batch inference?",
          options: ["Splitting a single long request into smaller chunks to process sequentially", "Processing many requests together in one parallel pass", "Caching the model's output so repeated identical prompts skip inference entirely", "Running each request on a dedicated GPU thread to avoid queue delays"],
          answer: 1,
          why: "Batching handles multiple requests simultaneously, using the GPU's parallelism efficiently.",
        },
        {
          q: "What's the trade-off of larger batches?",
          options: ["Lower throughput, because more GPU cycles are spent on coordination overhead", "Higher throughput but a request may wait for the batch to fill (more latency)", "Improved output quality, since the model can cross-reference answers within the batch", "Reduced memory use, because requests share the same KV cache during the batch"],
          answer: 1,
          why: "Bigger batches raise total throughput but can add latency for individual requests.",
        },
      ],
    },

    {
      id: "gpu-basics",
      title: "GPU basics",
      time: 5,
      tagline: "Why AI runs on graphics chips, not regular processors.",
      lesson:
        "<p>A <span class='term'>GPU</span> (Graphics Processing Unit) was originally built to draw video-game graphics, which means doing <b>thousands of simple calculations at the same time</b>. It turns out that's exactly what running an AI model needs.</p>" +
        "<p>A regular processor (CPU) is like a few very smart workers doing tasks one after another. A GPU is like thousands of simpler workers all working in parallel. Model math is mostly huge piles of multiplications that can happen simultaneously — perfect for a GPU.</p>" +
        "<p>That's why training and fast inference happen on GPUs, and why GPU availability and price shape the whole AI industry. You can run small models on a CPU, but it's far slower.</p>" +
        "<p>You'll hear brand and model names (various data-center and consumer cards). For now, the key idea is <b>parallelism</b>: GPUs win because AI work splits into many parallel pieces.</p>",
      analogy:
        "<p>Imagine painting a huge wall. One expert painter (CPU) does careful work but slowly. A hundred decent painters (GPU) each take a patch and finish the whole wall in a flash. AI is a “huge wall” job — lots of similar work, best split across many hands.</p>",
      mentalModel:
        "GPU = thousands of workers in parallel; CPU = a few clever workers in sequence. AI's math is massively parallel, so GPUs win.",
      mistakes: [
        "Thinking a faster CPU will match a GPU for AI. It's about parallelism, not raw single-task speed.",
        "Ignoring memory (VRAM). A GPU's compute is useless if the model doesn't fit in its memory (next topic).",
        "Assuming you always need the biggest GPU. Small/quantized models run fine on modest hardware.",
      ],
      exercise: {
        goal: "Match hardware to the job.",
        steps: [
          "Find the GPU (if any) in your own computer and note its memory size.",
          "Search whether a small quantized model (e.g. a 3B Q4) could run on it.",
          "Compare a free cloud GPU's specs to your machine.",
          "Decide: for learning, would you use local hardware or a free cloud GPU? Why?",
        ],
        stretch: "Look up the difference between a consumer GPU and a data-center GPU in one spec that matters for AI (usually memory).",
      },
      quiz: [
        {
          q: "Why are GPUs good for AI?",
          options: ["They have faster memory buses that reduce data transfer bottlenecks for large models", "They do thousands of calculations in parallel, matching AI's math", "They use lower-precision arithmetic that CPUs are unable to perform at all", "They can hold an entire model in on-chip cache, avoiding main memory latency"],
          answer: 1,
          why: "AI math is massively parallel, which is exactly what GPUs are built for.",
        },
        {
          q: "How does a CPU differ from a GPU here?",
          options: ["CPUs are faster per core, so for small models they outperform GPUs on latency", "CPU = a few workers in sequence; GPU = many workers in parallel", "They perform the same operations at the same speed on the same data types", "CPUs handle floating-point math more accurately, which matters for inference"],
          answer: 1,
          why: "CPUs excel at sequential tasks; GPUs excel at doing many similar operations at once.",
        },
      ],
    },

    {
      id: "vram-basics",
      title: "VRAM basics",
      time: 5,
      tagline: "The one number that decides if a model will even run.",
      lesson:
        "<p><span class='term'>VRAM</span> is a GPU's own memory (Video RAM). It's where the model's parameters and its working data (like the KV cache) must live while running. If a model doesn't <b>fit</b> in VRAM, it won't run on that GPU — full stop.</p>" +
        "<p>This makes VRAM often <i>the</i> deciding factor for what you can run. A rough guide: a model in 16-bit needs about 2 GB of VRAM per billion parameters; quantized to 4-bit, roughly 0.5–0.7 GB per billion. So an 8B model might need ~16 GB raw, or ~5 GB quantized.</p>" +
        "<p>On top of the weights, you need extra VRAM for the KV cache (which grows with context) and overhead. That's why people quantize: to fit bigger models into the VRAM they actually have.</p>" +
        "<p>When choosing a model, the first question isn't “is it good?” — it's often “does it fit in my VRAM?”</p>",
      analogy:
        "<p>VRAM is the size of your workbench. The model is a machine you must place on it to use. A huge machine simply won't fit on a small bench — no matter how skilled you are. Quantization is getting a folding, compact version that fits.</p>",
      mentalModel:
        "VRAM = the GPU's workbench size. The model (plus its KV cache) must fit, or it won't run. Quantize to make big models fit small benches.",
      mistakes: [
        "Picking a model by quality alone, then finding it won't fit in your VRAM.",
        "Forgetting the KV cache and overhead also need VRAM — leave headroom beyond just the weights.",
        "Assuming system RAM helps directly. It's the GPU's VRAM that matters most for GPU inference.",
      ],
      exercise: {
        goal: "Do a back-of-envelope fit check.",
        steps: [
          "Pick a model size (say 7B) and estimate VRAM at 16-bit (~2 GB × billions).",
          "Now estimate it at 4-bit (~0.6 GB × billions).",
          "Compare both to a GPU's VRAM you have access to.",
          "Decide which precision lets it fit, and note the headroom you'd leave for the cache.",
        ],
        stretch: "Use an online “VRAM calculator for LLMs” to check your estimates against a more precise tool.",
      },
      quiz: [
        {
          q: "Why does VRAM often decide what you can run?",
          options: ["It sets a hard cap on how many tokens the model can generate per second", "The model and its working data must fit in VRAM or it won't run", "It determines the precision of floating-point math the GPU performs", "It limits how many concurrent users a serving system can handle safely"],
          answer: 1,
          why: "If the model plus KV cache doesn't fit in the GPU's VRAM, it can't run on that GPU.",
        },
        {
          q: "How does quantization help with VRAM?",
          options: ["It offloads part of the model to system RAM so the GPU processes it in smaller chunks", "It shrinks the model so it fits in less VRAM", "It increases the batch size so fewer passes are needed per request", "It compresses the KV cache between requests to free memory for the weights"],
          answer: 1,
          why: "Lower precision means a smaller memory footprint, letting bigger models fit smaller GPUs.",
        },
      ],
    },

    {
      id: "latency-quality",
      title: "Latency vs quality tradeoffs",
      time: 5,
      tagline: "You usually can't have fastest, cheapest, and best at once.",
      lesson:
        "<p>Almost every real AI decision is a balance between <b>latency</b> (how fast the answer comes), <b>cost</b> (how much it takes to produce), and <b>quality</b> (how good it is). Push one and the others usually move.</p>" +
        "<p>Want faster and cheaper? Use a smaller or more quantized model — but quality may dip. Want top quality? Use a bigger model or more reasoning steps — but it's slower and pricier. There's rarely a free lunch.</p>" +
        "<p>The skill is matching the trade-off to the <b>job</b>. Autocomplete in a code editor needs to be instant, so favour speed. A legal contract review favours quality, even if it's slower. A high-volume chatbot watches cost closely.</p>" +
        "<p>Good engineers don't seek “the best model” in the abstract — they ask “what's good enough, fast enough, and cheap enough for <i>this</i> use?” That framing prevents a lot of wasted money and frustration.</p>",
      analogy:
        "<p>It's the classic “fast, good, cheap — pick two” of any project. A motorbike courier is fast but pricey for big loads; a cargo ship is cheap but slow. You choose based on the delivery, not on which vehicle is “best.”</p>",
      mentalModel:
        "Latency, cost, quality form a triangle — improving one usually costs another. Pick the balance that fits the specific job, not “the best” in a vacuum.",
      mistakes: [
        "Always reaching for the biggest model. Often a smaller one is plenty and far cheaper/faster.",
        "Optimising for quality on tasks where speed is what users actually feel.",
        "Ignoring cost until the bill arrives. At scale, model choice is a budget decision.",
      ],
      exercise: {
        goal: "Place real tasks on the trade-off triangle.",
        steps: [
          "List 3 tasks: code autocomplete, medical summary, casual chatbot.",
          "For each, rank latency, cost, and quality from most to least important.",
          "Pick whether you'd lean to a small/fast or large/strong model for each.",
          "Write one sentence defending your choice for the medical one.",
        ],
        stretch: "Find two models of very different sizes and compare their advertised speed and price. Decide which task each suits.",
      },
      quiz: [
        {
          q: "What's the core idea of latency vs quality trade-offs?",
          options: ["A well-optimised serving stack can improve speed without any quality trade-off", "Improving speed/cost often lowers quality, and vice versa — balance per job", "Quantization always improves latency while keeping quality identical to full precision", "Larger context windows reduce both latency and cost by allowing fewer requests"],
          answer: 1,
          why: "Latency, cost, and quality pull against each other; the right balance depends on the use case.",
        },
        {
          q: "How should you choose a model?",
          options: ["By benchmark scores alone — a higher rank means better real-world results", "By what's good, fast, and cheap enough for the specific task", "By the number of parameters — more is always worth the extra inference cost", "By the training data size — more tokens trained on means fewer quality trade-offs"],
          answer: 1,
          why: "Match the trade-off to the job rather than chasing the abstractly “best” model.",
        },
      ],
    },

  ],
});
