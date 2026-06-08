/* Part 7 — Agents & Workflows */
window.COURSE.push({
  id: "agents",
  title: "Agents & Workflows",
  blurb: "Getting models to take actions, not just chat.",
  topics: [

    {
      id: "prompt-engineering",
      title: "Prompt engineering",
      time: 5,
      tagline: "The cheapest, fastest way to get better results.",
      lesson:
        "<p><span class='term'>Prompt engineering</span> is the craft of <b>writing your request well</b> so the model gives you what you actually want. It costs nothing, needs no training, and often beats fancier techniques — so it's the first lever to pull.</p>" +
        "<p>The reliable habits: <b>be specific</b> (say exactly what you want), <b>give context</b> (who it's for, why), <b>show an example</b> (a sample of the output style), <b>state the format</b> (“reply as a bullet list”), and <b>set constraints</b> (“under 100 words,” “no jargon”).</p>" +
        "<p>A few power moves: ask the model to <b>think step by step</b> for reasoning tasks; give it a <b>role</b> (“you are a careful editor”); and provide <b>examples of good answers</b> (this is called “few-shot” prompting). Small wording changes can produce big quality jumps.</p>" +
        "<p>Treat prompting as iteration, not magic words. Try, read the result, adjust one thing, try again. You'll develop an instinct fast.</p>",
      analogy:
        "<p>It's like briefing a talented freelancer. A vague brief (“make it nice”) gets random results. A clear brief — audience, goal, format, an example, a deadline — gets exactly what you wanted. Same worker, wildly different output, all from the brief.</p>",
      mentalModel:
        "Prompt engineering = writing a great brief. Be specific, give context and examples, state the format and limits. Cheap, fast, and often enough on its own.",
      mistakes: [
        "Being vague and blaming the model. Most “bad” answers come from under-specified prompts.",
        "Changing five things at once when iterating, so you can't tell what helped.",
        "Reaching for fine-tuning before exhausting a good prompt — often prompting alone solves it.",
      ],
      exercise: {
        goal: "Improve one prompt through iteration.",
        steps: [
          "Write a deliberately vague prompt (e.g. “write about dogs”) and note the result.",
          "Rewrite it with audience, goal, format, and one constraint.",
          "Add a short example of the style you want and compare again.",
          "Write down which single change improved the output the most.",
        ],
        stretch: "Take a real task you do weekly and craft a reusable prompt template with blanks to fill in each time.",
      },
      quiz: [
        {
          q: "Why try prompt engineering first?",
          options: ["It produces more consistent results than fine-tuning on task-specific data", "It's free, fast, and often beats fancier techniques", "It adjusts the model's weights to match the new task without extra data", "It works best after fine-tuning because it has more parameters to guide"],
          answer: 1,
          why: "Better prompts cost nothing and frequently solve the problem without any training.",
        },
        {
          q: "Which is a core prompt-engineering habit?",
          options: ["Be as vague as possible", "Be specific, give context and examples, and state the format", "Use only one word", "Avoid all instructions"],
          answer: 1,
          why: "Specificity, context, examples, and clear format reliably improve results.",
        },
      ],
    },

    {
      id: "system-prompts",
      title: "System prompts",
      time: 4,
      tagline: "The standing instructions that shape every reply.",
      lesson:
        "<p>A <span class='term'>system prompt</span> is a special instruction set <b>at the top of the conversation</b> that defines how the model should behave throughout — its role, tone, rules, and boundaries. The user's messages come after it.</p>" +
        "<p>Think of it as the model's job description for this session: “You are a friendly support agent for a bike shop. Be concise. Never give medical advice. Always offer the return policy link when relevant.” Every reply is shaped by these standing orders.</p>" +
        "<p>System prompts are powerful because they're <b>persistent</b> — you set the behaviour once instead of repeating instructions every message. They're how apps give the same model totally different personalities and rules.</p>" +
        "<p>They're not foolproof: clever user messages can sometimes push against them, and very long system prompts eat context. But a clear, focused system prompt is one of the highest-leverage tools you have.</p>",
      analogy:
        "<p>It's the staff handbook handed to an employee on day one: who you serve, how to speak, what's off-limits. They don't re-read it for every customer — it just shapes how they handle each one. The system prompt is that handbook for the model.</p>",
      mentalModel:
        "System prompt = persistent job description set once at the top. Defines role, tone, rules, and limits for the whole session. High leverage, but not unbreakable.",
      mistakes: [
        "Cramming everything into a giant system prompt — it wastes context and gets ignored. Keep it focused.",
        "Assuming it's an unbreakable security wall. Treat sensitive rules with real safeguards, not just instructions.",
        "Repeating instructions in every user message when a system prompt would set them once.",
      ],
      exercise: {
        goal: "Write a focused system prompt.",
        steps: [
          "Pick an assistant role you'd want (tutor, editor, planner).",
          "Write a system prompt with: role, tone, 2 rules, and 1 boundary.",
          "Keep it under 120 words — focused beats sprawling.",
          "Test it in a chatbot's custom-instructions or system field and see if behaviour holds.",
        ],
        stretch: "Try to make the model break one of its own rules with a tricky user message, and note how robust your system prompt was.",
      },
      quiz: [
        {
          q: "What is a system prompt?",
          options: ["The first message in the user turn, which sets the initial task for the model", "Standing instructions at the top that shape the model's behaviour all session", "A fine-tuning technique that locks in a persona by adjusting the model's weights", "A tool-calling schema that defines the available functions for the session"],
          answer: 1,
          why: "It's the persistent role/tone/rules instruction that governs every reply in the conversation.",
        },
        {
          q: "What's a key advantage of a system prompt?",
          options: ["It fine-tunes the model so its default style matches the desired persona permanently", "It sets behaviour once instead of repeating instructions every message", "It improves output quality by compressing the conversation history automatically", "It expands the context window so more history fits without pushing old messages out"],
          answer: 1,
          why: "Being persistent, it defines behaviour a single time for the whole session.",
        },
      ],
    },

    {
      id: "tool-calling",
      title: "Tool calling",
      time: 5,
      tagline: "Letting a model use real tools beyond text.",
      lesson:
        "<p>A model can only produce text. <span class='term'>Tool calling</span> is the system that lets it <b>use real-world tools</b> — search the web, run a calculation, query a database, send an email — by asking your code to do it.</p>" +
        "<p>Here's the dance: you tell the model which tools exist and what they do. When a question needs one, the model doesn't pretend — it outputs a structured request like “call the weather tool for Tokyo.” <b>Your code</b> runs that tool, gets the result, and feeds it back. The model then uses the result to answer.</p>" +
        "<p>This transforms a chatbot into something that can <i>act</i> and access live, accurate information. Need today's exchange rate? It calls a rate tool instead of guessing. Need math? It calls a calculator instead of fumbling arithmetic.</p>" +
        "<p>Tool calling is the foundation of agents (a couple topics from now). Without tools, a model is a brain in a jar; with tools, it has hands.</p>" +
        "<p>A standard called <span class='term'>MCP</span> (Model Context Protocol) has emerged as a common way to define and share tools across different models and apps. Instead of wiring tools differently for every project, MCP provides a consistent interface — a tool built once can be used by any MCP-compatible model. You'll encounter it increasingly as you build agents.</p>",
      analogy:
        "<p>Imagine a smart friend on the phone who can't reach anything themselves. They tell <i>you</i> “please check the oven” or “look up that address,” you do it and report back, and they keep helping. Tool calling is the model directing actions while your code is its hands.</p>",
      mentalModel:
        "Tool calling = the model requests an action, your code performs it and returns the result, the model continues. It gives a text-only brain real hands.",
      mistakes: [
        "Thinking the model runs the tool itself. It only <b>requests</b>; your code executes and returns results.",
        "Giving vague tool descriptions, so the model misuses or ignores them. Describe each tool clearly.",
        "Letting tools do dangerous actions without checks. Powerful tools need guardrails and confirmation.",
      ],
      exercise: {
        goal: "Design a tool the model could call.",
        steps: [
          "Pick a task needing real data (weather, currency, your calendar).",
          "Write the tool's name, what it does, and what inputs it needs.",
          "Write an example of the request the model would make to use it.",
          "Describe what your code returns and how the model would use that.",
        ],
        stretch: "List 3 tools that should require user confirmation before running (e.g. send email, delete file) and explain why.",
      },
      quiz: [
        {
          q: "In tool calling, who actually runs the tool?",
          options: ["The model itself, using a sandboxed interpreter embedded in the API", "Your code, after the model requests it; the result is fed back", "The user, who receives the structured request and runs the tool manually", "A separate tool-running model that executes the function and returns the output"],
          answer: 1,
          why: "The model emits a structured request; your code executes the tool and returns the result.",
        },
        {
          q: "Why is tool calling so important?",
          options: ["It improves the model's reasoning by letting it verify its own chain of thought", "It lets a text-only model take actions and access live, accurate data", "It reduces hallucinations by making the model reconsider each answer twice", "It extends the model's context so it can process longer documents in one pass"],
          answer: 1,
          why: "Tools give the model hands — real actions and current information instead of guesses.",
        },
      ],
    },

    {
      id: "function-calling",
      title: "Function calling",
      time: 4,
      tagline: "The structured format that makes tool calling reliable.",
      lesson:
        "<p><span class='term'>Function calling</span> is the common, structured way tool calling is implemented. Instead of the model writing free-form “please check the weather,” it outputs a clean, machine-readable request — typically <b>JSON</b> naming the function and its arguments.</p>" +
        "<p>For example: <code>{ \"name\": \"get_weather\", \"arguments\": { \"city\": \"Tokyo\" } }</code>. Because it's structured, your code can reliably read it, run the matching function, and return the result — no fragile guessing about what the model meant.</p>" +
        "<p>You define the available functions with a schema (name, description, expected inputs). The model is trained to fill that schema correctly. This reliability is what makes real, production tool use possible.</p>" +
        "<p>So: <b>tool calling</b> is the idea (model uses tools); <b>function calling</b> is the dependable, structured mechanism most systems use to do it.</p>",
      analogy:
        "<p>It's the difference between a handwritten note and a proper order form. The note (“get me the usual”) is ambiguous; the order form (item, size, quantity in labelled boxes) is unambiguous and machine-readable. Function calling is the order form for tool use.</p>",
      mentalModel:
        "Function calling = the structured (usually JSON) format the model uses to request a tool reliably. Tool calling is the concept; function calling is the clean mechanism.",
      mistakes: [
        "Writing loose function schemas. Clear names, descriptions, and input types make the model fill them correctly.",
        "Not validating the model's output before running it. Always check the arguments are sensible/safe.",
        "Confusing it with tool calling as a separate thing — function calling is how tool calling is typically done.",
      ],
      exercise: {
        goal: "Write a function schema and a sample call.",
        steps: [
          "Take the tool you designed last topic.",
          "Write its schema: a name, a one-line description, and the input fields with types.",
          "Write the JSON the model would output to call it with real values.",
          "Note one check your code should do before running it (e.g. is the city a string?).",
        ],
        stretch: "Look up your favourite AI API's function-calling docs and compare its schema format to the one you wrote.",
      },
      quiz: [
        {
          q: "What is function calling?",
          options: ["A programming technique where code is passed as a parameter to another function", "The structured (usually JSON) format a model uses to request a tool reliably", "A natural-language description the model generates to explain which tool it chose", "A validation step that checks the model's output for harmful content before returning it"],
          answer: 1,
          why: "It's the machine-readable mechanism — name plus arguments — that makes tool use dependable.",
        },
        {
          q: "How do tool calling and function calling relate?",
          options: ["Tool calling and function calling are competing API standards from different providers", "Tool calling is the concept; function calling is the structured mechanism for it", "They refer to the same thing — the terms are used interchangeably across all platforms", "Function calling is a broader idea; tool calling is one specific implementation of it"],
          answer: 1,
          why: "Function calling is the reliable, structured way most systems implement tool calling.",
        },
      ],
    },

    {
      id: "ai-agents",
      title: "AI agents",
      time: 6,
      tagline: "A model that plans, acts, and adapts toward a goal.",
      lesson:
        "<p>An <span class='term'>AI agent</span> is a model set up to <b>pursue a goal by taking actions in a loop</b>, instead of just answering one message. You give it an objective; it thinks, uses tools, observes the results, and decides the next step — repeating until the goal is met.</p>" +
        "<p>The core loop is often summarised as <b>think → act → observe → repeat</b>. (This is also called the <b>ReAct pattern</b> — Reason + Act — if you see that term in frameworks or papers, it's this same idea.) Example: “Book me a table Friday.” The agent reasons (“I need a restaurant and time”), acts (searches, checks availability via tools), observes (sees options), and continues (picks, books, confirms) — adapting as it learns.</p>" +
        "<p>What separates an agent from a plain chatbot is <b>autonomy and tools</b>: it can break a goal into steps, call tools, react to what happens, and recover from problems, all with limited hand-holding.</p>" +
        "<p>Agents are powerful but trickier: they can loop forever, take wrong actions, or rack up cost. Good agents have clear goals, the right tools, limits (max steps, budgets), and human checkpoints for risky actions.</p>",
      analogy:
        "<p>A chatbot is like asking a colleague a question. An agent is like handing them a task: “organise the team lunch.” They make calls, check calendars, adjust when a venue's full, and report back done. They don't need a new instruction at every step — they pursue the goal.</p>",
      mentalModel:
        "AI agent = goal + tools + a think-act-observe loop. It plans, acts, and adapts toward an objective, rather than answering a single prompt. Needs limits and guardrails.",
      mistakes: [
        "Giving an agent a fuzzy goal. Vague objectives lead to wandering, costly loops.",
        "No limits — agents can loop endlessly or overspend. Set max steps, budgets, and stop conditions.",
        "Letting it take risky actions unsupervised. Keep humans in the loop for anything consequential.",
      ],
      exercise: {
        goal: "Map an agent loop for a real task.",
        steps: [
          "Pick a multi-step goal (plan a weekend trip, tidy a reading list).",
          "Write the think → act → observe → repeat loop for the first 3 steps.",
          "List the tools the agent would need at each step.",
          "Add 2 guardrails (a step limit and one human-confirmation point).",
        ],
        stretch: "Find a beginner agent framework's “hello world” example and identify the loop and the tool list in it.",
      },
      quiz: [
        {
          q: "What makes an AI agent different from a chatbot?",
          options: ["It uses a larger model with more parameters than a typical chat system", "It pursues a goal by looping: think, act with tools, observe, repeat", "It generates multiple response candidates and selects the best one automatically", "It can access training data directly to look up accurate facts on demand"],
          answer: 1,
          why: "Agents autonomously plan and act in a loop toward a goal, using tools and adapting.",
        },
        {
          q: "Which guardrail matters most for agents?",
          options: ["A larger base model, since smarter agents are inherently less likely to loop or err", "Limits like max steps/budget and human checks for risky actions", "A broader tool set so the agent can handle unexpected situations independently", "A long system prompt listing every situation the agent might encounter"],
          answer: 1,
          why: "Without limits and oversight, agents can loop forever, overspend, or take harmful actions.",
        },
      ],
    },

    {
      id: "agentic-workflows",
      title: "Agentic workflows",
      time: 5,
      tagline: "Designing reliable multi-step AI processes.",
      lesson:
        "<p>An <span class='term'>agentic workflow</span> is a <b>designed sequence of AI steps</b> that accomplishes a bigger task — sometimes fully autonomous, often a planned pipeline with AI at each stage. It's the practical, reliable cousin of a free-roaming agent.</p>" +
        "<p>Rather than hoping one agent figures everything out, you <b>break the task into clear steps</b> and decide how AI helps at each: draft → review → revise → format, for instance. Each step has a focused job, which is more reliable and easier to debug than one giant open-ended agent.</p>" +
        "<p>A useful spectrum: at one end, fixed <b>pipelines</b> (predictable steps, AI fills each); at the other, fully <b>autonomous agents</b> (the AI decides the steps). Most production systems live in between — structured workflows with some flexibility where it's safe.</p>" +
        "<p>Key design ideas: give each step a single clear purpose, validate outputs between steps, and add loops or human checks only where they earn their keep. Reliability comes from structure, not from hoping the AI improvises well.</p>",
      analogy:
        "<p>Think of an assembly line versus one craftsperson building a whole car alone. The line (workflow) has focused stations, easy quality checks, and predictable output. The lone craftsperson (open agent) is flexible but harder to make consistent. Most factories choose the line.</p>",
      mentalModel:
        "Agentic workflow = break a big task into focused AI steps with checks between them. Structure buys reliability; full autonomy is used sparingly where safe.",
      mistakes: [
        "Making one mega-agent do everything, then struggling to debug it. Break it into steps.",
        "No validation between steps, so one bad output silently poisons the rest.",
        "Adding autonomy everywhere when a simple fixed pipeline would be more reliable.",
      ],
      exercise: {
        goal: "Design a workflow for a real task.",
        steps: [
          "Pick a task (turn meeting notes into an action-item email).",
          "Break it into 3–4 focused steps (extract → organise → draft → polish).",
          "Decide what each step checks before passing on.",
          "Mark which steps, if any, truly need autonomy vs a fixed prompt.",
        ],
        stretch: "Place your workflow on the pipeline-to-autonomous spectrum and justify where it sits.",
      },
      quiz: [
        {
          q: "What is an agentic workflow?",
          options: ["A fully autonomous agent left to decompose and solve any task without structure", "A designed sequence of focused AI steps to accomplish a bigger task", "A multi-model pipeline where each model is a different size and speciality", "A prompt template that breaks complex instructions into numbered sub-tasks"],
          answer: 1,
          why: "It breaks a task into clear AI steps with checks, trading some autonomy for reliability.",
        },
        {
          q: "Where does reliability mostly come from?",
          options: ["Maximum autonomy everywhere", "Structure: focused steps and validation between them", "Bigger models only", "Longer prompts"],
          answer: 1,
          why: "Clear steps and checks make outcomes predictable and debuggable, unlike one open-ended agent.",
        },
      ],
    },

    {
      id: "multi-agent-systems",
      title: "Multi-agent systems",
      time: 5,
      tagline: "Several specialised agents collaborating like a team.",
      lesson:
        "<p>A <span class='term'>multi-agent system</span> uses <b>several agents that each have a role and work together</b> on a task — like a team rather than a single worker. One might plan, another research, another write, another check the work.</p>" +
        "<p>The appeal: specialisation and separation of concerns. A “researcher” agent focused only on finding facts, plus a “critic” agent focused only on spotting errors, can outperform one agent trying to do everything. They pass results to each other, sometimes debating or reviewing.</p>" +
        "<p>Common patterns include a <b>manager/worker</b> setup (a coordinator delegates to specialists) and <b>reviewer</b> loops (one agent produces, another critiques, the first revises). It mirrors how human teams divide work.</p>" +
        "<p>The catch: more agents means more complexity, cost, and ways to go wrong (they can confuse each other or loop). Use multiple agents when a task genuinely benefits from distinct roles — not just because it sounds impressive.</p>",
      analogy:
        "<p>It's a small company instead of a solo freelancer. A manager assigns work, a researcher digs, a writer drafts, an editor checks. Each does their specialty well, and the handoffs produce better work than one person juggling every role — but coordinating them takes effort.</p>",
      mentalModel:
        "Multi-agent system = a team of specialised agents (planner, researcher, writer, critic) collaborating. Better via specialisation, but more complex and costly to coordinate.",
      mistakes: [
        "Using many agents for a simple task one agent handles fine — adding cost and failure points.",
        "Unclear roles, so agents overlap, conflict, or loop endlessly.",
        "No coordinator or stop conditions, letting the “team” spiral without finishing.",
      ],
      exercise: {
        goal: "Cast a small agent team for a task.",
        steps: [
          "Pick a task that has natural roles (write a researched article).",
          "Define 3 agents with one clear job each (researcher, writer, editor).",
          "Describe the handoffs: what each passes to the next.",
          "Decide whether this really needs a team, or if one good agent would do.",
        ],
        stretch: "Sketch a reviewer loop where the editor sends work back to the writer up to twice before finalising.",
      },
      quiz: [
        {
          q: "What is a multi-agent system?",
          options: ["A single large model running multiple reasoning chains in parallel before merging them", "Several specialised agents with roles working together on a task", "A fine-tuning method that merges many task-specific adapters into one model", "A serving architecture that routes requests to different model sizes by difficulty"],
          answer: 1,
          why: "It's a team of role-specialised agents collaborating, like a small company.",
        },
        {
          q: "When should you use multiple agents?",
          options: ["Always, it's impressive", "When a task genuinely benefits from distinct specialised roles", "Never", "Only for images"],
          answer: 1,
          why: "Multiple agents add cost and complexity, so use them only when specialisation truly helps.",
        },
      ],
    },

    {
      id: "mcp",
      title: "Model Context Protocol (MCP)",
      time: 4,
      tagline: "The standard that lets models connect to tools and data without custom wiring.",
      lesson:
        "<p><span class='term'>MCP</span> stands for <b>Model Context Protocol</b>. It's an open standard that defines a consistent way for LLMs to connect to tools, databases, files, and other data sources. Without it, every team wires their tools differently — with it, a tool built once works with any MCP-compatible model.</p>" +
        "<p>Think of it as the USB standard for AI tools. Before USB, every device needed its own cable. After USB, one port fits everything. MCP does the same for model tools: any server exposing the MCP interface can be used by any compatible model or app.</p>" +
        "<p>MCP servers can expose tools (functions the model can call), resources (files or data it can read), and prompts (reusable templates). The model talks to these via a standard JSON-based protocol. You call a weather tool, a file reader, or a database — all through the same interface.</p>" +
        "<p>In practice: growing AI ecosystems (like Claude.ai, Cursor, and many agent frameworks) now support MCP directly, so understanding it helps you plug in tools and build agents that work across platforms.</p>",
      analogy:
        "<p>Before universal remote controls, every TV brand needed its own remote. Then a universal standard appeared — one remote, all TVs. MCP is the universal remote for AI tools: one standard interface, any model that supports it can pick up and use any MCP tool.</p>",
      mentalModel:
        "MCP = the USB standard for AI tools. Build a tool once to the MCP spec and any compatible model can use it. One consistent interface instead of custom wiring per project.",
      mistakes: [
        "Confusing MCP with function calling. Function calling is how a model requests <i>any</i> tool; MCP is a specific standard <i>protocol</i> for how tools are defined and connected.",
        "Thinking MCP is Anthropic-only. It's an open standard and works with any model that implements it.",
        "Skipping tool descriptions. MCP tools still need clear names and descriptions so the model knows when to use them.",
      ],
      exercise: {
        goal: "Understand the MCP landscape.",
        steps: [
          "Search for MCP servers and browse the public directory of available servers.",
          "Pick one server and read what tools it exposes (file access, web search, calendar, etc.).",
          "Note which AI apps or agent frameworks already support MCP in their docs.",
          "Write one sentence: how does MCP change the effort of adding a new tool to an agent?",
        ],
        stretch: "Find the MCP spec on GitHub and read the tool definition format — note the name, description, and input schema fields. That's the full contract.",
      },
      quiz: [
        {
          q: "What problem does MCP solve?",
          options: ["Reduces hallucinations by verifying tool outputs before passing them to the model", "Provides a standard interface so tools can be built once and used by any compatible model", "Replaces function calling by handling all tool requests inside the protocol itself", "Speeds up inference by caching tool responses and reusing them across sessions"],
          answer: 1,
          why: "MCP is a standard protocol — like USB — so tools don't need custom wiring for each model or app.",
        },
        {
          q: "What can an MCP server expose?",
          options: ["Only function schemas — resources and prompts must be handled by a separate protocol", "Tools, resources, and prompts — callable and readable by any connected model", "Only read-only resources, since MCP doesn't support functions with side effects", "Configuration files that tell the model which external APIs are safe to query"],
          answer: 1,
          why: "MCP servers can offer functions to call, data to read, and prompt templates — all over one standard interface.",
        },
      ],
    },

    {
      id: "browser-agents",
      title: "Browser agents",
      time: 5,
      tagline: "Agents that actually click around the web for you.",
      lesson:
        "<p>A <span class='term'>browser agent</span> is an AI agent that can <b>control a web browser</b> — read pages, click buttons, fill forms, and navigate — to complete tasks on real websites, the way a person would.</p>" +
        "<p>It works by giving the agent “eyes and hands” for the web: it sees the page (text, sometimes a screenshot), decides an action (“click Login,” “type into the search box”), and a tool performs it. Then it observes the new page and continues — the agent loop, applied to browsing.</p>" +
        "<p>This unlocks tasks with no neat API: comparing prices across sites, filling a multi-step form, gathering info from pages. It's powerful for automation where the only interface is a website built for humans.</p>" +
        "<p>But it's among the riskiest agent types: websites change and break the agent, it can misclick, and it may encounter logins, payments, or content that demands caution. Strong guardrails, sandboxing, and human confirmation for sensitive steps are essential.</p>",
      analogy:
        "<p>It's like giving a capable intern remote control of your web browser. They can do a lot — book, search, fill forms — but you'd watch over their shoulder for anything involving your money or passwords, because one wrong click matters.</p>",
      mentalModel:
        "Browser agent = the agent loop with a browser as its hands and eyes. Great for human-only websites; risky, so sandbox it and confirm sensitive actions.",
      mistakes: [
        "Letting it act on sites involving payments or accounts without human confirmation.",
        "Assuming it's robust. Web pages change constantly and can break or mislead the agent.",
        "Skipping a sandbox. Give it a contained environment, not free rein over your real accounts.",
      ],
      exercise: {
        goal: "Plan a safe browser-agent task.",
        steps: [
          "Pick a low-risk task with no API (e.g. gather opening hours from 3 shop websites).",
          "Write the loop: see page → choose action → act → observe → repeat.",
          "List 2 places it might break (a popup, a changed layout).",
          "Add a rule: which actions must pause for human confirmation?",
        ],
        stretch: "Read about <b>Playwright</b>, a popular browser-automation library, and note how it represents a page's interactive elements to a model.",
      },
      quiz: [
        {
          q: "What is a browser agent?",
          options: ["A lightweight model embedded in the browser to suggest completions as you type", "An AI agent that controls a browser to do tasks on real websites", "A web scraper that downloads page HTML for an LLM to process offline in batches", "A browser extension that summarises pages and answers questions about their content"],
          answer: 1,
          why: "It applies the agent loop to a browser — reading, clicking, and navigating like a person.",
        },
        {
          q: "Why are browser agents especially risky?",
          options: ["They generate too many tokens, making them the most expensive agent type to run", "Sites change/break them and they may hit logins or payments — needing guardrails", "They lack the ability to observe results, so they can't adapt mid-task like other agents", "They require a specialised fine-tuned model that general-purpose LLMs can't replace"],
          answer: 1,
          why: "Fragile, changing websites plus sensitive actions make sandboxing and human checks essential.",
        },
      ],
    },

  ],
});
