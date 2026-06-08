/* Part 9: Deployment */
window.COURSE.push({
  id: "deployment",
  title: "Deployment",
  blurb: "Getting your model out into the real world.",
  topics: [

    {
      id: "local-inference",
      title: "Local inference",
      time: 4,
      tagline: "Running models on your own machine, start to finish.",
      lesson:
        "<p><span class='term'>Local inference</span> means <b>running a model on your own computer</b> instead of calling someone else's service over the internet. You met the tools (Ollama, llama.cpp, MLX); this topic is about why and when you'd choose this path.</p>" +
        "<p>The wins are real: <b>privacy</b> (data never leaves your machine), <b>no per-token cost</b> (free to run as much as you like), <b>offline</b> (works with no internet), and <b>control</b> (your model, your rules). For sensitive data or high-volume personal use, this is huge.</p>" +
        "<p>The costs: you need hardware that fits the model (remember VRAM), you handle setup and updates yourself, and top-tier giant models may be out of reach on consumer machines. Quantized and small models close much of that gap.</p>" +
        "<p>Decision shortcut: choose local when privacy, offline use, or predictable cost matter most, and your hardware can fit a model that's good enough for the task.</p>",
      analogy:
        "<p>It's cooking at home versus ordering delivery. Home cooking (local) is private, cheaper per meal, and works even if the restaurant's closed, but you need a kitchen and you do the work. Delivery (cloud API) is effortless but you pay each time and trust someone else's kitchen.</p>",
      mentalModel:
        "Local inference = run it yourself. Private, offline, no per-use fee, full control, if your hardware fits a good-enough model. You trade convenience for ownership.",
      mistakes: [
        "Choosing a model your hardware can't fit. Check VRAM and consider quantized versions first.",
        "Expecting the absolute strongest giant models to run smoothly on a laptop.",
        "Underestimating setup/maintenance. Local means you're the IT department.",
      ],
      exercise: {
        goal: "Decide if a task belongs local.",
        steps: [
          "Pick a task involving data you'd rather keep private.",
          "Check whether a small/quantized model could handle it well enough.",
          "Confirm it fits your hardware (VRAM check).",
          "Write your verdict: local or cloud, and the deciding factor.",
        ],
        stretch: "Run the task fully offline in Ollama to prove the privacy and offline benefits to yourself.",
      },
      quiz: [
        {
          q: "What's a core benefit of local inference?",
          options: ["Lower latency than cloud APIs because the model is already warm on your machine", "Privacy, offline use, no per-token cost, and control", "Access to larger models than cloud providers since you control the hardware directly", "Automatic scaling so throughput increases when multiple users hit the model together"],
          answer: 1,
          why: "Running locally keeps data private, works offline, avoids per-use fees, and gives full control.",
        },
        {
          q: "What's the main constraint on local inference?",
          options: ["The model licence: most open models only permit cloud deployment, not local use", "Your hardware must fit a good-enough model (VRAM limits)", "Latency: local inference is always slower than a well-hosted cloud API", "The number of CPU cores, since local inference bypasses the GPU entirely"],
          answer: 1,
          why: "The model plus its working memory must fit your hardware, which limits which models you can run.",
        },
      ],
    },

    {
      id: "on-device-ai",
      title: "On-device AI",
      time: 4,
      tagline: "AI running right inside your phone or gadget.",
      lesson:
        "<p><span class='term'>On-device AI</span> is local inference taken to small devices: <b>models running directly on phones, laptops, watches, cars, and other gadgets</b>, not in a data center. The model lives and runs on the device in your hand.</p>" +
        "<p>This is why your phone can transcribe speech, suggest replies, or edit photos with AI even in airplane mode. It needs tiny, efficient models (SLMs), aggressive quantization, and special chips designed for AI math (often called NPUs).</p>" +
        "<p>The benefits mirror local inference but matter even more here: instant response (no round-trip to a server), privacy (your data stays on the device), offline capability, and no server cost per use. It's a major direction for consumer AI.</p>" +
        "<p>The limits are tight hardware: small memory and battery mean small models and careful optimisation. On-device is about doing <i>focused</i> things brilliantly, not running the biggest model in existence.</p>",
      analogy:
        "<p>It's the difference between a calculator app that works anywhere on your phone and one that needs to phone a far-away office for every sum. On-device keeps the smarts in your pocket: instant, private, and working even with no signal.</p>",
      mentalModel:
        "On-device AI = small, optimised models running on the gadget itself. Instant, private, offline, no server cost, but limited to focused tasks by tiny hardware.",
      mistakes: [
        "Expecting giant-model quality on a phone. On-device means small, focused, efficient.",
        "Ignoring battery and memory limits when designing on-device features.",
        "Forgetting it leans on quantization and special chips (NPUs) to be feasible.",
      ],
      exercise: {
        goal: "Spot on-device AI you already use.",
        steps: [
          "List 3 AI features on your phone (voice typing, photo cleanup, suggestions).",
          "Test one in airplane mode; if it still works, it's likely on-device.",
          "Note why running it on-device is better than sending data to a server.",
          "Name one task too big for on-device that needs the cloud.",
        ],
        stretch: "Read about NPUs in modern phones and note one AI task they're designed to accelerate.",
      },
      quiz: [
        {
          q: "What is on-device AI?",
          options: ["AI that runs on an edge server in a regional data center, closer than the main cloud", "Models running directly on phones and gadgets, not a server", "A distributed training method that uses many small devices in parallel", "A quantization approach specifically designed for mobile CPU and GPU chips"],
          answer: 1,
          why: "On-device AI runs the model on the device itself, enabling instant, private, offline features.",
        },
        {
          q: "What makes on-device AI feasible?",
          options: ["Larger context windows, since devices have more RAM available than typical GPU servers", "Small efficient models, quantization, and special chips (NPUs)", "Streaming connections that offload heavy computation to a nearby edge server", "Dense full-precision models, since NPUs are optimised for 32-bit floating point"],
          answer: 1,
          why: "Tight hardware demands small, quantized models and AI-accelerating chips.",
        },
      ],
    },

    {
      id: "api-serving",
      title: "API serving",
      time: 5,
      tagline: "Offering your model to other programs over the web.",
      lesson:
        "<p><span class='term'>API serving</span> means exposing a model behind an <b>API</b>: a web address other programs can send requests to and get answers back. It's how most apps actually use AI: your app calls the API, the model responds.</p>" +
        "<p>An API (Application Programming Interface) is just a contract: “send your request in this format to this address, and you'll get a reply in that format.” For AI, you send a prompt (and settings), and receive the generated text, often <b>streamed</b> token by token.</p>" +
        "<p>You can use someone else's hosted API (easy, pay per token, closed models) or run your own (with vLLM/Ollama) to serve your own model. Either way, the API is the doorway between your application code and the model.</p>" +
        "<p>Key practical concerns: authentication (keys), rate limits (how many requests allowed), cost per token, latency, and handling errors/retries. These operational details matter as much as the model itself once you're building real products.</p>",
      analogy:
        "<p>An API is like a restaurant's ordering window. You don't go into the kitchen (the model); you hand a clearly-formatted order to the window and food comes back out. As long as you follow the order format, you don't care how the kitchen works inside.</p>",
      mentalModel:
        "API serving = a web doorway to the model. Send a formatted request, get a (often streamed) reply. Mind keys, rate limits, cost, latency, and errors.",
      mistakes: [
        "Exposing API keys in public code. Keep secrets out of your shared files.",
        "Ignoring rate limits and error handling, so the app breaks under real traffic.",
        "Forgetting cost per token adds up fast at scale. Monitor and budget.",
      ],
      exercise: {
        goal: "Trace one API request end to end.",
        steps: [
          "Pick any AI API and read its “quickstart” docs.",
          "Identify the 4 parts of a request: address, key, the prompt, and settings.",
          "Note what the response looks like and whether it streams.",
          "List 2 errors you'd need to handle (rate limit, timeout).",
        ],
        stretch: "If comfortable, send one real request (with a free tier or local Ollama API) and read the raw response.",
      },
      quiz: [
        {
          q: "What is API serving?",
          options: ["Packaging a model's weights into a file format that applications can load directly", "Exposing a model behind a web API that programs send requests to", "Continuously updating a model's weights based on live user feedback after launch", "Distributing a model across multiple servers so each handles a different type of query"],
          answer: 1,
          why: "It provides a callable web doorway so applications can send prompts and receive responses.",
        },
        {
          q: "Which is a key operational concern in API serving?",
          options: ["Prompt length only: the model's quality is fixed and all other concerns are handled by the provider", "Auth keys, rate limits, cost per token, latency, and error handling", "Choosing the right quantization format before exposing the API endpoint", "Matching the model's training language to the language of incoming requests"],
          answer: 1,
          why: "Real products must manage keys, limits, cost, speed, and failures, not just the model.",
        },
      ],
    },

    {
      id: "cloud-gpus",
      title: "Cloud GPUs",
      time: 4,
      tagline: "Renting powerful hardware by the hour.",
      lesson:
        "<p><span class='term'>Cloud GPUs</span> let you <b>rent powerful GPU machines over the internet</b>, paying for the time you use. Instead of buying an expensive graphics card, you spin one up in the cloud, do your training or serving, and shut it down.</p>" +
        "<p>This is how most people access serious hardware. Want to fine-tune a model or serve one at scale, but don't own a data-center GPU? Rent one for a few hours. Some services even offer <b>free</b> GPU time for small experiments, perfect for learning.</p>" +
        "<p>The model is pay-as-you-go: cheap for short jobs, but it adds up if you leave machines running. The golden rule is <b>turn it off when you're done</b>; forgotten running GPUs are the classic way to get a surprise bill.</p>" +
        "<p>Cloud GPUs pair naturally with everything you've learned: rent one, run Unsloth/Axolotl to fine-tune, or vLLM to serve, then release it. Flexible power without the upfront cost.</p>",
      analogy:
        "<p>It's renting a powerful tool from a hire shop instead of buying it. Need an industrial drill for one weekend? Rent it, use it, return it. Cloud GPUs are that hire shop for serious AI hardware; just remember to “return” it by shutting it down.</p>",
      mentalModel:
        "Cloud GPUs = rent serious hardware by the hour. Flexible, no upfront cost, sometimes free tiers. Pay-as-you-go, so shut it down when done or the bill grows.",
      mistakes: [
        "Leaving GPUs running after a job finishes, the #1 cause of surprise bills.",
        "Renting a far bigger GPU than the task needs.",
        "Forgetting to save your work/checkpoints before shutting a machine down.",
      ],
      exercise: {
        goal: "Plan a cheap cloud-GPU session.",
        steps: [
          "Find a service offering free or low-cost GPU notebooks.",
          "Note the GPU's memory and whether it fits a model you'd fine-tune (QLoRA).",
          "List the steps you'd run, then where you'd save the output before shutdown.",
          "Write a one-line rule for yourself about shutting machines down.",
        ],
        stretch: "Estimate the cost of a 2-hour fine-tune by multiplying a GPU's hourly rate by two. Compare to buying the card.",
      },
      quiz: [
        {
          q: "What are cloud GPUs?",
          options: ["On-premises GPU servers managed remotely by a hosting provider on your behalf", "Powerful GPU machines you rent over the internet by the hour", "A shared GPU pool where several users train on the same hardware simultaneously", "Virtual machines with emulated GPU support for testing code before real hardware"],
          answer: 1,
          why: "They let you rent serious hardware pay-as-you-go instead of buying it.",
        },
        {
          q: "What's the golden rule of cloud GPUs?",
          options: ["Leave them running always", "Shut them down when you're done to avoid surprise bills", "Never save your work", "Always rent the biggest one"],
          answer: 1,
          why: "Forgotten running machines keep charging; turn them off after the job.",
        },
      ],
    },

    {
      id: "edge-ai",
      title: "Edge AI basics",
      time: 4,
      tagline: "AI close to where the data is created.",
      lesson:
        "<p><span class='term'>Edge AI</span> means running AI <b>at the “edge”</b> (on or near the device where data is produced) rather than sending everything to a distant cloud. On-device AI is one form of it; edge also covers local servers, sensors, cameras, and factory equipment.</p>" +
        "<p>The “edge” is just the opposite of the central cloud. A security camera that detects people locally, a factory machine spotting defects on the line, a car making driving decisions instantly: all are edge AI, processing data right where it happens.</p>" +
        "<p>Why do it: <b>speed</b> (no round-trip to the cloud, vital for real-time), <b>privacy</b> (raw data stays local), <b>reliability</b> (works even if the network drops), and <b>bandwidth</b> (don't ship huge video streams to a server). For real-time or sensitive settings, the edge wins.</p>" +
        "<p>The constraints are familiar: limited hardware means small, efficient, often quantized models. Edge AI is about smart, focused processing near the source, not running the biggest model far away.</p>",
      analogy:
        "<p>It's the difference between a smoke alarm that decides on the spot to sound, versus one that must call a monitoring office and wait for a callback before beeping. For anything urgent, deciding right at the source (the edge) is faster and more reliable.</p>",
      mentalModel:
        "Edge AI = process data near where it's created, not in a distant cloud. Fast, private, reliable, bandwidth-light, using small efficient models on limited hardware.",
      mistakes: [
        "Confusing edge with cloud. Edge is near the data source; cloud is the central data center.",
        "Trying to run heavy models on tiny edge hardware. Keep it small and focused.",
        "Overlooking the real-time benefit. For urgent decisions, the cloud round-trip is too slow.",
      ],
      exercise: {
        goal: "Classify systems as edge or cloud.",
        steps: [
          "List: a self-driving car's instant braking, a giant chatbot, a doorbell camera's person-detection.",
          "Mark each as edge or cloud and say why.",
          "For one edge case, name the benefit that makes edge essential (speed? privacy?).",
          "Note what model size constraint the edge imposes.",
        ],
        stretch: "Think of a privacy-sensitive scenario (a hospital, a home) and argue why edge AI suits it better than cloud.",
      },
      quiz: [
        {
          q: "What is edge AI?",
          options: ["AI deployed on regional cloud servers to reduce latency for geographically distant users", "Running AI on or near the device where data is created", "A distributed training method that spreads work across many small machines", "A technique for compressing models to run on devices with limited connectivity"],
          answer: 1,
          why: "Edge AI processes data near its source rather than sending it to a distant cloud.",
        },
        {
          q: "Why choose edge AI for real-time tasks?",
          options: ["It offloads computation to a nearby server, reducing the device's power consumption", "No cloud round-trip means faster, more reliable, private decisions", "It uses larger models than cloud AI because the device handles preprocessing first", "It streams results progressively so the user sees output before inference is complete"],
          answer: 1,
          why: "Processing locally avoids network delays and keeps working even if connectivity drops.",
        },
      ],
    },

  ],
});
