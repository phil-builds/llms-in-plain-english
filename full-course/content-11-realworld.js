/* Part 11 — Real-World Skills */
window.COURSE.push({
  id: "realworld",
  title: "Real-World Skills",
  blurb: "Putting it all together to build things people use.",
  topics: [

    {
      id: "building-chatbots",
      title: "Building chatbots",
      time: 5,
      tagline: "Your first real product — and the patterns behind it.",
      lesson:
        "<p>A <span class='term'>chatbot</span> is the most common first AI product, and it ties together much of this course. At its heart it's simple: take the user's message, add context, call a model, show the reply. The craft is in the layers around that.</p>" +
        "<p>The key ingredients you already know: a <b>system prompt</b> (its role and rules), the <b>conversation history</b> (so it remembers within the chat), <b>RAG</b> (so it can answer from your documents), and maybe <b>tools</b> (so it can act or fetch live data). Streaming the reply makes it feel responsive.</p>" +
        "<p>Good chatbots also handle the unglamorous parts: staying within the context window (trimming or summarising old messages), graceful errors, sensible limits, and a clear scope so it doesn't promise things it can't do.</p>" +
        "<p>Start tiny: a single focused chatbot (answers about <i>one</i> topic, from <i>your</i> docs) is far more useful and reliable than a vague “do anything” bot. Nail one job, then expand.</p>",
      analogy:
        "<p>Building a chatbot is like hiring and onboarding a receptionist. You give them a job description (system prompt), a binder of company info (RAG), a phone to reach other departments (tools), and a notebook for the current conversation (history). The model is the person; you build their workplace.</p>",
      mentalModel:
        "Chatbot = model + system prompt + history + (RAG) + (tools) + streaming, wrapped in scope and limits. The model is small; the surrounding setup is the product. Start focused.",
      mistakes: [
        "Building a vague “does everything” bot. Narrow scope is more useful and far more reliable.",
        "Ignoring context-window limits, so long chats break or forget. Trim or summarise.",
        "Skipping error handling and limits, so it falls over in real use.",
      ],
      exercise: {
        goal: "Spec a focused chatbot.",
        steps: [
          "Pick one narrow job (answer questions about a specific manual).",
          "Write its system prompt, and list what documents RAG would use.",
          "Decide if it needs any tools, and how it handles “I don't know.”",
          "Note how you'll keep long chats inside the context window.",
        ],
        stretch: "Sketch the message flow: user input → add history + retrieved docs → model → streamed reply. Label each part with a concept you learned.",
      },
      quiz: [
        {
          q: "What's the smart way to start building a chatbot?",
          options: ["Make it do everything", "Start narrow — one focused job done reliably", "Skip the system prompt", "Avoid RAG entirely"],
          answer: 1,
          why: "A focused bot on one task is more useful and reliable than a vague do-anything one.",
        },
        {
          q: "Which pieces typically surround the model in a chatbot?",
          options: ["Nothing — just the model", "System prompt, history, optional RAG and tools, plus limits", "Only a GPU", "Only a dataset"],
          answer: 1,
          why: "The product is the model plus its system prompt, memory, retrieval, tools, and guardrails.",
        },
      ],
    },

    {
      id: "building-copilots",
      title: "Building AI copilots",
      time: 5,
      tagline: "AI that assists inside a task, not in a separate chat.",
      lesson:
        "<p>An <span class='term'>AI copilot</span> is AI <b>embedded inside a tool to assist you as you work</b> — suggesting, drafting, and helping in context, rather than in a separate chat window. Think autocomplete in a code editor, “help me write” in a doc, or smart suggestions in a design app.</p>" +
        "<p>The difference from a chatbot is <b>context and integration</b>. A copilot sees what you're doing — your current document, code, or selection — and offers help right there. It's a sidekick that keeps you in control: you accept, edit, or reject its suggestions.</p>" +
        "<p>Good copilots are fast (often using smaller/coding models for instant suggestions), unobtrusive (suggest, don't hijack), and aware of the surrounding context (the file, the project, the user's intent). They blend RAG-like context-gathering with tight integration into the app.</p>" +
        "<p>The design mindset: the human stays the pilot; the AI is the copilot. It accelerates, but never takes the controls without consent. That framing — assist, don't replace — is what makes copilots feel trustworthy and useful.</p>",
      analogy:
        "<p>A copilot in a plane doesn't fly instead of the pilot — they hand over the right chart at the right moment, suggest a heading, and catch mistakes, while the pilot stays in command. An AI copilot is that: helpful, contextual, and always leaving you in charge.</p>",
      mentalModel:
        "Copilot = in-context AI assistance embedded in your tool. Sees what you're doing, suggests in place, keeps you in control. Fast, unobtrusive, context-aware — assist, not replace.",
      mistakes: [
        "Making the copilot take over instead of suggest. Keep the human in control.",
        "Ignoring context — a copilot blind to your current work feels useless.",
        "Using a slow model for instant in-line help, breaking the flow. Speed matters here.",
      ],
      exercise: {
        goal: "Design a copilot for a tool you use.",
        steps: [
          "Pick an app you use a lot (notes, email, a code editor).",
          "Describe one in-context help it could offer as you work.",
          "Decide what context it needs (the current text? the file? a selection?).",
          "State how the user accepts or rejects its suggestion — keeping them in control.",
        ],
        stretch: "Compare your copilot idea to a chatbot version of the same help. Note why in-context assistance feels better here.",
      },
      quiz: [
        {
          q: "How does a copilot differ from a chatbot?",
          options: ["It's slower", "It's embedded in your tool and assists in-context as you work", "It can't use models", "It replaces the user entirely"],
          answer: 1,
          why: "Copilots help in place, aware of your current work, rather than in a separate chat window.",
        },
        {
          q: "What's the guiding principle for copilots?",
          options: ["Take over the task", "Assist while keeping the human in control — suggest, don't hijack", "Hide all suggestions", "Ignore context"],
          answer: 1,
          why: "The human stays the pilot; the AI accelerates without taking the controls.",
        },
      ],
    },

    {
      id: "ai-automation",
      title: "AI automation",
      time: 5,
      tagline: "Letting AI handle repetitive work end to end.",
      lesson:
        "<p><span class='term'>AI automation</span> is using AI to <b>handle repetitive tasks automatically</b>, often with little or no human involvement per task. Think: sorting incoming emails, summarising documents as they arrive, tagging support tickets, or drafting routine replies.</p>" +
        "<p>It usually combines what you've learned: a <b>trigger</b> (something happens — an email arrives), a <b>process</b> (AI reads, classifies, or drafts, maybe using tools or RAG), and an <b>action</b> (file it, reply, notify a human). It's an agentic workflow aimed at a recurring job.</p>" +
        "<p>The value is leverage: automate a task done 500 times a day and you free real human hours. But the design rule is important — automate the <b>predictable, high-volume, low-risk</b> parts, and route anything uncertain or sensitive to a human.</p>" +
        "<p>Start by finding a boring, repetitive task with clear rules. Automate just that one well, with a human checkpoint for edge cases. Reliable narrow automation beats an ambitious system that fails unpredictably.</p>",
      analogy:
        "<p>It's like setting up an assembly-line robot for the one repetitive motion it does perfectly, while humans handle the tricky, judgement-heavy steps. You don't automate the whole factory at once — you automate the dull, repeatable task and keep people for the rest.</p>",
      mentalModel:
        "AI automation = trigger → AI process → action, for a recurring task. Automate predictable, high-volume, low-risk work; route uncertainty to humans. Start narrow and reliable.",
      mistakes: [
        "Automating risky or ambiguous tasks fully, with no human checkpoint.",
        "Trying to automate everything at once instead of one well-scoped task.",
        "No monitoring — automation needs to flag when it's unsure or something breaks.",
      ],
      exercise: {
        goal: "Find and design one automation.",
        steps: [
          "List a repetitive task you or your team do often with fairly clear rules.",
          "Define its trigger, the AI process, and the resulting action.",
          "Decide which cases must route to a human instead.",
          "Note how you'd check it's working (a log, a weekly review).",
        ],
        stretch: "Map the task on the risk scale: what's the worst that happens if the AI gets one wrong, and what safeguard covers it?",
      },
      quiz: [
        {
          q: "What's the basic shape of an AI automation?",
          options: ["A single chat message", "Trigger → AI process → action, for a recurring task", "Training a model", "A benchmark"],
          answer: 1,
          why: "Automations respond to a trigger, process with AI, and take an action — an agentic workflow for a recurring job.",
        },
        {
          q: "Which work should you automate first?",
          options: ["Risky, ambiguous decisions", "Predictable, high-volume, low-risk tasks, with humans for edge cases", "Everything at once", "Nothing ever"],
          answer: 1,
          why: "Automate the safe, repetitive, high-volume parts and route uncertainty to humans.",
        },
      ],
    },

    {
      id: "ai-saas-workflows",
      title: "AI SaaS workflows",
      time: 5,
      tagline: "Turning AI features into a real software product.",
      lesson:
        "<p><span class='term'>AI SaaS</span> means building <b>software-as-a-service products powered by AI</b> — apps people sign up for and pay to use, where AI is a core feature. This topic is about the extra concerns that turn a clever AI demo into a sustainable business.</p>" +
        "<p>Beyond the model, a real AI product must handle: <b>multiple users</b> (each with their own data, kept separate and private), <b>cost control</b> (per-user token budgets so a few heavy users don't blow the bill), <b>reliability</b> (it can't just break), and <b>pricing</b> that covers your token costs with margin.</p>" +
        "<p>A recurring trap: AI costs scale with usage, unlike normal software. If you charge a flat fee but some users hammer the model, you can lose money on them. Smart AI SaaS designs pricing and limits around real token economics from day one.</p>" +
        "<p>The winning mindset: the AI is a feature in service of a real user problem, wrapped in solid product engineering — accounts, data handling, billing, support, and trust. The model is necessary but nowhere near sufficient.</p>",
      analogy:
        "<p>A great espresso shot (the AI) doesn't make a café. You also need tables, staff, a till, hygiene, and prices that cover the beans. AI SaaS is building the whole café around the shot — and making sure each cup is sold for more than it costs to pour.</p>",
      mentalModel:
        "AI SaaS = AI feature + real product engineering (multi-user, privacy, reliability) + pricing built on token economics. Usage-based costs mean pricing and limits matter from day one.",
      mistakes: [
        "Flat pricing that ignores token costs, so heavy users make you lose money.",
        "Mixing users' data or leaking it — privacy and separation are non-negotiable.",
        "Treating the model as the whole product and neglecting reliability, billing, and support.",
      ],
      exercise: {
        goal: "Pressure-test a tiny AI SaaS idea.",
        steps: [
          "Describe a simple AI product and the problem it solves.",
          "Estimate its token cost per active user per month (reuse cost-per-token thinking).",
          "Pick a price that covers that cost with margin, and a usage limit to protect it.",
          "List one privacy rule for keeping users' data separate.",
        ],
        stretch: "Imagine your heaviest 5% of users using 10× the average. Check whether your pricing still makes money on them.",
      },
      quiz: [
        {
          q: "What extra concern is critical for AI SaaS versus normal software?",
          options: ["Font choice", "Costs scale with usage, so pricing and limits must fit token economics", "Nothing is different", "Only the logo"],
          answer: 1,
          why: "Unlike flat-cost software, AI usage drives variable token costs, so pricing must account for it.",
        },
        {
          q: "What's the right mindset for an AI product?",
          options: ["The model is the entire product", "AI is a feature solving a real problem, wrapped in solid product engineering", "Ignore privacy", "Charge nothing"],
          answer: 1,
          why: "A sustainable product surrounds the model with accounts, privacy, reliability, billing, and trust.",
        },
      ],
    },

    {
      id: "ai-coding-workflows",
      title: "AI coding workflows",
      time: 5,
      tagline: "Using AI to build software faster — responsibly.",
      lesson:
        "<p><span class='term'>AI coding workflows</span> are the practical habits for <b>using AI to write and improve software</b> well. AI can dramatically speed up coding, but only if you work with it deliberately rather than blindly pasting its output.</p>" +
        "<p>Effective habits: give the AI <b>clear, specific tasks</b> with context (the relevant code, the goal, constraints); <b>review every change</b> before accepting it; work in <b>small steps</b> you can verify; and always <b>test</b> what the AI produces. Treat it as a fast, capable junior who needs supervision.</p>" +
        "<p>Powerful patterns: ask it to explain unfamiliar code, draft a first version you then refine, write tests, or spot bugs — but you remain the senior engineer who decides what ships. For larger context, point it at the right files (RAG-like) rather than hoping it guesses your codebase.</p>" +
        "<p>The trap to avoid is “vibe-accepting” code you don't understand. AI-written code can be subtly wrong or insecure. Understanding what you ship is non-negotiable — speed is worthless if you can't trust the result.</p>",
      analogy:
        "<p>It's like working with a fast, eager junior developer. They produce a lot quickly, which is great — but you review their pull requests, ask them to explain choices, and test before merging. Trust, but verify. The senior judgement stays yours.</p>",
      mentalModel:
        "AI coding workflow = clear tasks + context + small steps + review + tests. AI is a fast junior; you're the senior who understands and approves everything that ships.",
      mistakes: [
        "Accepting code you don't understand. If you can't explain it, you can't trust it.",
        "Giving vague tasks with no context, then getting generic or wrong code.",
        "Skipping tests because “the AI wrote it” — that's exactly when to test.",
      ],
      exercise: {
        goal: "Practice a disciplined AI coding loop.",
        steps: [
          "Pick a small coding task and write a clear, specific prompt with context.",
          "Get a draft, then read every line and ask the AI to explain anything unclear.",
          "Make one small change at a time and test after each.",
          "Note one bug or weakness you caught by reviewing rather than trusting.",
        ],
        stretch: "Ask the AI to write tests for its own code, then review whether the tests actually cover the tricky cases.",
      },
      quiz: [
        {
          q: "What's the golden rule of AI coding workflows?",
          options: ["Accept all output instantly", "Review and understand everything before it ships — trust but verify", "Never use AI for code", "Skip testing"],
          answer: 1,
          why: "AI code can be subtly wrong or insecure, so understanding and verifying it is essential.",
        },
        {
          q: "How should you treat an AI coding assistant?",
          options: ["As an infallible expert", "As a fast junior developer who needs clear tasks and supervision", "As a replacement for testing", "As a database"],
          answer: 1,
          why: "It accelerates work but needs context, review, and tests — you stay the senior engineer.",
        },
      ],
    },

    {
      id: "ai-orchestration",
      title: "AI orchestration systems",
      time: 5,
      tagline: "Coordinating many AI pieces into one reliable system.",
      lesson:
        "<p><span class='term'>AI orchestration</span> is the practice of <b>coordinating multiple AI components, tools, and steps into one coherent, reliable system</b>. As your projects grow beyond a single model call, orchestration is what holds the moving parts together.</p>" +
        "<p>A real system often involves several pieces: different models for different jobs, RAG for knowledge, tools for actions, memory for context, and multiple workflow steps. Orchestration decides <b>what runs when, how data flows between parts, what happens on failure, and where humans step in</b>.</p>" +
        "<p>Think of it as the conductor of an orchestra. Each musician (model, tool, retrieval step) is skilled, but without a conductor coordinating them, you get noise. Orchestration provides the timing, routing, and control that turn capable parts into a dependable whole.</p>" +
        "<p>Practical concerns: handling errors and retries, logging what happened (so you can debug), controlling cost across many calls, and keeping the flow understandable. Many tools and frameworks exist to help, but the core skill is <b>thinking clearly about how the pieces connect</b>.</p>",
      analogy:
        "<p>One musician is a model; an orchestra is a real AI system. Orchestration is the conductor — deciding who plays when, keeping everyone in time, and adjusting when something goes wrong. Without it, even brilliant musicians produce chaos.</p>",
      mentalModel:
        "AI orchestration = the conductor coordinating models, tools, RAG, and steps into a reliable whole. Manages flow, failures, cost, logging, and human checkpoints across the system.",
      mistakes: [
        "Letting a system sprawl with no clear flow, making it impossible to debug.",
        "No error handling or logging, so failures are silent and mysterious.",
        "Ignoring cost across many chained calls, which can balloon quietly.",
      ],
      exercise: {
        goal: "Orchestrate a small multi-part system.",
        steps: [
          "Pick a task needing 2+ AI pieces (e.g. retrieve docs, then summarise, then email).",
          "Draw the flow: what runs first, what data passes to the next step.",
          "Mark where it could fail and what should happen then (retry? alert a human?).",
          "Note where you'd add logging to debug later.",
        ],
        stretch: "Add a cost note to each step and identify the most expensive part of your flow.",
      },
      quiz: [
        {
          q: "What is AI orchestration?",
          options: ["Training one model", "Coordinating multiple AI components, tools, and steps into one reliable system", "A quantization method", "A benchmark"],
          answer: 1,
          why: "Orchestration is the conductor that manages flow, failures, and coordination across many parts.",
        },
        {
          q: "Which is an orchestration concern?",
          options: ["Screen colour", "Error handling, logging, cost control, and data flow between steps", "Font size", "The model's name"],
          answer: 1,
          why: "Holding many parts together reliably means managing failures, visibility, cost, and routing.",
        },
      ],
    },

    {
      id: "ai-product-thinking",
      title: "AI product thinking",
      time: 6,
      tagline: "The mindset that decides whether your AI is actually worth building.",
      lesson:
        "<p><span class='term'>AI product thinking</span> is the most important skill in this whole course, and it's not technical. It's the habit of asking: <b>does this AI actually solve a real problem for a real person, better than the alternatives?</b></p>" +
        "<p>It's easy to build AI for its own sake. Product thinking flips it: start from the <b>user's problem</b>, not the technology. Ask what they're really trying to achieve, whether AI genuinely helps, and whether a simpler solution would do. Sometimes the best answer is no AI at all.</p>" +
        "<p>Key questions to keep asking: Who is this for? What problem does it solve? Is AI the right tool, or just trendy? What happens when the AI gets it wrong (and it will)? Is it reliable, affordable, and trustworthy enough for real use? Does it respect privacy?</p>" +
        "<p>Everything technical in this course — fine-tuning, RAG, agents, evaluation — is in service of this. The engineering makes things <i>possible</i>; product thinking makes them <i>worth doing</i>. Master both, and you can build AI that people genuinely value.</p>",
      analogy:
        "<p>A brilliant engine doesn't make a car people want — they want to get somewhere comfortably and safely. Product thinking is starting from “where does the person need to go?” and only then choosing the engine. Tech for its own sake is an engine bolted to nothing.</p>",
      mentalModel:
        "AI product thinking = start from the user's real problem, not the tech. Ask if AI truly helps, what happens when it's wrong, and whether it's reliable, affordable, and trustworthy. Engineering enables; product thinking justifies.",
      mistakes: [
        "Building AI because it's exciting, without a real problem it solves better than alternatives.",
        "Ignoring failure cases — real products must handle the model being wrong gracefully.",
        "Forgetting trust: privacy, reliability, and honesty are features, not afterthoughts.",
      ],
      exercise: {
        goal: "Apply product thinking to your own idea.",
        steps: [
          "Write down an AI idea you have, then the <b>user problem</b> behind it.",
          "Ask honestly: does AI solve this better than a simpler approach? Why?",
          "Describe what happens when the AI gets it wrong, and how you'd handle it.",
          "Decide: is this worth building? Write a one-line verdict and your main reason.",
        ],
        stretch: "Pick a popular AI product and reverse-engineer its product thinking: whose problem, why AI, and how it handles being wrong.",
      },
      quiz: [
        {
          q: "What does AI product thinking start from?",
          options: ["The coolest technology", "The user's real problem, then whether AI genuinely helps", "The biggest model", "The leaderboard"],
          answer: 1,
          why: "Good product thinking starts with the user's problem and asks if AI is truly the right solution.",
        },
        {
          q: "Why is planning for the AI being wrong essential?",
          options: ["It never happens", "Models will make mistakes, so real products must handle failure gracefully", "It increases tokens", "It's only about speed"],
          answer: 1,
          why: "Since models can be confidently wrong, trustworthy products design for failure cases up front.",
        },
      ],
    },

  ],
});
