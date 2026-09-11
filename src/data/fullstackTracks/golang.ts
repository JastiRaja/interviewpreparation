import type { FullStackTrack } from "../fullstackTrackTypes";

export const golangTrack: FullStackTrack = {
  layoutTitle: "Go (Golang) Systems & Concurrency",
  layoutSubtitle: "GMP scheduler, channels & worker pools, escape analysis, memory allocator, and sync primitives",
  accent: "cyan",
  defaultSectionId: "concurrency",
  sections: [
    {
      id: "concurrency",
      title: "Concurrency & Scheduler",
      icon: "🐹",
      heroTitle: "🐹 Go Concurrency & GMP Runtime",
      heroSubtitle: "Goroutines, M:N Work-Stealing Scheduler, Channels, and Worker Pools",
      heroGradient: "from-cyan-600 via-teal-700 to-emerald-900",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "GMP Concurrency Scheduler & Work-Stealing",
          priority: "🔥",
          theory: {
            what: "The Go runtime implements an M:N user-space scheduler multiplexing G (Goroutines, ~2-4KB initial stack) onto M (OS threads) via P (Logical Processors, count equal to GOMAXPROCS). Each P maintains a 256-element local run queue, plus a shared global run queue. Idle Ps steal half the goroutines from another P's queue (work-stealing).",
            why: "OS threads cost 1-8MB stack memory each and ~1-2 microseconds per kernel context switch. Goroutines use dynamic growable stacks (2KB) and ~10-100ns user-space context switches, allowing a single Go microservice to handle hundreds of thousands of concurrent network connections.",
            how: "Sysmon (System Monitor thread) preempts goroutines running >10ms via OS signals (SIGURG in Go 1.14+). When a goroutine performs non-blocking network I/O, it parks on the Network Poller (epoll/kqueue) releasing M and P.",
            keyPoints: [
              "G (Goroutine): Execution state, PC, and growable stack (up to 1GB on 64-bit)",
              "M (Machine): OS thread created via clone/pthread_create (max 10,000)",
              "P (Processor): Resource context required to execute Go code (GOMAXPROCS)",
              "Work-Stealing: Local queue -> Global queue (every 61 ticks) -> Network Poller -> Steal from random P",
              "Asynchronous Preemption: Go 1.14+ injects asyncPreempt via SIGURG signal to stop tight CPU loops",
            ],
            interviewQuestions: [
              {
                question: "What happens when a goroutine makes a blocking system call vs blocking network I/O?",
                answer: "For blocking network I/O, the goroutine parks on the non-blocking Network Poller (epoll/kqueue), freeing M and P to execute other runnable goroutines. For blocking OS syscalls (e.g. file I/O), M blocks in kernel mode, releases P (handoffp), and P attaches to an idle M or creates a new M to keep other goroutines progressing.",
              },
              {
                question: "How does Go 1.14+ achieve non-cooperative goroutine preemption?",
                answer: "Sysmon detects any goroutine executing for longer than 10ms and sends a SIGURG signal to the underlying OS thread M. The signal handler injects an asynchronous preemption routine (asyncPreempt), saving registers and yielding execution back to the Go scheduler.",
              },
            ],
          },
          codeExample: {
            title: "Production Worker Pool with Context Cancellation (Go)",
            code: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID   int
	Data string
}

type Result struct {
	JobID  int
	Output string
	Err    error
}

func worker(ctx context.Context, id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			return // Context canceled: drain and exit
		case job, ok := <-jobs:
			if !ok {
				return // Channel closed
			}
			output := fmt.Sprintf("Worker %d processed Job %d [%s]", id, job.ID, job.Data)
			time.Sleep(100 * time.Millisecond)

			select {
			case results <- Result{JobID: job.ID, Output: output}:
			case <-ctx.Done():
				return
			}
		}
	}
}

func main() {
	const numJobs = 10
	const numWorkers = 3

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	jobs := make(chan Job, numJobs)
	results := make(chan Result, numJobs)
	var wg sync.WaitGroup

	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go worker(ctx, w, jobs, results, &wg)
	}

	for j := 1; j <= numJobs; j++ {
		jobs <- Job{ID: j, Data: fmt.Sprintf("payload-%d", j)}
	}
	close(jobs)

	go func() {
		wg.Wait()
		close(results)
	}()

	for res := range results {
		fmt.Println(res.Output)
	}
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Channels, Select Multiplexing & Leak Prevention",
          priority: "🔥",
          theory: {
            what: "Channels are typed conduits for synchronization and communication between goroutines. Unbuffered channels (make(chan T)) require synchronous handshakes. Buffered channels (make(chan T, cap)) hold items in an internal circular ring buffer. Select multiplexes operations across channels.",
            why: "Go adheres to 'Do not communicate by sharing memory; share memory by communicating'. Channels eliminate explicit lock contention for data exchange and prevent concurrency bugs when used with structured cancellation.",
            how: "Senders close channels when done (never receivers). Remember: sending to a closed channel panics; receiving from closed channel returns zero value + false; sending/receiving on a nil channel blocks forever (useful for disabling select branches).",
            keyPoints: [
              "Unbuffered: Sender and receiver must meet simultaneously (synchronous rendezvous)",
              "Buffered: Send blocks only when buffer is full; receive blocks only when buffer is empty",
              "Nil Channel Trick: Set ch = nil in select to disable that branch after channel closes",
              "Goroutine Leaks: Blocked send/receive with no peer leaks goroutine stack memory; always use context.Done()",
            ],
            interviewQuestions: [
              {
                question: "How do you dynamically disable a case branch in a Go select statement?",
                answer: "Set the channel variable to nil. Because sending or receiving on a nil channel blocks forever, the Go runtime ignores nil channel cases when evaluating ready branches in select, preventing busy loops during fan-in.",
              },
            ],
          },
          codeExample: {
            title: "Fan-In Multiplexing with Nil Channel Disabling (Go)",
            code: `package main

import (
	"fmt"
	"time"
)

func fanIn(ch1, ch2 <-chan string) <-chan string {
	out := make(chan string)
	go func() {
		defer close(out)
		c1, c2 := ch1, ch2
		for c1 != nil || c2 != nil {
			select {
			case val, ok := <-c1:
				if !ok {
					c1 = nil // Dynamically disable branch
					continue
				}
				out <- val
			case val, ok := <-c2:
				if !ok {
					c2 = nil // Dynamically disable branch
					continue
				}
				out <- val
			}
		}
	}()
	return out
}

func generator(msg string, count int, delay time.Duration) <-chan string {
	ch := make(chan string)
	go func() {
		defer close(ch)
		for i := 1; i <= count; i++ {
			time.Sleep(delay)
			ch <- fmt.Sprintf("%s #%d", msg, i)
		}
	}()
	return ch
}

func main() {
	s1 := generator("Fast", 4, 80*time.Millisecond)
	s2 := generator("Slow", 2, 200*time.Millisecond)

	for item := range fanIn(s1, s2) {
		fmt.Println("Received:", item)
	}
}`,
          },
        },
      ],
    },
    {
      id: "memory-internals",
      title: "Memory & Sync Primitives",
      icon: "⚙️",
      heroTitle: "⚙️ Go Memory & Synchronization",
      heroSubtitle: "Escape Analysis, Tri-Color GC, sync.Pool, and Mutex vs Atomics",
      heroGradient: "from-teal-600 via-cyan-700 to-blue-900",
      concepts: [
        {
          id: "3",
          number: 3,
          title: "Memory Escape Analysis & Tri-Color GC",
          priority: "🔥",
          theory: {
            what: "The Go compiler statically analyzes variables (go build -gcflags='-m') to decide whether memory stays on the fast goroutine stack or escapes to the runtime heap. The Garbage Collector uses a concurrent Tri-Color Mark-Sweep algorithm with write barriers to achieve sub-millisecond pauses.",
            why: "Stack allocations cost zero CPU cycles (pointer arithmetic) and create zero GC pressure. Heap allocations require runtime locking, arena slab allocation, and GC collection work.",
            how: "Inspect escape decisions via `go build -gcflags='-m'`. Use `sync.Pool` for high-frequency temporary byte buffers and structs to eliminate heap allocation thrashing in hot paths.",
            keyPoints: [
              "Stack: LIFO, thread-local, auto-reclaimed on function return, cache friendly",
              "Heap: Global runtime allocator (mcache -> mcentral -> mheap), swept by GC",
              "Escape Triggers: Returning pointer to local var, passing interface{} to fmt.Println, large slices >64KB",
              "Tri-Color Marking: White (unvisited candidate), Grey (discovered, children unscanned), Black (scanned)",
              "GOMEMLIMIT: Soft memory limit (Go 1.19+) preventing container OOM kills",
            ],
            interviewQuestions: [
              {
                question: "Why does passing concrete values into interface parameters cause heap allocation?",
                answer: "Go interfaces are represented internally as 2-word structs (itab pointer + data pointer). When a concrete struct or primitive is passed to an interface parameter, the compiler must allocate memory on the heap (boxing) to store the underlying value and store its pointer in the interface.",
              },
            ],
          },
          codeExample: {
            title: "Zero-Allocation Buffer Reuse with sync.Pool (Go)",
            code: `package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufPool = sync.Pool{
	New: func() any {
		return bytes.NewBuffer(make([]byte, 0, 4096))
	},
}

func formatLog(level, msg string, id int) []byte {
	buf := bufPool.Get().(*bytes.Buffer)
	buf.Reset()

	fmt.Fprintf(buf, "[%s] id=%d msg=%s\n", level, id, msg)

	result := make([]byte, buf.Len())
	copy(result, buf.Bytes())

	bufPool.Put(buf)
	return result
}

func main() {
	for i := 1; i <= 3; i++ {
		fmt.Print(string(formatLog("INFO", "Processed event", 100+i)))
	}
}`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "Sync Primitives, RWMutex & sync/atomic",
          priority: "⭐",
          theory: {
            what: "Go provides low-level synchronization: sync.Mutex (mutual exclusion), sync.RWMutex (multiple concurrent readers, exclusive writer), sync.Once (thread-safe singleton init), and sync/atomic (lock-free hardware atomic instructions).",
            why: "Selecting the correct sync primitive maximizes throughput under high concurrency. Atomic operations incur zero lock overhead; RWMutex excels on read-heavy caches.",
            how: "Always defer mu.Unlock() immediately after mu.Lock(). Never copy a Mutex by value (use pointer). Always run tests with the race detector enabled (`go test -race ./...`).",
            keyPoints: [
              "Mutex vs RWMutex: Use RWMutex when read ratio exceeds 90% of requests",
              "sync.Once: Guarantees single execution even under 10,000 concurrent goroutines",
              "sync/atomic: Hardware LOCK instructions (Compare-And-Swap, Fetch-And-Add)",
              "Race Detector (-race): Injects ThreadSanitizer instrumentation to flag unsynchronized memory access",
            ],
            interviewQuestions: [
              {
                question: "Why should you never pass a struct containing a sync.Mutex by value?",
                answer: "A sync.Mutex is a stateful struct containing a lock state integer and semaphore. Passing by value copies the mutex, creating an independent lock state that fails to synchronize with the original lock, causing catastrophic data races.",
              },
            ],
          },
          codeExample: {
            title: "Safe Concurrent Cache with RWMutex and Atomic Counter (Go)",
            code: `package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

type SafeCache struct {
	mu        sync.RWMutex
	items     map[string]string
	readCount atomic.Uint64
}

func NewSafeCache() *SafeCache {
	return &SafeCache{items: make(map[string]string)}
}

func (c *SafeCache) Get(key string) (string, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	c.readCount.Add(1)
	val, ok := c.items[key]
	return val, ok
}

func (c *SafeCache) Set(key, val string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.items[key] = val
}

func main() {
	cache := NewSafeCache()
	cache.Set("cluster", "us-east-1")

	var wg sync.WaitGroup
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			val, _ := cache.Get("cluster")
			fmt.Println("Read value:", val)
		}()
	}
	wg.Wait()
	fmt.Println("Total reads:", cache.readCount.Load())
}`,
          },
        },
      ],
    },
  ],
};
