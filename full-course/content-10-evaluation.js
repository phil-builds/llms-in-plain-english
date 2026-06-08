/* Part 10: Evaluation */
window.COURSE.push({
  id: "evaluation",
  title: "Evaluation",
  blurb: "How to actually know if a model is any good.",
  topics: [

    {
      id: "ai-benchmarks",
      title: "AI benchmarks",
      time: 5,
      tagline: "Standard tests for comparing models, and their limits.",
      lesson:
        "<p><span class='term'>Benchmarks</span> are <b>standardised tests</b> used to measure and compare models. They're sets of questions or tasks with known correct answers, so you can score a model and put a number on its ability, handy for comparing options.</p>" +
        "<p>There are benchmarks for many skills: general knowledge, math, reasoning, coding, and more. When you read “model X scores 85% on benchmark Y,” that's a benchmark result. Leaderboards rank models by these scores.</p>" +
        "<p>The big caveat: benchmarks are <b>useful but easy to over-trust</b>. A model can score high yet feel worse on <i>your</i> real task, because the benchmark didn't test what you actually need. Models can also be (intentionally or not) tuned to look good on popular benchmarks: “teaching to the test.”</p>" +
        "<p>So treat benchmarks as a rough first filter, not the final word. The real test is always how a model performs on <i>your</i> specific use case with <i>your</i> data.</p>",
      analogy:
        "<p>Benchmarks are like standardised exam scores. A high SAT score is a useful signal, but it doesn't guarantee someone's great at <i>your</i> particular job. You still interview them on real tasks. Same with models: test them on your actual work.</p>",
      mentalModel:
        "Benchmarks = standardised tests for a rough comparison. Useful first filter, but high scores don't guarantee fit; your real task is the true exam.",
      mistakes: [
        "Picking a model purely by leaderboard rank without testing it on your task.",
        "Forgetting models can be tuned to ace popular benchmarks (“teaching to the test”).",
        "Comparing scores from different benchmarks as if they mean the same thing.",
      ],
      exercise: {
        goal: "Look past a leaderboard.",
        steps: [
          "Find an open model leaderboard and note the top few models.",
          "Pick a task you actually care about (e.g. summarising your notes).",
          "Ask whether the benchmark tested that skill specifically.",
          "Write one sentence: why might the #1 model not be your best pick?",
        ],
        stretch: "Build a tiny “personal benchmark”: 5 real prompts with ideal answers you can run against any model you're considering.",
      },
      quiz: [
        {
          q: "What are AI benchmarks?",
          options: ["Leaderboards ranked by user votes, where community preference determines the winner", "Standardised tests with known answers used to score and compare models", "Automated tools that profile a model's memory and compute usage during inference", "Internal company evaluations that are kept private to prevent competitors from tuning against them"],
          answer: 1,
          why: "Benchmarks measure model ability on fixed tasks so models can be compared numerically.",
        },
        {
          q: "What's the main caution with benchmarks?",
          options: ["They measure the same skills as real tasks, so scores transfer directly to production", "High scores don't guarantee a model fits your specific real task", "They are standardised enough that a top score reliably predicts fine-tuning success", "They're produced independently so no model provider can optimise against them"],
          answer: 1,
          why: "A model can score well yet underperform on your use case; your own task is the real test.",
        },
      ],
    },

    {
      id: "human-evals",
      title: "Human evals",
      time: 5,
      tagline: "When people judge quality that numbers miss.",
      lesson:
        "<p><span class='term'>Human evaluation</span> is having <b>real people judge model outputs</b>: rating answers, comparing two responses, or flagging problems. For many qualities, humans remain the gold standard because they catch what automated scores miss.</p>" +
        "<p>Some things are hard to score automatically: is this answer genuinely helpful? Is the tone right? Is it subtly misleading? Is it tactful? People can judge these nuances. A common method is <b>pairwise comparison</b>: show two answers, ask “which is better?”, exactly the preference data you met earlier.</p>" +
        "<p>The trade-offs: human evals are <b>slow, costly, and a bit subjective</b> (different people disagree). To manage this, teams use clear guidelines, multiple raters per item, and measure agreement between them.</p>" +
        "<p>Best practice is to <b>combine</b>: fast automated benchmarks to filter broadly, then human evals on the things that truly need a human's judgement. Numbers for scale, people for nuance.</p>",
      analogy:
        "<p>It's like judging a cooking contest. A machine can measure temperature and timing (benchmarks), but whether the dish actually <i>tastes</i> good needs human judges. For flavour, you ask people, even though they sometimes disagree.</p>",
      mentalModel:
        "Human evals = people judge what numbers can't (helpfulness, tone, nuance), often by comparing pairs. Slow and subjective, so combine with automated benchmarks.",
      mistakes: [
        "Relying only on automated scores for qualities (like helpfulness or tact) that need human judgement.",
        "Using one rater per item. Agreement between several raters is far more trustworthy.",
        "Vague rating guidelines, which make results noisy and inconsistent.",
      ],
      exercise: {
        goal: "Run a tiny human eval.",
        steps: [
          "Take one prompt and get two answers (ask a model twice).",
          "Write a clear rule for “better” (e.g. accurate + clear + kind).",
          "Have 2 people (or you, twice, honestly) pick the better one.",
          "Note whether they agreed; disagreement shows why guidelines matter.",
        ],
        stretch: "Design a simple 1–5 rating rubric for “helpfulness” with a short description of what each score means.",
      },
      quiz: [
        {
          q: "Why use human evaluation?",
          options: ["It's the cheapest option", "People can judge nuance (helpfulness, tone) that automated scores miss", "It needs no guidelines", "It's always objective"],
          answer: 1,
          why: "Humans catch subtle qualities numbers can't capture, making them the gold standard for many traits.",
        },
        {
          q: "What's a good practice for reliable human evals?",
          options: ["One rater, no rules", "Clear guidelines and multiple raters, measuring their agreement", "Only automated scores", "Random ratings"],
          answer: 1,
          why: "Clear rubrics and several raters reduce subjectivity and make results trustworthy.",
        },
      ],
    },

    {
      id: "cost-per-token",
      title: "Cost-per-token analysis",
      time: 5,
      tagline: "Knowing what your AI actually costs to run.",
      lesson:
        "<p>Most AI APIs charge <b>per token</b>, so <span class='term'>cost-per-token analysis</span> is the skill of <b>estimating and controlling what your usage costs</b>. Since tokens are the unit of both input and output, your bill is basically tokens in + tokens out, times the price.</p>" +
        "<p>Two things to watch: prices usually differ for <b>input</b> (your prompt) and <b>output</b> (the reply), and bigger/stronger models cost more per token. So a long prompt to a top model, repeated thousands of times, gets pricey fast.</p>" +
        "<p>To estimate: roughly count the tokens per request (prompt + expected answer), multiply by the per-token price, then by how many requests you expect. This back-of-envelope math prevents nasty surprises and guides model choice.</p>" +
        "<p>Levers to cut cost: use a smaller model where it's good enough, shorten prompts, cache repeated results, and avoid sending unnecessary context. Cost-per-token thinking is what separates a fun demo from a sustainable product.</p>",
      analogy:
        "<p>It's like a phone plan billed per minute. A short call to a local number is cheap; long international calls all day add up. Cost-per-token analysis is reading the rate card and estimating your “phone bill” before it arrives.</p>",
      mentalModel:
        "Cost-per-token = (tokens in + tokens out) × price × number of requests. Bigger models and longer prompts cost more. Estimate first; trim context and right-size the model.",
      mistakes: [
        "Forgetting input and output are often priced differently.",
        "Sending huge prompts/context “just in case,” quietly inflating every request's cost.",
        "Using a top-tier model everywhere when a cheaper one is good enough for most calls.",
      ],
      exercise: {
        goal: "Estimate a real monthly bill.",
        steps: [
          "Pick a model and find its input and output prices per (often) million tokens.",
          "Estimate tokens per request (prompt + answer) for your use case.",
          "Multiply by your expected requests per month.",
          "Write the estimate, then list one change that would halve it.",
        ],
        stretch: "Compare the monthly cost of a big model vs a smaller one for the same workload and note the difference.",
      },
      quiz: [
        {
          q: "How is AI API cost usually calculated?",
          options: ["Per API call regardless of length: each request costs a flat rate set by the provider", "Per token: input plus output, times the price and number of requests", "Per second of generation time, so faster models are always cheaper to use", "Per model version: newer models cost more even if the request length is the same"],
          answer: 1,
          why: "Bills are driven by tokens in and out, the model's price, and how many requests you make.",
        },
        {
          q: "Which lever reduces cost-per-token spend?",
          options: ["Sending more context always", "Using a smaller model where it's good enough and trimming prompts", "Using the biggest model everywhere", "Ignoring usage"],
          answer: 1,
          why: "Right-sizing the model and shortening prompts/context directly lower the bill.",
        },
      ],
    },

    {
      id: "speed-benchmarking",
      title: "Speed benchmarking",
      time: 4,
      tagline: "Measuring how fast a model really responds.",
      lesson:
        "<p><span class='term'>Speed benchmarking</span> is measuring <b>how fast a model produces answers</b>. Speed shapes how an app <i>feels</i>, so it's worth measuring properly with the right numbers rather than vague impressions.</p>" +
        "<p>Two key measures: <b>time to first token</b> (how long until the answer <i>starts</i> appearing; this is what makes an app feel responsive) and <b>tokens per second</b> (how fast the rest streams out once it starts). A snappy first token plus a steady stream feels great.</p>" +
        "<p>There's also <b>throughput</b> (total tokens across all users per second), important for serving many people, and tied to batching from the inference section. Latency is one user's experience; throughput is the whole system's capacity.</p>" +
        "<p>Speed depends on the model size, hardware, quantization, and serving setup. Measure under realistic conditions (real prompt lengths, real concurrency), because a model that's fast for one request can slow down under load.</p>",
      analogy:
        "<p>Think of a tap. “Time to first token” is how long after you turn it before water appears; “tokens per second” is how strong the flow is once it's running. A good experience needs both: quick to start and a steady stream.</p>",
      mentalModel:
        "Speed = time-to-first-token (feels responsive) + tokens-per-second (stream rate), plus throughput for many users. Measure under realistic load, not ideal conditions.",
      mistakes: [
        "Only looking at total time and missing that time-to-first-token is what users <i>feel</i>.",
        "Testing with one tiny request, then being surprised by slowdowns under real concurrency.",
        "Ignoring that quantization and serving setup, not just model size, change speed.",
      ],
      exercise: {
        goal: "Feel the speed metrics in action.",
        steps: [
          "Send a prompt to any chatbot and notice the pause before text starts (time to first token).",
          "Watch how steadily the rest streams (tokens per second).",
          "Try a very long answer and see if the stream stays steady.",
          "Write which metric matters more for a chat app and why.",
        ],
        stretch: "Compare a small and a large model on the same prompt and informally judge their time-to-first-token.",
      },
      quiz: [
        {
          q: "What does “time to first token” measure?",
          options: ["Total answer length", "How long until the answer starts appearing: key to feeling responsive", "The price per token", "Model accuracy"],
          answer: 1,
          why: "It's the delay before output begins, which strongly shapes how responsive an app feels.",
        },
        {
          q: "Why measure speed under realistic load?",
          options: ["Providers throttle based on benchmark results, so accurate scores unlock higher rate limits", "A model fast for one request can slow down under real concurrency", "Single-request tests reflect worst-case performance, so you can set an upper bound on latency", "Benchmarking under load prevents the KV cache from warming up, giving a fairer baseline"],
          answer: 1,
          why: "Real usage involves many requests and realistic lengths, which can change performance a lot.",
        },
      ],
    },

    {
      id: "quality-benchmarking",
      title: "Quality benchmarking",
      time: 5,
      tagline: "Measuring whether answers are actually good, your way.",
      lesson:
        "<p><span class='term'>Quality benchmarking</span> is measuring <b>how good a model's answers are for your specific needs</b>. Unlike generic public benchmarks, this is about building your own test that reflects the tasks <i>you</i> care about.</p>" +
        "<p>The recipe: collect a set of realistic prompts (an “eval set”), define what a good answer looks like, then score each model's responses: by automated checks, human ratings, or increasingly an <b>AI judge</b> (using a strong model to grade answers against your criteria).</p>" +
        "<p>This is one of the most valuable habits in applied AI. With your own eval set, you can confidently compare models, detect when a change made things worse, and avoid being fooled by generic leaderboard hype. It turns “it feels better” into “it scores better on the cases we care about.”</p>" +
        "<p>Start small: even 20 well-chosen test cases with clear criteria beat guessing. Grow the set over time, especially adding real failures you discover. Your eval set becomes a safety net for every future change.</p>",
      analogy:
        "<p>It's writing your own driving test for the exact roads you'll actually use, instead of trusting a generic certificate. If a candidate passes <i>your</i> route (your hills, your traffic) you know they fit your needs, not just an average one.</p>",
      mentalModel:
        "Quality benchmarking = your own eval set of real cases + clear criteria + scoring (human, automated, or AI judge). Turns vibes into evidence and guards against regressions.",
      mistakes: [
        "Judging quality by gut feeling alone, which is easily fooled and not repeatable.",
        "Using only generic benchmarks that don't reflect your real tasks.",
        "Never updating the eval set. Add the real failures you find so they don't recur.",
      ],
      exercise: {
        goal: "Build your first eval set.",
        steps: [
          "Write 10 realistic prompts for a task you care about.",
          "For each, jot what a good answer must include (your criteria).",
          "Run two models on them and score each against your criteria.",
          "Pick a winner based on the scores, not the vibe, and note any surprises.",
        ],
        stretch: "Try an “AI judge”: ask a strong model to grade two answers against your criteria, then sanity-check its grading yourself.",
      },
      quiz: [
        {
          q: "What is quality benchmarking (the practical kind)?",
          options: ["Trusting public leaderboards", "Building your own eval set of real cases with clear criteria to score models", "Measuring speed", "Counting parameters"],
          answer: 1,
          why: "It's testing models on prompts and criteria that reflect your actual needs, not generic tests.",
        },
        {
          q: "Why is your own eval set so valuable?",
          options: ["It satisfies external auditors who require documented test coverage before deployment", "It lets you compare models and catch regressions on the cases you care about", "It accelerates fine-tuning by giving the model examples of your quality criteria directly", "It reduces hallucinations by filtering the model's outputs against a known-good reference set"],
          answer: 1,
          why: "A personal eval set turns subjective impressions into repeatable evidence and guards against quality drops.",
        },
      ],
    },

  ],
});
