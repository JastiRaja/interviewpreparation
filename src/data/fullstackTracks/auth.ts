import type { FullStackTrack } from "../fullstackTrackTypes";

export const authTrack: FullStackTrack = {
  layoutTitle: "Authentication & authorization",
  layoutSubtitle: "Identity, JWT, refresh rotation, OAuth2/OIDC, RBAC/ABAC, and API security",
  accent: "violet",
  defaultSectionId: "identity",
  sections: [
    {
      id: "identity",
      title: "Identity & tokens",
      icon: "🔑",
      heroTitle: "🔑 Identity & token architecture",
      heroSubtitle: "AuthN vs AuthZ, JWT vs Sessions, Refresh Token Rotation, and OAuth2/OIDC",
      heroGradient: "from-violet-600 to-purple-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Authentication vs authorization",
          priority: "🔥",
          theory: {
            what: "Authentication (AuthN) verifies 'Who are you?' (identity credentials like passwords, TOTP, biometrics). Authorization (AuthZ) verifies 'What are you allowed to do?' (permissions, roles, tenant access policies).",
            why: "Conflating AuthN and AuthZ leads to severe security vulnerabilities, broken access controls (OWASP #1), and incorrect HTTP response status codes.",
            how: "Authenticate at the perimeter or gateway, establish identity claims (sub, email, tenantId), then enforce granular authorization in application service layers.",
            keyPoints: [
              "401 Unauthorized: caller is unauthenticated (missing or invalid credentials)",
              "403 Forbidden: caller is authenticated but lacks required permission to access the resource",
              "Never rely solely on frontend route guards or UI hiding for authorization",
            ],
            interviewQuestions: [
              {
                question: "When should an API return 401 vs 403?",
                answer: "Return 401 Unauthorized when the client fails to provide valid credentials (e.g. expired token). Return 403 Forbidden when the identity is validated, but the caller lacks the necessary role, ownership, or scope.",
              },
            ],
          },
          codeExample: {
            title: "AuthN vs AuthZ Verification Middleware",
            code: `// Express / Node.js AuthN + AuthZ Middleware
import { Request, Response, NextFunction } from "express";

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. AuthN Check
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    // 2. AuthZ Check
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient permissions" });
    }
    next();
  };
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Stateful sessions vs Stateless JWTs",
          priority: "🔥",
          theory: {
            what: "Stateful Sessions store user state on the server (Redis/DB) and pass an opaque Session ID cookie to the client. Stateless JWTs encode digitally signed JSON claims (Header, Payload, Signature) verified via HMAC or asymmetric RSA/ECDSA keys.",
            why: "Interviewers frequently test the architectural trade-offs: sessions offer immediate revocation but require shared server storage; JWTs scale horizontally across microservices but cannot be easily revoked before expiration without a token denylist.",
            how: "Best practice for web apps: Store short-lived access tokens (15m) in memory or HttpOnly cookies, and long-lived refresh tokens (7-30d) in secure HttpOnly SameSite cookies with rotation.",
            keyPoints: [
              "Never store sensitive JWTs in localStorage (vulnerable to XSS theft)",
              "HttpOnly cookies cannot be read by JavaScript; Secure flag enforces HTTPS",
              "SameSite=Lax/Strict protects against Cross-Site Request Forgery (CSRF)",
              "JWT payloads are Base64Url-encoded (readable by anyone)—never put plaintext secrets in them",
            ],
            interviewQuestions: [
              {
                question: "How do you invalidate a JWT immediately if a user changes their password or is compromised?",
                answer: "Since JWTs are self-contained, immediate revocation requires: (1) Keeping access token lifetimes very short (e.g., 5-15 mins), (2) Maintaining a fast Redis denylist/blocklist for revoked JTI (JWT ID) tokens, or (3) Incrementing a token_version column in the database checked on sensitive operations.",
              },
            ],
          },
          codeExample: {
            title: "JWT Signing & Verification (Asymmetric RS256)",
            code: `import jwt from "jsonwebtoken";

// Issue token with RS256 Private Key
export function generateAccessToken(user: { id: string; role: string }): string {
  return jwt.sign(
    { sub: user.id, role: user.role, iss: "https://auth.myapp.com" },
    process.env.JWT_PRIVATE_KEY!,
    { algorithm: "RS256", expiresIn: "15m" }
  );
}

// Verify with RS256 Public Key
export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
    algorithms: ["RS256"],
    issuer: "https://auth.myapp.com",
  });
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Refresh token rotation & Silent refresh",
          priority: "🔥",
          theory: {
            what: "Refresh Token Rotation issues a brand-new refresh token every time the old refresh token is used to obtain a new access token. If an already-used refresh token is presented, the auth server detects token reuse (theft) and immediately revokes the entire token family.",
            why: "Provides seamless long-term user sessions without exposing long-lived access tokens or leaving compromised refresh tokens permanently usable by attackers.",
            how: "The client intercepts 401 responses, pauses outgoing requests, exchanges the refresh token cookie for a new token pair, updates in-memory tokens, and retries the original request.",
            keyPoints: [
              "Automatic reuse detection: store familyId and isUsed in Redis/DB",
              "Concurrent refresh requests: deduplicate using a shared promise or queue",
              "Store refresh tokens in HttpOnly, Secure, SameSite=Strict cookies with Path=/api/auth/refresh",
            ],
            interviewQuestions: [
              {
                question: "What is Refresh Token Reuse Detection and how does it mitigate token theft?",
                answer: "When a refresh token is used, it is invalidated and replaced. If the server sees the old token submitted a second time, it assumes a breach has occurred and invalidates all active tokens in that user's session family.",
              },
            ],
          },
          codeExample: {
            title: "Axios Interceptor for Silent Token Refresh",
            code: `import axios from "axios";

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post("/api/auth/refresh-token", {}, { withCredentials: true });
        const newToken = data.accessToken;
        processQueue(null, newToken);
        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "OAuth 2.0 & OpenID Connect (OIDC)",
          theory: {
            what: "OAuth 2.0 is an authorization framework allowing third-party applications to access user resources via Access Tokens without knowing their passwords. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that provides an ID Token (JWT) containing profile information.",
            why: "Used everywhere for 'Sign in with Google/Apple', Single Sign-On (SSO), and secure microservice API delegations.",
            how: "Modern applications (SPAs, Mobile, Web) MUST use the Authorization Code Flow with PKCE (Proof Key for Code Exchange) to prevent authorization code interception attacks.",
            keyPoints: [
              "PKCE: Client creates a random code_verifier and code_challenge (SHA256). The token endpoint validates them",
              "ID Token vs Access Token: ID token is for the client to know who logged in; Access Token is for API gateways/resource servers",
              "Deprecated flows: Implicit Flow and Resource Owner Password Credentials (ROPC) are insecure and deprecated in OAuth 2.1",
            ],
            interviewQuestions: [
              {
                question: "Why was PKCE introduced and why is the Implicit Flow deprecated?",
                answer: "In public clients (SPAs/mobile), client secrets cannot be stored securely. The Implicit Flow returned tokens in URL fragments, vulnerable to browser history leakage. PKCE dynamically generates a cryptographic challenge per flow, ensuring only the initiator can exchange the authorization code.",
              },
            ],
          },
          codeExample: {
            title: "OIDC / OAuth2 PKCE Flow Steps",
            code: `// 1. Generate PKCE code verifier and challenge (Client-side)
const verifier = crypto.randomBytes(32).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

// 2. Redirect user to IdP Authorization Endpoint:
// https://auth.provider.com/authorize?
//   response_type=code&
//   client_id=my_client_id&
//   redirect_uri=https://myapp.com/callback&
//   scope=openid profile email&
//   code_challenge=CHALLENGE_STRING&
//   code_challenge_method=S256&
//   state=random_anti_csrf_nonce

// 3. Exchange Code + Verifier for Tokens (Back-channel POST):
// POST https://auth.provider.com/token
// code=RECEIVED_CODE&code_verifier=VERIFIER_STRING`,
          },
        },
      ],
    },
    {
      id: "access-control",
      title: "Access control & API security",
      icon: "🛡️",
      heroTitle: "🛡️ Access control, passwords & API protection",
      heroSubtitle: "RBAC/ABAC, Argon2/bcrypt hashing, and HMAC webhook verification",
      heroGradient: "from-purple-600 to-indigo-800",
      concepts: [
        {
          id: "5",
          number: 5,
          title: "RBAC vs ABAC Access control",
          priority: "🔥",
          theory: {
            what: "Role-Based Access Control (RBAC) grants permissions based on static roles (Admin, Editor, Viewer). Attribute-Based Access Control (ABAC) evaluates dynamic contextual attributes (user department, resource owner, current time, IP location, tenancy).",
            why: "Hardcoding if (user.role === 'admin') in controllers fails as soon as multi-tenant isolation or resource-level ownership (e.g., 'edit document if you are the author OR organization manager') is required.",
            how: "Implement policy-based authorization engines (CASL, Oso, Open Policy Agent - OPA) or middleware decorators.",
            keyPoints: [
              "BOLA / IDOR (Broken Object Level Authorization): #1 OWASP API vulnerability—always verify tenant/user ownership",
              "RBAC is simpler to audit; ABAC provides fine-grained flexibility",
              "ReBAC (Relationship-Based Access Control): Google Zanzibar model based on graph relationships",
            ],
            interviewQuestions: [
              {
                question: "What is BOLA / IDOR and how do you prevent it?",
                answer: "Broken Object-Level Authorization occurs when an endpoint accepts an ID (e.g. GET /api/orders/123) and returns data without verifying if the authenticated user owns or is authorized to view that specific record. Prevent by querying WHERE id = :orderId AND organization_id = :userOrgId.",
              },
            ],
          },
          codeExample: {
            title: "Policy-Based ABAC Middleware",
            code: `interface Context {
  user: { id: string; orgId: string; role: string };
  resource: { id: string; orgId: string; authorId: string };
}

export function canEditDocument(ctx: Context): boolean {
  // Rule 1: Must be in the same organization
  if (ctx.user.orgId !== ctx.resource.orgId) return false;
  // Rule 2: Org Admins can edit any document
  if (ctx.user.role === "ORG_ADMIN") return true;
  // Rule 3: Authors can edit their own documents
  return ctx.user.id === ctx.resource.authorId;
}`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "Password storage & modern hashing algorithms",
          theory: {
            what: "Passwords must never be stored in plaintext or with fast cryptographic hashes (MD5, SHA-256). They require slow, memory-hard, salted Key Derivation Functions (KDFs): Argon2id (modern standard), bcrypt, or scrypt.",
            why: "Fast hashes like SHA-256 can be brute-forced billions of times per second on commodity GPUs. Memory-hard algorithms force GPUs to run out of memory, neutralizing ASIC/GPU cracking.",
            how: "Use Argon2id or bcrypt with appropriate cost work factors (e.g., bcrypt cost 12 ~ 250ms). Generate a cryptographically secure random salt per password.",
            keyPoints: [
              "Argon2id: Winner of the Password Hashing Competition (PHC); resistant to side-channel and GPU attacks",
              "bcrypt: Industry workhorse, 72-byte input limit (pre-hash with SHA-256 if longer inputs needed)",
              "Salt prevents Rainbow Table attacks; Work factor increases computational expense for attackers",
            ],
            interviewQuestions: [
              {
                question: "Why is SHA-256 unsuitable for storing user passwords?",
                answer: "SHA-256 was designed for speed (integrity verification), allowing modern GPUs to calculate billions of hashes per second. Password storage requires intentionally slow and memory-intensive algorithms like Argon2id or bcrypt to thwart brute-force attacks.",
              },
            ],
          },
          codeExample: {
            title: "Password Hashing with Argon2id / bcrypt",
            code: `import argon2 from "argon2";

// Hash password with Argon2id
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,         // 3 iterations
    parallelism: 1,
  });
}

// Verify password
export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  return await argon2.verify(hash, plain);
}`,
          },
        },
        {
          id: "7",
          number: 7,
          title: "API Keys & HMAC Webhook signature verification",
          theory: {
            what: "Service-to-service communication uses API Keys or HMAC (Hash-based Message Authentication Code) signatures (e.g. Stripe, GitHub Webhooks) to verify authenticity and message integrity.",
            why: "Webhooks arrive over public HTTP. Without cryptographic signature verification, attackers can spoof fake payment or build events to trigger unauthorized actions.",
            how: "Sender computes HMAC-SHA256(secret, timestamp + '.' + rawPayload) and sends it in a header (e.g. Stripe-Signature). Receiver computes the same hash on the raw request body and verifies using constant-time comparison.",
            keyPoints: [
              "Timing Attacks: always use crypto.timingSafeEqual() instead of === to compare signatures",
              "Replay Attacks: include a timestamp in the signature payload and reject requests older than 5 minutes",
              "Verify on RAW request body bytes before JSON.parse() changes formatting/whitespace",
            ],
            interviewQuestions: [
              {
                question: "Why must webhook signatures be compared using constant-time equality?",
                answer: "Standard string equality (===) returns false on the first mismatched byte, leaking execution time information. Attackers can measure response nanoseconds to guess characters one-by-one (Timing Attack). Constant-time comparisons always check every byte.",
              },
            ],
          },
          codeExample: {
            title: "HMAC-SHA256 Webhook Signature Verification",
            code: `import crypto from "crypto";

export function verifyWebhookSignature(
  rawBody: Buffer,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300
): boolean {
  const [timestampPart, sigPart] = signatureHeader.split(",");
  const timestamp = parseInt(timestampPart.replace("t=", ""), 10);
  const receivedSig = sigPart.replace("v1=", "");

  // Prevent Replay Attacks
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return false;
  }

  // Compute expected HMAC on raw bytes
  const payloadToSign = \`\${timestamp}.\${rawBody.toString("utf8")}\`;
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadToSign)
    .digest("hex");

  // Constant-time comparison
  const expectedBuffer = Buffer.from(expectedSig, "utf8");
  const receivedBuffer = Buffer.from(receivedSig, "utf8");
  
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}`,
          },
        },
      ],
    },
  ],
};
