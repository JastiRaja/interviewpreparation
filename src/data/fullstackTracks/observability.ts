import type { FullStackTrack } from "../fullstackTrackTypes";

export const observabilityTrack: FullStackTrack = {
  layoutTitle: "Observability",
  layoutSubtitle: "Logs, metrics, traces, and SLOs",
  accent: "emerald",
  defaultSectionId: "pillars",
  sections: [
    {
      id: "pillars",
      title: "Three pillars",
      icon: "📊",
      heroTitle: "📊 Logs, metrics & traces",
      heroSubtitle: "Understand production behavior end to end",
      heroGradient: "from-emerald-600 to-green-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Observability vs monitoring",
          priority: "🔥",
          theory: {
            what: "Monitoring checks known failure modes with dashboards and alerts. Observability lets you ask novel questions of telemetry (why this user, why now) via rich logs, metrics, and traces correlated together.",
            why: "Microservices multiply failure modes; debugging requires jumping service boundaries.",
            how: "Instrument consistently: structured JSON logs, RED/USE metrics, OpenTelemetry traces exported to backends (Grafana, Datadog, Honeycomb).",
            keyPoints: ["High cardinality enables drill-down", "Sampling balances cost on traces", "SLOs drive what to alert on"],
            interviewQuestions: [
              {
                question: "What are the three pillars?",
                answer: "Metrics (aggregated numbers over time), logs (discrete events with context), and traces (request paths across services). Together they explain symptoms and root causes.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "Structured logging",
          theory: {
            what: "Structured logs are machine-parseable fields (JSON): level, timestamp, message, trace_id, span_id, user_id, service, version—avoid string-only printf debugging in prod.",
            why: "Search and aggregate in log platforms; correlate with traces.",
            how: "Use a logging library with context propagation; centralize with Fluent Bit, Vector, or cloud logging; set retention tiers.",
            keyPoints: ["Log levels: error for actionable, info for audit trail, debug gated", "PII redaction pipelines", "One event per logical action"],
            interviewQuestions: [
              {
                question: "Why JSON logs instead of plain text?",
                answer: "Fields are queryable and aggregatable (count by error.code) without regex fragility; they map cleanly to log platforms and join with metrics/trace IDs.",
              },
            ],
          },
          codeExample: {
            title: "Structured entry",
            code: `{"ts":"2026-03-28T12:00:00Z","level":"info","msg":"order_paid",
 "trace_id":"4bf92f3577b34da6","order_id":"o-9","amount_cents":5000}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Metrics: RED & USE",
          theory: {
            what: "RED for services: Rate (requests/sec), Errors (failed requests), Duration (latency). USE for resources: Utilization, Saturation, Errors. Histograms power SLO latency percentiles.",
            why: "Golden signals catch user-visible pain before disks fill.",
            how: "Export Prometheus metrics or vendor equivalents; label cardinality discipline—avoid unbounded user ID labels.",
            keyPoints: ["Counters vs gauges vs histograms", "Exponential histograms in OpenTelemetry", "Recording rules for long-range queries"],
            interviewQuestions: [
              {
                question: "What is the difference between RED and USE?",
                answer: "RED targets request-driven services (rate, errors, duration). USE targets hardware or pooled resources like CPU, disks, and queues—utilization, saturation, errors.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "practice",
      title: "Tracing & SLOs",
      icon: "🔭",
      heroTitle: "🔭 Traces, correlation & reliability targets",
      heroSubtitle: "Follow requests and alert on user impact",
      heroGradient: "from-green-600 to-emerald-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Distributed tracing",
          theory: {
            what: "A trace is a tree of spans representing work units across services. Context propagation (W3C traceparent) passes trace and span IDs over HTTP/gRPC/message queues.",
            why: "Pinpoints slow downstream calls and parallel fan-out issues.",
            how: "Auto-instrument frameworks with OpenTelemetry; add attributes (db.statement sanitized, http.route); use tail sampling for errors and high latency.",
            keyPoints: ["Parent-based sampling", "Links for async batch relationships", "Baggage for cross-cutting hints (use carefully)"],
            interviewQuestions: [
              {
                question: "What is a span vs a trace?",
                answer: "A trace is the whole request journey; a span is one timed operation (HTTP call, DB query) with start/end, attributes, and parent/child links forming a tree.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Correlation IDs",
          theory: {
            what: "A correlation or request ID ties logs, metrics, and traces for one user action. Generate at edge (ingress) or accept from trusted clients; propagate in headers and MDC.",
            why: "Support tickets become searchable without guessing timestamps.",
            how: "Standardize header name (X-Request-ID or trace id); return in error responses; include in audit logs.",
            keyPoints: ["W3C Trace Context for interoperability", "Do not trust client IDs for security—only correlation", "Pass through async boundaries"],
            interviewQuestions: [
              {
                question: "Where should a request ID be created?",
                answer: "At the trust boundary closest to the user—often API gateway or first service—so all downstream logs share one identifier unless joining via trace context.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "SLOs, error budgets & alerting",
          theory: {
            what: "Service Level Objectives define target reliability (e.g. 99.9% successful requests monthly). Error budget is allowed unreliability; burning it too fast triggers feature freeze or incident focus. Alert on symptoms (user pain) via SLO burn rates.",
            why: "Paging on every CPU spike causes alert fatigue; SLO-aligned alerts reduce noise.",
            how: "Define SLIs (measured indicators), SLO targets, multi-window burn alerts; run blameless postmortems; document runbooks.",
            keyPoints: ["Latency SLOs use percentiles over sliding windows", "Synthetic checks complement real traffic", "Internal vs external SLOs"],
            interviewQuestions: [
              {
                question: "What is an error budget?",
                answer: "The allowable amount of unreliability implied by an SLO—e.g. 99.9% monthly allows ~43 minutes downtime. Spending the budget signals trade-offs: ship slower or invest in reliability.",
              },
            ],
          },
        },
      ],
    },
  ],
};
