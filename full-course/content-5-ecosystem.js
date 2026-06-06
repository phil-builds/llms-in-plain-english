/* Part 5 — Local AI Ecosystem */
window.COURSE.push({
  id: "ecosystem",
  title: "Local AI Ecosystem",
  blurb: "The real tools you'll actually use, and what each is for.",
  topics: [

    {
      id: "llama-cpp",
      title: "llama.cpp",
      time: 5,
      tagline: "The engine that runs LLMs on almost anything.",
      lesson:
        "<p><span class='term'>llama.cpp</span> is a lightweight, super-efficient program for <b>running language models locally</b> — even on a laptop, a phone, or a machine with no fancy GPU. It's written to be fast and to squeeze models into modest hardware.</p>" +
        "<p>It pioneered the <b>GGUF</b> format you met earlier and is famous for making quantized models run smoothly on everyday computers. Much of the local-AI world is built on top of it.</p>" +
        "<p>You can use it directly from the command line, but many people meet it indirectly: tools like <b>Ollama</b> use llama.cpp as their engine under the hood. So even if you never touch it directly, it's often doing the heavy lifting.</p>" +
        "<p>Think of llama.cpp as the dependable workhorse engine of local inference: not the prettiest interface, but it runs models efficiently where heavier tools can't.</p>",
      analogy:
        "<p>It's like a fuel-efficient engine that fits in almost any car. You might never open the bonnet to see it, but lots of friendly-looking vehicles (other tools) are powered by it underneath. Reliable, economical, everywhere.</p>",
      mentalModel:
        "llama.cpp = the efficient local engine that runs (quantized) models on modest hardware. Often hidden inside friendlier tools like Ollama.",
      mistakes: [
        "Thinking it's for training. It's a <b>run-the-model</b> engine, not a fine-tuning tool.",
        "Assuming you must use its raw command line. Friendlier wrappers (Ollama) give you the same engine more easily.",
        "Feeding it the wrong format. It wants GGUF files — match your download to it.",
      ],
      exercise: {
        goal: "Map the engine-and-wrapper relationship.",
        steps: [
          "Write “llama.cpp” in the centre of a page.",
          "Around it, write tools that use it as an engine (Ollama is the big one).",
          "Note the format it consumes (GGUF) with an arrow pointing in.",
          "Summarise in one line: why do beginners often use a wrapper instead of it directly?",
        ],
        stretch: "Skim the llama.cpp project page and find one surprising device people have run it on (phones, Raspberry Pis, etc.).",
      },
      quiz: [
        {
          q: "What is llama.cpp mainly for?",
          options: ["Training huge models in the cloud", "Running models locally and efficiently, even on modest hardware", "Cleaning datasets", "Drawing graphics"],
          answer: 1,
          why: "It's an efficient local inference engine, famous for running quantized GGUF models on everyday machines.",
        },
        {
          q: "How do many people use llama.cpp without realising it?",
          options: ["Through their TV", "Via friendlier tools like Ollama that use it as the engine underneath", "By training models", "It's never used indirectly"],
          answer: 1,
          why: "Wrappers like Ollama run on top of llama.cpp, so it powers them behind the scenes.",
        },
      ],
    },

    {
      id: "ollama",
      title: "Ollama",
      time: 5,
      tagline: "Run a local model with one simple command.",
      lesson:
        "<p><span class='term'>Ollama</span> is the friendliest on-ramp to running models on your own computer. It wraps the efficient engine (llama.cpp) in a simple tool: install it, type one command like <code>ollama run llama3.2:3b</code>, and you're chatting with a local model.</p>" +
        "<p>It handles the annoying parts for you — downloading the right model file, picking a sensible quantization, loading it, and exposing a local API your own apps can call. No deep setup required.</p>" +
        "<p>This makes Ollama perfect for learning and for building local-first apps: your data never leaves your machine, there's no per-token bill, and it works offline. It's many people's first taste of true local AI.</p>" +
        "<p>For heavy production scale you'd reach for vLLM (next), but for personal use, prototypes, and privacy, Ollama is hard to beat.</p>",
      analogy:
        "<p>If llama.cpp is a raw engine, Ollama is the whole easy-to-drive car with a key you just turn. You don't think about fuel injection — you get in and go. One command, and a model is running for you.</p>",
      mentalModel:
        "Ollama = one-command local models. It hides the setup, runs offline and private, and gives you a local API. The beginner-friendly front door to local AI.",
      mistakes: [
        "Expecting data-center-scale serving from it. It shines for personal/local use, not thousands of concurrent users.",
        "Forgetting it still needs enough RAM/VRAM for the model you pull — check sizes.",
        "Not realising it exposes a local API you can build apps against, not just a chat box.",
      ],
      exercise: {
        goal: "Run your first fully-local model.",
        steps: [
          "Install Ollama from its official site (free; requires macOS, Linux, or Windows — if you're on a Chromebook or restricted machine, use a free cloud GPU like Google Colab instead).",
          "In a terminal, run a small model: <code>ollama run llama3.2:3b</code>. The <code>:3b</code> pins the size — always specify a version tag so you know what you're getting.",
          "Disconnect from the internet and confirm it still answers — that's local AI.",
          "Note the model's size and how fast it felt on your machine.",
        ],
        stretch: "Find Ollama's local API endpoint in its docs and send it a request from a tiny script — you've just built a local AI app.",
      },
      quiz: [
        {
          q: "What makes Ollama beginner-friendly?",
          options: ["It requires no computer", "One simple command downloads and runs a local model for you", "It only runs in the cloud", "It needs manual quantization"],
          answer: 1,
          why: "Ollama hides the setup — a single command pulls and runs a model with a sensible default.",
        },
        {
          q: "What's a key benefit of running models with Ollama locally?",
          options: ["It's always the most powerful", "Privacy, no per-token cost, and offline use", "It needs no memory", "It trains models"],
          answer: 1,
          why: "Local execution keeps data on your machine, avoids per-use fees, and works offline.",
        },
      ],
    },

    {
      id: "vllm",
      title: "vLLM",
      time: 5,
      tagline: "The high-performance engine for serving at scale.",
      lesson:
        "<p><span class='term'>vLLM</span> is a serving system built for <b>speed and scale</b> on GPUs. Where Ollama is about easy personal use, vLLM is about serving many users efficiently — the kind of thing a real product or API needs.</p>" +
        "<p>Its claim to fame is smart memory management for the KV cache (<b>PagedAttention</b> — it stores the KV cache in flexible memory blocks rather than one large chunk, letting it serve far more users at once) and <b>continuous batching</b>, which together let it handle lots of simultaneous requests with high throughput and good latency.</p>" +
        "<p>In practice, vLLM is where many of the optimisation ideas from the last section come together: efficient caching, batching, and fast attention, all in one serving engine. It exposes an API that's often compatible with popular API styles, so apps can switch to it easily.</p>" +
        "<p>Rule of thumb: <b>Ollama for one person or a prototype; vLLM when you need to serve many people fast.</b></p>",
      analogy:
        "<p>Ollama is your home kitchen — perfect for cooking for yourself. vLLM is a professional restaurant kitchen built to plate hundreds of orders an hour without falling behind. Same cooking, very different scale of operation.</p>",
      mentalModel:
        "vLLM = the scale engine. Clever KV-cache memory + continuous batching = high throughput serving for many users. Reach for it past prototype stage.",
      mistakes: [
        "Using vLLM for a single-user toy when Ollama would be simpler. Match the tool to the scale.",
        "Underestimating its hardware needs — it's GPU-focused and serious.",
        "Thinking it replaces the model. Like all serving tools, it runs whatever model you give it.",
      ],
      exercise: {
        goal: "Decide between Ollama and vLLM for scenarios.",
        steps: [
          "Write 3 scenarios: a personal note-taker, a startup's public chatbot, a quick weekend demo.",
          "For each, choose Ollama or vLLM and state why in a few words.",
          "Identify which scenarios care most about throughput.",
          "Note the one feature of vLLM that most helps high concurrency.",
        ],
        stretch: "Skim vLLM's docs for “continuous batching” and “PagedAttention,” and connect each to a concept from the inference section.",
      },
      quiz: [
        {
          q: "What is vLLM optimised for?",
          options: ["Easy single-user local chat", "Fast, high-throughput serving of many concurrent requests on GPUs", "Training from scratch", "Drawing images"],
          answer: 1,
          why: "vLLM targets scalable serving with smart caching and continuous batching for many users.",
        },
        {
          q: "When would you pick Ollama over vLLM?",
          options: ["Serving a million users", "Personal, local, or prototype use where simplicity matters", "Maximum GPU throughput", "Never"],
          answer: 1,
          why: "Ollama is the simple local option; vLLM is for serving many people at scale.",
        },
      ],
    },

    {
      id: "mlx",
      title: "MLX",
      time: 4,
      tagline: "Apple's framework for running and training AI on Macs.",
      lesson:
        "<p><span class='term'>MLX</span> is a machine-learning framework made by Apple, designed to run efficiently on <b>Apple Silicon</b> Macs (the M-series chips). If you have a modern Mac, MLX lets you run and even fine-tune models using the Mac's unified memory and GPU.</p>" +
        "<p>Its big advantage on Macs is <b>unified memory</b>: the chip's memory is shared between the CPU and GPU, so models can use a large pool without the usual VRAM bottleneck. This lets capable models run well on consumer Macs.</p>" +
        "<p>The MLX community on Hugging Face maintains a growing set of MLX-ready models you can run directly. For Mac users, MLX is frequently the fastest, most native way to do local AI.</p>" +
        "<p>If you're not on a Mac, you'll use other tools — but it's worth knowing MLX exists, because the hardware landscape (and the best tool) depends on what you own.</p>",
      analogy:
        "<p>MLX is like a tool built to fit one brand of workshop perfectly. If your workshop is that brand (an Apple Silicon Mac), the tool slots in beautifully and runs smoothly. In a different workshop, you'd reach for a different, equally good tool.</p>",
      mentalModel:
        "MLX = Apple's native AI framework for M-series Macs. Unified memory is its superpower for local inference and light fine-tuning on a Mac.",
      mistakes: [
        "Trying to use MLX off Apple Silicon. It's designed specifically for those chips.",
        "Assuming it's only for inference. It also supports training and fine-tuning on supported Macs.",
        "Forgetting tooling differs by hardware — the “best” local tool depends on the machine you have.",
      ],
      exercise: {
        goal: "Pick the right local tool for your hardware.",
        steps: [
          "Identify your machine: Apple Silicon Mac, Windows/Linux with NVIDIA GPU, or CPU-only.",
          "Match it: MLX for Apple Silicon; Ollama/llama.cpp broadly; vLLM for NVIDIA at scale.",
          "Write your primary local tool choice and a backup.",
          "Note one reason your hardware steers the choice.",
        ],
        stretch: "If you have a Mac, browse the “MLX community” models and run one with an MLX example. If not, note which tool you'd use instead.",
      },
      quiz: [
        {
          q: "MLX is designed for which hardware?",
          options: ["Any GPU", "Apple Silicon (M-series) Macs", "Only phones", "Old Windows laptops"],
          answer: 1,
          why: "MLX is Apple's framework optimised for M-series chips and their unified memory.",
        },
        {
          q: "What's MLX's standout advantage on Macs?",
          options: ["It needs no memory", "Unified memory shared by CPU and GPU, easing the usual VRAM limits", "It runs in the browser", "It trains in the cloud"],
          answer: 1,
          why: "Unified memory lets models use a large shared pool, helping capable models run on consumer Macs.",
        },
      ],
    },

    {
      id: "huggingface",
      title: "Hugging Face",
      time: 5,
      tagline: "The GitHub of AI — where models and datasets live.",
      lesson:
        "<p><span class='term'>Hugging Face</span> is the central hub of the open AI world. It's a website (and set of tools) where people <b>share models, datasets, and demos</b>. If open AI has a town square, this is it.</p>" +
        "<p>You'll use it to: <b>find models</b> (browse, read “model cards” describing them), <b>find datasets</b> (for training or testing), and <b>download</b> what you need. Its popular software library (called <code>transformers</code>) is a common way to load and run models in code.</p>" +
        "<p>A few key spots: the <b>Hub</b> (models + datasets), <b>model cards</b> (the readme for each model — licence, size, intended use), and <b>Spaces</b> (live browser demos — no setup, just open and try any model in seconds).</p>" +
        "<p>Almost every tool in this section connects to Hugging Face for downloads. Getting comfortable browsing it is one of the highest-value beginner skills.</p>",
      analogy:
        "<p>Think of an app store crossed with a library. You browse, read the description (model card), check the reviews and licence, and download the one that fits — except everything is open AI models and datasets instead of phone apps.</p>",
      mentalModel:
        "Hugging Face = the shared hub for open models, datasets, and demos. Read the model card before you download; most tools pull from here.",
      mistakes: [
        "Downloading a model without reading its <b>licence</b> and intended use. Not all open models allow every use.",
        "Ignoring model cards, then being surprised by a model's size, language, or limitations.",
        "Grabbing the largest model when a smaller one on the same page would fit your hardware.",
      ],
      exercise: {
        goal: "Practice reading a model card.",
        steps: [
          "Go to Hugging Face and open a popular open model's page.",
          "Find its size (parameters), licence, and intended use on the model card.",
          "Check if quantized (GGUF) versions are linked.",
          "Write 3 lines: could you run it, are you allowed to, and is it right for a beginner task?",
        ],
        stretch: "Open a dataset page too and inspect a few rows in its data viewer to see real training data structure.",
      },
      quiz: [
        {
          q: "What is Hugging Face?",
          options: ["A single chatbot", "A central hub for sharing open models, datasets, and demos", "A GPU brand", "A quantization format"],
          answer: 1,
          why: "It's the open AI community's hub for models, datasets, and tools.",
        },
        {
          q: "What should you check before downloading a model from it?",
          options: ["Its colour", "Its model card — size, licence, and intended use", "The weather", "Nothing"],
          answer: 1,
          why: "Model cards reveal size, licence, and limitations so you pick something you can and may use.",
        },
      ],
    },

    {
      id: "unsloth",
      title: "Unsloth",
      time: 4,
      tagline: "Fine-tuning made faster and lighter for beginners.",
      lesson:
        "<p><span class='term'>Unsloth</span> is a tool that makes <b>fine-tuning open models much faster and more memory-efficient</b> — often around twice as fast while using less VRAM. It's a favourite for people fine-tuning on limited hardware, like a single free cloud GPU.</p>" +
        "<p>It specialises in the LoRA/QLoRA approach you learned, with friendly, ready-to-run notebooks. You bring your formatted dataset, pick a base model, run the cells, and get a LoRA adapter out — without wrestling with low-level setup.</p>" +
        "<p>Its appeal is the combination of <b>speed, low memory, and approachability</b>. For a beginner who wants to actually fine-tune something this week (not just read about it), Unsloth is one of the smoothest paths.</p>" +
        "<p>Pair it with what you know: clean, well-formatted data + QLoRA + Unsloth = a realistic first fine-tune on modest hardware.</p>",
      analogy:
        "<p>It's like a turbocharger with training wheels: it makes the fine-tuning process go faster and use less fuel, while also being beginner-friendly to handle. You get more done with less hardware and less hassle.</p>",
      mentalModel:
        "Unsloth = fast, low-memory, beginner-friendly LoRA/QLoRA fine-tuning. The smoothest way to get your first real fine-tune done on modest hardware.",
      mistakes: [
        "Expecting it to fix bad data. It speeds up training, but garbage data still gives garbage results.",
        "Thinking it's a serving tool. It's for <b>fine-tuning</b>; you serve the result elsewhere.",
        "Skipping the data-formatting step — Unsloth still needs your examples in the right shape.",
      ],
      exercise: {
        goal: "Plan a realistic first fine-tune.",
        steps: [
          "Pick a small base model and a tiny task (e.g. answer in a specific friendly style).",
          "Sketch ~30 formatted examples (you don't have to write them all yet).",
          "Find an Unsloth starter notebook for QLoRA fine-tuning.",
          "List the 4 things you'd plug in: base model, dataset, method (QLoRA), and where to save the adapter.",
        ],
        stretch: "Run an Unsloth notebook end-to-end on a free cloud GPU with a sample dataset to feel the full loop once.",
      },
      quiz: [
        {
          q: "What does Unsloth help you do?",
          options: ["Serve models to millions", "Fine-tune open models faster and with less memory", "Draw images", "Browse datasets"],
          answer: 1,
          why: "Unsloth speeds up and lightens LoRA/QLoRA fine-tuning, great for limited hardware.",
        },
        {
          q: "What does Unsloth NOT fix?",
          options: ["Training speed", "Bad or poorly-formatted data", "Memory use", "Ease of setup"],
          answer: 1,
          why: "Faster training can't rescue low-quality or wrongly-formatted data — quality still rules.",
        },
      ],
    },

    {
      id: "axolotl",
      title: "Axolotl",
      time: 4,
      tagline: "Fine-tuning driven by a simple config file.",
      lesson:
        "<p><span class='term'>Axolotl</span> is another popular fine-tuning tool, known for being <b>configuration-driven</b>. Instead of writing lots of code, you fill out a settings file (a YAML config) describing your model, dataset, and method — then run it.</p>" +
        "<p>This makes experiments tidy and repeatable: change a few lines in the config to try a different base model, dataset, or LoRA setting, and re-run. It supports many models and techniques (full fine-tune, LoRA, QLoRA, preference methods) under one consistent interface.</p>" +
        "<p>Where Unsloth leans toward speed and beginner notebooks, Axolotl leans toward <b>flexibility and reproducibility</b> for people running many or more serious fine-tuning jobs. Both are widely used; many practitioners know both.</p>" +
        "<p>The takeaway: Axolotl turns fine-tuning into “edit a recipe file and press go,” which scales nicely as your experiments grow.</p>",
      analogy:
        "<p>It's like a bread machine with a recipe card. You don't knead by hand — you set the dial (the config) for the loaf you want and press start. Want a different loaf next time? Change the card, not the whole process.</p>",
      mentalModel:
        "Axolotl = config-file fine-tuning. Describe model + data + method in YAML, press go. Flexible and reproducible for serious or repeated experiments.",
      mistakes: [
        "A tiny config typo can break a run. Treat the settings file carefully.",
        "Assuming it's harder than it is — the config approach is actually very learnable.",
        "Forcing a choice between Axolotl and Unsloth. They overlap; pick by your need (notebook ease vs config control).",
      ],
      exercise: {
        goal: "Read a fine-tuning config like a recipe.",
        steps: [
          "Find an example Axolotl YAML config online.",
          "Identify the lines for: base model, dataset, and fine-tuning method.",
          "Change (on paper) one setting to switch from LoRA to QLoRA.",
          "Note why a config file makes experiments easy to repeat.",
        ],
        stretch: "Compare an Axolotl config to an Unsloth notebook and write one sentence on when you'd prefer each.",
      },
      quiz: [
        {
          q: "What's Axolotl's defining style?",
          options: ["No setup at all", "Configuration-driven fine-tuning via a settings (YAML) file", "Image generation", "Serving at scale"],
          answer: 1,
          why: "You describe your run in a config file and execute it, making experiments tidy and repeatable.",
        },
        {
          q: "What does the config approach make easier?",
          options: ["Drawing graphics", "Repeating and tweaking experiments by editing a few lines", "Browsing the web", "Reducing token cost"],
          answer: 1,
          why: "Changing a few config lines re-runs a new experiment, aiding reproducibility.",
        },
      ],
    },

    {
      id: "peft",
      title: "PEFT",
      time: 4,
      tagline: "The library that makes adapter tuning easy in code.",
      lesson:
        "<p><span class='term'>PEFT</span> is both an idea and a software library from Hugging Face. As an idea, it means <b>Parameter-Efficient Fine-Tuning</b> — fine-tuning by training as few parameters as possible (which is exactly what LoRA does).</p>" +
        "<p>As a library, PEFT gives you ready-made code to apply these methods: wrap a base model, attach a LoRA adapter, train only the small bits, and save the tiny result. It's the practical glue many other tools (including Unsloth and Axolotl) build on or interoperate with.</p>" +
        "<p>You'll see PEFT mentioned constantly because it standardised how adapters work in the open ecosystem. Learn LoRA conceptually, and PEFT is simply how you do it in real code with minimal fuss.</p>" +
        "<p>Connection check: LoRA = the method, adapters = the small modules, PEFT = the umbrella idea + the library that implements it.</p>",
      analogy:
        "<p>If LoRA is the technique of adding small swappable tool-bits, PEFT is the standard toolkit and instructions that make attaching those bits quick and consistent for everyone. Less reinventing, more building.</p>",
      mentalModel:
        "PEFT = the umbrella term (train few parameters) and the Hugging Face library that implements LoRA-style adapters in code. The standard glue for efficient fine-tuning.",
      mistakes: [
        "Thinking PEFT and LoRA are rivals. LoRA is one method <i>within</i> PEFT.",
        "Reimplementing adapters from scratch when PEFT already provides them cleanly.",
        "Forgetting the saved result is a small adapter tied to a specific base model.",
      ],
      exercise: {
        goal: "Connect the vocabulary into one map.",
        steps: [
          "On paper, write four boxes: PEFT, LoRA, adapter, base model.",
          "Draw arrows showing how they relate (PEFT contains LoRA; LoRA produces an adapter; adapter attaches to base).",
          "Find the Hugging Face PEFT library page and note one supported method besides LoRA.",
          "Explain the whole map to yourself in three sentences.",
        ],
        stretch: "Skim a minimal PEFT code example and find the few lines that turn a normal model into a LoRA-trainable one.",
      },
      quiz: [
        {
          q: "What does PEFT stand for, and what is it?",
          options: ["A GPU brand", "Parameter-Efficient Fine-Tuning — an idea and a library for adapter-based tuning", "A dataset", "A quantization format"],
          answer: 1,
          why: "PEFT is the umbrella concept plus a Hugging Face library implementing LoRA-style methods.",
        },
        {
          q: "How do LoRA and PEFT relate?",
          options: ["They compete", "LoRA is one method within the PEFT family/library", "They're unrelated", "PEFT replaced LoRA"],
          answer: 1,
          why: "LoRA is a specific parameter-efficient method that PEFT provides.",
        },
      ],
    },

    {
      id: "trl",
      title: "TRL library",
      time: 4,
      tagline: "The toolkit for the training steps after pretraining.",
      lesson:
        "<p><span class='term'>TRL</span> stands for <b>Transformer Reinforcement Learning</b>, a Hugging Face library that provides ready-made code for the <b>post-training</b> steps: supervised fine-tuning (SFT), preference tuning (DPO), and the more complex RLHF.</p>" +
        "<p>Where PEFT handles the “train few parameters” part, TRL handles the “what training procedure to run” part. It offers clean trainers — an SFT trainer, a DPO trainer, and more — so you don't have to build these training loops yourself.</p>" +
        "<p>In practice, the pieces fit together: load a model and data (transformers + datasets), make it efficient (PEFT/LoRA), and run the right training procedure (TRL's SFT or DPO trainer). Tools like Axolotl and Unsloth wire these together for you.</p>" +
        "<p>You don't need to memorise the code. Just recognise the roles: TRL is where SFT, DPO, and RLHF live as usable trainers.</p>",
      analogy:
        "<p>If building a fine-tuned model is assembling furniture, TRL hands you the pre-made trainers (SFT, DPO) like ready-cut panels and the right screws. You still assemble, but you're not milling the wood yourself.</p>",
      mentalModel:
        "TRL = ready-made trainers for post-training: SFT, DPO, RLHF. PEFT makes it efficient; TRL runs the procedure. The two combine in tools you'll use.",
      mistakes: [
        "Confusing TRL (training procedures: SFT/DPO/RLHF) with PEFT (efficiency: LoRA). They do different jobs and pair up.",
        "Thinking you must use TRL directly. Higher-level tools often call it for you.",
        "Forgetting your data must match the trainer (preference pairs for DPO, instruction pairs for SFT).",
      ],
      exercise: {
        goal: "Assemble the full fine-tuning stack in your head.",
        steps: [
          "List the roles: load (transformers + datasets), efficient (PEFT/LoRA), procedure (TRL: SFT/DPO).",
          "Map each earlier topic to its box (e.g. preference data → DPO trainer).",
          "Pick a goal (polish a model's tone) and choose which TRL trainer fits.",
          "Write the stack as one sentence from data to saved adapter.",
        ],
        stretch: "Find TRL's docs and locate the SFT trainer and DPO trainer pages. Match each to data you learned to prepare.",
      },
      quiz: [
        {
          q: "What does the TRL library provide?",
          options: ["Image filters", "Ready-made trainers for SFT, DPO, and RLHF post-training steps", "A GPU", "A chat UI"],
          answer: 1,
          why: "TRL offers usable trainers for the post-pretraining procedures like SFT and DPO.",
        },
        {
          q: "How do PEFT and TRL work together?",
          options: ["They don't", "PEFT makes training efficient (LoRA); TRL runs the procedure (SFT/DPO)", "They both serve models", "They both clean data"],
          answer: 1,
          why: "PEFT handles parameter efficiency; TRL handles the training procedure — they combine.",
        },
      ],
    },

  ],
});
