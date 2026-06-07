/* Part 1 — Foundations */
window.COURSE.push({
  id: "foundations",
  title: "Foundations",
  blurb: "What an LLM actually is, in plain words.",
  topics: [

    {
      id: "llm-basics",
      title: "LLM basics",
      time: 4,
      tagline: "Before anything else: what is this thing everyone keeps talking about?",
      lesson:
        "<p>An <span class='term'>LLM</span> stands for <b>Large Language Model</b>. Let's take those three words one at a time, because the name actually tells you almost everything.</p>" +
        "<p><b>Language</b> — it works with words and text. <b>Model</b> — it's a kind of pattern-learner, like a very detailed map of how language tends to go. <b>Large</b> — it learned from an enormous amount of text, and it is itself enormous inside.</p>" +
        "<p>Here is the surprising part: at its core, an LLM does one simple job over and over. It <b>predicts the next chunk of text</b>. You give it some words, and it guesses what word is most likely to come next. Then it adds that word, looks at everything again, and guesses the next one. It keeps going until the answer is done.</p>" +
        "<p>That's it. Everything that feels clever — answering questions, writing emails, explaining code — is built on top of that one repeated guess. It feels like thinking, but underneath it is very, very good prediction.</p>",
      analogy:
        "<p>Think of the autocomplete on your phone keyboard. You type <i>“I'm running a bit”</i> and it suggests <i>“late.”</i> An LLM is that same idea, but scaled up millions of times — it has read so much text that its “next word” guesses can write a whole essay, not just finish one sentence.</p>",
      mentalModel:
        "An LLM is a giant next-word guesser. It doesn't “know” facts the way a database does — it has learned the patterns of how text usually flows.",
      mistakes: [
        "Thinking the model <b>looks things up</b> like a search engine. It doesn't — it predicts likely text from patterns, which is why it can sound confident and still be wrong.",
        "Believing it <b>understands</b> the way a person does. It's modelling language patterns, not living through experiences.",
        "Assuming bigger always means better for your task. A smaller model can beat a giant one if it fits the job and your hardware.",
      ],
      exercise: {
        goal: "Feel the “next-word guess” for yourself, with no setup.",
        steps: [
          "Open any free chat AI (for example, Claude or ChatGPT in your browser).",
          "Type a half-finished sentence like “The best way to learn a new skill is” and send it.",
          "Notice how it doesn't pause to “look up” an answer — it just continues the text naturally.",
          "Now ask it the same thing twice. Notice the answers differ slightly. That's prediction with a bit of randomness, not a fixed lookup.",
        ],
        stretch: "Ask it a made-up question like “What did the mayor of Atlantis say in 2019?” and watch how it may invent a confident answer. That's your first look at a hallucination.",
      },
      quiz: [
        {
          q: "At its core, what is an LLM actually doing?",
          options: ["Searching a database of facts", "Predicting the next chunk of text", "Copying answers it memorised word-for-word", "Running logic rules a human wrote"],
          answer: 1,
          why: "It repeatedly predicts the most likely next piece of text. Everything else is built on top of that.",
        },
        {
          q: "Why can an LLM sound confident but still be wrong?",
          options: ["It's lying on purpose", "It predicts plausible-sounding text, which isn't the same as checking truth", "It ran out of memory", "Its internet connection failed"],
          answer: 1,
          why: "Plausible and true are different things. The model optimises for “what text usually comes next,” not “what is verified fact.”",
        },
      ],
    },

    {
      id: "how-ai-models-work",
      title: "How AI models work",
      time: 5,
      tagline: "The simple loop hiding behind every clever answer.",
      lesson:
        "<p>Let's zoom out from language for a second. A <span class='term'>model</span> in AI is just a machine that turns an <b>input</b> into an <b>output</b> using patterns it learned from examples.</p>" +
        "<p>Nobody sat down and wrote rules like “if the user says hello, reply hi.” Instead, the model was shown a mountain of examples and slowly adjusted itself until its outputs matched the patterns in those examples. This adjusting is called <b>training</b>, and we'll cover it soon.</p>" +
        "<p>For an LLM specifically, the loop looks like this: <b>1)</b> turn your text into numbers, <b>2)</b> push those numbers through layers of math, <b>3)</b> get a list of possible next words with a score each, <b>4)</b> pick one, <b>5)</b> repeat.</p>" +
        "<p>The “learning” all lives in a huge set of numbers called <b>parameters</b> (more on those later). When people say a model is “7 billion” or “70 billion,” they mean how many of these little number-dials it has.</p>",
      analogy:
        "<p>Imagine learning to cook not from a recipe book, but by tasting thousands of dishes until you can guess what goes next in any recipe. You never memorised rules — you absorbed patterns. An AI model is trained the same way: by example, not by instruction.</p>",
      mentalModel:
        "A model is a pattern-machine: input goes in, learned numbers transform it, output comes out. The intelligence is frozen inside those numbers.",
      mistakes: [
        "Imagining a programmer wrote every behaviour by hand. Almost none of it is hand-written rules — it's learned.",
        "Thinking the model changes or “learns” while you chat with it. By default it does not; it's frozen after training (your chat history is just fed back in as input).",
        "Confusing the <b>model</b> (the learned numbers) with the <b>app</b> around it (the chat box, memory, tools). They're different layers.",
      ],
      exercise: {
        goal: "Separate the three layers in your head: data, model, app.",
        steps: [
          "Pick one AI tool you've used (a chatbot, an image generator, anything).",
          "Write one sentence answering: what <b>data</b> was it likely trained on?",
          "Write one sentence: what does the <b>model</b> itself do (its one core job)?",
          "Write one sentence: what does the <b>app</b> around it add (memory, buttons, file upload)?",
        ],
        stretch: "Compare two tools and note how they might share a similar model underneath but feel totally different because of the app layer on top.",
      },
      quiz: [
        {
          q: "Where does a model's “intelligence” actually live?",
          options: ["In hand-written if/else rules", "In a huge set of learned numbers (parameters)", "In the internet connection", "In the chat history"],
          answer: 1,
          why: "Training bakes the patterns into millions or billions of numbers. That frozen set of numbers is the model.",
        },
        {
          q: "Does a standard chatbot learn from your conversation as you talk to it?",
          options: ["Yes, it rewrites itself after every message", "No — by default the model is frozen; your history is just re-read as input", "Only on weekends", "Only if you pay"],
          answer: 1,
          why: "The model stays fixed. The feeling of memory comes from feeding past messages back in, not from the model changing.",
        },
      ],
    },

    {
      id: "tokens",
      title: "Tokens",
      time: 4,
      tagline: "The model doesn't see words. It sees these.",
      lesson:
        "<p>A model can't read letters or words directly — it only works with numbers. So before anything happens, your text gets chopped into small pieces called <span class='term'>tokens</span>, and each token becomes a number.</p>" +
        "<p>A token is usually a <b>word or part of a word</b>. Common short words like “the” or “cat” are often one token. Longer or rarer words get split: “unbelievable” might become “un”, “believ”, “able”. Spaces and punctuation count too.</p>" +
        "<p>A rough rule of thumb for English: <b>1 token ≈ ¾ of a word</b>, or about 4 characters. So 100 tokens is roughly 75 words.</p>" +
        "<p>Why care? Because almost everything is measured and <b>priced</b> in tokens — how much you can send, how much it remembers, and how much it costs. Tokens are the model's true unit of currency.</p>",
      analogy:
        "<p>Think of LEGO. You don't build with whole finished houses — you build with small standard bricks. Tokens are the model's bricks: every sentence is taken apart into these reusable pieces and rebuilt from them.</p>",
      mentalModel:
        "Tokens are the Lego bricks of text. The model never sees your sentence — it sees a pile of numbered bricks.",
      mistakes: [
        "Assuming one word = one token. Long words, names, emojis, and other languages can be several tokens each.",
        "Forgetting that <b>spaces and punctuation</b> use tokens too.",
        "Pasting a huge document and being surprised it's “too long” — it was counted in tokens, which add up faster than you'd think.",
      ],
      exercise: {
        goal: "See your own text broken into tokens.",
        steps: [
          "Search for “OpenAI tokenizer” or “tiktokenizer” and open the free web tool.",
          "Paste in a sentence about yourself and watch it split into coloured tokens.",
          "Try a long unusual word, an emoji, and a number like 1,000,000 — notice which ones cost more tokens.",
          "Write down the token count for a paragraph you'd actually send to an AI.",
        ],
        stretch: "Paste the same sentence translated into another language and compare token counts. Many languages cost more tokens than English.",
      },
      quiz: [
        {
          q: "Roughly how many words is 100 tokens of English?",
          options: ["About 10 words", "About 75 words", "About 400 words", "Exactly 100 words"],
          answer: 1,
          why: "A common rule of thumb is 1 token ≈ ¾ of a word, so ~100 tokens ≈ ~75 words.",
        },
        {
          q: "Why do tokens matter in practice?",
          options: ["They make text prettier", "Limits, memory, and cost are all measured in tokens", "They translate languages", "They speed up your internet"],
          answer: 1,
          why: "Tokens are the unit for context limits and pricing — they're the model's currency.",
        },
      ],
    },

    {
      id: "tokenization",
      title: "Tokenization",
      time: 4,
      tagline: "The recipe that decides where the cuts happen.",
      lesson:
        "<p>If tokens are the bricks, <span class='term'>tokenization</span> is the <b>process of cutting text into those bricks</b>. The tool that does it is called a tokenizer, and each model family has its own.</p>" +
        "<p>The clever bit: tokenizers don't cut randomly or just by spaces. They learn, from lots of text, which chunks appear so often that they deserve to be their own brick. “ing”, “tion”, and “the” show up constantly, so they become single tokens. Rare strings get broken into smaller, more common pieces.</p>" +
        "<p>This is why the <b>same sentence can have different token counts on different models</b> — each one learned a slightly different set of bricks. It's also why code, math, and non-English text can tokenize in surprising ways.</p>" +
        "<p>You rarely run a tokenizer by hand, but understanding it explains a lot: why some prompts cost more, why spacing matters, and why a model sometimes “misspells” by splitting a word oddly.</p>",
      analogy:
        “<p>Imagine a roll of raffle tickets with dotted perforations between each one. You could tear anywhere — but tear at the dots and every ticket is whole and readable. Tear randomly and you get useless scraps. A tokenizer learned where the natural perforations in language fall.</p>”,
      mentalModel:
        "Tokenization is the cutting rule. Same text, different cutting rule, different number of pieces.",
      mistakes: [
        "Assuming all models tokenize identically. They don't — a prompt that fits one model may be longer on another.",
        "Hand-counting words to estimate cost. Always think in tokens, ideally with a tokenizer tool.",
        "Ignoring formatting: extra spaces, tabs, and repeated symbols quietly add tokens.",
      ],
      exercise: {
        goal: "Prove that tokenization is not just splitting on spaces.",
        steps: [
          "Open a tokenizer web tool again.",
          "Type the single word “tokenization” and note how many tokens it becomes.",
          "Now type “to ken iza tion” with spaces and compare the count.",
          "Write one sentence explaining why the counts differ even though the letters are the same.",
        ],
        stretch: "Paste a small snippet of code and a similar amount of plain English. Notice code often costs more tokens — handy to know before sending big files.",
      },
      quiz: [
        {
          q: "What does a tokenizer do?",
          options: ["Translates between languages", "Cuts text into tokens using learned patterns", "Checks spelling", "Connects to the internet"],
          answer: 1,
          why: "It splits text into tokens based on chunks that appear frequently in its training text.",
        },
        {
          q: "Why might the same sentence cost more tokens on one model than another?",
          options: ["One model is slower", "Each model family learned a different set of token “bricks”", "The internet was busy", "Longer sentences are always cheaper"],
          answer: 1,
          why: "Different tokenizers split text differently, so token counts vary between model families.",
        },
      ],
    },

    {
      id: "context-windows",
      title: "Context windows",
      time: 5,
      tagline: "How much the model can hold in mind at once.",
      lesson:
        "<p>The <span class='term'>context window</span> is the <b>maximum amount of text (in tokens) the model can look at in a single go</b>. It includes everything: your question, the chat history, any documents you pasted, the system instructions, <i>and</i> the answer it's writing.</p>" +
        "<p>Context window sizes vary widely: common frontier models range from 128,000 to 200,000 tokens, and some reach over a million. Whatever the number, it's the total budget for everything in the conversation at that moment. Go over it, and the oldest content has to be dropped or summarised — which is why long chats sometimes “forget” what you said at the start.</p>" +
        "<p>Bigger windows let you paste whole books or codebases. But bigger isn't free: more context usually means slower responses and higher cost, and models can still lose track of details buried in the middle of a very long input.</p>",
      analogy:
        "<p>Think of a desk. The context window is how big your desk is. You can only spread out so many papers at once. A bigger desk lets you work with more documents — but if it overflows, papers fall off the edge, and that's the part the model forgets.</p>",
      mentalModel:
        "The context window is the model's desk size. Everything it's using right now — question, history, answer — has to fit on the desk at the same time.",
      mistakes: [
        "Thinking the window is just for your question. The reply you're waiting for also takes up space in the same budget.",
        "Believing a huge window means perfect memory. Models can still miss details lost in the middle of long text.",
        "Pasting everything “just in case.” More context costs more and can dilute the model's focus.",
      ],
      exercise: {
        goal: "Watch a context window fill up and overflow.",
        steps: [
          "Start a fresh chat and tell the AI a secret word, e.g. “Remember my code word is BANANA.”",
          "Have a long back-and-forth on an unrelated topic for many messages.",
          "Much later, ask “What was my code word?” and see if it still remembers.",
          "Note roughly how long the chat got before memory started slipping.",
        ],
        stretch: "Look up the context window size of two models you use. Convert tokens to rough words (×0.75) to picture how many pages that is.",
      },
      quiz: [
        {
          q: "What counts toward the context window?",
          options: ["Only your latest question", "Your question, the history, pasted text, instructions, AND the reply", "Only the AI's answers", "Only documents you upload"],
          answer: 1,
          why: "It's the total budget for everything in play at that moment, including the answer being generated.",
        },
        {
          q: "Why do long conversations sometimes “forget” the beginning?",
          options: ["The model gets bored", "Old tokens fall outside the context window and get dropped", "The internet resets", "It's a bug that should be reported"],
          answer: 1,
          why: "Once the conversation exceeds the window, the oldest content must be trimmed or summarised to make room.",
        },
      ],
    },

    {
      id: "embeddings",
      title: "Embeddings",
      time: 5,
      tagline: "Turning meaning into a list of numbers.",
      lesson:
        "<p>An <span class='term'>embedding</span> is a way to turn a piece of text into a <b>list of numbers that captures its meaning</b>. Each token (and often whole sentences) gets placed as a point in a huge invisible space.</p>" +
        "<p>The magic rule of that space: <b>things with similar meaning sit close together</b>. “Dog” and “puppy” land near each other. “Dog” and “bicycle” land far apart. The numbers aren't random — they encode relationships.</p>" +
        "<p>This is what lets computers do “meaning math.” You can ask “which of these 10,000 documents is closest in meaning to this question?” by comparing distances between points. That single idea powers search, recommendations, and the “R” in RAG (coming later).</p>" +
        "<p>You don't need to read the numbers yourself. Just hold the picture: <b>meaning becomes location</b>.</p>" +
        "<p>When you need an embedding model for a project, common starting points are <b>text-embedding-3-small</b> (fast, low-cost, via OpenAI's API) and <b>nomic-embed-text</b> (free and runs locally through Ollama). Always use the same model for all your documents <i>and</i> your queries.</p>",
      analogy:
        "<p>Think of a giant library where books aren't shelved alphabetically, but <i>by what they're about</i>. Cookbooks cluster in one corner, horror novels in another. Embeddings put text on this map of meaning — close together means similar, far apart means different.</p>",
      mentalModel:
        "An embedding is a coordinate for meaning. Similar ideas get similar coordinates, so “how related are these?” becomes “how close are these points?”",
      mistakes: [
        "Thinking embeddings store the original text. They store a <b>meaning fingerprint</b>, not the words themselves.",
        "Expecting them to be human-readable. The individual numbers mean nothing to you — only distances between them matter.",
        "Mixing embeddings from different models. Coordinates from model A aren't comparable to model B's; always use one consistent embedder.",
      ],
      exercise: {
        goal: "Build intuition for “meaning as distance” without code.",
        steps: [
          "Write down 6 words: e.g. cat, kitten, tiger, car, truck, banana.",
          "Group them by meaning and draw them on paper, putting similar words physically closer.",
          "Notice you just made a tiny hand-drawn embedding space.",
          "Ask: which pairs are closest? Those are the pairs a real embedding model would also place near each other.",
        ],
        stretch: "Find a free “embedding playground” online, paste a few sentences, and look at the similarity scores it gives between them.",
      },
      quiz: [
        {
          q: "What does an embedding represent?",
          options: ["The exact original words", "A list of numbers capturing meaning, where similar meanings are close together", "The file size of the text", "A password for the text"],
          answer: 1,
          why: "Embeddings map meaning to coordinates, so similarity becomes closeness in that space.",
        },
        {
          q: "Why shouldn't you mix embeddings from two different models?",
          options: ["It's against the rules", "Their coordinate systems differ, so distances aren't comparable", "It costs more money", "Models get jealous"],
          answer: 1,
          why: "Each model defines its own space; coordinates from one aren't meaningful in another's.",
        },
      ],
    },

    {
      id: "transformers",
      title: "Transformers",
      time: 5,
      tagline: "The engine design behind nearly every modern LLM.",
      lesson:
        "<p>The <span class='term'>Transformer</span> is the <b>architecture</b> — the basic engine design — that almost every modern LLM is built on. When you hear “GPT,” the “T” is literally Transformer.</p>" +
        "<p>Older language systems read text strictly left to right, one word at a time, and struggled to connect words that were far apart. The Transformer's breakthrough was to look at <b>all the words at once</b> and figure out which ones matter to each other — no matter how far apart they sit.</p>" +
        "<p>It does this in stacked <b>layers</b>. Each layer lets every token “look around” at the others and update its understanding. Stack dozens of these layers and the model builds up a rich sense of what the text means before predicting the next token.</p>" +
        "<p>The specific trick that makes this work is called <b>attention</b> — that's the very next topic, so don't worry if it's still fuzzy.</p>",
      analogy:
        "<p>Imagine reading a mystery novel. Instead of reading word by word and forgetting clues, you keep the whole page in view and constantly connect “the butler” on line 1 to “he” on line 20. A Transformer reads with that whole-page awareness, all at once.</p>",
      mentalModel:
        "A Transformer is a stack of layers where every word can look at every other word at the same time. Width of view + depth of layers = understanding.",
      mistakes: [
        "Thinking Transformers read strictly left-to-right like older models. Their key move is seeing everything at once.",
        "Confusing the <b>architecture</b> (Transformer) with a specific <b>model</b> (like a particular GPT). The architecture is the blueprint; the model is one building made from it.",
        "Believing more layers always helps. Depth helps up to a point, but also costs speed, memory, and money.",
      ],
      exercise: {
        goal: "Explain the core idea back in your own words.",
        steps: [
          "Without notes, write 2 sentences: what problem did Transformers solve that older models struggled with?",
          "Draw a simple stack of 3 boxes labelled “layer” with arrows flowing up.",
          "On the side, write the word “attention” and a question mark — you'll fill that in next topic.",
          "Re-read your explanation tomorrow and see if it still makes sense (a great test of real understanding).",
        ],
        stretch: "Look up the title of the original 2017 Transformer paper. The title itself names the key ingredient you're about to learn.",
      },
      quiz: [
        {
          q: "What was the Transformer's big breakthrough?",
          options: ["Reading text faster left-to-right", "Letting every word consider every other word at once", "Making models smaller", "Removing the need for training"],
          answer: 1,
          why: "Transformers process all tokens together and learn which ones relate, even across long distances.",
        },
        {
          q: "What's the difference between a Transformer and a model like GPT?",
          options: ["They're the same thing", "Transformer is the blueprint; a specific model is one building made from it", "GPT is older", "Transformers can't be trained"],
          answer: 1,
          why: "The Transformer is the architecture; an individual model is a trained instance of that design.",
        },
      ],
    },

    {
      id: "attention",
      title: "Attention mechanism",
      time: 5,
      tagline: "How the model decides which words matter to each word.",
      lesson:
        "<p><span class='term'>Attention</span> is the part of the Transformer that lets each word decide <b>which other words to focus on</b> when figuring out its meaning. It's the secret sauce.</p>" +
        "<p>Take the sentence: “The trophy didn't fit in the suitcase because <b>it</b> was too big.” What does “it” mean — the trophy or the suitcase? You know it's the trophy. Attention is how the model works that out: when processing “it,” it looks back, weighs the other words, and “pays attention” most strongly to “trophy.”</p>" +
        "<p>Every word does this for every other word, producing a web of “how much should I focus on you” scores. Strong connections get high scores; irrelevant words get low ones. This happens in parallel, many times per layer.</p>" +
        "<p>You'll hear the phrase <b>self-attention</b> — that just means the words are attending to <i>other words in the same text</i>, rather than to some outside source.</p>",
      analogy:
        "<p>Picture a group conversation. When someone says “it,” you instantly glance at the person or object they meant, ignoring everyone else for a moment. Attention is that glance — automatic, instant, and pointed at whatever is most relevant right now.</p>",
      mentalModel:
        "Attention = a spotlight. For every word, the model shines a spotlight on the other words that matter most to it, and dims the rest.",
      mistakes: [
        "Thinking attention is one fixed rule. It's learned, and there are many “attention heads” looking for different kinds of relationships at once.",
        "Assuming it only looks backward. In an LLM generating text it looks at earlier tokens, but the mechanism itself can connect words in any direction within the input.",
        "Believing more attention = more accuracy. It's a mechanism, not a guarantee; it can focus on the wrong word and produce mistakes.",
      ],
      exercise: {
        goal: "Trace attention by hand on a tricky sentence.",
        steps: [
          "Write: “The city council refused the marchers a permit because they feared violence.”",
          "Circle the word “they.” Decide what it refers to — the council or the marchers.",
          "List which other words helped you decide (e.g. “feared,” “refused”).",
          "That list is roughly what attention would score highly. You just did self-attention by hand.",
        ],
        stretch: "Change “feared” to “advocated” and notice how “they” now points to a different group. Small word, big shift — attention has to catch that.",
      },
      quiz: [
        {
          q: "What does the attention mechanism do?",
          options: ["Stores text on disk", "Lets each word focus on the other words most relevant to it", "Translates languages", "Counts tokens"],
          answer: 1,
          why: "Attention scores how much each word should focus on every other word, like a spotlight on what's relevant.",
        },
        {
          q: "What does “self-attention” mean?",
          options: ["The model attends to outside databases", "Words attend to other words within the same text", "The model rests", "Attention turns itself off"],
          answer: 1,
          why: "Self-attention means tokens relate to other tokens in the same input, not to an external source.",
        },
      ],
    },

    {
      id: "parameters",
      title: "Parameters",
      time: 4,
      tagline: "The billions of tiny dials that hold what the model learned.",
      lesson:
        "<p><span class='term'>Parameters</span> are the <b>adjustable numbers inside a model</b> — the dials that get tuned during training. When you read “7B” or “70B,” the B means billion, and the number is how many parameters the model has.</p>" +
        "<p>Each parameter on its own is meaningless — just a number. But together, billions of them encode every pattern the model picked up: grammar, facts, reasoning habits, tone. Training is the process of nudging all these dials until the outputs look right.</p>" +
        "<p>More parameters generally means more capacity to learn nuance — but also more memory needed to run it, slower responses, and higher cost. A 70B model is powerful but hungry; a 7B model is lighter and may run on your laptop.</p>" +
        "<p>Crucially, parameter count is only one factor. A well-trained smaller model can outperform a poorly-trained larger one. Bigger is a starting hint, not a promise.</p>",
      analogy:
        "<p>Imagine a giant mixing board in a music studio with billions of sliders. Each slider alone does almost nothing. But set them all just right and you get a perfectly balanced song. Parameters are those sliders; training is the long process of setting them.</p>",
      mentalModel:
        "Parameters are the dials; training sets the dials; the “knowledge” is the final dial positions. Count tells you capacity and cost — not guaranteed quality.",
      mistakes: [
        "Treating parameter count as a quality score. Data quality and training method matter just as much.",
        "Forgetting parameters drive <b>hardware needs</b>. Roughly, more parameters = more memory (VRAM) to run.",
        "Confusing parameters (learned during training) with <b>tokens</b> (the text units at runtime). Different things entirely.",
      ],
      exercise: {
        goal: "Connect parameter count to real-world feasibility.",
        steps: [
          "List 3 models you've heard of and find their parameter counts (e.g. 3B, 8B, 70B).",
          "For each, search “VRAM needed to run [model]” and jot down the rough number.",
          "Decide which ones could plausibly run on a normal laptop versus needing a big GPU.",
          "Write one line: which would you pick for a quick personal project, and why?",
        ],
        stretch: "Find an example where a smaller model beats a larger one on a specific benchmark. Note what made the difference (usually data or fine-tuning).",
      },
      quiz: [
        {
          q: "What does the “7B” in a model name refer to?",
          options: ["7 billion tokens of context", "7 billion parameters (the learned dials)", "7 benchmarks passed", "7 GB download size exactly"],
          answer: 1,
          why: "B means billion, and it counts parameters — the adjustable numbers tuned during training.",
        },
        {
          q: "Is a model with more parameters always better?",
          options: ["Yes, always", "No — data quality and training method matter too, and bigger costs more to run", "Only on Mondays", "Only for images"],
          answer: 1,
          why: "Count signals capacity and cost, but a well-trained smaller model can beat a poorly-trained larger one.",
        },
      ],
    },

    {
      id: "training-vs-inference",
      title: "Training vs inference",
      time: 4,
      tagline: "Two totally different phases people constantly mix up.",
      lesson:
        "<p>There are two separate moments in a model's life, and keeping them apart will save you endless confusion.</p>" +
        "<p><b>Training</b> is the school years. The model is shown huge amounts of data and slowly adjusts its parameters to get better. It's expensive, slow, and done rarely — often once, by the people who built the model.</p>" +
        "<p><b>Inference</b> is the working life. The training is over, the parameters are frozen, and now the model just <b>uses</b> what it learned to answer your prompt. Every time you chat with an AI, you're doing inference. It's relatively fast and cheap per use.</p>" +
        "<p>Fine-tuning, which you'll learn later, is like sending an already-graduated model back for a short, focused course — a small bit of extra training on top of the original.</p>",
      analogy:
        "<p>Think of a chef. <b>Training</b> is the years at culinary school — slow, costly, transformative. <b>Inference</b> is a Tuesday night service — they're not learning new techniques, they're cooking with what they already know, fast. You eat at inference time, not at school.</p>",
      mentalModel:
        "Training = learning (rare, expensive, changes the model). Inference = using (constant, cheaper, model stays frozen).",
      mistakes: [
        "Thinking the model trains while you chat. Chatting is inference; the model isn't changing.",
        "Underestimating the cost gap. Training a big model can cost millions; a single inference call costs a fraction of a cent.",
        "Assuming fine-tuning is the same as full training. Fine-tuning is a small, targeted top-up, not starting from scratch.",
      ],
      exercise: {
        goal: "Sort activities into the right bucket.",
        steps: [
          "Make two columns: TRAINING and INFERENCE.",
          "Place these items: “asking a chatbot a question”, “teaching a model your company's tone over weeks”, “generating an image from a prompt”, “adjusting billions of parameters on a supercomputer.”",
          "Check your answers: questions and generations are inference; the other two are training.",
          "Write one sentence on why the cost of each bucket is so different.",
        ],
        stretch: "Look up a rough figure for how much it cost to train a well-known large model, then compare it to the price of one API call. Sit with that gap.",
      },
      quiz: [
        {
          q: "When you ask ChatGPT a question, which phase is happening?",
          options: ["Training", "Inference", "Both at once", "Neither"],
          answer: 1,
          why: "You're using the frozen, already-trained model — that's inference.",
        },
        {
          q: "What's the key difference between training and inference?",
          options: ["Training uses the model; inference builds it", "Training changes the model's parameters; inference just uses them frozen", "They're the same", "Inference is more expensive than training"],
          answer: 1,
          why: "Training adjusts parameters (rare, costly). Inference uses the frozen model (constant, cheaper).",
        },
      ],
    },

    {
      id: "open-vs-closed",
      title: "Open-source vs closed-source models",
      time: 5,
      tagline: "Who holds the keys — and why it changes everything you can do.",
      lesson:
        "<p>Models come in two broad flavours, and the difference shapes cost, privacy, and control.</p>" +
        "<p><b>Closed-source</b> models (like the ones behind many big-name chat apps) live on someone else's servers. You send your text to them over the internet and get an answer back. You can't download the model or see inside it. You're renting access, usually paying per token.</p>" +
        "<p><b>Open-source</b> (more precisely, <b>open-weight</b>) models can be downloaded and run on your own computer or server. You get the actual parameters. That means full privacy, no per-use fee, the ability to fine-tune freely, and offline use — at the cost of needing your own hardware and setup.</p>" +
        "<p>Neither is “better” in general. Closed models are often the most capable and the easiest to start with. Open models win on control, privacy, predictable cost, and customisation. Much of this course's hands-on work uses open models because you can actually touch them.</p>",
      analogy:
        "<p>Closed-source is like taking a taxi: easy, no maintenance, you pay each ride, and the driver knows where you went. Open-source is like owning a car: upfront effort and upkeep, but total control, privacy, and no per-trip charge. Right choice depends on the journey.</p>",
      mentalModel:
        "Closed = renting a powerful black box over the internet. Open = owning the actual model on your own machine. Trade convenience against control and privacy.",
      mistakes: [
        "Assuming “open-source” means free of all cost. It's free to download, but <b>you</b> pay for the hardware and electricity to run it.",
        "Sending private or sensitive data to a closed model without checking its data policy.",
        "Thinking open models are always weaker. Top open models are very capable, and the gap keeps shrinking.",
        "Assuming all open models allow any use. Popular models including Llama use <b>community licences</b> that restrict commercial use above certain scales. Always check the licence before building a product.",
      ],
      exercise: {
        goal: "Decide which type fits a real scenario.",
        steps: [
          "Write down a project idea you'd genuinely like to build with AI.",
          "List its needs: privacy? budget? offline use? top-tier quality? easy start?",
          "Match those needs to open vs closed using the trade-offs above.",
          "Write one sentence stating your choice and the single biggest reason for it.",
        ],
        stretch: "Browse Hugging Face (you'll learn it later) and find one open model you could realistically download. Note its size and licence.",
      },
      quiz: [
        {
          q: "What's the main practical advantage of an open-weight model?",
          options: ["It's always smarter", "You can download and run it yourself — privacy, control, and no per-use fee", "It needs no hardware", "It can't be fine-tuned"],
          answer: 1,
          why: "You hold the actual parameters, so you control privacy, cost, customisation, and offline use.",
        },
        {
          q: "Is open-source AI completely free?",
          options: ["Yes, no costs at all", "The model is free to download, but you pay for hardware and electricity to run it", "Only the first month", "No, it always costs per token"],
          answer: 1,
          why: "There's no licence fee, but running it yourself has real hardware and energy costs.",
        },
      ],
    },

  ],
});
