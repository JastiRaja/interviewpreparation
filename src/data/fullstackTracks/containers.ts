import type { FullStackTrack } from "../fullstackTrackTypes";

export const containersTrack: FullStackTrack = {
  layoutTitle: "Containers & deployment",
  layoutSubtitle: "Docker, orchestration, CI/CD, and prod config",
  accent: "cyan",
  defaultSectionId: "docker",
  sections: [
    {
      id: "docker",
      title: "Containers",
      icon: "📦",
      heroTitle: "📦 Images & Docker",
      heroSubtitle: "Package once, run many places",
      heroGradient: "from-cyan-600 to-teal-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Images, containers & VMs",
          priority: "🔥",
          theory: {
            what: "A container image is a layered filesystem + metadata; a running container is an isolated process namespace using that image. Containers share the host kernel unlike VMs which run full guest OSes.",
            why: "Faster startup, denser packing, and reproducible artifacts are why full-stack teams ship containers to prod.",
            how: "Build images with Dockerfiles; run with docker run; orchestrators schedule many containers across nodes.",
            keyPoints: ["Layers cache build steps—order Dockerfile from stable to volatile", "root in container is not root on host—still constrain", "Read-only root filesystems improve security"],
            interviewQuestions: [
              {
                question: "How do containers differ from virtual machines?",
                answer: "VMs virtualize hardware and run a full OS per instance. Containers isolate processes on the shared host kernel using namespaces and cgroups—lighter and faster but same-kernel isolation model.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "Dockerfile best practices",
          theory: {
            what: "A Dockerfile declares base image, dependencies, copy source, default command. Multi-stage builds compile in a builder image and copy only artifacts to a slim runtime image.",
            why: "Small images reduce pull time and attack surface; correct USER and non-root reduce risk.",
            how: "Use official slim bases; pin versions; .dockerignore like .gitignore; combine RUN layers judiciously; HEALTHCHECK for orchestrators.",
            keyPoints: ["Avoid secrets in layers—use build args carefully", "distroless or alpine vs glibc compatibility", "Set explicit EXPOSE documentation"],
            interviewQuestions: [
              {
                question: "Why multi-stage builds?",
                answer: "They separate build-time tools (compilers, devDependencies) from the final image, producing smaller, safer production images that contain only the runtime binary and needed libs.",
              },
            ],
          },
          codeExample: {
            title: "Multi-stage Node",
            code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
USER node
CMD ["node", "dist/main.js"]`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Docker Compose for local dev",
          theory: {
            what: "Compose defines multi-container apps in YAML: services, networks, volumes, env files. `docker compose up` starts the stack locally mirroring prod topology loosely.",
            why: "Full-stack devs run API + DB + cache together without manual wiring.",
            how: "Use profiles for optional services; bind-mount source for hot reload; named volumes for database persistence.",
            keyPoints: ["Do not use compose secrets for real prod secrets unencrypted", "Healthchecks coordinate start order", "Resource limits mimic prod constraints"],
            interviewQuestions: [
              {
                question: "What problem does Compose solve?",
                answer: "It orchestrates multiple containers on a developer machine with one command—networking between services, volume mounts, and environment—so the app stack matches integration needs without full Kubernetes locally.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "ship",
      title: "Ship to production",
      icon: "🚀",
      heroTitle: "🚀 Kubernetes & CI/CD",
      heroSubtitle: "From commit to running workload",
      heroGradient: "from-teal-600 to-cyan-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Kubernetes basics",
          theory: {
            what: "Kubernetes schedules Pods (one or more containers) on Nodes. Deployments manage replica sets and rollouts. Services provide stable DNS and load balancing. ConfigMaps and Secrets inject configuration.",
            why: "Many teams run containers in K8s for autoscaling, rolling updates, and service discovery.",
            how: "Declare desired state in YAML; controllers reconcile. Probes (liveness/readiness) tell the kubelet when to restart or remove traffic.",
            keyPoints: ["Pods are ephemeral—use StatefulSets for stable identity", "Namespaces isolate teams/environments", "Resource requests/limits prevent noisy neighbors"],
            interviewQuestions: [
              {
                question: "What is the difference between a Pod and a Deployment?",
                answer: "A Pod is the smallest deployable unit wrapping containers. A Deployment manages ReplicaSets to maintain desired Pod count, handle rolling updates and rollbacks, and replace failed Pods.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "CI/CD pipelines",
          theory: {
            what: "Continuous Integration runs tests and builds on each change. Continuous Delivery deploys through stages to production with approval. Pipelines are YAML (GitHub Actions, GitLab CI, Jenkins).",
            why: "Automated gates catch regressions; repeatable deploys reduce human error.",
            how: "Stages: lint → test → build image → scan → push registry → deploy (Helm/kubectl). Cache dependencies; use OIDC to cloud roles instead of long-lived keys.",
            keyPoints: ["Fail fast on main branch protections", "Immutable artifacts: same image tag through stages", "Blue/green or canary for low-risk releases"],
            interviewQuestions: [
              {
                question: "What is a canary deployment?",
                answer: "Route a small percentage of traffic to a new version while monitoring metrics and errors. If healthy, shift more traffic; if not, roll back—limiting blast radius compared to big-bang deploys.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "Config, secrets & twelve-factor",
          theory: {
            what: "Twelve-factor apps store config in the environment, treat logs as streams, and keep dev/prod parity. Secrets inject via vaults, sealed secrets, or cloud secret managers—not baked into images.",
            why: "Leaked .env in images and repos is a common incident class.",
            how: "Externalize DATABASE_URL, API keys, feature flags. Use different namespaces or accounts per env. Rotate credentials and audit access.",
            keyPoints: ["Feature flags decouple deploy from release", "Disposability: fast start/stop for scaling", "Admin processes as one-off jobs, not SSH"],
            interviewQuestions: [
              {
                question: "Why not put secrets in a Docker image?",
                answer: "Image layers persist in registries and on hosts; anyone with pull access can extract them. Secrets should be injected at runtime from a secret store and kept out of build artifacts.",
              },
            ],
          },
        },
      ],
    },
  ],
};
