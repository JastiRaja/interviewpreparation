import type { FullStackTrack } from "../fullstackTrackTypes";

export const aiEngineeringTrack: FullStackTrack = {
  layoutTitle: "AI Engineering & GenAI Architecture",
  layoutSubtitle: "RAG architecture, Vector DBs, HNSW indexing, Embeddings, and LLM Tool Calling",
  accent: "violet",
  defaultSectionId: "rag-vectors",
  sections: [
    {
      id: "rag-vectors",
      title: "RAG & Vector Search",
      icon: "🤖",
      heroTitle: "🤖 RAG Architecture & Vector Databases",
      heroSubtitle: "Chunking, Vector Embeddings, HNSW search, and Hybrid BM25 retrieval",
      heroGradient: "from-violet-600 via-purple-700 to-indigo-900",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "RAG (Retrieval-Augmented Generation) Architecture",
          priority: "🔥",
          theory: {
            what: "Retrieval-Augmented Generation (RAG) grounds Large Language Models (LLMs) in proprietary or up-to-date data without expensive fine-tuning. The pipeline: Ingestion (Document parsing, chunking, embedding generation, vector storage) -> Retrieval (Query embedding, vector similarity search, re-ranking) -> Synthesis (Augmented prompt + Context injected into LLM).",
            why: "LLMs suffer from hallucinations and knowledge cutoff dates. RAG provides verifiable source citations, eliminates training costs, and respects enterprise ACL permissions.",
            how: "Chunk documents with overlap (e.g. 500 tokens with 50-token overlap). Generate dense vectors using embedding models (text-embedding-3-small). Hybrid Search combines dense vector search with sparse keyword search (BM25) and passes top-20 results through a Cross-Encoder Re-ranker (Cohere / BGE).",
            keyPoints: [
              "Chunking Strategies: Fixed-size, Recursive Character, Semantic (split on embedding cosine distance drops), and Parent Document Retrieval",
              "Hybrid Search (Dense + Sparse): BM25 captures exact IDs/names; Vector search captures semantic meaning",
              "Re-ranking: Cross-encoders evaluate full query-chunk interaction to score top-5 highest-relevance context pieces",
            ],
            interviewQuestions: [
              {
                question: "Why is Hybrid Search (Vector + BM25) superior to pure Vector Search in RAG applications?",
                answer: "Pure vector search relies on high-dimensional semantic clustering and often struggles with exact keyword matching (e.g., error codes like 'ERR_502', SKU numbers, or specific person names). BM25 handles exact keyword token matches, while vector embeddings capture synonyms and semantic intent. Combining both with Reciprocal Rank Fusion (RRF) yields the highest precision.",
              },
            ],
          },
          codeExample: {
            title: "End-to-End RAG Pipeline with OpenAI & pgvector (TypeScript)",
            code: `import OpenAI from "openai";
import { Pool } from "pg";

const openai = new OpenAI();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function answerQuestionRAG(userQuery: string): Promise<string> {
  // 1. Generate dense vector embedding for user query (1536 dimensions)
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: userQuery,
  });
  const queryVector = JSON.stringify(embeddingRes.data[0].embedding);

  // 2. Vector Cosine Similarity Search in PostgreSQL (pgvector <=>)
  const { rows } = await pool.query(
    \`SELECT content, 1 - (embedding <=> $1::vector) as similarity
     FROM document_chunks
     ORDER BY embedding <=> $1::vector
     LIMIT 5\`,
    [queryVector]
  );

  const contextText = rows.map((r) => r.content).join("\\n---\\n");

  // 3. Synthesize response with augmented context
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Answer the user question using ONLY the provided context. Cite sources.",
      },
      {
        role: "user",
        content: \`Context:\\n\${contextText}\\n\\nQuestion: \${userQuery}\`,
      },
    ],
  });

  return completion.choices[0].message.content || "No answer generated.";
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Vector Databases & HNSW Indexing",
          priority: "🔥",
          theory: {
            what: "Vector Databases (Pinecone, Milvus, Qdrant, Chroma, PostgreSQL pgvector) store high-dimensional embeddings and execute Approximate Nearest Neighbor (ANN) searches. The standard graph-based indexing algorithm is HNSW (Hierarchical Navigable Small World).",
            why: "Brute-force exact k-Nearest Neighbors (kNN) calculates cosine distance against every single vector in the database, resulting in unacceptable O(N * D) latency at scale. HNSW delivers sub-10ms search in O(log N) time.",
            how: "HNSW builds a multi-layered skip-list of graphs: top layers have sparse long-range links for fast exploration; bottom layers have dense short-range clusters for precise local convergence.",
            keyPoints: [
              "Distance Metrics: Cosine Similarity (angle between vectors), Euclidean / L2 Distance (geometric distance), Inner / Dot Product",
              "HNSW Parameters: M (max connections per node) and efSearch (search beam size — trades query latency vs recall accuracy)",
              "Metadata Filtering: Pre-filtering (filter metadata before vector search) vs Post-filtering (filter top-K results)",
            ],
            interviewQuestions: [
              {
                question: "How does the HNSW (Hierarchical Navigable Small World) algorithm accelerate vector similarity search?",
                answer: "HNSW builds a multi-layer hierarchy of proximity graphs analogous to a skip-list. The query starts at the top sparse layer, rapidly traversing large distances with greedy routing. When reaching a local minimum, it drops to the next denser layer below, zooming in until reaching the bottom ground layer with high recall in O(log N) time.",
              },
            ],
          },
          codeExample: {
            title: "PostgreSQL pgvector HNSW Index Creation",
            code: `-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table storing document embeddings
CREATE TABLE document_chunks (
  id BIGSERIAL PRIMARY KEY,
  document_id UUID NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding vector(1536) NOT NULL -- 1536 dimensions for OpenAI embeddings
);

-- Create HNSW Index using Cosine Distance operator (vector_cosine_ops)
CREATE INDEX idx_chunks_hnsw_cosine 
ON document_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);`,
          },
        },
      ],
    },
    {
      id: "llm-infrastructure",
      title: "LLM Infrastructure & Tool Calling",
      icon: "⚙️",
      heroTitle: "⚙️ LLM Tool Calling & Streaming Infrastructure",
      heroSubtitle: "Function calling, JSON Schema validation, and Server-Sent Events (SSE) token streaming",
      heroGradient: "from-purple-600 via-indigo-700 to-blue-800",
      concepts: [
        {
          id: "3",
          number: 3,
          title: "LLM Function / Tool Calling Architecture",
          priority: "🔥",
          theory: {
            what: "Tool / Function Calling allows LLMs to interact with external APIs, databases, and calculation engines. The developer provides tool specifications with JSON Schema definitions; the LLM intelligently decides when to invoke a tool, outputs arguments in valid JSON, and incorporates the tool's execution results into its final response.",
            why: "Transforms passive text predictors into autonomous agentic AI assistants capable of fetching live database records or executing business transactions.",
            how: "1. Client sends messages + tools array. 2. LLM returns finish_reason: 'tool_calls' with function name and JSON arguments. 3. Backend executes the actual function code. 4. Backend appends tool result message and calls LLM again to synthesize final answer.",
            keyPoints: [
              "JSON Schema Enforcement: Strict Mode guarantees 100% adherence to schema types",
              "Multi-turn Agent Loops: LLM can chain multiple tool calls sequentially until the user goal is fulfilled",
              "Security: Always validate user permissions before executing LLM-requested database writes or API mutations",
            ],
            interviewQuestions: [
              {
                question: "How does LLM Function Calling work under the hood?",
                answer: "The LLM is fine-tuned to recognize tool definitions provided in the prompt. When a user prompt requires external data, the LLM halts natural language generation and outputs a structured JSON payload detailing the function name and argument values. The client executes the function and feeds the output back into the conversation context.",
              },
            ],
          },
          codeExample: {
            title: "OpenAI Function Calling Agent Execution Loop",
            code: `import OpenAI from "openai";
const openai = new OpenAI();

// Define executable tool with JSON schema
const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "getUserOrderStatus",
      description: "Retrieve order tracking status for a customer",
      parameters: {
        type: "object",
        properties: {
          orderId: { type: "string", description: "The order ID e.g. ORD-123" },
        },
        required: ["orderId"],
      },
    },
  },
];

