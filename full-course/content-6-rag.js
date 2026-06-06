/* Part 6 — RAG & Memory */
window.COURSE.push({
  id: "rag",
  title: "RAG & Memory",
  blurb: "Giving models the right facts at the right moment.",
  topics: [

    {
      id: "rag",
      title: "RAG",
      time: 6,
      tagline: "Let the model look things up instead of guessing.",
      lesson:
        "<p><span class='term'>RAG</span> stands for <b>Retrieval-Augmented Generation</b>. It solves a core weakness: a model only “knows” what it learned during training, and it can hallucinate. RAG fixes this by <b>fetching relevant real information first</b>, then asking the model to answer using that information.</p>" +
        "<p>The flow has two parts. <b>Retrieval:</b> when a question comes in, search your documents for the most relevant pieces. <b>Generation:</b> hand those pieces to the model and say “answer using this.” The model now responds grounded in real, current, specific facts.</p>" +
        "<p>This is how you make an AI that knows <i>your</i> company handbook, <i>your</i> product docs, or today's data — without retraining. Update the documents and the answers update instantly. It also slashes hallucinations, because the model is reading from a source instead of inventing.</p>" +
        "<p>RAG is one of the most useful patterns in all of applied AI. Most “chat with your documents” products are RAG under the hood.</p>",
      analogy:
        "<p>Closed-book exam vs open-book exam. A plain model takes a closed-book exam from memory — and may misremember. RAG turns it into an open-book exam: it looks up the relevant page first, then answers. Same student, far more reliable.</p>",
      mentalModel:
        "RAG = look it up, then answer. Retrieve relevant real text, hand it to the model, ground the response. Fresh facts and fewer hallucinations, no retraining.",
      mistakes: [
        "Thinking RAG retrains the model. It doesn't — it feeds facts in <b>at question time</b>.",
        "Retrieving poor or irrelevant chunks. If retrieval is bad, the answer is bad — “garbage in” still applies.",
        "Using RAG when fine-tuning is the real need (style/behaviour), or vice versa. RAG is for <b>knowledge</b>.",
      ],
      exercise: {
        goal: "Simulate RAG by hand.",
        steps: [
          "Pick a question about a document you have (a manual, a long email thread).",
          "Manually find the 2–3 most relevant paragraphs — that's “retrieval.”",
          "Paste only those into a chatbot with: “Answer using only this text.”",
          "Compare to asking the same question with no document. Notice the accuracy jump.",
        ],
        stretch: "Try a question the document can't answer and instruct “say if it's not in the text.” See whether grounding makes it admit the gap.",
      },
      quiz: [
        {
          q: "What does RAG do?",
          options: ["Retrains the model on new data", "Retrieves relevant real text and has the model answer using it", "Quantizes the model", "Counts tokens"],
          answer: 1,
          why: "RAG fetches relevant information at question time and grounds the model's answer in it.",
        },
        {
          q: "What's a key benefit of RAG?",
          options: ["Smaller model files", "Fresh, specific facts and fewer hallucinations without retraining", "Faster GPUs", "More parameters"],
          answer: 1,
          why: "By grounding answers in real, updatable documents, RAG improves accuracy and currency cheaply.",
        },
      ],
    },

    {
      id: "vector-databases",
      title: "Vector databases",
      time: 5,
      tagline: "Where embeddings live so you can search by meaning.",
      lesson:
        "<p>Remember embeddings — meaning turned into coordinates? A <span class='term'>vector database</span> is a special database built to <b>store millions of these embeddings and find the closest ones fast</b>.</p>" +
        "<p>Here's why it matters for RAG. You take all your documents, turn each chunk into an embedding, and store them in the vector database. When a question arrives, you embed the question too, then ask the database: “which stored chunks are closest in meaning to this?” It returns the best matches in milliseconds.</p>" +
        "<p>Regular databases search by exact words. Vector databases search by <b>meaning</b> — so a question about “car trouble” can find a document about “engine won't start,” even with no shared words. That's the superpower.</p>" +
        "<p>Common options include <b>Chroma</b> (free, local, zero setup — perfect for beginners), <b>Qdrant</b> and <b>Weaviate</b> (open-source, also available hosted), and <b>Pinecone</b> (fully hosted). If you already use PostgreSQL, the <b>pgvector</b> extension adds vector search without a separate database — a popular production choice. The concept is the same across all: a meaning-aware filing cabinet that finds the nearest neighbours fast.</p>",
      analogy:
        "<p>A normal database is like finding a book by its exact title. A vector database is like a librarian who understands what you <i>mean</i> and brings you books on the same topic — even if you didn't know their titles. Search by idea, not by keyword.</p>",
      mentalModel:
        "Vector database = storage for embeddings + fast “find the nearest in meaning” search. The engine that makes meaning-based retrieval possible at scale.",
      mistakes: [
        "Mixing embeddings from different models in one database. Coordinates must come from the <b>same</b> embedder.",
        "Expecting exact-keyword behaviour. Vector search is about similarity of meaning, not literal matches.",
        "Storing huge chunks. Retrieval works better with sensibly sized pieces (next topic: chunking).",
      ],
      exercise: {
        goal: "Picture the store-and-search loop.",
        steps: [
          "Draw documents → split into chunks → each becomes an embedding → stored in the vector DB.",
          "Now draw a question → embedded → “find nearest chunks” → top matches returned.",
          "Mark where this connects to RAG's retrieval step.",
          "Write one line on why meaning-search beats keyword-search for questions.",
        ],
        stretch: "Try a free vector-search playground: add a few sentences and query by meaning to watch nearest-neighbour results appear.",
      },
      quiz: [
        {
          q: "What is a vector database built to do?",
          options: ["Store images only", "Store embeddings and quickly find the closest ones by meaning", "Train models", "Block spam"],
          answer: 1,
          why: "It holds embeddings and performs fast nearest-neighbour search to find similar meanings.",
        },
        {
          q: "How does vector search differ from normal search?",
          options: ["It's slower always", "It matches by meaning, not exact keywords", "It needs no data", "It only finds exact titles"],
          answer: 1,
          why: "Vector search finds semantically similar text even without shared words.",
        },
      ],
    },

    {
      id: "chunking",
      title: "Chunking",
      time: 5,
      tagline: "Cutting documents into the right-sized bites for retrieval.",
      lesson:
        "<p><span class='term'>Chunking</span> is splitting your documents into smaller pieces before turning them into embeddings. You can't usefully embed a whole 50-page manual as one blob — you break it into chunks so retrieval can find the <i>specific</i> relevant part.</p>" +
        "<p>Chunk size is a balance. <b>Too big</b>, and a chunk covers many topics, so matches are vague and you waste context space. <b>Too small</b>, and a chunk loses the surrounding meaning, so it's hard to understand on its own. A common starting point is a few hundred tokens per chunk.</p>" +
        "<p>A useful trick is <b>overlap</b>: let chunks share a little text at their edges, so an idea split across a boundary isn't lost. Smart chunking also tries to break at natural points — paragraphs, headings, sentences — not mid-word.</p>" +
        "<p>As you get more serious, look into <b>semantic chunking</b> — splitting at meaning boundaries rather than fixed token counts. It works better for dense documents where topics don't align neatly with paragraph breaks.</p>" +
        "<p>Chunking quietly makes or breaks a RAG system. Great documents with bad chunking retrieve poorly; thoughtful chunking makes retrieval feel almost magical.</p>",
      analogy:
        "<p>Think of cutting a long movie into scenes so you can jump to the right one. Too few cuts and you scrub through huge sections; too many and scenes lose their context. Good chunking is sensible scene breaks — each piece is findable and still makes sense.</p>",
      mentalModel:
        "Chunking = slicing documents into findable, self-contained pieces. Not too big, not too small, with a little overlap, cut at natural boundaries.",
      mistakes: [
        "Using giant chunks that match everything vaguely and crowd the context window.",
        "Using tiny chunks that lose meaning and return fragments without enough context.",
        "Cutting mid-sentence or mid-idea instead of at natural breaks; skipping overlap and losing boundary ideas.",
      ],
      exercise: {
        goal: "Chunk a real document by hand.",
        steps: [
          "Take a one-page article and split it into chunks at natural paragraph breaks.",
          "For each chunk, ask: would this make sense on its own if retrieved alone?",
          "Add a sentence of overlap between two chunks where an idea spans the boundary.",
          "Note which chunk size felt most “findable yet complete.”",
        ],
        stretch: "Re-chunk the same article two ways (small vs large) and predict which would retrieve better for a specific question.",
      },
      quiz: [
        {
          q: "Why do we chunk documents for RAG?",
          options: ["To save disk space only", "So retrieval can find the specific relevant piece, not a whole document", "To train the model", "To translate them"],
          answer: 1,
          why: "Chunks let the system retrieve the precise relevant part instead of an unwieldy whole document.",
        },
        {
          q: "What's a risk of chunks that are too small?",
          options: ["They're too accurate", "They lose surrounding context and return meaningless fragments", "They train faster", "They use no memory"],
          answer: 1,
          why: "Tiny chunks can't carry enough context to be understood or useful on their own.",
        },
      ],
    },

    {
      id: "retrieval-pipelines",
      title: "Retrieval pipelines",
      time: 5,
      tagline: "The full assembly line from documents to grounded answer.",
      lesson:
        "<p>A <span class='term'>retrieval pipeline</span> is the <b>end-to-end sequence of steps</b> that takes raw documents and a user question and produces a grounded answer. It's RAG, laid out as an assembly line.</p>" +
        "<p><b>Setup (done once):</b> <b>1)</b> load documents, <b>2)</b> chunk them, <b>3)</b> embed the chunks, <b>4)</b> store in a vector database. This builds your searchable knowledge base.</p>" +
        "<p><b>Per question:</b> <b>5)</b> embed the question, <b>6)</b> retrieve the closest chunks, <b>7)</b> optionally re-rank them for quality, <b>8)</b> build a prompt with those chunks, <b>9)</b> generate the answer.</p>" +
        "<p>Each stage can be tuned. A common upgrade is a <b>re-ranker</b>: after the vector search returns, say, 20 candidates, a second step carefully reorders them so the best few go to the model. Another is filtering by metadata (date, source) before searching.</p>" +
        "<p>Thinking in pipelines helps you debug: if answers are wrong, you can ask <i>which stage</i> failed — bad chunking? weak retrieval? a crowded prompt? — instead of blaming “the AI.”</p>" +
        "<p>When you're ready to build, <b>LlamaIndex</b> is the most popular framework for wiring RAG pipelines, and <b>LangChain</b> is a wider orchestration framework that covers both RAG and agents. Either can handle all nine stages above with minimal boilerplate.</p>",
      analogy:
        "<p>It's a kitchen line: prep ingredients (load, chunk), store them labelled (embed, index), then per order: find the right ingredients (retrieve), pick the best (re-rank), and cook the dish (generate). A problem on the plate traces back to one station.</p>",
      mentalModel:
        "Retrieval pipeline = the RAG assembly line (load → chunk → embed → store → retrieve → re-rank → prompt → generate). Debug by asking which stage failed.",
      mistakes: [
        "Treating RAG as one magic box. Break it into stages so you can find the weak link.",
        "Skipping re-ranking and metadata filters when retrieval quality is shaky.",
        "Stuffing too many retrieved chunks into the prompt, drowning the model in noise.",
      ],
      exercise: {
        goal: "Diagnose a failing pipeline.",
        steps: [
          "Write the 9 pipeline stages down a page.",
          "Imagine the answer was wrong because it used an irrelevant document.",
          "Circle which stage likely failed (hint: retrieval or chunking).",
          "Propose one fix for that stage (better chunks? a re-ranker? a metadata filter?).",
        ],
        stretch: "Sketch how you'd add a date filter so a question about “this year” ignores old documents before vector search runs.",
      },
      quiz: [
        {
          q: "What is a retrieval pipeline?",
          options: ["A single model", "The end-to-end steps from documents and question to a grounded answer", "A GPU cluster", "A chat template"],
          answer: 1,
          why: "It's the full RAG assembly line: load, chunk, embed, store, retrieve, re-rank, prompt, generate.",
        },
        {
          q: "Why think of RAG as a pipeline of stages?",
          options: ["To make it look complex", "So you can debug which specific stage failed when answers are wrong", "To avoid using a model", "To reduce tokens"],
          answer: 1,
          why: "Stages let you isolate the weak link (chunking, retrieval, prompt) instead of blaming the whole system.",
        },
      ],
    },

    {
      id: "ai-memory",
      title: "AI memory systems",
      time: 5,
      tagline: "How an assistant remembers you across conversations.",
      lesson:
        "<p>By default a model forgets everything once the context window scrolls past — it has no built-in long-term memory. <span class='term'>AI memory systems</span> are the engineering around a model that let it <b>remember things across messages and sessions</b>.</p>" +
        "<p>The trick: store important facts <b>outside</b> the model (in a database or files), then <b>retrieve and re-insert</b> the relevant ones into the prompt when needed. If that sounds like RAG, it's because memory is often RAG pointed at “things about this user” instead of documents.</p>" +
        "<p>There are flavours: <b>short-term memory</b> (the current conversation in the context window), and <b>long-term memory</b> (facts saved and recalled later — your name, preferences, past decisions). Systems decide what's worth saving and how to fetch it back at the right moment.</p>" +
        "<p>So when an assistant “remembers” your name next week, it's not that the model changed — it's that a memory system stored that fact and slipped it back into the prompt.</p>",
      analogy:
        "<p>The model is a brilliant colleague with no long-term memory. A memory system is the notebook they keep about you: they jot down what matters, and glance at the relevant page before each chat so they seem to remember. The brain didn't change — the notes did.</p>",
      mentalModel:
        "AI memory = store facts outside the model, retrieve the relevant ones back into the prompt. “Memory” is RAG aimed at the user, not the model learning.",
      mistakes: [
        "Believing the model itself is learning/remembering. It's external storage fed back in as context.",
        "Saving everything forever, so retrieval gets noisy and privacy suffers. Be selective.",
        "Forgetting memory must be retrieved well — bad recall means the “memory” never shows up when needed.",
      ],
      exercise: {
        goal: "Design a tiny memory system on paper.",
        steps: [
          "List 5 facts an assistant should remember about a user (name, goals, preferences…).",
          "Decide where they'd be stored (a simple file or database).",
          "Describe when each fact should be retrieved back into a prompt.",
          "Note one fact you'd <b>not</b> store for privacy reasons.",
        ],
        stretch: "Explain how you'd let a user view and delete their stored memories — a key trust and privacy feature.",
      },
      quiz: [
        {
          q: "How do AI memory systems actually work?",
          options: ["The model permanently learns new facts each chat", "Facts are stored outside the model and retrieved back into the prompt when relevant", "They add GPUs", "They quantize the model"],
          answer: 1,
          why: "Memory is external storage plus retrieval — the model stays frozen; relevant facts are re-inserted.",
        },
        {
          q: "Why is memory closely related to RAG?",
          options: ["They're unrelated", "Memory is essentially retrieval aimed at facts about the user", "Both train models", "Both draw images"],
          answer: 1,
          why: "Both store information externally and retrieve the relevant bits into the prompt at the right time.",
        },
      ],
    },

    {
      id: "semantic-search",
      title: "Semantic search",
      time: 4,
      tagline: "Finding by meaning — the idea under retrieval and memory.",
      lesson:
        "<p><span class='term'>Semantic search</span> is searching by <b>meaning rather than exact words</b>. It's the engine behind RAG retrieval and AI memory, and it's worth naming on its own because it's so widely useful.</p>" +
        "<p>Traditional keyword search matches the literal words you typed. Semantic search embeds your query and the documents, then finds the closest in meaning. So searching “ways to relax” can surface a note titled “stress relief techniques,” despite zero shared keywords.</p>" +
        "<p>The pieces are now familiar: embeddings (meaning as coordinates) + a vector database (fast nearest-neighbour search). Put together, they let you ask in natural language and get results that <i>mean</i> the same thing.</p>" +
        "<p>Often the best real systems combine both: keyword search for exact terms (names, codes) and semantic search for meaning. That blend is called <b>hybrid search</b>.</p>",
      analogy:
        "<p>Keyword search is a strict librarian who only finds books with your exact words on the cover. Semantic search is a thoughtful one who understands the <i>topic</i> you want and brings related books too. Hybrid search uses both librarians together.</p>",
      mentalModel:
        "Semantic search = match by meaning using embeddings + vector search. Combine with keyword search (hybrid) for the best of exact and conceptual matching.",
      mistakes: [
        "Assuming semantic search always beats keyword search. For exact codes or names, keywords can win — use hybrid.",
        "Forgetting it depends entirely on good embeddings; a weak embedder gives weak meaning-matches.",
        "Expecting it to read your mind. Clear queries still help it find the right meaning.",
      ],
      exercise: {
        goal: "Tell keyword and semantic search apart.",
        steps: [
          "Write a query like “cheap ways to travel.”",
          "List documents it should find that share <b>no</b> keywords (e.g. “budget backpacking tips”).",
          "Decide: would keyword search find them? Would semantic? Would hybrid?",
          "Write one case where exact keyword search is actually better.",
        ],
        stretch: "Find a search tool that advertises “semantic” or “hybrid” search and note how it describes blending the two.",
      },
      quiz: [
        {
          q: "What is semantic search?",
          options: ["Searching by exact keywords", "Searching by meaning using embeddings and vector search", "Training a model", "Counting tokens"],
          answer: 1,
          why: "It matches based on meaning, finding related content even without shared words.",
        },
        {
          q: "What is hybrid search?",
          options: ["Two models merged", "Combining keyword search and semantic search for the best of both", "Search with no index", "A type of GPU"],
          answer: 1,
          why: "Hybrid search blends exact keyword matching with meaning-based semantic search.",
        },
      ],
    },

  ],
});
