import type { FullStackTrack } from "../fullstackTrackTypes";

export const httpTrack: FullStackTrack = {
  layoutTitle: "HTTP & APIs",
  layoutSubtitle: "Protocol semantics, REST, and contract design",
  accent: "indigo",
  defaultSectionId: "protocol",
  sections: [
    {
      id: "protocol",
      title: "HTTP fundamentals",
      icon: "🌐",
      heroTitle: "🌐 HTTP fundamentals",
      heroSubtitle: "Requests, responses, and caching semantics",
      heroGradient: "from-indigo-600 to-violet-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Request / response model",
          priority: "🔥",
          theory: {
            what: "HTTP is a stateless application protocol: a client sends a request (method, path, headers, optional body) and the server returns a status line, headers, and body. HTTP/2 multiplexes streams; HTTP/3 uses QUIC over UDP.",
            why: "Every browser call, mobile app, and service mesh hop speaks HTTP; understanding it debugs CORS, caching, and proxies.",
            how: "Use devtools or curl to inspect. Idempotency and safety differ by method; bodies may be chunked or compressed (gzip, br).",
            keyPoints: ["Stateless: auth via cookies, tokens, or headers each request", "Host header required in HTTP/1.1", "Content-Type negotiates representation"],
            interviewQuestions: [
              {
                question: "What does stateless mean for HTTP?",
                answer: "The server does not inherently remember prior requests in the protocol itself. Session state is carried by cookies, tokens, or server-side stores explicitly.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "Methods, safety & idempotency",
          theory: {
            what: "GET and HEAD are safe (no server-side effects expected). Idempotent methods (GET, HEAD, PUT, DELETE) should leave the resource in the same logical state if repeated. POST is neither safe nor idempotent by default.",
            why: "Retries, caches, and intermediaries rely on these semantics—wrong method choice causes double charges or corrupted data.",
            how: "Use POST for creates with server-assigned IDs; PUT for replace; PATCH for partial updates (document how your API treats repeat PATCH). Use DELETE for removal.",
            keyPoints: ["Safe methods can be cached more aggressively", "Retry POST only with idempotency keys for payments", "OPTIONS for CORS preflight"],
            interviewQuestions: [
              {
                question: "Why is PUT usually idempotent but POST not?",
                answer: "PUT targets a specific resource URI and replaces it—repeating the same PUT yields the same end state. POST often creates a new subordinate resource each time unless you add explicit deduplication.",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "Status codes & headers",
          theory: {
            what: "1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error. Headers carry metadata: Cache-Control, Authorization, ETag, Location, Content-Type.",
            why: "Clients and CDNs branch on status and headers; misuse breaks caching and error handling.",
            how: "Return 201 + Location for creates; 204 for success with no body; 409 for conflicts; 429 with Retry-After for rate limits.",
            keyPoints: ["Prefer specific 4xx over generic 400", "ETag/If-None-Match enables conditional GET", "HSTS, CSP live on headers for security"],
            interviewQuestions: [
              {
                question: "When would you return 204 vs 200?",
                answer: "204 No Content signals success with an intentionally empty body—common for DELETE or updates where the client does not need a payload. 200 can carry a representation in the body.",
              },
            ],
          },
          codeExample: {
            title: "Conditional request",
            code: `GET /users/me HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
If-None-Match: "abc123"`,
          },
        },
      ],
    },
    {
      id: "apis",
      title: "API design",
      icon: "🔌",
      heroTitle: "🔌 REST, errors & contracts",
      heroSubtitle: "Resources, versioning, and machine-readable specs",
      heroGradient: "from-violet-600 to-indigo-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "REST constraints & resources",
          theory: {
            what: "REST maps domain nouns to resources identified by URIs, manipulated with HTTP methods, and represented as JSON/XML. HATEOAS (hypermedia) is idealized; most APIs use pragmatic REST.",
            why: "Consistent patterns reduce client surprise and make caching and tooling easier.",
            how: "Use plural nouns (/orders/{id}), nest for ownership (/users/{id}/orders), keep verbs out of paths when possible (use actions sub-resources if needed).",
            keyPoints: ["Stateless server; credentials per request", "Uniform interface: standard methods + representations", "Layered system: proxies, gateways OK"],
            interviewQuestions: [
              {
                question: "Is every JSON HTTP API RESTful?",
                answer: "Not necessarily. REST is an architectural style with constraints (client-server, stateless, cacheable, uniform interface, layered). Many JSON RPC-style endpoints are HTTP APIs without full REST discipline.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Versioning, pagination & filtering",
          theory: {
            what: "Versioning strategies include URL prefix (/v1/), headers (Accept-Version), or rarely query params. Pagination uses offset/limit (simple) or cursor/keyset (stable under inserts). Filtering via query strings.",
            why: "Breaking changes strand old clients; pagination choice affects performance and correctness.",
            how: "Prefer cursor pagination for large feeds. Document max page sizes. Return total counts only when cheap enough.",
            keyPoints: ["Keyset: WHERE id > :cursor ORDER BY id LIMIT n", "Avoid OFFSET for deep pages", "Consistent sort order is mandatory"],
            interviewQuestions: [
              {
                question: "Why prefer cursor pagination over offset?",
                answer: "Large OFFSET scans skipped rows, getting slower as pages deepen. Cursors use indexed seek from a bookmark, stable as data grows, and behave better under concurrent inserts.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "Errors & OpenAPI",
          theory: {
            what: "Consistent error bodies (code, message, details, trace id) help clients and support. RFC 7807 Problem Details is a common JSON shape. OpenAPI (Swagger) documents paths, schemas, and security.",
            why: "Contracts enable codegen, mocks, and CI breaking-change checks.",
            how: "Map domain errors to HTTP statuses; never leak stack traces to clients in prod. Publish OpenAPI from code or maintain spec as source of truth.",
            keyPoints: ["Correlation ID in error payload", "Validation errors: 400 with field-level detail", "Security schemes: bearer, OAuth2 in OpenAPI"],
            interviewQuestions: [
              {
                question: "What belongs in a public API error response?",
                answer: "A stable error code or type, human-readable message, optional structured details (e.g. invalid fields), request/correlation ID, and HTTP status. Omit internal stack traces and secrets.",
              },
            ],
          },
          codeExample: {
            title: "Problem Details (RFC 7807 style)",
            code: `{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient funds",
  "status": 402,
  "detail": "Balance is 4.00, charge was 10.00",
  "instance": "/trace/550e8400-e29b-41d4-a716-446655440000"
}`,
          },
        },
      ],
    },
  ],
};