export async function runAgent(userPrompt: string) {
  const messages: any[] = [{ role: "user", content: userPrompt }];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    tools,
  });

  const message = response.choices[0].message;

  // Check if LLM requested a tool invocation
  if (message.tool_calls && message.tool_calls.length > 0) {
    const toolCall = message.tool_calls[0];
    const args = JSON.parse(toolCall.function.arguments);

    // Execute local function
    const orderData = { id: args.orderId, status: "Shipped", eta: "Tomorrow" };

    messages.push(message); // Append assistant tool call
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(orderData),
    });

    // Synthesize final response with tool results
    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    return finalResponse.choices[0].message.content;
  }

  return message.content;
}`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "SSE Token Streaming & LLM Rate Limiting",
          theory: {
            what: "Because LLM responses take 5-30 seconds to complete, applications stream tokens in real-time as they are generated using Server-Sent Events (SSE). Rate Limiting for LLM apps must meter both Requests Per Minute (RPM) and Tokens Per Minute (TPM).",
            why: "Streaming reduces perceived Time to First Byte (TTFB) from 15 seconds to <500ms, creating a responsive ChatGPT-style UI.",
            how: "Set stream: true in OpenAI SDK. Use express res.write('data: ...\\n\\n') to push each token delta to the frontend EventSource or ReadableStream.",
            keyPoints: [
              "TPM (Tokens Per Minute) Throttling: Calculate token count with tiktoken before sending to avoid provider 429 errors",
              "Prompt Injection Defenses: Separate untrusted user input from system instructions using clear delimiter boundaries",
              "Edge Streaming: Use Vercel AI SDK or Cloudflare Workers for zero-cold-start token proxying",
            ],
            interviewQuestions: [
              {
                question: "How do you stream LLM completions to the browser with Server-Sent Events (SSE)?",
                answer: "Set HTTP response headers Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive. Iterate over the asynchronous stream chunks emitted by the LLM SDK and write data: JSON.stringify({ token })\\n\\n to the HTTP response socket, closing with res.end() when the stream completes.",
              },
            ],
          },
          codeExample: {
            title: "Streaming LLM Tokens via Express SSE Endpoint",
            code: `import express from "express";
import OpenAI from "openai";

const app = express();
const openai = new OpenAI();

app.post("/api/chat/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: req.body.prompt }],
    stream: true, // Enable Token Streaming
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content || "";
    if (token) {
      res.write(\`data: \${JSON.stringify({ token })}\\n\\n\`);
    }
  }

  res.write("data: [DONE]\\n\\n");
  res.end();
});`,
          },
        },
      ],
    },
  ],
};
