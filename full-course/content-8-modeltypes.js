/* Part 8: Model Types */
window.COURSE.push({
  id: "modeltypes",
  title: "Model Types",
  blurb: "Different shapes of model for different jobs.",
  topics: [

    {
      id: "vlms",
      title: "VLMs",
      time: 5,
      tagline: "Models that can see images, not just read text.",
      lesson:
        "<p><span class='term'>VLM</span> stands for <b>Vision-Language Model</b>. It's a model that understands <b>both images and text together</b>. You can show it a photo and ask questions about it: “What's in this picture?”, “Read this receipt,” “Is this chart going up?”</p>" +
        "<p>Under the hood, the image is turned into a form the language model can work with (a kind of visual embedding), so the model can reason about pictures and words in the same conversation. The text part still works exactly as you've learned.</p>" +
        "<p>VLMs power a huge range of practical things: describing images for accessibility, reading documents and screenshots, answering questions about diagrams, and helping browser/computer agents “see” a screen.</p>" +
        "<p>They share the usual cautions: they can misread images and hallucinate details just like text models can make up facts. Treat their visual readings as smart guesses to verify, not certainties.</p>",
      analogy:
        "<p>A text-only model is a brilliant pen-pal who can only read your letters. A VLM is a pen-pal you can also send photos to; now they can comment on your holiday snaps or read a menu you photographed. Same conversation, new sense added.</p>",
      mentalModel:
        "VLM = a language model with eyes. It takes images + text and reasons about both. Still fallible; verify its visual readings like any other output.",
      mistakes: [
        "Trusting a VLM's reading of fine detail (small text, exact numbers) without checking. It can misread.",
        "Assuming all models accept images. Only vision-capable ones do; check the model card.",
        "Forgetting images cost tokens too, often a lot, affecting context and price.",
      ],
      exercise: {
        goal: "Probe a VLM's strengths and limits.",
        steps: [
          "Use a vision-capable chatbot and upload a clear photo; ask it to describe the scene.",
          "Now upload an image with small text or a busy chart and ask specific questions.",
          "Note where it nailed it and where it misread.",
          "Write one rule for yourself about when to double-check a VLM.",
        ],
        stretch: "Photograph a simple handwritten note and test how reliably the VLM transcribes it.",
      },
      quiz: [
        {
          q: "What is a VLM?",
          options: ["A very large memory", "A Vision-Language Model that understands images and text together", "A voice model", "A vector library"],
          answer: 1,
          why: "VLMs combine vision and language, letting you ask about images in a text conversation.",
        },
        {
          q: "What caution applies to VLMs?",
          options: ["They hallucinate text but are reliably accurate when reading information from images", "They can misread visual detail and hallucinate, so verify", "They can describe images but cannot answer questions that require reasoning about them", "They consume fewer tokens than text-only models because images compress naturally"],
          answer: 1,
          why: "Like text models, VLMs can be confidently wrong, especially on fine visual detail.",
        },
      ],
    },

    {
      id: "slms",
      title: "SLMs",
      time: 4,
      tagline: "Small models that punch above their weight.",
      lesson:
        "<p><span class='term'>SLM</span> means <b>Small Language Model</b>: a model with far fewer parameters than the giants (think a few billion or less). Recently these have become surprisingly capable, and they're a big deal for practical AI.</p>" +
        "<p>Why care about small? They <b>run on modest hardware</b> (laptops, phones, cheap servers), respond <b>fast</b>, cost <b>little</b>, and keep data <b>local and private</b>. For many real tasks (classification, summarising, simple Q&A, on-device features) a well-chosen SLM is plenty.</p>" +
        "<p>The trade-off is the one you already know: smaller usually means less capable at the hardest, most open-ended reasoning. But for a <i>focused</i> task, especially after fine-tuning, an SLM can match or beat a giant, far cheaper and faster.</p>" +
        "<p>A maturing instinct: don't reach for the biggest model by default. Ask whether a small, fast, cheap one does the job. Often it does.</p>",
      analogy:
        "<p>You don't drive a transport truck to buy groceries. A small car is faster, cheaper, and fits your driveway. SLMs are the small car: not for every load, but perfect for the everyday trips that make up most of life.</p>",
      mentalModel:
        "SLM = small, fast, cheap, local-friendly model. Great for focused tasks (especially fine-tuned). Don't default to giants; small often wins on practicality.",
      mistakes: [
        "Reaching for a giant model out of habit when an SLM would be cheaper and fast enough.",
        "Expecting an SLM to ace the hardest open-ended reasoning. Match the model to task difficulty.",
        "Overlooking fine-tuning, which can make a small model excellent at one specific job.",
      ],
      exercise: {
        goal: "Find an SLM that fits your machine.",
        steps: [
          "List 3 simple tasks you'd want done locally (summaries, tidy notes, classify messages).",
          "On Hugging Face, find a small model (e.g. 1–3B) suited to them.",
          "Check its size against your hardware. Could it run via Ollama?",
          "Decide which of your tasks truly need a bigger model, if any.",
        ],
        stretch: "Run a small model in Ollama and a task on it. Judge whether the speed and quality fit real use.",
      },
      quiz: [
        {
          q: "What's a main advantage of SLMs?",
          options: ["Higher accuracy on complex tasks because focused training prevents overfitting", "Fast, cheap, run on modest hardware, and keep data local", "No need for a system prompt since small models follow simple instructions reliably", "Better long-context handling because fewer parameters means less attention overhead"],
          answer: 1,
          why: "Small models are practical: low cost, high speed, local/private, and often good enough.",
        },
        {
          q: "When might an SLM match a much larger model?",
          options: ["Very rarely: larger models nearly always produce better output on every task type", "On a focused task, especially after fine-tuning", "On tasks that require reasoning, since small models can't do chain-of-thought", "Only when serving many concurrent users where throughput matters more than quality"],
          answer: 1,
          why: "For a narrow, well-defined task, a fine-tuned small model can rival far larger ones.",
        },
      ],
    },

    {
      id: "dense-models",
      title: "Dense models",
      time: 4,
      tagline: "The standard design: every part works on every token.",
      lesson:
        "<p>A <span class='term'>dense model</span> is the traditional, standard kind of LLM: <b>every parameter is used for every token</b> it processes. When you run it, the whole model “fires” for each word: all of it, all the time.</p>" +
        "<p>This is simple and effective. The downside is cost: a 70B dense model uses all 70 billion parameters on every single token, so bigger dense models get expensive and slow in direct proportion to their size.</p>" +
        "<p>Most models you've met are dense. The reason this topic exists is to contrast it with the next one, <b>MoE</b> (Mixture of Experts), which cleverly avoids using the whole model every time. Knowing “dense” gives you the baseline to appreciate that trick.</p>" +
        "<p>So: dense = the whole brain works on everything. Reliable and straightforward, but you pay for all of it on every token.</p>",
      analogy:
        "<p>Imagine a company where <i>every</i> employee attends <i>every</i> meeting about <i>every</i> topic. Thorough, but slow and expensive; you're paying everyone's time for tasks most of them aren't needed for. That's a dense model.</p>",
      mentalModel:
        "Dense model = all parameters used for every token. Simple and solid, but cost and speed scale fully with size. The baseline that MoE improves on.",
      mistakes: [
        "Assuming all big models are equally costly per token. Dense ones are, but MoE changes that.",
        "Thinking “dense” is a flaw. It's the reliable standard; it's just not the most efficient at huge scale.",
        "Confusing model size (parameters) with how much is used per token. For dense, they're the same.",
      ],
      exercise: {
        goal: "Set up the dense-vs-MoE contrast.",
        steps: [
          "Write one sentence defining a dense model.",
          "Note its cost rule: all parameters used per token.",
          "Predict what a more efficient design might do differently (then check next topic).",
          "Pick a model you use and guess whether it's dense or MoE.",
        ],
        stretch: "Read a model card that states its architecture and confirm whether it's dense or mixture-of-experts.",
      },
      quiz: [
        {
          q: "What defines a dense model?",
          options: ["It uses only a selected subset of its parameters for each token it processes", "Every parameter is used for every token", "It activates different layers depending on the difficulty of the current token", "It routes tokens to specialised sub-networks based on their semantic category"],
          answer: 1,
          why: "In a dense model the whole network activates for each token processed.",
        },
        {
          q: "What's the downside of dense models at large size?",
          options: ["They plateau in quality early: scaling parameters beyond 7B brings diminishing returns", "Cost and speed scale with full size since all parameters fire each token", "They require more fine-tuning data than sparse models to reach the same quality", "They cannot take advantage of batching because each token activates different paths"],
          answer: 1,
          why: "Using every parameter per token makes big dense models proportionally expensive and slow.",
        },
      ],
    },

    {
      id: "moe-models",
      title: "MoE models",
      time: 5,
      tagline: "Big model, but only a slice works on each token.",
      lesson:
        "<p><span class='term'>MoE</span> stands for <b>Mixture of Experts</b>. The model is split into many sub-networks called “experts,” and for each token, a little router picks just a <b>few experts</b> to use, not the whole model. So the model can be huge in total, yet only a fraction runs per token.</p>" +
        "<p>The payoff: you get the knowledge capacity of a very large model with the running cost closer to a much smaller one, because most experts sit idle on any given token. It's a clever way to scale up capability without scaling up cost as steeply.</p>" +
        "<p>You'll see specs like “total parameters” (the whole model) versus “active parameters” (what's actually used per token). A model might be huge in total but only activate a small slice; that active number drives speed.</p>" +
        "<p>The catch: MoE models still need enough memory to <b>hold all</b> the experts (so VRAM needs stay high), and routing adds complexity. But for getting more capability per unit of compute, MoE is a leading approach.</p>",
      analogy:
        "<p>Back to the company: instead of everyone attending every meeting, a smart receptionist (the router) sends each question only to the 2–3 right specialists. The company is still large and knowledgeable, but each task only “pays” for the few experts it needs.</p>",
      mentalModel:
        "MoE = many experts, a router picks a few per token. Huge total capacity, low active cost per token. Still needs memory for all experts; routing adds complexity.",
      mistakes: [
        "Confusing total vs active parameters. Active drives speed/cost; total drives memory needs.",
        "Assuming MoE is cheap to host. You still load all experts, so VRAM stays high.",
        "Thinking MoE always beats dense. It's a trade-off: great compute efficiency, more complexity.",
      ],
      exercise: {
        goal: "Read MoE specs correctly.",
        steps: [
          "Find a model described as MoE and note its total and active parameter counts.",
          "Explain which number affects per-token speed and which affects memory.",
          "Compare it to a dense model of similar capability on cost-per-token.",
          "Write one sentence on the main trade-off MoE makes.",
        ],
        stretch: "Look up the role of the “router” in an MoE model and note how it decides which experts handle a token.",
      },
      quiz: [
        {
          q: "How does an MoE model work?",
          options: ["The full model activates for every token, but in fewer layers than a dense equivalent", "A router picks a few experts per token, so only a slice runs", "Each expert independently generates a candidate token and the best answer is selected", "The router trains separately first, then the experts are attached and frozen"],
          answer: 1,
          why: "MoE activates a small subset of experts per token, giving capacity without full per-token cost.",
        },
        {
          q: "Which number drives an MoE model's memory needs?",
          options: ["Active parameters", "Total parameters (all experts must be held in memory)", "Token count", "Context window"],
          answer: 1,
          why: "All experts must be loaded, so total parameters set memory needs even if only a few are active.",
        },
      ],
    },

    {
      id: "coding-models",
      title: "Coding models",
      time: 4,
      tagline: "Models tuned to read and write software.",
      lesson:
        "<p><span class='term'>Coding models</span> are LLMs specialised for <b>programming</b>: writing code, explaining it, finding bugs, and translating between languages. They're trained with extra emphasis on code and often on the structure of real software projects.</p>" +
        "<p>What makes them better at code: heavy training on source code, awareness of syntax and common patterns, larger context windows (to fit whole files), and sometimes “fill-in-the-middle” skills for autocompleting inside existing code, not just at the end.</p>" +
        "<p>They power coding assistants and autocomplete in editors. A great fit for the latency-vs-quality lesson: editor autocomplete needs a fast, often smaller coding model; a deep refactor can justify a slower, stronger one.</p>" +
        "<p>Same caution as ever: they can write confident, plausible-looking code that's subtly wrong. Always read, test, and review AI-written code; treat it as a fast junior developer, not an infallible one.</p>",
      analogy:
        "<p>It's the difference between a smart generalist and a trained programmer. Both speak English, but the programmer knows the languages, conventions, and gotchas of code. A coding model is that specialist, though it still needs its work reviewed.</p>",
      mentalModel:
        "Coding model = an LLM specialised for software. Great at drafting and explaining code, fast for autocomplete, but verify everything; it can be confidently wrong.",
      mistakes: [
        "Running AI-written code without reading or testing it. Plausible isn't correct.",
        "Using a heavyweight model for instant autocomplete where a fast one fits better.",
        "Expecting it to know your whole codebase. Give it the relevant context (or use RAG over your code).",
      ],
      exercise: {
        goal: "Stress-test a coding model safely.",
        steps: [
          "Ask a coding model for a small function to do a simple task.",
          "Read it line by line. Do you understand each part?",
          "Find or imagine one input that might break it.",
          "Ask the model to add error handling, then review whether it actually helped.",
        ],
        stretch: "Give it a buggy snippet and ask it to find the bug. Verify its diagnosis yourself before trusting it.",
      },
      quiz: [
        {
          q: "What are coding models specialised for?",
          options: ["Answering general knowledge questions using real-time web access", "Writing, explaining, and debugging software", "Generating and editing images based on natural language instructions", "Benchmarking hardware performance across different software environments"],
          answer: 1,
          why: "They're trained with heavy emphasis on code to assist with programming tasks.",
        },
        {
          q: "What's the key caution with AI-written code?",
          options: ["Coding-specific models are fine-tuned for safety and produce correct code by default", "It can look right but be subtly wrong: read, test, and review it", "It writes correct logic but often uses deprecated syntax needing a quick update", "It generates working code but always omits error handling, which you must add manually"],
          answer: 1,
          why: "Like all model output, code can be confidently incorrect; verification is essential.",
        },
      ],
    },

    {
      id: "reasoning-models",
      title: "Reasoning models",
      time: 5,
      tagline: "Models that think before they answer.",
      lesson:
        "<p><span class='term'>Reasoning models</span> are built to <b>work through problems step by step</b> before giving a final answer, rather than blurting the first thing. They're especially good at math, logic, planning, and multi-step problems.</p>" +
        "<p>The core idea: they spend extra effort “thinking”, generating a chain of intermediate reasoning (sometimes hidden from you), which often leads to more accurate answers on hard tasks. This is sometimes called “test-time compute”: using more computation at answer time to reason harder. Well-known examples include <b>o1</b> and <b>o3-mini</b> from OpenAI, <b>DeepSeek-R1</b> from DeepSeek, and Alibaba's <b>QwQ</b>.</p>" +
        "<p>The trade-off is direct: reasoning takes more time and costs more tokens. For a simple question, it's overkill and slow. For a tricky logic puzzle or a careful plan, the extra thinking genuinely pays off in correctness.</p>" +
        "<p>So choose by task: quick, simple, or creative requests don't need a reasoning model; hard, multi-step, correctness-critical ones do. It's the latency-vs-quality trade-off again, in a new outfit.</p>",
      analogy:
        "<p>It's the difference between answering “what's 7×8?” instantly and being handed a logic puzzle where you grab scratch paper and work it out. The scratch-paper approach is slower but gets hard problems right. Reasoning models reach for scratch paper.</p>",
      mentalModel:
        "Reasoning model = thinks step by step (extra compute at answer time) for better accuracy on hard problems. Slower and pricier; use it where correctness matters, not for everything.",
      mistakes: [
        "Using a reasoning model for simple or creative tasks. Slower and costlier with no benefit.",
        "Assuming step-by-step thinking guarantees correctness. It helps, but errors still happen; verify.",
        "Ignoring the cost/latency hit. The extra “thinking” is real compute you pay for.",
      ],
      exercise: {
        goal: "Match task to thinking style.",
        steps: [
          "List 4 tasks: a quick fact, a haiku, a logic puzzle, a multi-step plan.",
          "Mark which would benefit from step-by-step reasoning and which wouldn't.",
          "For one simple task, note why a reasoning model is overkill.",
          "For one hard task, predict how thinking aloud could improve the answer.",
        ],
        stretch: "Give a hard puzzle to a normal model and a reasoning model (or ask the normal one to “think step by step”) and compare accuracy.",
      },
      quiz: [
        {
          q: "What defines a reasoning model?",
          options: ["It samples more candidate answers and picks the best one using a trained ranker", "It works step by step before answering, using extra compute for accuracy", "It uses a larger context window so it can reference more of the conversation history", "It trains for longer than standard models, giving it more practice on hard problems"],
          answer: 1,
          why: "Reasoning models spend more effort thinking through problems, helping on hard, multi-step tasks.",
        },
        {
          q: "When is a reasoning model NOT worth it?",
          options: ["Hard logic puzzles", "Simple or creative tasks where the extra time and cost add no benefit", "Multi-step planning", "Math proofs"],
          answer: 1,
          why: "For easy or creative requests, the slower, pricier reasoning brings no real gain.",
        },
      ],
    },

  ],
});
