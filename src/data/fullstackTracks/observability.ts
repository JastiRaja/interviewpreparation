import type { FullStackTrack } from "../fullstackTrackTypes";

export const observabilityTrack: FullStackTrack = {
  layoutTitle: "Observability & SRE",
  layoutSubtitle: "OpenTelemetry tracing, Prometheus metrics, structured logging, and SLOs",
  accent: "emerald",
  defaultSectionId: "pillars",
  sections: [
    {
      id: "pillars",
      title: "Telemetry & tracing",
      icon: "📊",
      heroTitle: "📊 Distributed tracing & OpenTelemetry",
      heroSubtitle: "W3C Trace Context, Spans, correlation IDs, and Structured Logging",
      heroGradient: "from-emerald-600 to-green-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Observability pillars & High cardinality",
          priority: "🔥",
          theory: {
            what: "Monitoring tells you when something is broken; Observability allows you to infer the internal state of a system based on external outputs (Logs, Metrics, Traces). High Cardinality data (dimensions with millions of unique values like userId, orderId, IP) allows isolating problems to specific users.",
            why: "In microservices and serverless environments, a bug rarely affects 100% of traffic; it affects specific customer tenants or hardware clusters.",
            how: "Correlate all telemetry via a unified OpenTelemetry SDK and propagate context across network boundaries using the W3C Trace Context standard (traceparent header).",
            keyPoints: [
              "Metrics: Aggregatable time-series numbers (p99 latency, RPS, memory) for alerting",
              "Logs: Structured JSON discrete events for deep context",
              "Traces: End-to-end causal journey of a single request across multiple microservices",
            ],
            interviewQuestions: [
              {
                question: "What is High Cardinality and why is it challenging in observability?",
                answer: "High cardinality refers to data fields with vast numbers of unique values (e.g., user_id, order_id). Traditional time-series databases crash when indexing high-cardinality tags due to index explosion; modern columnar observability stores (ClickHouse, Honeycomb) are designed specifically to handle high-cardinality analysis.",
              },
            ],
          },
          codeExample: {
            title: "W3C Trace Context Propagation Header",
            code: `/*
W3C 'traceparent' Header Format:
version - trace_id (16 bytes hex) - parent_span_id (8 bytes hex) - trace_flags
Example:
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
*/`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "OpenTelemetry Distributed Tracing",
          priority: "🔥",
          theory: {
            what: "OpenTelemetry (OTel) is the CNCF standard for vendor-agnostic telemetry generation and collection. A Trace represents a complete request tree; each individual unit of work in a service is represented as a Span containing start/end timestamps, status, attributes, and events.",
            why: "Pinpoints exactly which database query, downstream microservice, or external API is causing latency spikes in a distributed system.",
            how: "Initialize the Node.js / Java OTel SDK with auto-instrumentations (HTTP, Express, pg, redis). Context is automatically injected into outgoing HTTP headers and extracted by downstream services.",
            keyPoints: [
              "Head-based Sampling: Decide whether to record trace at origin (e.g. 5% of traffic) to manage storage costs",
              "Tail-based Sampling: OTel Collector buffers all spans and keeps 100% of traces that resulted in HTTP 500 errors or high latency (>2s)",
              "Span Attributes: Attach contextual business tags (orderId, tenantId) for filtering",
            ],
            interviewQuestions: [
              {
                question: "What is Tail-based sampling and why is it superior to Head-based sampling?",
                answer: "Head-based sampling decides at the initial entry whether to sample randomly (e.g., 10%), risking missing rare, catastrophic errors. Tail-based sampling buffers all spans at the collector level until the request finishes, guaranteeing that all error traces and slow requests are retained for analysis.",
              },
            ],
          },
          codeExample: {
            title: "OpenTelemetry Manual Span Instrumentation",
            code: `import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("order-service");

export async function processOrder(orderId: string, total: number) {
  // Create child span
  return await tracer.startActiveSpan("processOrder", async (span) => {
    try {
      span.setAttribute("order.id", orderId);
      span.setAttribute("order.total", total);

      const result = await chargePaymentGateway(orderId, total);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err: any) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
  });
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Structured logging & Correlation IDs",
          theory: {
            what: "Structured Logging emits machine-readable JSON logs with consistent key-value schemas. A Correlation ID (or trace_id) is passed across all downstream microservices to tie distributed log entries together.",
            why: "Unstructured console.log('user error: ' + id) makes searching in Elasticsearch/Loki/CloudWatch impossible across millions of log lines.",
            how: "Use high-performance loggers (Pino, Winston) combined with AsyncLocalStorage in Node.js to automatically attach the request's correlation ID and user context to every log invocation without manually passing parameters.",
            keyPoints: [
              "AsyncLocalStorage (Node.js) / MDC (Java): Thread-local/async context propagation for loggers",
              "Never log plaintext secrets, passwords, or PII (sanitize via log redaction hooks)",
              "Set log level via environment variables (info in prod, debug in staging)",
            ],
            interviewQuestions: [
              {
                question: "How do you trace a user request across 5 microservices using Correlation IDs?",
                answer: "An API Gateway generates a unique correlation ID (e.g., X-Correlation-ID: uuid) and attaches it to the incoming request. Each microservice reads this header, logs it in every JSON log message via AsyncLocalStorage/MDC, and forwards the same header on all outgoing HTTP/gRPC requests.",
              },
            ],
          },
          codeExample: {
            title: "Node.js Pino Logger with AsyncLocalStorage Correlation ID",
            code: `import express from "express";
import { AsyncLocalStorage } from "async_hooks";
import pino from "pino";
import crypto from "crypto";

const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();
const logger = pino({ level: "info" });

export const log = {
  info: (msg: string, data?: any) => {
    const store = asyncLocalStorage.getStore();
    const reqId = store?.get("requestId");
    logger.info({ reqId, ...data }, msg);
  },
};

const app = express();
app.use((req, res, next) => {
  const reqId = (req.headers["x-request-id"] as string) || crypto.randomUUID();
  const store = new Map([["requestId", reqId]]);
  asyncLocalStorage.run(store, () => next());
});`,
          },
        },
      ],
    },
    {
      id: "metrics-sre",
      title: "Metrics & SRE practices",
      icon: "📈",
      heroTitle: "📈 Prometheus, PromQL & Site Reliability Engineering",
      heroSubtitle: "Metrics types, Four Golden Signals, SLOs, and Error Budgets",
      heroGradient: "from-green-600 to-teal-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Prometheus Metrics & PromQL",
          priority: "🔥",
          theory: {
            what: "Prometheus collects numerical time-series metrics via a pull model (/metrics endpoint). It defines 4 core metric types: Counter (monotonically increasing value, e.g. http_requests_total), Gauge (value that goes up and down, e.g. memory_bytes), Histogram (samples observations into configurable buckets), and Summary.",
            why: "Counters and Histograms allow calculating accurate percentiles (p50, p95, p99) and error rates under heavy load.",
            how: "Instrument app using prom-client. Calculate rates in PromQL using rate(http_requests_total[5m]) and latency percentiles using histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)).",
            keyPoints: [
              "Never use rate() on a Gauge—rate() is only valid for Counters",
              "Histograms enable multi-instance percentile aggregation (p99 latency across all pods)",
              "Watch label cardinality in Prometheus (never put user_id in metric labels!)",
            ],
            interviewQuestions: [
              {
                question: "What metric type should you use to measure API request latency in Prometheus and why?",
                answer: "Use a Histogram. It records latency observations into predefined bucket boundaries (e.g. 0.1s, 0.5s, 1s). This allows Prometheus to calculate accurate aggregated p95/p99 percentiles across multiple distributed server instances using histogram_quantile.",
              },
            ],
          },
          codeExample: {
            title: "Prometheus Histogram Metric & PromQL Query",
            code: `import client from "prom-client";

// Prometheus Histogram for Request Duration
export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

/* PromQL: 95th Percentile Latency over 5-minute window */
// histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

/* PromQL: Error Rate Percentage */
// sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "SRE: SLI, SLO, SLA & Error budgets",
          priority: "🔥",
          theory: {
            what: "Service Level Indicator (SLI) is the quantitative measure of service performance (e.g., % of requests returning <200ms with HTTP 200). Service Level Objective (SLO) is the internal reliability target agreed upon by engineering and product (e.g., 99.9% uptime per month). Service Level Agreement (SLA) is the legal contract with customers with financial penalties. Error Budget = 100% - SLO (e.g. 0.1% = 43 minutes of downtime per month for a 99.9% SLO).",
            why: "Error Budgets balance velocity vs reliability: if the error budget is exhausted, deployments are halted to focus on tech debt and reliability fixes.",
            how: "Track The Four Golden Signals (Latency, Traffic, Errors, Saturation). Trigger on-call PagerDuty alerts only when the Error Budget Burn Rate threatens to deplete the budget within hours.",
            keyPoints: [
              "Four Golden Signals: Latency, Traffic (RPS), Errors (5xx), Saturation (% CPU/RAM/Connection pool)",
              "Multi-window Multi-burn-rate Alerting: Eliminates alert fatigue by alerting only on fast-burn incidents",
              "SLO targets: 99.9% (Three 9s = 43.8 mins/mo downtime) vs 99.99% (Four 9s = 4.38 mins/mo)",
            ],
            interviewQuestions: [
              {
                question: "What is an Error Budget and how does it influence deployment decisions in SRE?",
                answer: "An Error Budget is the allowable amount of unreliability (100% - SLO). For a 99.9% SLO, the team has a 0.1% error budget. When the error budget is healthy, product teams can ship new features rapidly. If the error budget is burned, feature releases are paused to prioritize stability and bug fixes.",
              },
            ],
          },
          codeExample: {
            title: "SLO Downtime & Error Budget Table",
            code: `/*
Availability Level | Allowed Downtime / Month | Allowed Downtime / Year
99.0%  (Two 9s)    | 7.31 hours               | 3.65 days
99.9%  (Three 9s)  | 43.8 minutes             | 8.77 hours
99.99% (Four 9s)   | 4.38 minutes             | 52.6 minutes
99.999% (Five 9s)  | 26.3 seconds             | 5.26 minutes
*/`,
          },
        },
      ],
    },
  ],
};
