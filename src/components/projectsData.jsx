const projects = [
  {
    id: 1,
    name: "Mini Kubernetes",
    subtitle: "Lightweight Container Orchestrator",
    category: "DevOps & Systems",
    tagline: "Kubernetes-inspired container orchestration system to deploy & manage Docker containers with API server, scheduler, and CLI",
    description: "Built a Kubernetes-inspired container orchestration system to deploy and manage Docker containers with an API server, scheduler, worker agents, auto-recovery, and kubectl-like CLI.",
    highlights: [
      "Built a Kubernetes-inspired container orchestration system to deploy and manage Docker containers.",
      "Implemented an API server, scheduler, controller, worker agents, and cluster state management.",
      "Added health checks, automatic recovery, service discovery, replica management, and rolling updates.",
      "Developed a kubectl-like CLI for deployments and cluster operations using Go, gRPC, and the Docker API."
    ],
    stack: ["Go", "gRPC", "Docker API", "Distributed Systems", "CLI"],
    image: "/images/mini-kubernetes.png",
    link: "https://github.com/Digvijaywadekar2004"
  },
  {
    id: 2,
    name: "TrackPulse",
    category: "Full-Stack",
    tagline: "Real-time vehicle telemetry & engine diagnostics dashboard with live alerts",
    highlights: [
      "Real-time vehicle telemetry tracking and live engine diagnostics monitoring.",
      "Interactive data visualization charts with high-frequency updates via WebSockets.",
      "Robust state management and real-time alert notifications."
    ],
    stack: ["React", "Node.js", "Socket.io", "MongoDB", "Recharts"],
    image: "/images/trackpulse.png",
    link: "https://github.com/Digvijaywadekar2004"
  },
  {
    id: 3,
    name: "CivicCopilot",
    category: "Full-Stack",
    tagline: "Public issue tracking platform with AI complaint classification & smart routing",
    highlights: [
      "AI-assisted citizen grievance portal with automatic categorization using Gemini API.",
      "Smart routing and prioritized escalation for municipal authorities.",
      "Secure authentication with JWT and real-time status tracking."
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "JWT", "Gemini API"],
    image: "/images/civiccopilot.png",
    link: "https://github.com/Digvijaywadekar2004"
  },
  {
    id: 4,
    name: "Password Strength Indicator",
    category: "Frontend",
    tagline: "Real-time strength meter with color-coded visual feedback",
    highlights: [
      "Instant entropy and rule-based password evaluation engine.",
      "Dynamic visual meter with smooth animated color-coded feedback.",
      "Lightweight, accessible, and standalone web utility."
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    image: "/images/password-strength.png",
    link: "https://digvijaywadekar2004.github.io/password-strength-indicator"
  },
];

export default projects;

