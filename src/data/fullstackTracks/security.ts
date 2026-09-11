import type { FullStackTrack } from "../fullstackTrackTypes";

export const securityTrack: FullStackTrack = {
  layoutTitle: "Security mindset & defenses",
  layoutSubtitle: "OWASP Top 10, XSS/CSRF, CSP headers, SSRF mitigation, and supply chain security",
  accent: "rose",
  defaultSectionId: "threats",
  sections: [
    {
      id: "threats",
      title: "Vulnerabilities & defenses",
      icon: "🔓",
      heroTitle: "🔓 OWASP vulnerabilities, XSS & CSRF",
      heroSubtitle: "Injection, Cross-Site Scripting, CSRF tokens, and SSRF prevention",
      heroGradient: "from-rose-600 to-red-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "OWASP Top 10 & Broken access control",
          priority: "🔥",
          theory: {
            what: "The OWASP Top 10 ranks the most critical application security risks: #1 Broken Access Control, #2 Cryptographic Failures, #3 Injection, #4 Insecure Design, #5 Security Misconfiguration, #6 Vulnerable Components, #7 Identification/Auth Failures, #8 Software/Data Integrity Failures, #9 Security Logging Failures, #10 Server-Side Request Forgery (SSRF).",
            why: "Security is non-negotiable in full-stack interviews. Broken access control accounts for over 35% of production data breaches.",
            how: "Apply Principle of Least Privilege, deny access by default, and validate tenant ownership on every record query (WHERE tenant_id = :currentTenant).",
            keyPoints: [
              "BOLA / IDOR: Always check resource ownership in the SQL WHERE clause",
              "Never trust client-supplied input: Validate types, schemas (Zod/Joi), and bounds on the backend",
              "Assume Breach: Encrypt data at rest, in transit, and practice network segmentation",
            ],
            interviewQuestions: [
              {
                question: "What is SSRF (Server-Side Request Forgery) and how do attackers exploit it in cloud environments?",
                answer: "SSRF occurs when an API fetches a user-supplied URL without validation. In AWS/GCP, attackers pass the internal cloud instance metadata endpoint (http://169.254.169.254/latest/meta-data/iam/security-credentials) to steal temporary IAM admin credentials. Prevent by blocking private/link-local IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.169.254).",
              },
            ],
          },
          codeExample: {
            title: "SSRF Protection with IP & Hostname Validation",
            code: `import ipaddr from "ipaddr.js";
import dns from "dns/promises";

export async function isSafePublicUrl(urlString: string): Promise<boolean> {
  const url = new URL(urlString);
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  // Resolve hostname to IP address to prevent DNS rebinding
  const addresses = await dns.lookup(url.hostname, { all: true });

  for (const { address } of addresses) {
    const addr = ipaddr.parse(address);
    // Reject Private, Loopback, LinkLocal (169.254...), and Reserved IPs
    if (addr.range() !== "unicast") {
      return false; // Block internal infrastructure access
    }
  }

  return true;
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "XSS (Cross-Site Scripting) & Sanitization",
          priority: "🔥",
          theory: {
            what: "Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected into a trusted web application. The three types are: (1) Stored XSS (saved in database, served to all visitors), (2) Reflected XSS (payload echoed in search params), and (3) DOM-based XSS (client-side script dangerously modifies innerHTML or eval).",
            why: "XSS allows attackers to hijack active user sessions, exfiltrate sensitive data, or deface websites.",
            how: "React auto-escapes JSX values by default. When rendering user-authored rich HTML, sanitize with DOMPurify or sanitize-html. Avoid dangerouslySetInnerHTML, document.write(), and innerHTML.",
            keyPoints: [
              "HttpOnly Cookies: Prevents JavaScript (document.cookie) from stealing session identifiers via XSS",
              "Contextual Output Encoding: Encode differently for HTML body, HTML attributes, and JavaScript strings",
              "Content-Security-Policy (CSP): Serves as the ultimate defense-in-depth against XSS",
            ],
            interviewQuestions: [
              {
                question: "How does React prevent XSS by default and when is it still vulnerable?",
                answer: "React treats all variable expressions in JSX (e.g. <div>{userInput}</div>) as strings and escapes special characters (<, >, &, \", ') before rendering. React is still vulnerable if developers use dangerouslySetInnerHTML, href='javascript:...', or execute user strings via eval().",
              },
            ],
          },
          codeExample: {
            title: "Safe Rich HTML Rendering with DOMPurify in React",
            code: `import DOMPurify from "dompurify";

export function SafeHtmlViewer({ dirtyHtml }: { dirtyHtml: string }) {
  // Sanitize untrusted HTML and strip malicious script tags / javascript: links
  const cleanHtml = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "ul", "li"],
    ALLOWED_ATTR: ["href", "target"],
  });

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "CSRF (Cross-Site Request Forgery) Defenses",
          priority: "🔥",
          theory: {
            what: "CSRF tricks an authenticated user's browser into submitting an unauthorized request (e.g. transferring money or changing an email) to a target site where the user is already logged in, because the browser automatically attaches cookies to cross-origin requests.",
            why: "Classic cookie-based web applications are vulnerable if they lack SameSite or Anti-CSRF token verification.",
            how: "Defenses: (1) SameSite=Lax/Strict on session cookies (blocks third-party origins from sending cookies on cross-origin POSTs), (2) Anti-CSRF Synchronizer Tokens (random token embedded in form/header validated on server), (3) Double-Submit Cookie Pattern for SPAs.",
            keyPoints: [
              "SameSite=Strict: Cookie is never sent on cross-site requests (even following links)",
              "SameSite=Lax: Cookie sent on top-level safe GET navigations, but blocked on cross-origin POST/PUT",
              "APIs using Authorization: Bearer <token> headers are immune to CSRF because browsers do not attach custom headers automatically",
            ],
            interviewQuestions: [
              {
                question: "Why are REST APIs using Authorization: Bearer JWT headers immune to CSRF attacks?",
                answer: "CSRF exploits the browser's automatic inclusion of cookies on cross-origin requests. Custom HTTP headers (like Authorization: Bearer ...) must be explicitly attached by JavaScript. Under standard CORS policies, third-party malicious sites cannot set or read custom headers on cross-origin requests.",
              },
            ],
          },
          codeExample: {
            title: "Double-Submit Cookie CSRF Middleware",
            code: `import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

// Double-Submit Cookie Pattern for SPAs
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  // 1. Generate CSRF token on initial session if absent
  if (!req.cookies["XSRF-TOKEN"]) {
    const token = crypto.randomBytes(32).toString("hex");
    res.cookie("XSRF-TOKEN", token, { sameSite: "lax", secure: true });
  }

  // 2. Safe methods bypass check
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // 3. Mutating methods must match header to cookie
  const headerToken = req.headers["x-xsrf-token"];
  const cookieToken = req.cookies["XSRF-TOKEN"];

  if (!headerToken || headerToken !== cookieToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
}`,
          },
        },
      ],
    },
    {
      id: "headers-supply-chain",
      title: "Hardening & supply chain",
      icon: "🛡️",
      heroTitle: "🛡️ HTTP security headers & supply chain",
      heroSubtitle: "Content-Security-Policy (CSP), Helmet, CORS, and Secrets management",
      heroGradient: "from-red-600 to-rose-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Content Security Policy (CSP) & Helmet headers",
          priority: "🔥",
          theory: {
            what: "Content Security Policy (CSP) is an HTTP response header that restricts which domain origins can execute scripts, load stylesheets, fonts, and connect to websockets. Helmet.js is the standard Node.js middleware to automatically configure secure HTTP headers.",
            why: "A strict CSP prevents XSS from loading external attacker scripts or exfiltrating data, even if injection vulnerability exists.",
            how: "Apply Helmet middleware. Use Nonce-based CSP (script-src 'nonce-RANDOM') for inline scripts and disallow 'unsafe-inline' and 'unsafe-eval'.",
            keyPoints: [
              "Strict-Transport-Security (HSTS): Forces browsers to connect exclusively over HTTPS (max-age=31536000; includeSubDomains; preload)",
              "X-Content-Type-Options: nosniff (prevents MIME-type sniffing)",
              "X-Frame-Options: DENY (prevents Clickjacking by disallowing iframe embedding)",
            ],
            interviewQuestions: [
              {
                question: "What is the purpose of the Content-Security-Policy (CSP) header?",
                answer: "CSP instructs the browser to restrict which resources (scripts, images, stylesheets, iframes) can be loaded and executed. It restricts script execution to trusted domains or cryptographically signed nonces, preventing inline script injection and unauthorized data exfiltration.",
              },
            ],
          },
          codeExample: {
            title: "Strict Security Headers with Helmet in Express",
            code: `import express from "express";
import helmet from "helmet";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        connectSrc: ["'self'", "https://api.myservice.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
  })
);`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Supply chain security & Secrets hygiene",
          theory: {
            what: "Supply chain security defends against compromised open-source packages (typosquatting, malicious dependencies, event-stream style attacks). Secrets management ensures API keys, database credentials, and signing certificates are never hardcoded or committed to git.",
            why: "Over 80% of application code comes from open-source dependencies. Leaked AWS or database credentials in public repos lead to complete ransomware takeover within minutes.",
            how: "Run npm audit, Snyk, and Dependabot in CI. Use tools like Gitleaks / truffleHog in pre-commit hooks to block credential commits. In cloud production, pull secrets at runtime from AWS Secrets Manager or HashiCorp Vault.",
            keyPoints: [
              "Software Bill of Materials (SBOM): Inventory of all components, libraries, and modules",
              "Never commit .env files: Keep .env in .gitignore and provide .env.example with dummy values",
              "Pin dependencies or lockfiles (package-lock.json) in version control",
            ],
            interviewQuestions: [
              {
                question: "What steps do you take to secure third-party dependencies in production?",
                answer: "1. Commit and enforce package-lock.json with npm ci. 2. Automate vulnerability scanning in CI using Snyk or npm audit. 3. Use Dependabot for prompt security patching. 4. Verify package provenance and avoid unmaintained packages with few maintainers.",
              },
            ],
          },
          codeExample: {
            title: "Pre-commit Secret Scanning & CI Audit Commands",
            code: `# In CI Pipeline or Pre-commit hook:
# 1. Audit node dependencies for known CVEs (fail on high/critical)
npm audit --audit-level=high

# 2. Run Gitleaks to detect accidental secrets in staged commits
gitleaks protect --staged --verbose

# 3. Pull secret at runtime (AWS Secrets Manager)
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
const client = new SecretsManagerClient({ region: "us-east-1" });
const secret = await client.send(new GetSecretValueCommand({ SecretId: "prod/db/credentials" }));`,
          },
        },
      ],
    },
  ],
};
