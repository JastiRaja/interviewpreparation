import type { FullStackTrack } from "../fullstackTrackTypes";

export const authTrack: FullStackTrack = {
  layoutTitle: "Authentication & authorization",
  layoutSubtitle: "Identity, tokens, OAuth, and access control",
  accent: "violet",
  defaultSectionId: "identity",
  sections: [
    {
      id: "identity",
      title: "Identity & sessions",
      icon: "🔑",
      heroTitle: "🔑 Identity & sessions",
      heroSubtitle: "Who you are and how proof is carried",
      heroGradient: "from-violet-600 to-purple-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Authentication vs authorization",
          priority: "🔥",
          theory: {
            what: "Authentication (AuthN) proves who the caller is. Authorization (AuthZ) decides what they may do on a resource. They are often conflated but fail for different reasons.",
            why: "Interviewers probe whether you secure endpoints with roles/claims, not only login forms.",
            how: "Authenticate once, then attach a signed token or session reference to each request. Authorize in the service layer with policy checks, not only UI hiding.",
            keyPoints: ["Defense in depth: gateway + service checks", "Service accounts vs human users", "Audit who did what"],
            interviewQuestions: [
              {
                question: "Can you be authenticated but not authorized?",
                answer: "Yes. You can prove identity (logged in) but lack permission for an action—e.g. a user trying to delete another tenant’s data. Return 403 Forbidden, not 401.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "Sessions, cookies & JWT",
          theory: {
            what: "Session cookies store an opaque server-side session ID (HttpOnly, Secure, SameSite). JWTs are self-contained signed claims, often used in SPAs and microservices, but are not inherently more secure.",
            why: "Cookie sessions simplify revocation and rotation; JWTs reduce server storage but complicate logout and secret rotation.",
            how: "Set cookie flags: HttpOnly against XSS theft, Secure on HTTPS, SameSite=Lax/Strict against CSRF. If using JWT, prefer short-lived access + refresh with rotation and denylist for compromise.",
            keyPoints: ["Never put secrets in localStorage if XSS is a risk", "JWT payload is base64, not encrypted—don’t hide PII", "BFF pattern can keep tokens off browsers"],
            interviewQuestions: [
              {
                question: "Why HttpOnly cookies?",
                answer: "JavaScript cannot read HttpOnly cookies, reducing impact of XSS stealing session tokens. The browser still sends them automatically on same-site requests (watch CSRF).",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "OAuth 2.0 & OpenID Connect",
          theory: {
            what: "OAuth2 delegates authorization to obtain access tokens for APIs (authorization code + PKCE for public clients). OpenID Connect adds identity: ID tokens (JWT) and userinfo on top of OAuth2.",
            why: "Login with Google/GitHub and enterprise SSO use these standards; rolling your own crypto is discouraged.",
            how: "Authorization code flow: redirect to IdP, callback with code, backend exchanges code for tokens. Validate issuer, audience, signature, and expiry on ID tokens.",
            keyPoints: ["PKCE replaces implicit flow for SPAs", "Scopes limit access; consent screens explain them", "Refresh tokens need secure storage and rotation"],
            interviewQuestions: [
              {
                question: "What is the difference between OAuth2 and OpenID Connect?",
                answer: "OAuth2 issues access tokens for delegated API access. OIDC adds authentication: ID tokens prove who the user is and standard claims, built on OAuth2 flows.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "access",
      title: "Access control",
      icon: "🛡️",
      heroTitle: "🛡️ RBAC, scopes & API keys",
      heroSubtitle: "Policies beyond login",
      heroGradient: "from-purple-600 to-violet-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "RBAC, ABAC & claims",
          theory: {
            what: "RBAC assigns permissions to roles, users get roles. ABAC evaluates attributes (user, resource, environment) against policies. Claims in tokens carry roles, scopes, or custom attributes.",
            why: "Flat role checks don’t scale; attribute policies handle multi-tenant and fine-grained cases.",
            how: "Map OAuth scopes to API abilities. Enforce tenant_id on every query for isolation. Consider policy engines (OPA, Cedar) for complex rules.",
            keyPoints: ["Principle of least privilege", "Role explosion: too many bespoke roles", "Test AuthZ with negative cases"],
            interviewQuestions: [
              {
                question: "What is wrong with only checking isAdmin?",
                answer: "Coarse booleans hide missing checks for other privileged actions and encourage a superuser bypass. Prefer explicit permissions or policies per resource/action.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Passwords, hashing & MFA",
          theory: {
            what: "Store passwords with slow adaptive hashes (Argon2id, bcrypt, scrypt)—never plaintext or MD5. MFA adds a second factor (TOTP, WebAuthn) after password or passkey.",
            why: "Credential stuffing and database leaks are routine; hashing and MFA reduce account takeover.",
            how: "Use established libraries; pepper optional secret in KMS; rate-limit and lockout login endpoints; passkeys reduce phishing risk.",
            keyPoints: ["Salt per password prevents rainbow tables", "Reset tokens single-use and short TTL", "Do not roll your own crypto"],
            interviewQuestions: [
              {
                question: "Why bcrypt over SHA-256 for passwords?",
                answer: "SHA-256 is fast—attackers can try billions of guesses per second. bcrypt (and Argon2) are intentionally slow and memory-hard, dramatically raising brute-force cost.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "API keys, mTLS & service identity",
          theory: {
            what: "API keys identify projects or services but are often long-lived secrets—pair with IP allowlists and rotation. mTLS authenticates both client and server with certificates. SPIFFE/SPIRE and cloud IAM bind workloads to identities.",
            why: "Machine-to-machine traffic should not reuse human OAuth flows blindly.",
            how: "Prefer short-lived tokens from workload identity over static keys. Vault or cloud secret managers store secrets; never commit them.",
            keyPoints: ["Keys in env vars at runtime, not git", "Separate dev/stage/prod credentials", "Audit key usage"],
            interviewQuestions: [
              {
                question: "When is an API key appropriate vs OAuth?",
                answer: "API keys suit server-to-server or internal tools with rotation and scope limits. OAuth (often client credentials) fits delegated access with expiry and audience-scoped tokens for third parties.",
              },
            ],
          },
        },
      ],
    },
  ],
};
