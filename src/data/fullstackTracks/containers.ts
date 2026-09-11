import type { FullStackTrack } from "../fullstackTrackTypes";

export const containersTrack: FullStackTrack = {
  layoutTitle: "Containers, Kubernetes & deployment",
  layoutSubtitle: "Docker, multi-stage builds, K8s orchestration, CI/CD, and 12-factor apps",
  accent: "cyan",
  defaultSectionId: "docker",
  sections: [
    {
      id: "docker",
      title: "Containers & Docker",
      icon: "📦",
      heroTitle: "📦 Images, Docker & Compose",
      heroSubtitle: "Multi-stage builds, non-root security, layer caching, and compose stacks",
      heroGradient: "from-cyan-600 to-teal-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Containers vs VMs & Linux internals",
          priority: "🔥",
          theory: {
            what: "Containers are isolated Linux processes sharing the host kernel, created using Linux Namespaces (PID, Mount, Net, IPC, UTS) for process isolation, Control Groups (cgroups) for resource limits (CPU, memory, I/O), and Union Filesystems (OverlayFS) for layered image storage. VMs virtualize hardware via a hypervisor and run a full guest OS.",
            why: "Containers start in sub-seconds, have near-zero CPU/RAM overhead compared to VMs, and enable identical environments from local dev to production.",
            how: "Package application artifacts into immutable images via Dockerfiles, push to an OCI container registry, and run via containerd/Docker.",
            keyPoints: [
              "Namespaces provide isolation (what the process can see)",
              "cgroups enforce limits (how much CPU/RAM the process can consume)",
              "Containers share the host kernel; you cannot run a Windows kernel container on a Linux host without virtualization",
            ],
            interviewQuestions: [
              {
                question: "How do Linux namespaces and cgroups differ in container runtimes?",
                answer: "Namespaces provide visibility and process isolation (giving each container its own process tree, network interfaces, and mount points). cgroups (Control Groups) enforce resource limits and accounting (capping container CPU shares, memory limits, and disk I/O).",
              },
            ],
          },
          codeExample: {
            title: "cgroup Resource Limits in Docker",
            code: `# Run container capped at 1.5 CPU cores and 512MB RAM with swap limit
docker run -d \\
  --name api-service \\
  --cpus="1.5" \\
  --memory="512m" \\
  --memory-swap="512m" \\
  -p 8080:8080 \\
  my-app:v1.0.0`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Production Multi-Stage Dockerfile",
          priority: "🔥",
          theory: {
            what: "Multi-stage builds use intermediate builder images to install devDependencies and compile source code (TypeScript, Go, Rust), then copy only the compiled binaries and production dependencies into a minimal, hardened runtime image (Distroless or Alpine).",
            why: "Shrinks image sizes from 1.5GB to under 100MB, eliminates build toolchains (npm, git, gcc) from production, and drastically reduces CVE vulnerabilities.",
            how: "Order instructions from least frequently changed (package.json) to most frequently changed (source code) to maximize Docker layer cache hits. Run as a non-root USER.",
            keyPoints: [
              "Never run containers as root: add USER node or appuser",
              "Use .dockerignore to exclude node_modules, .git, .env, and test files",
              "Use npm ci instead of npm install for deterministic, frozen dependency tree installs",
            ],
            interviewQuestions: [
              {
                question: "Why should you never run production containers as the root user?",
                answer: "If an attacker exploits a remote code execution (RCE) vulnerability inside the container, running as root makes container breakout attacks significantly easier, giving them root privileges on the underlying host kernel.",
              },
            ],
          },
          codeExample: {
            title: "Hardened Production Multi-Stage Node.js Dockerfile",
            code: `# Stage 1: Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Optimize layer caching: copy lockfiles first
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
# Prune devDependencies
RUN npm prune --production

# Stage 2: Minimal hardened runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Run as unprivileged non-root user
USER node

# Copy only production dependencies and compiled dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/main.js"]`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Docker Compose for microservices",
          theory: {
            what: "Docker Compose is a declarative tool for defining and orchestrating multi-container Docker environments (App, Database, Redis, Message Queues) with shared network bridges, persistent named volumes, and health checks.",
            why: "Allows onboarding new engineers with a single command (docker compose up -d) without installing complex local software.",
            how: "Define services in compose.yaml. Use depends_on with condition: service_healthy so app containers wait until Postgres/Redis is fully initialized.",
            keyPoints: [
              "Service Discovery: Containers on the same compose network resolve each other by service name (e.g. host: 'postgres')",
              "Named Volumes: Persist database data across container restarts and updates",
              "Environment files: Use .env for secrets and keep it out of git",
            ],
            interviewQuestions: [
              {
                question: "How do containers communicate with each other inside Docker Compose?",
                answer: "Docker Compose automatically creates a shared user-defined bridge network and enables an internal DNS resolver. Containers communicate using the declared service name (e.g. http://auth-service:4000) as the hostname.",
              },
            ],
          },
          codeExample: {
            title: "Production-ready docker-compose.yml with Health Checks",
            code: `version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine

volumes:
  pgdata:`,
          },
        },
      ],
    },
    {
      id: "kubernetes-deploy",
      title: "Kubernetes & production deploy",
      icon: "☸️",
      heroTitle: "☸️ Kubernetes, probes & CI/CD",
      heroSubtitle: "Deployments, Services, Liveness/Readiness probes, and Zero-Downtime rollouts",
      heroGradient: "from-teal-600 to-blue-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Kubernetes Architecture & Core Workloads",
          priority: "🔥",
          theory: {
            what: "Kubernetes (K8s) orchestrates containerized workloads across node clusters. The Control Plane consists of the API Server, etcd (state store), Controller Manager, and Scheduler. Worker Nodes run the Kubelet, Kube-proxy, and Container Runtime.",
            why: "K8s provides auto-scaling (HPA), automated rollouts/rollbacks, self-healing container restarts, and load balancing across nodes.",
            how: "Define declarative YAML manifests for Pods (smallest deployable unit), Deployments (declarative updates & replica counts), Services (ClusterIP/NodePort/LoadBalancer for networking), and Ingress (HTTP routing rules).",
            keyPoints: [
              "Pod: one or more tightly coupled containers sharing network namespace and storage volumes",
              "Deployment: manages ReplicaSets to ensure the desired count of pods is always running",
              "ClusterIP Service: internal-only cluster virtual IP; Ingress exposes services to public internet",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between a Pod, a Deployment, and a Service in Kubernetes?",
                answer: "A Pod is the smallest execution unit running one or more containers. A Deployment manages Pod replicas, automated rolling updates, and rollbacks. A Service provides a stable internal IP address and DNS name to load balance traffic across dynamic ephemeral Pods.",
              },
            ],
          },
          codeExample: {
            title: "Kubernetes Deployment & ClusterIP Service Manifest",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: my-registry.io/api:v2.1.0
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 3000`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Health probes & Graceful shutdown",
          priority: "🔥",
          theory: {
            what: "Kubernetes uses three probes to manage container lifecycles: (1) Startup Probe (checks if slow initialization is complete), (2) Liveness Probe (restarts deadlocked/hung containers), and (3) Readiness Probe (removes unhealthy pods from Service load balancer traffic). Graceful shutdown handles the SIGTERM signal to finish in-flight requests before exiting.",
            why: "Misconfigured probes cause cascading restarts; ignoring SIGTERM drops active user HTTP requests during deployments.",
            how: "Implement dedicated /health/live and /health/ready endpoints. In application code, catch process.on('SIGTERM'), stop accepting new connections, finish existing requests, close DB pools, and exit within terminationGracePeriodSeconds (default 30s).",
            keyPoints: [
              "Readiness failure = stop routing traffic; Liveness failure = kill and restart container",
              "Do NOT check external database dependencies in Liveness probes (if DB blips, all pods restart simultaneously!)",
              "Catch SIGTERM and SIGINT in app code to close server connections gracefully",
            ],
            interviewQuestions: [
              {
                question: "Why should you NOT check downstream database connectivity in a Kubernetes Liveness probe?",
                answer: "If the database experiences a momentary hiccup or slow query load, every application pod's liveness check will fail simultaneously. Kubernetes will kill and restart every container at once, turning a minor database slowdown into a catastrophic cascading outage. Database health belongs in Readiness probes.",
              },
            ],
          },
          codeExample: {
            title: "Graceful SIGTERM Shutdown in Node.js",
            code: `import http from "http";
import { pool } from "./database";

const server = http.createServer(app);
server.listen(3000);

// Graceful Shutdown Handler
function shutdown(signal: string) {
  console.log(\`Received \${signal}, closing HTTP server...\`);
  
  // 1. Stop accepting new connections
  server.close(async () => {
    console.log("HTTP server closed, draining active database connections...");
    try {
      // 2. Drain database pools
      await pool.end();
      console.log("Database connections closed. Exiting cleanly.");
      process.exit(0);
    } catch (err) {
      console.error("Error during DB shutdown:", err);
      process.exit(1);
    }
  });

  // 3. Force exit if cleanup takes longer than K8s grace period
  setTimeout(() => {
    console.error("Forced termination: cleanup timed out.");
    process.exit(1);
  }, 25000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "CI/CD Pipelines & Twelve-Factor app configuration",
          theory: {
            what: "Continuous Integration & Continuous Delivery (CI/CD) automates linting, testing, image building, security scanning (Trivy), and deployment. The Twelve-Factor App methodology mandates strict separation of config from code, stateless processes, and backing service attachments.",
            why: "Manual deployments are slow and error-prone. Modern engineering teams deploy dozens of times per day with automated canary and blue-green rollouts.",
            how: "Store configuration in environment variables (never in code or image). Build immutable container images once in CI and deploy the exact same artifact across Staging and Production by injecting different runtime ConfigMaps/Secrets.",
            keyPoints: [
              "Build once, deploy everywhere: do not rebuild images for each environment",
              "Automate container vulnerability scanning in GitHub Actions / GitLab CI",
              "Blue-Green & Canary deployments: minimize blast radius during releases",
            ],
            interviewQuestions: [
              {
                question: "Explain the difference between Blue-Green and Canary deployments.",
                answer: "Blue-Green maintains two identical production environments; new code is deployed to Green, tested, and router traffic is switched 100% instantly from Blue to Green. Canary deployments gradually route a small percentage (e.g. 5% -> 25% -> 100%) of real user traffic to the new version while monitoring error rates.",
              },
            ],
          },
          codeExample: {
            title: "GitHub Actions CI/CD Pipeline with Docker Cache & Trivy Scan",
            code: `name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build container with GitHub Actions Cache
        uses: docker/build-push-action@v5
        with:
          context: .
          load: true
          tags: my-app:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Security Vulnerability Scan (Trivy)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: my-app:\${{ github.sha }}
          severity: 'CRITICAL,HIGH'
          exit-code: '1'`,
          },
        },
      ],
    },
  ],
};
