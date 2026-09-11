import type { FullStackTrack } from "../fullstackTrackTypes";

export const behavioralTrack: FullStackTrack = {
  layoutTitle: "Behavioral & Engineering Leadership",
  layoutSubtitle: "STAR framework, production outages, technical disagreements, tech debt, and leadership",
  accent: "violet",
  defaultSectionId: "star-framework",
  sections: [
    {
      id: "star-framework",
      title: "STAR & Story Crafting",
      icon: "👔",
      heroTitle: "👔 The STAR Method & High-Impact Storytelling",
      heroSubtitle: "Structure behavioral interview answers with quantifiable business impact",
      heroGradient: "from-violet-600 via-purple-700 to-indigo-800",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "The STAR Framework & Story Anatomy",
          priority: "🔥",
          theory: {
            what: "The STAR framework structures behavioral responses into 4 distinct phases: Situation (15% context), Task (10% your specific goal), Action (60% the specific technical and leadership actions YOU took), and Result (15% quantifiable metric impact and lessons learned).",
            why: "Interviewers evaluate past behavior as the best predictor of future performance. Rambling stories without clear personal ownership or quantifiable results fail senior engineering bars.",
            how: "Avoid using vague 'we did X'; explicitly state 'I designed Y, I benchmarked Z, and I led the migration'. Always end with numbers (e.g. 'reduced latency by 45%', 'saved $120k/year in AWS cloud spend', 'zero downtime for 2M users').",
            keyPoints: [
              "S (Situation): Brief context (company, problem, high stakes)",
              "T (Task): What was your specific responsibility or deliverable",
              "A (Action): Core technical decisions, trade-offs evaluated, how you resolved hurdles",
              "R (Result): Metrics (%, $, latency, developer hours saved) + retro takeaway",
            ],
            interviewQuestions: [
              {
                question: "How do you ensure your behavioral interview answers demonstrate senior engineering ownership?",
                answer: "Frame stories around technical trade-offs, cross-functional collaboration with product/design, proactive risk mitigation, and quantifiable business outcomes. Focus on what 'I' personally drove and architected, rather than speaking broadly about what 'the team' accomplished.",
              },
            ],
          },
          codeExample: {
            title: "STAR Story Cheat Sheet Template",
            code: `/*
================================================================================
STAR STORY STRUCTURE TEMPLATE
================================================================================
[Situation - 30s]: 
"At MyCompany, our checkout service was experiencing 4.2% failure rates and 
p99 latencies over 3.5 seconds during peak Black Friday traffic spikes."

[Task - 20s]: 
"As the lead backend engineer, my task was to redesign the order processing 
pipeline to support 10x traffic (50k RPS) with a strict <200ms p99 SLA."

[Action - 90s]: 
"1. Profiled database lock contention and identified synchronous table updates.
 2. Architected a decoupled event-driven pipeline using Kafka and the Transactional Outbox Pattern.
 3. Implemented Redis atomic inventory holds and Redis Cluster caching.
 4. Led load testing with k6 and coordinated the blue-green zero-downtime deployment."

[Result - 30s]: 
"Reduced checkout p99 latency from 3.5s to 120ms (96% decrease), dropped error rate 
to 0.001%, and successfully processed $18M in GMV with zero downtime."
*/`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Production Outage & Incident Management",
          priority: "🔥",
          theory: {
            what: "How you handle high-severity production incidents (SEV-1 / P0) under extreme pressure: Triage -> Mitigation (Rollback before Root Cause) -> Communication (Status page & stakeholders) -> Blameless Post-Mortem & 5 Whys Analysis.",
            why: "'Tell me about a time you caused or resolved a major production outage' tests calm crisis leadership, systematic debugging, and long-term preventive engineering.",
            how: "Rule #1 during an active outage: Mitigate first (Rollback, traffic drain, feature flag toggle, scale up pods) to restore customer service immediately before spending hours debugging the exact root cause line.",
            keyPoints: [
              "Blameless Culture: Focus on systemic process and tooling failures rather than blaming individual humans",
              "5 Whys Technique: Drill down past superficial bugs to the root process vulnerability",
              "Action Items (P0/P1 tickets): Adding automated regression tests, canary gates, and alert thresholds to prevent recurrence",
            ],
            interviewQuestions: [
              {
                question: "What is your step-by-step framework when responding to an active SEV-1 production outage?",
                answer: "1. Acknowledge and assume Incident Commander role. 2. Establish dedicated communication bridge (Slack/Zoom). 3. Focus on fast mitigation over root cause (Rollback deployment or toggle feature flag). 4. Keep customer status page updated. 5. Once stable, conduct a blameless post-mortem using the 5 Whys to schedule preventive engineering action items.",
              },
            ],
          },
          codeExample: {
            title: "5 Whys Incident Post-Mortem Example",
            code: `/*
================================================================================
BLAMELESS POST-MORTEM (5 WHYS ANALYSIS)
================================================================================
Incident: Production Database crashed for 18 minutes.

1. Why did the database crash?
   -> Memory exhaustion (OOM killer terminated PostgreSQL).
2. Why was memory exhausted?
   -> A reporting endpoint ran a full table scan query without LIMIT on a 20M row table.
3. Why did the query run without a LIMIT?
   -> A newly deployed backend endpoint omitted pagination parameters.
4. Why wasn't this caught in testing or code review?
   -> Staging database had only 500 mock rows, where the query completed in 2ms without memory spike.
5. Why don't we have query guardrails?
   -> Database lacked statement timeouts and query cost limits.

Preventive Action Items:
- [P0] Configure statement_timeout = '5s' globally on database.
- [P0] Add strict API pagination schema validation in CI linting.
- [P1] Seed Staging with production-scale synthetic datasets.
*/`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Technical Disagreements & Conflict Resolution",
          priority: "🔥",
          theory: {
            what: "Navigating architectural disagreements, competing technical proposals (e.g. GraphQL vs REST, Postgres vs MongoDB, Microservices vs Monolith), and differing engineering priorities through data-driven evaluation and consensus.",
            why: "Senior engineers must influence without authority, mentor others, and maintain psychological safety without letting ego derail projects.",
            how: "Framework: (1) Listen & clarify assumptions, (2) Define objective evaluation criteria (latency, developer velocity, operational cost, team familiarity), (3) Build small Proofs-of-Concept (POCs) / benchmarks, (4) Adopt Amazon's 'Disagree and Commit' principle once a decision is finalized.",
            keyPoints: [
              "Data over opinion: Run benchmarks (k6, Artillery) or create an RFC (Request for Comments) design doc",
              "Acknowledge trade-offs: Every architectural choice has costs; validate the other person's points",
              "Disagree and Commit: Once leadership or the team aligns on a path, execute 100% without passive resistance",
            ],
            interviewQuestions: [
              {
                question: "Tell me about a time you had a strong technical disagreement with a team member. How did you resolve it?",
                answer: "Describe focusing on shared project goals rather than personal preferences. Write an RFC detailing pros, cons, and migration risks of both approaches. If consensus is still split, build a quick 2-day proof-of-concept to measure real metrics. Once the decision is made, fully commit to the chosen solution.",
              },
            ],
          },
          codeExample: {
            title: "RFC (Request For Comments) Architecture Decision Matrix",
            code: `/*
================================================================================
RFC TECHNICAL EVALUATION MATRIX (Example: REST vs GraphQL)
================================================================================
Criterion (Weight)         | REST API Option          | GraphQL Option
---------------------------+--------------------------+-------------------------
1. Frontend Query Freedom  | Low (Fixed payloads)     | High (Client selects fields)
2. HTTP/CDN Caching        | High (Native edge cache) | Complex (Custom persisted queries)
3. Team Learning Curve     | Low (Universal knowledge)| Medium (Schema & Resolvers)
4. N+1 Query Risk          | Low                      | High (Requires DataLoader)
5. Developer Velocity      | Medium                   | High

Decision: Adopt GraphQL for Mobile BFF (cellular bandwidth optimization) 
while retaining REST for public webhooks and third-party developer APIs.
*/`,
          },
        },
      ],
    },
    {
      id: "leadership-frameworks",
      title: "Leadership & Interview Strategy",
      icon: "🎯",
      heroTitle: "🎯 Tech Debt, Prioritization & System Design Strategy",
      heroSubtitle: "Balancing product roadmap with technical debt and mastering the 4-step interview template",
      heroGradient: "from-purple-600 via-indigo-700 to-blue-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Technical Debt vs Feature Delivery",
          priority: "🔥",
          theory: {
            what: "Balancing business pressure to ship features quickly against the compounding cost of technical debt (architectural shortcuts, lack of automated tests, outdated libraries, unscalable schemas).",
            why: "Companies fail if they ship zero features (bankruptcy) or if they ignore technical debt (engineering gridlock and outages). Senior engineers translate tech debt into business risk.",
            how: "Negotiate dedicated tech debt capacity (e.g. 20% engineering budget per sprint). Translate tech debt into business terms: 'Refactoring this checkout service will reduce customer-facing 500 errors by 80% and increase developer deployment frequency from bi-weekly to daily.'",
            keyPoints: [
              "Strangler Fig Pattern: Incrementally replace legacy monolith components behind an API gateway without risky big-bang rewrites",
              "RICE Prioritization: Reach × Impact × Confidence ÷ Effort",
              "Boy Scout Rule: Leave code slightly cleaner than you found it during routine feature work",
            ],
            interviewQuestions: [
              {
                question: "How do you convince product managers or business stakeholders to prioritize technical debt?",
                answer: "Frame technical debt in terms of revenue, customer churn, and developer velocity rather than pure code aesthetics. Show how fixing foundational bottlenecks unlocks upcoming product roadmap features faster and prevents customer-facing outages.",
              },
            ],
          },
          codeExample: {
            title: "Strangler Fig Incremental Migration Pattern",
            code: `/*
================================================================================
STRANGLER FIG MIGRATION (Legacy Monolith -> Modern Microservice)
================================================================================
                 [API Gateway / Reverse Proxy]
                               │
               ┌───────────────┴───────────────┐
               ▼ (95% Traffic)                 ▼ (5% Canary Traffic)
       [Legacy Monolith]               [New Go/Node Microservice]
     (Users, Orders, Billing)               (Orders Service)
               │                               │
       [Legacy Monolith DB]            [New Postgres DB]
                               ▲
               [CDC / Dual Write Replication]
*/`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "The 4-Step System Design Interview Framework",
          priority: "🔥",
          theory: {
            what: "A structured 45-minute communication blueprint to ace any system design interview: Step 1 (Understand Requirements & Estimate Scale, 5-8 min), Step 2 (High-Level Design & Core APIs, 10-15 min), Step 3 (Detailed Component Deep Dive, 15-20 min), Step 4 (Bottlenecks, Failure Modes & Scaling, 5 min).",
            why: "Most candidates fail system design not from lack of knowledge, but from unstructured communication, diving into low-level details before clarifying requirements.",
            how: "Lead the conversation proactively. Ask clarifying questions on Functional requirements (what user does) vs Non-Functional requirements (latency, availability, consistency). Write down back-of-the-envelope calculations (RPS, Storage, Bandwidth) before drawing boxes.",
            keyPoints: [
              "Never start drawing architecture boxes in the first 5 minutes without clarifying scope",
              "State trade-offs explicitly: 'I am choosing DynamoDB over PostgreSQL here because our access patterns are strictly key-value lookups with 100k writes/sec'",
              "Drive the conversation: Don't wait passively for the interviewer to prompt every step",
            ],
            interviewQuestions: [
              {
                question: "What is your opening 5-minute approach in a System Design interview?",
                answer: "1. Clarify Functional Scope: What are the top 2-3 core user actions to design today? 2. Clarify Non-Functional Scope: Scale (DAU/MAU), read-to-write ratio, latency targets (p99 < 100ms), and CAP consistency requirements. 3. Estimate Scale: Calculate write RPS, read RPS, storage over 5 years, and network bandwidth.",
              },
            ],
          },
          codeExample: {
            title: "4-Step System Design Timeline & Math Cheat Sheet",
            code: `/*
================================================================================
45-MINUTE SYSTEM DESIGN INTERVIEW TIMELINE
================================================================================
[00:00 - 07:00] Step 1: Requirements & Back-of-the-Envelope Math
- Functional: Top 3 user flows. Out of scope features declared.
- Scale Math: 
  - 100M Daily Active Users (DAU) * 10 actions = 1 Billion requests/day
  - Average QPS = 1,000,000,000 / 86,400 ≈ 12,000 requests/sec (Peak = 24k QPS)
  - Storage: 12k writes/sec * 500 bytes = 6 MB/sec = ~189 TB / year

[07:00 - 20:00] Step 2: High-Level Architecture & API Design
- Define core REST/gRPC endpoints & database schema.
- Draw main components: Client -> DNS/CDN -> Load Balancer -> API Servers -> DB / Cache.

[20:00 - 38:00] Step 3: Deep Dive into Hard Problems
- Dive deep into interviewer's focus areas (e.g. data consistency, caching invalidation, real-time sync).

[38:00 - 45:00] Step 4: Bottlenecks, Fault Tolerance & Monitoring
- SPOF elimination, rate limiting, circuit breaking, and cross-region disaster recovery.
*/`,
          },
        },
      ],
    },
  ],
};
