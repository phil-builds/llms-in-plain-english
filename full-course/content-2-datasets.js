/* Part 2 — Datasets & Training */
window.COURSE.push({
  id: "datasets",
  title: "Datasets & Training",
  blurb: "The food a model eats decides how it behaves.",
  topics: [

    {
      id: "sft-datasets",
      title: "SFT datasets",
      time: 5,
      tagline: "The “show, don't tell” data that teaches manners.",
      lesson:
        "<p><span class='term'>SFT</span> stands for <b>Supervised Fine-Tuning</b>. A raw model fresh out of its first training knows a lot of language, but it's a bit feral — it just continues text. SFT is where we teach it to <b>behave like a helpful assistant</b>.</p>" +
        "<p>An SFT dataset is a big collection of <b>example pairs</b>: a prompt and the ideal response. “Supervised” just means each example comes with the right answer attached, like flashcards with the answer on the back.</p>" +
        "<p>You show the model thousands of these — “here's a question, here's a good answer” — and it adjusts to imitate that style. This is how a model learns to follow instructions, stay polite, and structure replies, instead of rambling on.</p>" +
        "<p>Quality matters enormously here. A few thousand <b>excellent</b> examples often beat a million mediocre ones. The model copies what you show it — including the bad habits.</p>",
      analogy:
        "<p>Imagine training a new employee by handing them a binder of “here's a customer question, here's the perfect reply” examples. They read enough of these and start answering in that same helpful style. SFT is that binder for a model.</p>",
      mentalModel:
        "SFT is teaching by worked examples: prompt → ideal answer, repeated thousands of times until the model imitates the style.",
      mistakes: [
        "Chasing quantity over quality. Messy or low-effort examples teach messy, low-effort answers.",
        "Including answers in a tone you don't actually want. The model copies tone, length, and format — not just facts.",
        "Forgetting variety. If every example is one type of task, the model gets narrow and brittle.",
      ],
      exercise: {
        goal: "Hand-write a tiny SFT dataset by yourself.",
        steps: [
          "Pick a job you'd want an assistant to do (e.g. “rewrite my messages politely”).",
          "Write 5 example pairs: a realistic input, and the ideal output you'd want.",
          "Read them back as a set — is the style consistent? That consistency is what the model would learn.",
          "Spot one weak example and improve it. You just did data quality control.",
        ],
        stretch: "Find an open SFT dataset on Hugging Face, open a few rows, and compare their structure to your hand-made one.",
      },
      quiz: [
        {
          q: "What does an SFT dataset mainly contain?",
          options: ["Unlabelled text scraped from the web", "Prompt → ideal-answer example pairs", "Output quality scores with no reference answers", "Questions without any responses attached"],
          answer: 1,
          why: "Supervised fine-tuning uses paired examples — a prompt and the desired response — like flashcards.",
        },
        {
          q: "What usually matters most in an SFT dataset?",
          options: ["Having the largest possible number of examples", "High quality and consistent style of examples", "Spreading examples evenly across as many domains as possible", "Removing any examples that involve edge cases or refusals"],
          answer: 1,
          why: "A few thousand excellent, consistent examples typically beat huge volumes of mediocre ones.",
        },
      ],
    },

    {
      id: "instruction-tuning",
      title: "Instruction tuning",
      time: 4,
      tagline: "Turning a text-continuer into something that follows orders.",
      lesson:
        "<p><span class='term'>Instruction tuning</span> is a specific, very important kind of SFT. The examples are all shaped as <b>instruction → response</b>: “Summarise this email,” “Translate this to French,” “Explain photosynthesis simply.”</p>" +
        "<p>This is the step that turns a base model (which only continues text) into a model that <b>does what you ask</b>. Almost every assistant you've used has been instruction-tuned.</p>" +
        "<p>The trick is <b>diversity of instructions</b>. By showing the model thousands of <i>different kinds</i> of tasks, it learns the general skill of “read an instruction, then carry it out” — and can then handle instructions it never saw during training.</p>",
      analogy:
        "<p>It's the difference between someone who can talk endlessly about cooking and someone who actually makes the dish when you say “make me an omelette.” Instruction tuning teaches the model to act on the request, not just talk around it.</p>",
      mentalModel:
        "Instruction tuning = teaching the general skill of “follow the instruction,” by example, across many task types so it generalises to new ones.",
      mistakes: [
        "Confusing a base model with an instruction-tuned one. Base models often ignore your request and just ramble — that's normal for them.",
        "Training on too few task types, so the model only follows the kinds of instructions it saw.",
        "Assuming instruction tuning adds new knowledge. It mostly shapes <b>behaviour</b>, not facts.",
      ],
      exercise: {
        goal: "See the difference between base and instruction-tuned behaviour.",
        steps: [
          "On Hugging Face, find a model that has both a “base” and an “instruct” version (many do).",
          "Read each model card and note the difference in how they're described.",
          "Write one sentence predicting how each would respond to “Write a haiku about rain.”",
          "If you can run them later, test your prediction.",
        ],
        stretch: "List 8 wildly different instructions. The variety you just wrote is exactly the variety good instruction tuning needs.",
      },
      quiz: [
        {
          q: "What does instruction tuning turn a base model into?",
          options: ["A model with more factual knowledge baked in", "A model that follows instructions and does tasks", "A model that retrieves answers from the internet", "A model that scores and ranks its own outputs"],
          answer: 1,
          why: "It teaches the model to read a request and carry it out, rather than just continuing text.",
        },
        {
          q: "Why is variety of instructions important?",
          options: ["It reduces overfitting to the exact prompt templates used in training", "So the model learns the general skill and can handle new, unseen instructions", "It prevents the model from memorising the wording of individual examples", "Different task types require different tokenization strategies"],
          answer: 1,
          why: "Diverse tasks teach the broad skill of following instructions, which generalises beyond the training examples.",
        },
      ],
    },

    {
      id: "preference-datasets",
      title: "Preference datasets",
      time: 5,
      tagline: "Not just a good answer — the better of two.",
      lesson:
        "<p>SFT teaches the model <i>a</i> good answer. But often there are many acceptable answers, and some are clearly <b>better</b> than others. <span class='term'>Preference datasets</span> capture that.</p>" +
        "<p>Each example is a prompt plus <b>two responses</b>: a “chosen” one (better) and a “rejected” one (worse). A human (or sometimes another AI) judged which is better. The model later learns to lean toward the kind of answers people prefer.</p>" +
        "<p>This is how models get their polish — being helpful <i>and</i> harmless <i>and</i> honest, picking the more useful phrasing, refusing the right things. It's less about “correct vs wrong” and more about “better vs worse” among reasonable options.</p>" +
        "<p>Preference data powers techniques like <b>DPO</b> and <b>RLHF</b>, which you'll meet in the Fine-Tuning section. For now, just hold the shape: prompt, a winner, and a loser.</p>",
      analogy:
        "<p>Think of a talent show. The judges don't just accept any performance — they compare two acts and say “this one was better.” Do that thousands of times and the contestants learn what the judges like. Preference data is those side-by-side judgements.</p>",
      mentalModel:
        "Preference data = prompt + a “chosen” answer + a “rejected” answer. It teaches better-vs-worse, not just right-vs-wrong.",
      mistakes: [
        "Thinking the rejected answer must be terrible. Often both are fine; one is just <b>better</b>, and that subtlety is the point.",
        "Using inconsistent judges, so “better” means different things in different rows — confusing the model.",
        "Believing preference tuning teaches facts. Like SFT, it mostly shapes <b>which kind of answer</b> the model gravitates to.",
      ],
      exercise: {
        goal: "Generate your own preference pair.",
        steps: [
          "Ask any chatbot a question, then ask it the exact same question again to get a second answer.",
          "Compare the two answers and pick the better one. Note <i>why</i> (clearer? kinder? more accurate?).",
          "You've just created one preference example: prompt, chosen, rejected, plus a reason.",
          "Do this for 3 prompts and notice what consistently makes one answer “better” for you.",
        ],
        stretch: "Open an open preference dataset (search “preference dataset” on Hugging Face) and read a few chosen/rejected pairs to compare your instincts with theirs.",
      },
      quiz: [
        {
          q: "What's the structure of a preference example?",
          options: ["A prompt with a single verified-correct answer and a confidence score", "A prompt with a chosen (better) and rejected (worse) answer", "Two versions of the same prompt with one shared response", "A question, a correct answer, and an explanation of why it's right"],
          answer: 1,
          why: "Preference data pairs each prompt with a preferred and a less-preferred response.",
        },
        {
          q: "What do preference datasets mainly teach?",
          options: ["What tone and style to apply based on the conversation so far", "Which kind of answer people prefer (better vs worse)", "Which instructions to prioritise when a prompt contains several", "How to identify and self-correct factual errors in its outputs"],
          answer: 1,
          why: "They shape the model toward more-preferred answers among reasonable options.",
        },
      ],
    },

    {
      id: "synthetic-datasets",
      title: "Synthetic datasets",
      time: 5,
      tagline: "Using AI to create the data that trains AI.",
      lesson:
        "<p>Good training data is expensive and slow to collect from humans. <span class='term'>Synthetic data</span> is a shortcut: you use a capable AI model to <b>generate the examples</b> instead.</p>" +
        "<p>For instance, you might prompt a strong model: “Write 500 customer-support questions and ideal answers in a friendly tone.” Now you have an SFT dataset in minutes, not months. This is increasingly how modern models are trained and improved.</p>" +
        "<p>The upside is speed, scale, and control — you can target exactly the skills you want. The danger is that the data is only as good as the model that made it. Errors, biases, and blandness can get copied and amplified.</p>" +
        "<p>The sweet spot is usually <b>synthetic data with human checking</b>: let AI draft at scale, then have people review, filter, and fix. Quantity from the machine, quality control from the human.</p>",
      analogy:
        "<p>It's like using a photocopier to make study notes instead of writing each by hand. Fast and scalable — but if the original has a typo, you've just printed a thousand copies of it. So you proofread the master first.</p>",
      mentalModel:
        "Synthetic data = AI-generated training examples. Fast and scalable, but it inherits the flaws of the model that made it — so review before you trust.",
      mistakes: [
        "Trusting synthetic data blindly. It can carry the generator's mistakes and biases straight into your new model.",
        "Generating thousands of near-identical examples (low diversity), which teaches a narrow, repetitive model.",
        "Skipping human review entirely. A quick human filter dramatically raises quality.",
      ],
      exercise: {
        goal: "Create and critique a small synthetic dataset.",
        steps: [
          "Ask a chatbot: “Generate 10 example pairs of a user asking for a recipe and a helpful reply.”",
          "Read all 10. Mark any that are repetitive, wrong, or oddly phrased.",
          "Estimate what fraction you'd keep. That keep-rate is your data quality signal.",
          "Rewrite the prompt to get more variety, and compare the second batch.",
        ],
        stretch: "Ask the model to generate examples that include tricky edge cases (rude users, impossible requests). Edge cases are gold for robust training.",
      },
      quiz: [
        {
          q: "What is synthetic data?",
          options: ["Data gathered from carefully curated human-verified sources", "Training examples generated by an AI model", "Examples automatically extracted from user interaction logs", "Data filtered specifically to remove any AI-generated content"],
          answer: 1,
          why: "Synthetic data is created by a capable model rather than gathered from people.",
        },
        {
          q: "What's the main risk of synthetic data?",
          options: ["It's more expensive to produce at scale than human annotation", "It inherits the generating model's errors, biases, and blandness", "Inconsistent formatting in generated examples can break training", "Models trained on it tend to overfit to the synthetic distribution"],
          answer: 1,
          why: "The data is only as good as the model that produced it, so flaws get copied — review matters.",
        },
      ],
    },

    {
      id: "data-curation",
      title: "Data curation",
      time: 4,
      tagline: "Choosing what goes in — the quiet skill that decides everything.",
      lesson:
        "<p><span class='term'>Data curation</span> is the craft of <b>deciding which data to include, exclude, and emphasise</b>. It's less glamorous than the model architecture, but it often matters more for the final result.</p>" +
        "<p>Curation means asking: Is this example accurate? Is it representative of what users will actually ask? Is it diverse enough? Is it free of harmful or duplicated content? Then keeping the good, cutting the bad, and balancing the mix.</p>" +
        "<p>A famous rule of thumb in this field: <b>garbage in, garbage out</b>. The model has no taste of its own — it faithfully absorbs whatever you feed it. Curation is where human judgement shapes the model's character.</p>",
      analogy:
        "<p>Think of curating a museum. You don't hang every painting you own — you choose the best, arrange a balanced collection, and leave out the forgeries. Data curation is curating the “collection” a model learns from.</p>",
      mentalModel:
        "Curation is taste applied to data: keep the accurate, representative, and diverse; cut the wrong, duplicated, and harmful. The model becomes what you select.",
      mistakes: [
        "Dumping in everything you can find. More data isn't better if it's noisy or off-target.",
        "Ignoring balance, so one topic or style dominates and the model becomes lopsided.",
        "Forgetting to remove duplicates, which secretly over-weights whatever is repeated.",
      ],
      exercise: {
        goal: "Curate a messy pile down to a clean set.",
        steps: [
          "Collect 15 random sentences from anywhere (news, forums, your notes).",
          "Imagine training a polite assistant on them. Mark each: keep, cut, or fix.",
          "Write one rule you used to decide (e.g. “cut anything rude or off-topic”).",
          "Notice how your single rule reshaped the whole collection. That's curation power.",
        ],
        stretch: "Add a balance check: count how many of your kept items are the same type. Rebalance if one type dominates.",
      },
      quiz: [
        {
          q: "What is data curation?",
          options: ["Labelling each example with an expected quality score", "Deciding which data to include, exclude, and balance", "Converting raw text into the token format the model reads", "Generating additional examples to fill gaps in the dataset"],
          answer: 1,
          why: "Curation is the human judgement of selecting and balancing the training data.",
        },
        {
          q: "Why is curation so important?",
          options: ["Large uncurated datasets take significantly longer to train on", "The model absorbs whatever you feed it — garbage in, garbage out", "Without curation, the model learns only from the most recent examples", "Uncurated data forces the tokenizer to generate more tokens per sentence"],
          answer: 1,
          why: "Models have no taste of their own; the quality of the data directly shapes the result.",
        },
      ],
    },

    {
      id: "dataset-cleaning",
      title: "Dataset cleaning",
      time: 4,
      tagline: "Scrubbing the data before it ever reaches the model.",
      lesson:
        "<p>If curation is choosing <i>what</i> to include, <span class='term'>cleaning</span> is fixing the things you keep. Real-world data is messy: broken characters, HTML tags, duplicates, empty rows, mislabeled examples, and personal information that shouldn't be there.</p>" +
        "<p>Cleaning steps usually include: removing exact and near-duplicate examples, stripping junk formatting, fixing or dropping broken entries, filtering out toxic content, and removing private data (names, emails, phone numbers).</p>" +
        "<p>This step is unglamorous but powerful. Teams routinely find that simply <b>de-duplicating and removing bad rows</b> improves a model more than fancy tweaks. Clean data is a force multiplier.</p>",
      analogy:
        "<p>It's like washing vegetables before cooking. You picked good produce (curation), but you still rinse off the dirt, cut the bruised bits, and remove the stickers. Skip it and grit ends up in the meal.</p>",
      mentalModel:
        "Cleaning = washing the data: remove duplicates, junk, broken rows, toxic content, and private info before training.",
      mistakes: [
        "Leaving in duplicates, which quietly over-train the model on repeated text.",
        "Forgetting to strip personal/private data, which can leak into the model's outputs.",
        "Over-cleaning until the data is bland and unrealistic — keep some natural messiness users will actually produce.",
      ],
      exercise: {
        goal: "Run a cleaning pass by hand.",
        steps: [
          "Take a list of ~20 short text entries (copy some forum posts or messages).",
          "Find and remove exact duplicates and near-duplicates.",
          "Strip out any leftover formatting junk, and redact anything personal.",
          "Count how many entries survived. That shrink is normal — and healthy.",
        ],
        stretch: "Add a toxicity filter step: read for anything you wouldn't want a model repeating, and remove it. Note how subjective “toxic” can be.",
      },
      quiz: [
        {
          q: "Which is a core part of dataset cleaning?",
          options: ["Keeping only the most recently collected examples in the dataset", "Removing duplicates, junk formatting, and private data", "Normalising all text to a consistent length and style", "Labelling each example with a confidence score before training"],
          answer: 1,
          why: "Cleaning fixes the messy realities of raw data: duplicates, junk, broken or sensitive entries.",
        },
        {
          q: "Why is de-duplication so valuable?",
          options: ["Fewer examples mean the model trains faster without losing accuracy", "Duplicates secretly over-train the model on repeated text", "Duplicate rows cause tokenisation errors during batch processing", "It reduces file size, cutting storage and loading time"],
          answer: 1,
          why: "Repeated examples get over-weighted, so removing them often improves the model noticeably.",
        },
      ],
    },

    {
      id: "dataset-formatting",
      title: "Dataset formatting",
      time: 4,
      tagline: "The exact shape your examples must be poured into.",
      lesson:
        "<p>Models expect data in a <b>specific structure</b>. <span class='term'>Formatting</span> is arranging your cleaned examples into that exact shape so the training tool can read them.</p>" +
        "<p>For chat models, this usually means a list of <b>roles and messages</b>: a system message (the model's instructions), a user message, and an assistant message. Each example is one of these little conversations, often stored as JSON or JSONL (one JSON object per line).</p>" +
        "<p>There's also the <b>chat template</b> — special tokens or tags that mark where the user's turn ends and the assistant's begins. Each model family has its own template, and using the wrong one is a classic reason fine-tuning “mysteriously” fails.</p>" +
        "<p>Good news: tools like the ones you'll learn later (Axolotl, TRL, Unsloth) handle most templating for you — as long as your raw data is in the expected role/message shape.</p>",
      analogy:
        "<p>Think of a job application form. The content is your experience, but if you write your name in the “email” box, the system rejects it. Formatting is filling the right content into the right boxes, in the shape the system expects.</p>",
      mentalModel:
        "Formatting = pouring clean data into the model's required shape (roles, messages, chat template). Right content, wrong boxes = failure.",
      mistakes: [
        "Using the wrong chat template for the model — a top cause of broken or weird fine-tunes.",
        "Mixing inconsistent formats across rows, so the tool can't parse some examples.",
        "Forgetting the system message when your task depends on a consistent persona or rules.",
      ],
      exercise: {
        goal: "Format one example the way a chat model expects.",
        steps: [
          "Take one prompt/answer pair you wrote earlier.",
          "Rewrite it as three labelled parts: system (the rules), user (the prompt), assistant (the answer).",
          "Now write it as a JSON object with a “messages” list of those three.",
          "Read it back — could a tool unambiguously tell who said what? If yes, it's well-formatted.",
        ],
        stretch: "Look up the chat template for one open model (it's usually in its files on Hugging Face) and note the special tokens it uses.",
      },
      quiz: [
        {
          q: "For a chat model, how are examples usually formatted?",
          options: ["As question-and-answer pairs separated by blank lines", "As roles and messages (system / user / assistant), often in JSON", "As key-value pairs in a CSV file with one column per role", "As plain text with speaker labels like &ldquo;User:&rdquo; and &ldquo;Assistant:&rdquo;"],
          answer: 1,
          why: "Chat fine-tuning data is structured into role-tagged messages, commonly stored as JSON or JSONL.",
        },
        {
          q: "Why does the chat template matter?",
          options: ["It controls how long the model takes to tokenise each example", "Using the wrong one is a common reason fine-tuning fails or behaves oddly", "Different templates produce different embedding dimensions", "It determines which topics the model is permitted to discuss"],
          answer: 1,
          why: "Each model family expects specific tokens marking turns; the wrong template breaks training.",
        },
      ],
    },

    {
      id: "fine-tuning-basics",
      title: "Fine-tuning basics",
      time: 5,
      tagline: "Teaching an existing model a new specialty.",
      lesson:
        "<p><span class='term'>Fine-tuning</span> means taking an already-trained model and giving it a <b>small, focused round of extra training</b> on your own data, so it gets better at a specific task or style.</p>" +
        "<p>You don't start from scratch (that costs millions). You start from a capable model that already understands language, and you nudge it toward your needs — your company's tone, a niche domain, a particular output format.</p>" +
        "<p>When should you fine-tune? When prompting alone isn't enough: you need consistent style, a specialised skill, or to bake in behaviour so you don't repeat long instructions every time. When should you <i>not</i>? When you mainly need <b>fresh facts</b> — for that, retrieval (RAG, coming later) is usually better and cheaper.</p>" +
        "<p>A key truth: fine-tuning is great at teaching <b>behaviour and style</b>, and weaker at reliably injecting <b>new facts</b>. Keep that distinction and you'll avoid most beginner disappointment.</p>",
      analogy:
        "<p>Hiring a skilled chef and teaching them <i>your</i> restaurant's signature dishes is fine-tuning. You're not teaching them to cook from zero — just adapting their existing talent to your menu. Far faster than training a chef from childhood.</p>",
      mentalModel:
        "Fine-tuning = a short specialty course for an already-educated model. Great for style and behaviour; not the right tool for fresh facts.",
      mistakes: [
        "Fine-tuning to add knowledge that changes often — use RAG instead; fine-tuning bakes facts in and goes stale.",
        "Fine-tuning before trying good prompting. Often a better prompt solves it with zero training.",
        "Using too little or low-quality data and expecting magic. Behaviour change needs clean, consistent examples.",
      ],
      exercise: {
        goal: "Decide whether a task needs fine-tuning at all.",
        steps: [
          "Write down 3 things you'd want an AI to do for you.",
          "For each, ask: is this about <b>style/behaviour</b> or about <b>fresh facts</b>?",
          "Mark the style/behaviour ones as fine-tuning candidates and the fact-heavy ones as RAG candidates.",
          "Pick one fine-tuning candidate and list what example data you'd need.",
        ],
        stretch: "Try solving one of your tasks with a really detailed prompt first. If the prompt fully works, you may not need fine-tuning at all — that's a win.",
      },
      quiz: [
        {
          q: "What is fine-tuning?",
          options: ["Selecting which training examples the base model should prioritise", "A small, focused round of extra training on an already-trained model", "Adjusting the model's context window to suit a specific task", "Merging two base models by averaging their learned weights"],
          answer: 1,
          why: "It adapts an existing capable model to a specific task or style with a short extra training round.",
        },
        {
          q: "Fine-tuning is best for…",
          options: ["Adding up-to-date facts that change frequently", "Teaching consistent behaviour and style", "Reducing hallucinations about specific factual topics", "Replacing the need for a system prompt on common tasks"],
          answer: 1,
          why: "It excels at style and behaviour; for fresh, changing facts, retrieval (RAG) is usually better.",
        },
      ],
    },

    {
      id: "continued-pretraining",
      title: "Continued pretraining",
      time: 5,
      tagline: "Pouring a whole new domain of knowledge into a model.",
      lesson:
        "<p>Regular fine-tuning uses neat instruction/answer pairs. <span class='term'>Continued pretraining</span> (sometimes “domain-adaptive pretraining”) is different: you keep training the model on <b>large amounts of raw text</b> from a new domain, the same way it was originally trained.</p>" +
        "<p>You'd do this when a model needs deep familiarity with a specialised field — say, legal documents, medical literature, or a programming language it barely saw. You feed it lots of that domain's raw text so the patterns soak in.</p>" +
        "<p>Think of the typical pipeline: original pretraining (general language) → continued pretraining (your domain's raw text) → fine-tuning (instruction/answer pairs) → preference tuning (polish). Each step builds on the last.</p>" +
        "<p>It's heavier and more expensive than fine-tuning, and needs a lot of domain text. Most people won't need it — but knowing it exists explains how specialised models gain genuine depth.</p>",
      analogy:
        "<p>Fine-tuning is a weekend workshop. Continued pretraining is moving to a new country and getting immersed in the language for months. You don't just learn phrases — you soak up the whole way of speaking. That depth costs time.</p>",
      mentalModel:
        "Continued pretraining = more raw-text immersion in a new domain, before the instruction-style fine-tuning. Depth of knowledge, not just behaviour.",
      mistakes: [
        "Confusing it with fine-tuning. Continued pretraining uses raw text; fine-tuning uses instruction/answer pairs.",
        "Attempting it with too little domain text. Immersion needs volume to actually shift the model.",
        "Reaching for it when a quick fine-tune or RAG would do. It's the heavy option, not the default.",
      ],
      exercise: {
        goal: "Map where continued pretraining fits.",
        steps: [
          "Write the 4-step pipeline (pretrain → continued pretrain → fine-tune → preference tune) on paper.",
          "For a domain you care about, decide if a model would need step 2 (deep new field) or could skip to step 3.",
          "Note what raw text you'd gather for step 2 and roughly how much.",
          "Explain in one sentence why this step is the most expensive.",
        ],
        stretch: "Find an example of a domain-specialised open model (e.g. for code or medicine) and read how it was trained. Spot the continued-pretraining step if mentioned.",
      },
      quiz: [
        {
          q: "How does continued pretraining differ from fine-tuning?",
          options: ["It starts from scratch rather than building on an existing base model", "It trains on large amounts of raw domain text rather than instruction/answer pairs", "It uses instruction/answer pairs but drawn from a single specialised domain", "It runs for fewer steps to avoid overwriting the original base knowledge"],
          answer: 1,
          why: "Continued pretraining immerses the model in raw domain text, like its original training, for deep familiarity.",
        },
        {
          q: "When is continued pretraining the right call?",
          options: ["When prompting consistently fails to produce the desired output style", "When a model needs deep knowledge of a specialised domain it barely saw", "When the model needs to learn a new task from a handful of examples", "When inference is too slow and you need to reduce the model's size"],
          answer: 1,
          why: "It's the heavy option for genuine domain depth, not a quick behaviour tweak.",
        },
      ],
    },

    {
      id: "hallucination-reduction",
      title: "Hallucination reduction",
      time: 5,
      tagline: "Why models make things up — and how to make it rarer.",
      lesson:
        "<p>A <span class='term'>hallucination</span> is when a model states something <b>false but confident</b> — an invented citation, a made-up fact, a fake quote. It happens because the model predicts <i>plausible</i> text, and plausible isn't always true.</p>" +
        "<p>You can't eliminate hallucinations completely, but you can make them much rarer. The biggest levers: <b>1) Give it the facts</b> — use retrieval (RAG) so the answer is grounded in real documents. <b>2) Let it say “I don't know”</b> — train and prompt it to admit uncertainty instead of guessing.</p>" +
        "<p>Other helpers: ask for sources and check them, lower the randomness for factual tasks, break questions into steps, and verify critical answers with a second pass. For high-stakes use, always keep a human in the loop.</p>" +
        "<p>The mindset shift: treat a raw model as a <b>confident intern</b>, not an encyclopedia. Brilliant, fast, and occasionally sure of something completely wrong.</p>",
      analogy:
        "<p>Imagine a student who never says “I'm not sure.” Faced with a question they don't know, they give a smooth, confident, totally invented answer. Reducing hallucination is teaching that student to check their notes and to admit when they're unsure.</p>",
      mentalModel:
        "Hallucination = confident plausible-but-false text. Reduce it by grounding answers in real sources and rewarding honest “I don't know.”",
      mistakes: [
        "Trusting confident answers on facts without checking. Confidence is not evidence.",
        "Trying to fix factual errors with fine-tuning alone, when grounding the model with retrieval works better.",
        "Using high randomness settings for factual tasks, which makes invention more likely.",
      ],
      exercise: {
        goal: "Catch a hallucination in the wild and reduce it.",
        steps: [
          "Ask a chatbot for “5 sources with links about a niche topic.”",
          "Actually check the links and citations. Note any that are fake or wrong.",
          "Now re-ask, adding: “Only use sources you're confident exist, and say if you're unsure.”",
          "Compare. Note whether the honesty instruction reduced made-up sources.",
        ],
        stretch: "Paste a real document and ask a question answerable only from it, instructing “answer only from the text.” Notice how grounding cuts invention.",
      },
      quiz: [
        {
          q: "Why do hallucinations happen?",
          options: ["It draws on outdated training data that no longer reflects reality", "It predicts plausible text, and plausible isn't always true", "Its training mixed factual sources with creative fiction", "Longer outputs contain more words, which increases chances of error"],
          answer: 1,
          why: "Models optimise for likely-sounding text, which can be confidently wrong.",
        },
        {
          q: "Which most reliably reduces hallucinations?",
          options: ["Fine-tuning on verified factual examples from your specific domain", "Grounding answers in real retrieved documents and allowing “I don’t know”", "Using a lower temperature so the model picks more likely tokens", "Breaking long answers into shorter sections to limit speculation"],
          answer: 1,
          why: "Grounding in real sources plus permission to admit uncertainty are the strongest levers.",
        },
      ],
    },

  ],
});
