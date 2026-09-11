import type { FullStackTrack } from "../fullstackTrackTypes";

export const csFundamentalsTrack: FullStackTrack = {
  layoutTitle: "CS Fundamentals: OS & Computer Networking",
  layoutSubtitle: "TCP lifecycle & congestion control, DNS/TLS 1.3 handshakes, virtual memory paging, and deadlocks",
  accent: "teal",
  defaultSectionId: "networking",
  sections: [
    {
      id: "networking",
      title: "Computer Networking",
      icon: "🌐",
      heroTitle: "🌐 TCP/IP & Internet Protocols",
      heroSubtitle: "TCP Handshakes, Congestion Control (AIMD/BBR), and DNS / TLS 1.3 Negotiation",
      heroGradient: "from-teal-600 via-emerald-700 to-cyan-900",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "TCP Handshake, Teardown & TIME_WAIT (2MSL)",
          priority: "🔥",
          theory: {
            what: "TCP is a reliable, full-duplex transport protocol. Establishing a connection requires a 3-way handshake (SYN -> SYN-ACK -> ACK). Closing requires a 4-way termination (FIN -> ACK -> FIN -> ACK). The active closer enters TIME_WAIT for 2MSL (Maximum Segment Lifetime, ~60s).",
            why: "Understanding TCP states is critical for diagnosing port exhaustion, socket leaks, and SYN flood attacks in high-throughput distributed microservices.",
            how: "Inspect sockets with `ss -tan`. Prevent port exhaustion by enabling HTTP connection pooling (Keep-Alive) and tuning sysctl parameters (`net.ipv4.tcp_tw_reuse = 1`).",
            keyPoints: [
              "3-Way Handshake: Synchronizes sequence numbers and negotiates MSS and window scale options",
              "4-Way Teardown: Each direction closes independently (full-duplex termination)",
              "TIME_WAIT State: 1) Ensures final ACK arrives at remote peer, 2) Lets delayed duplicate packets drain from network",
              "SYN Flood Defense: Protect servers with `net.ipv4.tcp_syncookies = 1`",
            ],
            interviewQuestions: [
              {
                question: "Why does TCP require a 3-way handshake instead of just 2 packets?",
                answer: "With only 2 packets, the server cannot verify if the client received its SYN-ACK. Additionally, delayed duplicate SYN packets could cause the server to allocate resources for phantom connections. The 3rd ACK confirms bidirectional liveliness.",
              },
              {
                question: "How do you prevent TIME_WAIT socket exhaustion on high-throughput backend services?",
                answer: "1) Use HTTP/TCP connection pooling with Keep-Alive to avoid rapid socket open/close cycles, 2) Enable `net.ipv4.tcp_tw_reuse = 1` in Linux sysctl, 3) Increase the ephemeral port range (`net.ipv4.ip_local_port_range`).",
              },
            ],
          },
          codeExample: {
            title: "Linux Socket Inspection & Kernel Sysctl Tuning (Bash)",
            code: `#!/usr/bin/env bash

# Check socket state distribution
ss -ant | awk '{print $1}' | sort | uniq -c | sort -nr

# Inspect sockets in TIME_WAIT state
ss -tan state time-wait | head -n 5

# Recommended /etc/sysctl.conf parameters for microservices:
# 1. Enable SYN Cookie defense
# net.ipv4.tcp_syncookies = 1

# 2. Allow reuse of TIME_WAIT sockets for outgoing connections
# net.ipv4.tcp_tw_reuse = 1

# 3. Expand ephemeral port range
# net.ipv4.ip_local_port_range = 10240 65535`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "TCP Congestion Control (Slow Start, AIMD & BBR)",
          priority: "🔥",
          theory: {
            what: "TCP Congestion Control dynamically regulates transmission rates based on a Congestion Window (cwnd). The state machine begins in Slow Start (exponential cwnd doubling per RTT) until ssthresh, switches to Congestion Avoidance (AIMD: +1 MSS per RTT), and handles loss via Fast Retransmit (3 duplicate ACKs) or RTO timeout.",
            why: "Prevents Congestion Collapse across internet routers. Modern algorithms like Google BBR maximize throughput without filling router buffers (bufferbloat).",
            how: "Loss-based algorithms (CUBIC, Reno) interpret packet loss as congestion. Model-based algorithms (BBR) measure bottleneck bandwidth and propagation delay independently.",
            keyPoints: [
              "Slow Start: Exponential growth (doubling cwnd every RTT) until ssthresh",
              "AIMD: Additive Increase (+1 MSS per RTT), Multiplicative Decrease (halves cwnd on loss)",
              "Fast Retransmit: 3 duplicate ACKs trigger immediate retransmission without waiting for RTO timer",
              "Google BBR: Optimizes for the true Bandwidth-Delay Product (BDP) to prevent latency spikes",
            ],
            interviewQuestions: [
              {
                question: "How does Google BBR differ fundamentally from loss-based algorithms like CUBIC?",
                answer: "CUBIC pushes traffic until packets drop, causing bufferbloat and high latency. Google BBR continuously models maximum bottleneck bandwidth and minimum RTT, keeping the transmission pipe full without queuing packets in intermediate router buffers.",
              },
            ],
          },
          codeExample: {
            title: "TCP Congestion Control State Machine (Python)",
            code: `class TCPCongestion:
    def __init__(self, init_cwnd=2, ssthresh=16):
        self.cwnd = init_cwnd
        self.ssthresh = ssthresh
        self.state = "SLOW_START"

    def on_ack(self):
        if self.state == "SLOW_START":
            self.cwnd *= 2
            if self.cwnd >= self.ssthresh:
                self.state = "CONGESTION_AVOIDANCE"
        elif self.state == "CONGESTION_AVOIDANCE":
            self.cwnd += 1

    def on_triple_dup_ack(self):
        # Fast Retransmit
        self.ssthresh = max(self.cwnd // 2, 2)
        self.cwnd = self.ssthresh
        self.state = "CONGESTION_AVOIDANCE"

sim = TCPCongestion()
for rtt in range(1, 8):
    print(f"RTT {rtt}: state={sim.state}, cwnd={sim.cwnd} MSS")
    if rtt == 5:
        sim.on_triple_dup_ack()
    else:
        sim.on_ack()`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "DNS Resolution Flow & TLS 1.3 Handshake (1-RTT)",
          priority: "⭐",
          theory: {
            what: "DNS resolves domain names hierarchically: Recursive Resolver -> Root (.) -> TLD (.com) -> Authoritative Nameserver. TLS 1.3 (RFC 8446) establishes encrypted communication in 1-RTT using Ephemeral Elliptic Curve Diffie-Hellman (ECDHE) for Perfect Forward Secrecy.",
            why: "Handshake latency dictates first-byte response time. TLS 1.3 cuts connection latency in half compared to TLS 1.2 (from 2 RTT to 1 RTT) and eliminates obsolete vulnerable ciphers.",
            how: "Inspect DNS resolution with `dig +trace domain.com`. Inspect TLS 1.3 negotiation with `openssl s_client -connect domain.com:443 -tls1_3`.",
            keyPoints: [
              "DNS Hierarchy: Recursive Resolver -> Root Nameservers -> TLD Nameservers -> Authoritative Server",
              "TLS 1.3 1-RTT: Client sends ECDHE key shares upfront in ClientHello",
              "TLS 1.3 0-RTT: Session resumption allows sending encrypted payload in the very first round-trip",
              "Perfect Forward Secrecy: Unique ephemeral session keys ensure compromised private keys cannot decrypt past sessions",
            ],
            interviewQuestions: [
              {
                question: "How does TLS 1.3 achieve 1-RTT handshake latency compared to 2 RTT in TLS 1.2?",
                answer: "In TLS 1.2, cipher negotiation and key exchange required separate round-trips. In TLS 1.3, the client speculatively includes its public key share directly inside the ClientHello. The server computes the shared secret and responds with ServerHello and certificates in round-trip 1, allowing encrypted data transmission immediately.",
              },
            ],
          },
          codeExample: {
            title: "DNS Hierarchy Trace & TLS 1.3 Handshake Inspection (Bash)",
            code: `#!/usr/bin/env bash

# 1. Trace DNS lookup step-by-step from root servers
dig +trace +nodnssec api.github.com

# 2. Inspect TLS 1.3 Handshake details
openssl s_client -connect api.github.com:443 -tls1_3 -brief

# Shows:
# - Protocol: TLSv1.3
# - Cipher: TLS_AES_128_GCM_SHA256
# - ALPN: h2`,
          },
        },
      ],
    },
    {
      id: "os-internals",
      title: "Operating Systems Internals",
      icon: "💻",
      heroTitle: "💻 OS Memory & Process Synchronization",
      heroSubtitle: "Virtual Memory, Paging, Page Faults, TLB, and Coffman Deadlock Conditions",
      heroGradient: "from-emerald-600 via-teal-700 to-cyan-900",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Virtual Memory, Paging, Page Faults & TLB",
          priority: "🔥",
          theory: {
            what: "Virtual Memory gives each process an isolated address space. Memory is divided into fixed 4KB pages mapped to physical frames via multi-level Page Tables managed by the MMU (Memory Management Unit). The TLB (Translation Lookaside Buffer) caches recent virtual-to-physical translations.",
            why: "Ensures process memory isolation, demand paging (only load pages when accessed), and running processes larger than physical RAM via swap.",
            how: "When a page isn't in RAM, the CPU generates a Page Fault interrupt. Minor Page Faults allocate free RAM (e.g. COW fork); Major Page Faults read pages from disk (costing milliseconds).",
            keyPoints: [
              "Page Size: Standard 4KB. HugePages (2MB) reduce TLB misses for Redis and PostgreSQL",
              "Copy-On-Write (COW): fork() shares physical pages as read-only, duplicating a page only on write",
              "Minor vs Major Fault: Minor is resolved in RAM; Major requires disk I/O",
              "Thrashing: Occurs when working set exceeds RAM and the OS spends 90%+ CPU swapping pages",
            ],
            interviewQuestions: [
              {
                question: "How does Copy-On-Write (COW) make Linux fork() efficient?",
                answer: "fork() does not copy physical RAM. It duplicates the parent's page tables and marks all pages read-only. When either process writes to a page, a page fault triggers the kernel to allocate a new physical frame and copy only that single 4KB page.",
              },
            ],
          },
          codeExample: {
            title: "Inspect Minor/Major Page Faults & Memory Maps (Bash)",
            code: `#!/usr/bin/env bash

# 1. View minor and major page faults for PID
# minflt = resolved in RAM, majflt = disk I/O occurred
ps -o pid,comm,minflt,majflt -p 1

# 2. Check system HugePages configuration
grep -i huge /proc/meminfo

# 3. Monitor swap activity (si/so non-zero indicates thrashing)
vmstat 1 3`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Deadlocks & The 4 Coffman Conditions",
          priority: "🔥",
          theory: {
            what: "A Deadlock is a state where processes are permanently blocked waiting for resources held by each other. Deadlocks can only occur if all 4 Coffman conditions hold simultaneously: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait.",
            why: "Deadlocks freeze production microservices and lock database rows. Breaking just ONE Coffman condition mathematically guarantees deadlock immunity.",
            how: "Enforce Strict Resource Ordering (eliminates Circular Wait): all threads must acquire locks in strictly ascending monotonic resource ID order. Databases detect deadlocks using Wait-For Graph cycle detection.",
            keyPoints: [
              "Mutual Exclusion: Resource cannot be shared simultaneously",
              "Hold and Wait: Thread holds resources while requesting new ones",
              "No Preemption: Resources cannot be forcibly taken from a holder",
              "Circular Wait: Closed chain P0 -> P1 -> ... -> P0 waiting for held resources",
              "Lock Hierarchy (Gold Standard): Sort lock acquisition order by ID to eliminate Circular Wait",
            ],
            interviewQuestions: [
              {
                question: "How does strict monotonic lock ordering mathematically prevent deadlocks?",
                answer: "If all threads acquire locks in strictly ascending order of unique lock IDs (L1 < L2 < ... < Ln), a cycle P0 -> P1 -> ... -> P0 is mathematically impossible because it would imply La < Lb < ... < La, which is a contradiction (La < La).",
              },
            ],
          },
          codeExample: {
            title: "Deadlock Prevention via Monotonic Lock Ordering (Python)",
            code: `import threading

class Account:
    def __init__(self, acc_id: int, balance: float):
        self.acc_id = acc_id
        self.balance = balance
        self.lock = threading.Lock()

def safe_transfer(src: Account, dst: Account, amount: float):
    # Eliminate Circular Wait: Always acquire lowest ID lock first
    first_lock, second_lock = (src.lock, dst.lock) if src.acc_id < dst.acc_id else (dst.lock, src.lock)

    with first_lock:
        with second_lock:
            if src.balance >= amount:
                src.balance -= amount
                dst.balance += amount
                print(f"Transferred \${amount} from #{src.acc_id} to #{dst.acc_id}")

acc1 = Account(101, 500.0)
acc2 = Account(202, 300.0)

# Concurrent cross transfers will never deadlock
t1 = threading.Thread(target=safe_transfer, args=(acc1, acc2, 50.0))
t2 = threading.Thread(target=safe_transfer, args=(acc2, acc1, 100.0))
t1.start(); t2.start()
t1.join(); t2.join()`,
          },
        },
      ],
    },
  ],
};
