/* Part 3: Fine-Tuning */
window.COURSE.push({
  id: "finetuning",
  title: "Fine-Tuning Techniques",
  blurb: "The practical toolkit for customising models affordably.",
  topics: [

    {
      id: "lora",
      title: "LoRA",
      time: 5,
      tagline: "Fine-tune a giant model by training a tiny add-on.",
      lesson:
        "<p>Fully fine-tuning a big model means adjusting <b>all</b> its billions of parameters: slow, and it needs huge, expensive hardware. <span class='term'>LoRA</span> (Low-Rank Adaptation) is a clever shortcut that makes fine-tuning affordable.</p>" +
        "<p>The idea: <b>freeze the original model</b> completely, and train only a small set of <b>new, extra parameters</b> bolted on the side. These add-ons are tiny (often less than 1% the size of the full model), yet they can steer its behaviour surprisingly well.</p>" +
        "<p>Because you're training so few parameters, LoRA needs far less memory, runs faster, and produces a small file (the “LoRA adapter”) you can save and share. You can even keep several adapters for different tasks and swap them onto the same base model.</p>" +
        "<p>The main setting to tune is the <b>rank</b> (written as <code>r</code>). Rank 16 or 32 is a safe starting point. A matching <b>alpha</b> setting scales how strongly the adapter steers the model; setting alpha equal to rank is a sensible default.</p>" +
        "<p>LoRA is the default starting point for most people fine-tuning open models today. It gives you most of the benefit for a fraction of the cost.</p>",
      analogy:
        "<p>Instead of repainting an entire house to change its look, you add removable coloured filters over the windows. The house (base model) is untouched; the small filters (LoRA adapter) change how everything looks, and you can swap them anytime.</p>",
      mentalModel:
        "LoRA = freeze the big model, train a tiny add-on. Small file, cheap, swappable. Most of the benefit for a sliver of the cost.",
      mistakes: [
        "Thinking LoRA changes the base model. It doesn't; it's a separate add-on layered on top at runtime.",
        "Expecting full-fine-tune results for every task. LoRA is excellent but occasionally a full tune wins on the hardest cases.",
        "Losing track of which base model an adapter belongs to. An adapter only works with its matching base.",
      ],
      exercise: {
        goal: "Understand adapters without training anything yet.",
        steps: [
          "On Hugging Face, search “LoRA adapter” and open a couple of adapter repos.",
          "Note their file size versus the base model's size. See how tiny adapters are.",
          "Read which base model each adapter requires.",
          "Write one sentence on why a small file can still change behaviour a lot.",
        ],
        stretch: "Later, with a tool like Unsloth, fine-tune a small model with LoRA on ~50 examples and feel how little hardware it needs.",
      },
      quiz: [
        {
          q: "What does LoRA actually train?",
          options: ["All layers of the base model, with a lower learning rate", "A small set of new add-on parameters, while the base stays frozen", "Only the final few layers closest to the output", "The embedding layer and the output classification head"],
          answer: 1,
          why: "LoRA freezes the original model and trains a tiny adapter, saving memory and cost.",
        },
        {
          q: "Why is LoRA so popular?",
          options: ["It matches full fine-tuning quality for the same compute cost", "Cheap, fast, small files, and swappable adapters on one base", "It permanently improves the base model's weights after training", "It removes the need for GPUs by offloading training to the cloud"],
          answer: 1,
          why: "Training few parameters means low cost and memory, plus portable, swappable adapters.",
        },
      ],
    },

    {
      id: "qlora",
      title: "QLoRA",
      time: 5,
      tagline: "LoRA, but shrunk enough to fit on a normal GPU.",
      lesson:
        "<p><span class='term'>QLoRA</span> is LoRA with one extra trick: the <b>Q stands for Quantized</b>. Before training the LoRA add-on, it compresses the frozen base model down to use far less memory (you'll learn quantization properly two topics from now).</p>" +
        "<p>Why it matters: LoRA already cut the cost a lot, but you still had to <i>load</i> the full-size base model into memory. QLoRA squeezes that base model down (often to 25–50% of its full-precision memory footprint) so you can fine-tune big models on a single consumer GPU, even a free cloud one.</p>" +
        "<p>The remarkable part is how little quality you lose. QLoRA made it possible for hobbyists and small teams to fine-tune models that previously needed a data centre. It democratised fine-tuning.</p>" +
        "<p>Rule of thumb: if you're fine-tuning an open model on limited hardware, QLoRA is very likely your method. In practice, most people apply it through a tool like <b>Unsloth</b>, which handles the setup automatically.</p>",
      analogy:
        "<p>Imagine wanting to study a giant reference book but your desk is tiny. QLoRA prints the book on lightweight thin paper so it fits on your small desk, while you scribble your notes (the LoRA part) in the margins. Same content, far less space.</p>",
      mentalModel:
        "QLoRA = compress the frozen base model so it fits in little memory, then train a LoRA add-on. Fine-tune big models on small hardware.",
      mistakes: [
        "Confusing QLoRA with quantizing your final model for deployment. Here, quantization is a memory trick <b>during training</b>.",
        "Assuming zero quality loss. It's small, but for the most demanding tasks it can matter slightly.",
        "Forgetting you still produce a LoRA adapter at the end, the same swappable add-on as plain LoRA.",
      ],
      exercise: {
        goal: "Estimate whether your hardware could fine-tune a given model.",
        steps: [
          "Pick a model size you'd like to fine-tune (e.g. 7B or 8B).",
          "Search “QLoRA VRAM requirements” for that size and note the rough number.",
          "Compare it to a free cloud GPU's memory (search the specs of a common free tier).",
          "Decide: feasible with QLoRA or not? Write your reasoning in one line.",
        ],
        stretch: "Find a beginner QLoRA tutorial notebook and read its setup cell to see how few lines turn LoRA into QLoRA.",
      },
      quiz: [
        {
          q: "What does the Q in QLoRA add?",
          options: ["Pruning: removing underused weights to shrink the model's size", "Quantization: compressing the frozen base model to save memory", "Query-based retrieval: pulling relevant facts from a database", "Quantified quality scores for measuring fine-tuning progress"],
          answer: 1,
          why: "QLoRA quantizes the base model so big models fit in far less memory during fine-tuning.",
        },
        {
          q: "Why was QLoRA a big deal?",
          options: ["It made fine-tuning more deterministic and reproducible across hardware", "It let small teams fine-tune large models on a single consumer GPU", "It reduced fine-tuning time by running adapters in parallel", "It extended LoRA to work with vision and multimodal models"],
          answer: 1,
          why: "By shrinking memory needs with little quality loss, it democratised fine-tuning of large models.",
        },
      ],
    },

    {
      id: "dpo",
      title: "DPO",
      time: 5,
      tagline: "Teaching preferences directly, the simple way.",
      lesson:
        "<p><span class='term'>DPO</span> stands for <b>Direct Preference Optimization</b>. It's a way to take those preference datasets (chosen vs rejected answers) and train the model to <b>prefer the better answers</b>, directly and simply.</p>" +
        "<p>Before DPO, the standard approach (RLHF, next topic) was powerful but complicated, involving an extra “reward model” and a fiddly reinforcement-learning loop. DPO achieves a similar goal with a much simpler recipe: just show the chosen and rejected pairs and adjust the model to lean toward “chosen.”</p>" +
        "<p>Because it's simpler and more stable, DPO has become a popular default for the “polish” stage: making a model more helpful, more aligned with what people want, and better-mannered, without the headaches of full RLHF. Newer variants like <b>GRPO</b> (Group Relative Policy Optimization) and SimPO have since emerged, and are now the preferred approach for training reasoning models.</p>" +
        "<p>Mentally, file DPO next to LoRA/QLoRA: a practical, accessible technique that brought something once reserved for big labs within reach of normal teams.</p>",
      analogy:
        "<p>Old way (RLHF): hire a separate judge, train the judge, then coach the student against the judge's scores, with many moving parts. DPO: just show the student thousands of “this answer beats that answer” comparisons and let them adjust directly. Fewer steps, similar result.</p>",
      mentalModel:
        "DPO = learn from chosen-vs-rejected pairs directly, no separate reward model. A simpler, stabler path to the same polish RLHF aims for.",
      mistakes: [
        "Thinking DPO needs the complex reward-model setup of RLHF. Its whole point is skipping that.",
        "Using low-quality or inconsistent preference pairs. DPO faithfully learns whatever “better” you encoded.",
        "Expecting DPO to add knowledge. Like other preference methods, it shapes <b>behaviour</b>, not facts.",
      ],
      exercise: {
        goal: "Prepare data the way DPO consumes it.",
        steps: [
          "Reuse the preference pairs you made earlier (prompt, chosen, rejected).",
          "Make sure each row clearly marks which answer is chosen and which is rejected.",
          "Check 3 rows: is “chosen” consistently better for the <i>same</i> reason?",
          "Write one sentence on why consistency in your judgements matters for DPO.",
        ],
        stretch: "Search “DPO dataset” on Hugging Face and inspect the column names. Match them to your prompt/chosen/rejected structure.",
      },
      quiz: [
        {
          q: "What's the main appeal of DPO over classic RLHF?",
          options: ["It produces higher quality alignment than RLHF on every benchmark", "It's simpler and more stable: no separate reward model or RL loop", "It works with unlabelled text rather than requiring preference pairs", "It permanently injects preferred behaviours into the base weights"],
          answer: 1,
          why: "DPO learns directly from preference pairs, skipping RLHF's reward model and reinforcement loop.",
        },
        {
          q: "What does DPO train on?",
          options: ["Instruction/answer pairs with human-assigned quality ratings", "Preference pairs of chosen vs rejected answers", "Unlabelled domain text the model needs to specialise in", "System prompt examples that define the model's target persona"],
          answer: 1,
          why: "It uses chosen/rejected comparisons to push the model toward preferred answers.",
        },
      ],
    },

    {
      id: "rlhf",
      title: "RLHF",
      time: 6,
      tagline: "The original recipe that made AI assistants feel helpful.",
      lesson:
        "<p><span class='term'>RLHF</span> means <b>Reinforcement Learning from Human Feedback</b>. It's the technique that famously turned capable-but-rough models into the polite, helpful assistants people loved. It has three stages.</p>" +
        "<p><b>1) Collect human preferences:</b> show people pairs of model answers and ask which is better. <b>2) Train a reward model:</b> a second model that learns to predict the score humans would give any answer. <b>3) Improve the main model:</b> using reinforcement learning, nudge it to produce answers the reward model scores highly.</p>" +
        "<p>“Reinforcement learning” here just means learning by reward signals, like training a dog with treats. Good answers earn a high reward; the model gradually does more of what earns rewards.</p>" +
        "<p>RLHF is powerful but complex and finicky to run. That complexity is exactly why simpler alternatives like DPO appeared. More recently, methods like <b>GRPO</b> (Group Relative Policy Optimization) go further, training today's reasoning models without any separate reward model at all. Still, understanding RLHF explains <i>why</i> modern assistants behave the way they do, and where their values come from.</p>",
      analogy:
        "<p>Think of training a guide dog. First you note what good behaviour looks like (human preferences). Then a trainer learns to judge it (reward model). Then you reward the dog for good behaviour over and over (reinforcement). The dog ends up reliably helpful. That's RLHF.</p>",
      mentalModel:
        "RLHF = humans rank answers → a reward model learns those rankings → the main model is rewarded for high-scoring answers. Helpful behaviour, learned via treats.",
      mistakes: [
        "Thinking RLHF teaches facts. It shapes <b>behaviour and values</b>: helpfulness, tone, safety.",
        "Underestimating its complexity. Three interacting stages make it harder and less stable than DPO.",
        "Assuming the reward model is perfect. Flaws in it get amplified; the model games whatever it's rewarded for.",
      ],
      exercise: {
        goal: "Trace the three stages on a concrete example.",
        steps: [
          "Pick a prompt, e.g. “Explain taxes to a teenager.”",
          "Stage 1: write two answers and mark which you prefer (human feedback).",
          "Stage 2: state the rule a reward model might learn from your choice (e.g. “simpler wins”).",
          "Stage 3: describe how the model would change if rewarded by that rule repeatedly.",
        ],
        stretch: "Read a short explainer on “reward hacking” and note one way a model might score high rewards while actually being unhelpful.",
      },
      quiz: [
        {
          q: "What are the three stages of RLHF?",
          options: ["Pretrain, fine-tune, then evaluate the model on alignment benchmarks", "Collect human preferences → train a reward model → improve the model via reinforcement", "Write a system prompt, run evals, then adjust the instructions iteratively", "Label examples, train an embedding model, then retrieve from a vector store"],
          answer: 1,
          why: "Human rankings train a reward model, which then guides the main model through reinforcement learning.",
        },
        {
          q: "Why did simpler methods like DPO appear?",
          options: ["RLHF required too much labelled data to be practical at scale", "RLHF is complex and finicky, so a simpler, stabler approach was desirable", "RLHF produced models that learned to game the reward model's scores", "RLHF only worked for text generation, not instruction following"],
          answer: 1,
          why: "RLHF's multi-stage reward-model + RL loop is hard to run, motivating simpler alternatives.",
        },
      ],
    },

    {
      id: "quantization",
      title: "Quantization",
      time: 5,
      tagline: "Shrinking a model by storing its numbers more roughly.",
      lesson:
        "<p>A model's parameters are numbers, and by default each is stored quite precisely (using 16 or 32 bits each). <span class='term'>Quantization</span> stores them with <b>less precision</b> (say 8 bits, or even 4) to make the model dramatically smaller and faster.</p>" +
        "<p>Picture rounding. Instead of 3.14159265, you store 3.14. You lose a little accuracy, but the number takes far less space. Do that to billions of parameters and a model that needed 16 GB might fit in 4 GB.</p>" +
        "<p>The payoff is huge: quantized models run on cheaper hardware, use less memory, and respond faster. The cost is a usually-small drop in quality. Common levels are written like <b>Q8, Q5, Q4</b>; lower numbers mean smaller and rougher.</p>" +
        "<p>That Q-notation is specific to <b>GGUF</b> files (the local inference format from llama.cpp). On Hugging Face you will also see <b>GPTQ</b> and <b>AWQ</b>, two other quantization formats, usually for GPU-based serving. They use different labels (like <code>4-bit</code> or <code>int4</code>) but mean the same idea: fewer bits, smaller file, small quality cost.</p>" +
        "<p>This is the single biggest reason you can run capable models on a laptop or phone today. Most local AI you'll run is quantized.</p>",
      analogy:
        "<p>Think of saving a photo at lower resolution to fit more on your phone. A 4K image becomes a smaller file that looks almost as good on a small screen. Quantization is lowering the “resolution” of a model's numbers to save space.</p>",
      mentalModel:
        "Quantization = rounding the model's numbers to use fewer bits. Much smaller and faster, slightly less precise. Q4/Q5/Q8 = how rough the rounding is.",
      mistakes: [
        "Going to extreme low precision (very low bits) and being surprised quality drops noticeably. Find the balance.",
        "Confusing quantization (a deployment/memory trick) with fine-tuning (changing behaviour). Different jobs.",
        "Assuming all quantized versions are equal. The method and level both affect the quality/size trade-off.",
      ],
      exercise: {
        goal: "Compare quantization levels of one model.",
        steps: [
          "On Hugging Face, find a popular model with multiple quantized versions (look for GGUF repos).",
          "List the file sizes for Q4, Q5, and Q8 versions.",
          "Note the pattern: lower number = smaller file.",
          "Decide which you'd pick for a laptop with limited memory, and why.",
        ],
        stretch: "If you can, run the same prompt on a Q4 and a Q8 version locally later, and judge whether you can feel the quality difference.",
      },
      quiz: [
        {
          q: "What does quantization do?",
          options: ["Removes underused parameters to make the model smaller and faster", "Stores the model's numbers with less precision to shrink and speed it up", "Splits the model across multiple GPUs to process inputs in parallel", "Replaces general layers with task-specific efficient alternatives"],
          answer: 1,
          why: "It rounds parameters to fewer bits, making models smaller and faster with a small quality cost.",
        },
        {
          q: "Between Q4 and Q8, which is smaller and rougher?",
          options: ["Q8", "Q4", "They're the same file size, differing only in internal format", "Q4 is larger but preserves more decimal precision"],
          answer: 1,
          why: "Lower numbers mean fewer bits: smaller files and rougher precision.",
        },
      ],
    },

    {
      id: "checkpoints",
      title: "Model checkpoints",
      time: 4,
      tagline: "Save points for a model in training.",
      lesson:
        "<p>A <span class='term'>checkpoint</span> is a <b>saved snapshot of a model's parameters</b> at a moment in time. During training, you save checkpoints regularly so you can resume, compare, or roll back.</p>" +
        "<p>Training can take hours or days. If something crashes, you don't want to start over; you reload the last checkpoint and continue. Checkpoints also let you keep the <b>best</b> version: models can actually get worse if trained too long, so you save along the way and pick the strongest.</p>" +
        "<p>When you download a model, you're essentially getting a checkpoint, a frozen set of weights someone saved and shared. The words “checkpoint,” “weights,” and “model file” are often used to mean roughly the same thing.</p>",
      analogy:
        "<p>It's exactly like saving your progress in a video game. Reach a tough boss, save. If you lose, you reload the save instead of starting from level one. Checkpoints are the model's save files.</p>",
      mentalModel:
        "A checkpoint is a save file of the model's weights. Save often during training so you can resume and keep the best version.",
      mistakes: [
        "Saving only at the very end. If it crashes, you lose everything; save periodically.",
        "Assuming the last checkpoint is the best. Later isn't always better; compare and pick.",
        "Mixing up checkpoints from different runs or base models and loading the wrong one.",
      ],
      exercise: {
        goal: "Recognise checkpoints in the wild.",
        steps: [
          "Open any model's files on Hugging Face.",
          "Find the large weight files (often .safetensors). That's the checkpoint.",
          "Note any files named with steps or “best”; those are intermediate checkpoints if present.",
          "Write one sentence: why might a project keep several checkpoints, not just one?",
        ],
        stretch: "Read a training tutorial and find the line that sets “save every N steps.” That single setting controls checkpoint frequency.",
      },
      quiz: [
        {
          q: "What is a model checkpoint?",
          options: ["A hardware interface that speeds up parameter loading", "A saved snapshot of the model's parameters at a point in time", "A benchmark score recorded during an evaluation run", "A set of default training hyperparameters saved alongside the model"],
          answer: 1,
          why: "It's a save file of the weights, used to resume, compare, or roll back.",
        },
        {
          q: "Why save checkpoints during training, not just at the end?",
          options: ["To average multiple snapshots into a single final model", "To resume after crashes and keep the best version", "To let other researchers reproduce your training run exactly", "To document changes in model behaviour across training steps"],
          answer: 1,
          why: "Regular saves protect against crashes and let you pick the strongest snapshot, since later isn't always better.",
        },
      ],
    },

    {
      id: "adapter-tuning",
      title: "Adapter tuning",
      time: 4,
      tagline: "The family of methods LoRA belongs to.",
      lesson:
        "<p><span class='term'>Adapter tuning</span> is the general idea behind LoRA: instead of changing a model's existing parameters, you <b>insert small new modules (“adapters”) and train only those</b>, leaving the big model frozen.</p>" +
        "<p>LoRA is the most popular adapter method, but it's one of a family. They all share the same win: tiny trainable add-ons, low memory, small portable files, and the ability to keep many adapters for many tasks on a single base model.</p>" +
        "<p>This whole approach has a name you'll see often: <b>PEFT</b> (Parameter-Efficient Fine-Tuning). It means “fine-tune by touching as few parameters as possible.” Adapters are the headline technique within it.</p>" +
        "<p>The practical magic: one base model + a shelf of adapters = many specialised assistants, cheaply. Swap the adapter, change the specialty.</p>",
      analogy:
        "<p>Think of a power drill with interchangeable bits. The drill (base model) stays the same; you click in a different bit (adapter) for each job: screws, holes, sanding. One tool, many specialties, no need to buy a new drill each time.</p>",
      mentalModel:
        "Adapter tuning = add small trainable modules, freeze the rest. LoRA is the famous one; the umbrella idea is PEFT. One base, many swappable specialties.",
      mistakes: [
        "Thinking LoRA and adapters are unrelated. LoRA <b>is</b> an adapter method.",
        "Forgetting adapters are base-specific. An adapter trained on one model won't fit another.",
        "Overcomplicating: for most people, “use LoRA via a PEFT library” is the whole story.",
      ],
      exercise: {
        goal: "See the one-base-many-adapters pattern.",
        steps: [
          "Imagine one base model and 3 jobs (support replies, code help, friendly tone).",
          "Sketch the base in the middle with 3 adapter “bits” around it.",
          "Write what data each adapter would be trained on.",
          "Explain in one line why this beats keeping 3 full separate models.",
        ],
        stretch: "Look up the Hugging Face PEFT library page and note which adapter methods besides LoRA it supports.",
      },
      quiz: [
        {
          q: "What's the core idea of adapter tuning?",
          options: ["Update all layers using gradient clipping to preserve key weights", "Add small trainable modules and freeze the big model", "Replace existing layers with smaller, lighter alternatives", "Distil the model into a smaller student network that trains separately"],
          answer: 1,
          why: "Adapters are small new modules you train while the base model stays frozen; LoRA is the famous example.",
        },
        {
          q: "What does PEFT stand for?",
          options: ["Parallel Ensemble of Fine-Tuned models", "Parameter-Efficient Fine-Tuning", "Partially Encoded Frozen Transformers", "Progressive Evaluation of Foundation Tasks"],
          answer: 1,
          why: "PEFT is the umbrella term for fine-tuning while touching as few parameters as possible.",
        },
      ],
    },

    {
      id: "gguf",
      title: "GGUF models",
      time: 4,
      tagline: "The file format that makes local models easy to run.",
      lesson:
        "<p><span class='term'>GGUF</span> is a <b>file format for storing models so they're easy to run locally</b>, especially on regular computers (CPU or modest GPU). If you run AI on your own machine, you'll bump into GGUF constantly.</p>" +
        "<p>It bundles everything needed (the weights, the tokenizer info, and settings) into a single convenient file. It's the native format of <b>llama.cpp</b> and tools built on it like <b>Ollama</b> (both coming in the next section).</p>" +
        "<p>GGUF files usually come <b>quantized</b>, which is why you'll see names like <code>model-Q4_K_M.gguf</code>. That tells you it's a 4-bit quantized version, small enough to run on a laptop.</p>" +
        "<p>Quick mental note: Hugging Face's general format (safetensors) is great for training and the cloud; GGUF is the go-to for running models locally and efficiently.</p>",
      analogy:
        "<p>Think of GGUF like a PDF. Whatever program made the document, exporting to PDF packages it into one file that opens anywhere, easily. GGUF packages a model into one file that runs cleanly on everyday machines.</p>",
      mentalModel:
        "GGUF = a single, self-contained, usually-quantized model file made for running locally. The format you'll feed to llama.cpp and Ollama.",
      mistakes: [
        "Trying to fine-tune directly in GGUF. It's a <b>run-it</b> format; training usually happens in other formats first.",
        "Ignoring the quantization tag in the filename. It tells you the size/quality trade-off.",
        "Downloading a huge unquantized GGUF for a small laptop. Match the file to your hardware.",
      ],
      exercise: {
        goal: "Read a GGUF filename like a pro.",
        steps: [
          "Find a GGUF repo on Hugging Face (search a model name + “GGUF”).",
          "List 3 files and decode each name: which is most compressed?",
          "Pick the one you'd download for a typical laptop (8–16 GB of RAM usually handles Q4 or Q5 of a 7B model) and justify it in one line.",
          "Note the file size you'd actually be downloading.",
        ],
        stretch: "Install Ollama later and run one command to pull a GGUF-backed model; you'll see this format in action instantly.",
      },
      quiz: [
        {
          q: "What is GGUF mainly for?",
          options: ["Quantizing model weights before uploading to the Hugging Face hub", "Storing models in a single file that's easy to run locally", "Compressing multiple checkpoints into a single training archive", "Defining the configuration for distributed multi-GPU training"],
          answer: 1,
          why: "GGUF packages a model into one convenient, usually-quantized file built for local inference.",
        },
        {
          q: "What does “Q4” in a GGUF filename tell you?",
          options: ["It was released as the 4th iteration of the GGUF format", "It's a 4-bit quantized (smaller, rougher) version", "It runs inference in 4-token batches to reduce memory overhead", "It has 4 billion parameters and was the first consumer-grade size"],
          answer: 1,
          why: "The Q-number is the quantization level; Q4 means 4-bit, small enough for laptops.",
        },
      ],
    },

  ],
});
