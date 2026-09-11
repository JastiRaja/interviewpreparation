import type { FullStackTrack } from "../fullstackTrackTypes";

export const pythonTrack: FullStackTrack = {
  layoutTitle: "Python Backend Architecture & Internals",
  layoutSubtitle: "GIL mechanics & free-threading, asyncio event loop, memory streaming generators, and FastAPI v2",
  accent: "blue",
  defaultSectionId: "runtime-concurrency",
  sections: [
    {
      id: "runtime-concurrency",
      title: "Runtime & Concurrency",
      icon: "🐍",
      heroTitle: "🐍 Python Runtime & Concurrency Models",
      heroSubtitle: "GIL Internals, Free-Threading (PEP 703), and Asyncio Structured Concurrency",
      heroGradient: "from-blue-600 via-indigo-700 to-slate-900",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "The GIL, Multiprocessing & Free-Threading (PEP 703)",
          priority: "🔥",
          theory: {
            what: "The Global Interpreter Lock (GIL) is a mutex in CPython that prevents multiple native OS threads from executing Python bytecode simultaneously. CPU-bound code runs sequentially across threads. Python 3.13 introduced experimental free-threaded builds (--disable-gil) replacing the GIL with mimalloc-based thread-safe allocation and biased reference counting.",
            why: "CPython uses reference counting for garbage collection. Without the GIL or free-threaded ref counting, every variable reference update requires atomic locking, introducing single-threaded penalties.",
            how: "Use asyncio or threading for I/O-bound tasks (sockets, HTTP, DB calls where the GIL is released). Use multiprocessing or ProcessPoolExecutor for CPU-bound tasks (cryptography, image manipulation, ML preprocessing).",
            keyPoints: [
              "I/O Bound: Threads release the GIL during OS network/file calls, achieving high concurrency",
              "CPU Bound: Multi-threaded Python runs slower due to GIL contention and context-switch churn",
              "ProcessPoolExecutor: Spawns independent CPython processes bypassing the GIL via IPC (pickle)",
              "Python 3.13 Free-Threading: True parallel multi-threading without the GIL",
            ],
            interviewQuestions: [
              {
                question: "Why does a CPU-bound multi-threaded Python script often run slower than a single-threaded one?",
                answer: "Multiple OS threads constantly fight for the single GIL mutex. When a thread's time slice expires, it releases the GIL and triggers OS thread wakeups. The resulting context switching and CPU cache invalidation create significant overhead compared to a single thread executing unimpeded.",
              },
            ],
          },
          codeExample: {
            title: "CPU Parallelism (ProcessPool) vs I/O Concurrency (ThreadPool)",
            code: `import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import hashlib

def cpu_heavy(n: int) -> str:
    data = str(n).encode()
    for _ in range(50000):
        data = hashlib.sha256(data).digest()
    return data.hex()

def io_task(task_id: int) -> str:
    time.sleep(0.05)
    return f"Done {task_id}"

if __name__ == "__main__":
    items = list(range(8))

    # CPU Bound: Bypasses GIL with processes
    start = time.perf_counter()
    with ProcessPoolExecutor() as ex:
        results = list(ex.map(cpu_heavy, items))
    print(f"ProcessPool CPU time: {time.perf_counter() - start:.2f}s")

    # I/O Bound: Concurrently waits without GIL contention
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=4) as ex:
        io_results = list(ex.map(io_task, items))
    print(f"ThreadPool I/O time: {time.perf_counter() - start:.2f}s")`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Asyncio Event Loop & Structured Concurrency (TaskGroup)",
          priority: "🔥",
          theory: {
            what: "Asyncio provides single-threaded cooperative multitasking using coroutines (async/await) multiplexed over an OS event loop (epoll/kqueue). Python 3.11 added asyncio.TaskGroup for structured concurrency.",
            why: "Coroutines cost ~1KB of memory compared to 1-8MB per OS thread. A single Python process can maintain 50,000+ open socket/WebSocket connections with minimal RAM.",
            how: "Never call blocking synchronous functions (time.sleep, requests.get) in async code — offload them via `asyncio.to_thread()`. Prefer `asyncio.TaskGroup` over `asyncio.gather` for automatic exception cancellation.",
            keyPoints: [
              "Event Loop: Polls OS I/O events and executes scheduled callbacks and coroutines",
              "TaskGroup: Guarantees child tasks cancel cleanly if any sibling task raises an exception",
              "Non-Blocking I/O: Use httpx, asyncpg, and aiofiles in place of requests, psycopg2, and open()",
              "asyncio.to_thread: Bridges legacy sync blocking libraries onto worker threads safely",
            ],
            interviewQuestions: [
              {
                question: "What happens if you invoke time.sleep(5) inside an async def endpoint?",
                answer: "It blocks the entire single OS thread running the asyncio event loop for 5 seconds. All other concurrent tasks, WebSocket heartbeats, and incoming HTTP requests freeze until the sleep finishes. Always use await asyncio.sleep(5) instead.",
              },
            ],
          },
          codeExample: {
            title: "Structured Concurrency with asyncio.TaskGroup (Python 3.11+)",
            code: `import asyncio
from typing import Any

async def fetch_user(user_id: int) -> dict[str, Any]:
    await asyncio.sleep(0.05)
    return {"id": user_id, "name": f"User_{user_id}"}

async def fetch_orders(user_id: int) -> list[str]:
    await asyncio.sleep(0.08)
    return [f"order_1_{user_id}", f"order_2_{user_id}"]

async def get_dashboard(user_id: int) -> dict[str, Any]:
    # Structured concurrency: automatically cancels sibling on error
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(fetch_user(user_id))
        t2 = tg.create_task(fetch_orders(user_id))

    return {"user": t1.result(), "orders": t2.result()}

if __name__ == "__main__":
    result = asyncio.run(get_dashboard(42))
    print("Dashboard Result:", result)`,
          },
        },
      ],
    },
    {
      id: "architecture-memory",
      title: "Generators & FastAPI v2",
      icon: "🚀",
      heroTitle: "🚀 Python Generators & FastAPI Architecture",
      heroSubtitle: "O(1) Memory Streaming, Rust-Powered Pydantic v2, and Dependency Injection",
      heroGradient: "from-indigo-600 via-blue-700 to-cyan-900",
      concepts: [
        {
          id: "3",
          number: 3,
          title: "Generators, Iterators & Memory Streaming (yield)",
          priority: "⭐",
          theory: {
            what: "Generators are lazy state machines defined with `yield`. They pause execution between calls and conform to the Iterator protocol (__iter__, __next__), generating items on-demand.",
            why: "Loading gigabyte datasets or millions of database rows into memory crashes servers with Out-Of-Memory (OOM) errors. Generators process streams in O(1) constant RAM.",
            how: "Use generator expressions `(x for x in stream)` instead of list comprehensions `[x for x in stream]`. Use `yield from` to cleanly delegate sub-iteration and error propagation.",
            keyPoints: [
              "Lazy Evaluation: Compute values on-the-fly without memory allocation",
              "yield from: Bidirectionally delegates iteration, `.send()`, and sub-generator return values",
              "Generator Methods: `.send(val)` for coroutine injection, `.throw()` for exceptions, `.close()` for teardown",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between an Iterable and an Iterator in Python?",
                answer: "An Iterable is an object with an `__iter__()` method that returns an Iterator (e.g. lists, dicts). An Iterator is an object with both `__iter__()` and a `__next__()` method that yields the next item or raises StopIteration when depleted.",
              },
            ],
          },
          codeExample: {
            title: "O(1) Memory Chunked Streaming Pipeline (Python)",
            code: `from typing import Generator, Iterable, TypeVar

T = TypeVar("T")

def chunk_stream(stream: Iterable[T], size: int = 2) -> Generator[list[T], None, None]:
    """Batches items lazily with O(1) memory footprint"""
    batch = []
    for item in stream:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

def generate_records():
    for i in range(1, 6):
        yield {"id": i, "payload": f"data_{i}"}

if __name__ == "__main__":
    records = generate_records()
    for batch in chunk_stream(records, size=2):
        print("Processing Batch:", batch)`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "FastAPI & Pydantic v2 Production Architecture",
          priority: "🔥",
          theory: {
            what: "FastAPI is a high-throughput ASGI framework built on Starlette and Pydantic. Pydantic v2 replaced Python validation loops with a compiled Rust engine (pydantic-core), providing 5-20x faster serialization.",
            why: "FastAPI provides compile-like type validation, automated OpenAPI docs, and throughput competitive with Go and NodeJS frameworks.",
            how: "Manage database connection pools via `@asynccontextmanager` application lifespan. Inject DB sessions and auth credentials using `Depends()`.",
            keyPoints: [
              "Pydantic v2: Rust core validation, `.model_dump()` replacing `.dict()`",
              "Lifespan Context Manager: Replaces deprecated startup/shutdown events for robust connection pool teardown",
              "Dependency Injection (Depends): Decouples route handlers from DB sessions and auth layers",
              "BackgroundTasks: Offloads non-blocking asynchronous email/webhook tasks after response returns",
            ],
            interviewQuestions: [
              {
                question: "How does FastAPI handle async def vs regular def endpoints differently?",
                answer: "Endpoints declared with async def run directly on the main asyncio event loop (must not contain blocking code). Endpoints declared with regular def are automatically offloaded to an external worker threadpool so blocking synchronous calls do not freeze the event loop.",
              },
            ],
          },
          codeExample: {
            title: "FastAPI v2 App with Lifespan & Dependency Injection (Python)",
            code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, BackgroundTasks
from pydantic import BaseModel, Field, EmailStr
from typing import AsyncGenerator

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB Pool
    print("🚀 Connecting DB pool...")
    yield
    # Shutdown: Close connections
    print("🛑 Closing DB pool...")

app = FastAPI(title="Production Service", lifespan=lifespan)

async def get_db() -> AsyncGenerator[dict, None]:
    db = {"session": "active"}
    try:
        yield db
    finally:
        pass

def send_alert(email: str):
    print(f"📧 Notification sent to {email}")

@app.post("/users", response_model=UserOut)
async def create_user(
    user_in: UserCreate,
    bg_tasks: BackgroundTasks,
    db: dict = Depends(get_db)
):
    bg_tasks.add_task(send_alert, user_in.email)
    return {"id": 101, "username": user_in.username, "email": user_in.email}`,
          },
        },
      ],
    },
  ],
};
