import type { FullStackTrack } from "../fullstackTrackTypes";

export const securityTrack: FullStackTrack = {
  layoutTitle: "Security mindset",
  layoutSubtitle: "Threats, defenses, and secure delivery",
  accent: "rose",
  defaultSectionId: "threats",
  sections: [
    {
      id: "threats",
      title: "Common attacks",
      icon: "🔓",
      heroTitle: "🔓 OWASP-style threats",
      heroSubtitle: "What breaks apps and how attackers think",
      heroGradient: "from-rose-600 to-red-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "OWASP Top 10 mindset",
          priority: "🔥",
          theory: {
            what: "The OWASP Top 10 lists prevalent risks: broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable components, auth failures, integrity failures, logging failures, SSRF.",
            why: "Interviewers expect you to name concrete mitigations, not buzzwords.",
            how: "Threat model assets and trust boundaries; prioritize by impact × likelihood; test with SAST/DAST and manual review.",
            keyPoints: ["Shift left: design and code review", "Assume breach: limit blast radius", "Keep frameworks patched"],
            interviewQuestions: [
              {
                question: "What is broken access control?",
                answer: "Users can act on resources they should not—e.g. changing another user’s ID in an API call. Fix with server-side checks on every request, not hidden UI alone.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "XSS, CSRF & injection",
          theory: {
            what: "Cross-site scripting injects scripts into pages others view—steal cookies, deface. CSRF tricks a logged-in browser into unwanted actions. Injection (SQL, command, LDAP) passes untrusted input to interpreters.",
            why: "These are still top findings in bug bounty and pentests.",
            how: "Contextual output encoding, CSP, HttpOnly cookies. CSRF tokens or SameSite cookies for state-changing requests. Parameterized queries/ORM for SQL; never shell-concatenate user input.",
            keyPoints: ["Stored vs reflected XSS", "Content Security Policy as defense in depth", "ORM does not auto-fix all injection—raw SQL still risky"],
            interviewQuestions: [
              {
                question: "How do parameterized queries stop SQL injection?",
                answer: "Placeholders send SQL structure separately from data, so the database never interprets user input as syntax. Concatenating strings merges code and data, allowing injection.",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "TLS, headers & transport security",
          theory: {
            what: "TLS encrypts data in transit. Security headers: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options/Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.",
            why: "Misconfigured TLS or missing headers enable downgrade, clickjacking, and MIME sniffing attacks.",
            how: "Terminate TLS at load balancer or ingress with modern ciphers; automate cert renewal (ACME). Tune CSP gradually to avoid breaking the app.",
            keyPoints: ["HSTS preload for long-lived HTTPS enforcement", "CSP report-only mode first", "Subresource Integrity for third-party scripts"],
            interviewQuestions: [
              {
                question: "What does CSP achieve?",
                answer: "Content Security Policy restricts which sources can execute scripts, load styles, connect, etc., reducing XSS impact even if markup is injected.",
              },
            ],
          },
          codeExample: {
            title: "Example headers",
            code: `Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff`,
          },
        },
      ],
    },
    {
      id: "lifecycle",
      title: "Secure lifecycle",
      icon: "🔐",
      heroTitle: "🔐 Supply chain & operations",
      heroSubtitle: "Dependencies, secrets, and detection",
      heroGradient: "from-red-600 to-rose-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Dependencies & supply chain",
          theory: {
            what: "Third-party packages and base images carry transitive vulnerabilities. Typosquatting, compromised maintainers, and build tampering are supply-chain risks.",
            why: "Log4j-style events affect every full-stack team using ecosystems.",
            how: "Lockfiles, SBOMs, Dependabot/Snyk, pin image digests, verify checksums, review high-risk deps, use private registries.",
            keyPoints: ["Minimal base images reduce CVE surface", "Sign artifacts and verify in CI", "License compliance alongside security"],
            interviewQuestions: [
              {
                question: "What is an SBOM?",
                answer: "A Software Bill of Materials lists components and versions in an application or image. It enables rapid impact analysis when a new CVE is announced.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Secrets, keys & least privilege",
          theory: {
            what: "Secrets include API keys, DB passwords, signing keys. Store in vaults/KMS; rotate; scope IAM to minimum needed; audit access. Avoid logging bodies that contain secrets.",
            why: "Leaked keys in GitHub are scanned by bots within minutes.",
            how: "git-secrets, pre-commit hooks, secret scanning in CI, break-glass procedures, short-lived tokens.",
            keyPoints: ["Separate prod/dev keys always", "Service accounts per workload", "Redact logs and error messages"],
            interviewQuestions: [
              {
                question: "What is least privilege?",
                answer: "Grant identities only the permissions required for their task—narrow IAM roles, scoped tokens, no shared admin accounts—so compromise has limited reach.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "Detection, logging & response",
          theory: {
            what: "Prevent controls fail; detection includes WAF alerts, anomaly detection, audit logs, and SIEM correlation. Runbooks define incident response: contain, eradicate, recover, postmortem.",
            why: "Compliance (SOC2, GDPR) and customer trust require provable logging and breach handling.",
            how: "Structured logs with request IDs; immutable audit trail for admin actions; practice tabletop exercises.",
            keyPoints: ["PII minimization in logs", "Retention policies", "Blameless postmortems"],
            interviewQuestions: [
              {
                question: "Why avoid logging passwords?",
                answer: "Logs are copied to many systems and often less protected than the password store—logging credentials increases breach impact and may violate policy and law.",
              },
            ],
          },
        },
      ],
    },
  ],
};
