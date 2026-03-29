import CodeExample from "./CodeExample";
import { JavaConceptCard as C } from "./JavaConceptCard";

export function JavaBasics({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🧱 Core Java basics</h3>
        <p className="break-words text-amber-100">Foundation: types, control flow, strings, and I/O — learn this first.</p>
      </div>
      <C
        id="1"
        number={1}
        title="JVM, JRE, and JDK"
        priority="🔥"
        theory={{
          what: "JDK = compiler (javac) + tools + libraries. JRE = JVM + libraries to run apps. JVM executes .class bytecode with GC and class loading.",
          why: "Interviewers separate “what you build with” (JDK) from “what runs in production” (JRE/runtime) and why bytecode is portable.",
          how: "javac compiles to bytecode; java starts a JVM and loads classes. JIT optimizes hot code at runtime.",
          keyPoints: ["Bytecode is platform-neutral; JVM is per-OS", "GC lives in the JVM", "Modern JDKs often ship modular runtimes"],
          interviewQuestions: [
            {
              question: "JDK vs JRE vs JVM?",
              answer: "JDK is the full dev kit. JRE (or a custom runtime image) is for execution. JVM is the engine that runs bytecode and manages memory.",
            },
          ],
        }}
      >
        <CodeExample title="Compile and run" code={`javac Hello.java\njava Hello`} />
      </C>
      <C
        id="2"
        number={2}
        title="Variables & data types"
        theory={{
          what: "Primitives: byte, short, int, long, float, double, char, boolean. Reference types: classes, interfaces, arrays. `var` (Java 10+) infers local type.",
          why: "Choosing the right type affects range, precision, memory, and API design.",
          how: "Declare with type and name; initialize before use (definite assignment). Literals have defaults (e.g. 42 is int, 3.14 is double).",
          keyPoints: ["No unsigned int in Java", "Use BigDecimal for money, not double", "Local variables are not auto-initialized"],
          interviewQuestions: [
            {
              question: "Difference between int and Integer?",
              answer: "`int` is a primitive; `Integer` is a wrapper object (nullable, usable in generics). Autoboxing bridges them with performance and NPE caveats.",
            },
          ],
        }}
      >
        <CodeExample
          title="Declarations"
          code={`int count = 0;\nfinal String name = "Ada";\nvar list = new ArrayList<String>(); // Java 10+`}
        />
      </C>
      <C
        id="3"
        number={3}
        title="Operators (arithmetic, logical, etc.)"
        theory={{
          what: "Arithmetic (+ - * / %), relational, logical (&& || !), bitwise (& | ^ ~), shift, assignment (= += …), ternary (?:), instanceof (pattern matching in newer Java).",
          why: "Short-circuit &&/|| avoid NPEs and extra work; understand precedence to read code correctly.",
          how: "`==` compares primitives by value; for objects it compares references unless equals() is used.",
          keyPoints: ["++i vs i++ in expressions", "`==` vs `equals` for strings", "Optional chaining isn’t in Java — use null checks or Optional"],
          interviewQuestions: [
            { question: "What does && short-circuit?", answer: "If the left operand is false, the right is not evaluated." },
          ],
        }}
      />
      <C
        id="4"
        number={4}
        title="Control statements (if, switch, loops)"
        theory={{
          what: "if/else, switch (classic and switch expressions since Java 14), for, enhanced for, while, do/while, break/continue, labeled break.",
          why: "Switch on strings/enums/sealed types is common in business logic; loops dominate data processing.",
          how: "Prefer switch expressions with arrows for exhaustive sealed enums; use break in classic switch to avoid fall-through bugs.",
          keyPoints: ["Enhanced for needs Iterable or array", "for(;;) is infinite loop", "return exits the method, not just the loop"],
          interviewQuestions: [
            {
              question: "Switch expression vs statement?",
              answer: "Expressions yield a value and often enforce exhaustiveness with enums/sealed types; statements perform side effects with fall-through unless broken.",
            },
          ],
        }}
      >
        <CodeExample
          title="Switch expression"
          code={`String label = switch (day) {\n  case MONDAY, FRIDAY -> "rough";\n  case WEDNESDAY -> "mid";\n  default -> "ok";\n};`}
        />
      </C>
      <C
        id="5"
        number={5}
        title="Arrays"
        theory={{
          what: "Fixed-length, indexed from 0; `int[] a` or `int a[]`. Multi-dimensional arrays are arrays of arrays.",
          why: "Foundation for collections; interviews test copying, sorting, and bounds.",
          how: "`Arrays.copyOf`, `System.arraycopy`, `Arrays.sort`, `Arrays.binarySearch` (sorted only). Length is `a.length` (not a method).",
          keyPoints: ["Out of bounds → ArrayIndexOutOfBoundsException", "Arrays are objects on the heap", "Varargs creates an array for callers"],
          interviewQuestions: [
            { question: "Array vs ArrayList?", answer: "Arrays are fixed size and can hold primitives; ArrayList is resizable and stores references (use wrappers for int)." },
          ],
        }}
      >
        <CodeExample title="Array basics" code={`int[] nums = {1, 2, 3};\nint[][] grid = new int[3][4];\nArrays.sort(nums);`} />
      </C>
      <C
        id="6"
        number={6}
        title="Strings & StringBuilder"
        theory={{
          what: "`String` is immutable; operations return new instances. `StringBuilder` (unsync) / `StringBuffer` (sync) for mutable char sequences.",
          why: "Concatenation in loops without a builder creates many temporary objects.",
          how: "Compare values with `equals`; pool manages literals. Text blocks `\"\"\"` since Java 15 for multiline.",
          keyPoints: ["Never use == for string value equality", "intern() interacts with the pool — use carefully"],
          interviewQuestions: [
            { question: "Why is String immutable?", answer: "Safe sharing, caching, stable hash keys for hash maps, and simpler reasoning in concurrent code." },
          ],
        }}
      >
        <CodeExample
          title="Builder in a loop"
          code={`StringBuilder sb = new StringBuilder();\nfor (String p : parts) sb.append(p).append(',');\nreturn sb.toString();`}
        />
      </C>
      <C
        id="7"
        number={7}
        title="Input / output (Scanner, printing)"
        theory={{
          what: "`System.out` / `System.err` for console output; `Scanner` for parsing stdin; `Console` for passwords; production apps use loggers (SLF4J).",
          why: "CLI tools and learning exercises use Scanner; real services prefer structured logging.",
          how: "Scanner methods: nextLine, nextInt, etc. Remember locale/encoding; close resources when done.",
          keyPoints: ["Scanner is not thread-safe", "Prefer try-with-resources for Closeable streams"],
          interviewQuestions: [
            { question: "Scanner vs BufferedReader?", answer: "Scanner tokenizes and parses types; BufferedReader reads line-by-line text efficiently — pick based on input shape." },
          ],
        }}
      >
        <CodeExample
          title="Scanner"
          code={`try (Scanner in = new Scanner(System.in)) {\n  System.out.print("Name? ");\n  String name = in.nextLine();\n  System.out.println("Hello, " + name);\n}`}
        />
      </C>
      <C
        id="8"
        number={8}
        title="Primitives vs references & wrappers"
        theory={{
          what: "Primitives live on the stack (locals) or inside objects; references point to heap objects. Wrappers bridge to generics and collections.",
          why: "Understand pass-by-value of references, autoboxing cost, and Integer caching (-128..127).",
          how: "Method parameters copy the reference; mutating the object is visible to caller; reassigning the reference is not.",
          keyPoints: ["`==` vs equals on wrappers", "Unboxing null Integer → NPE"],
          interviewQuestions: [
            { question: "Is Java pass-by-reference?", answer: "Java is always pass-by-value; for objects the value copied is the reference." },
          ],
        }}
      >
        <CodeExample title="Reference copy" code={`void bump(int[] a) { a[0]++; } // visible\nvoid swapBad(int[] a, int[] b) { int[] t = a; a = b; b = t; } // not visible`} />
      </C>
    </div>
  );
}

export function JavaOop({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🧩 Object-oriented programming</h3>
        <p className="break-words text-violet-100">Java’s core model: encapsulation, inheritance, polymorphism, abstraction.</p>
      </div>
      <C
        id="9"
        number={9}
        title="Classes & objects"
        priority="🔥"
        theory={{
          what: "A class is a blueprint; an object is an instance with state (fields) and behavior (methods). `new` allocates on the heap.",
          why: "OOP organizes code around data + behavior; interviews test identity vs equality and object layout basics.",
          how: "Fields hold state; methods define behavior; `this` refers to the current instance.",
          keyPoints: ["Top-level public class name matches file in classic layout", "Records (Java 16+) are compact data carriers"],
          interviewQuestions: [
            { question: "Class vs object?", answer: "A class defines structure; objects are runtime instances of that class." },
          ],
        }}
      >
        <CodeExample title="Simple class" code={`public class Point {\n  private final int x, y;\n  public Point(int x, int y) { this.x = x; this.y = y; }\n  public int x() { return x; }\n}`} />
      </C>
      <C
        id="10"
        number={10}
        title="Constructors & initialization"
        theory={{
          what: "Constructors run on `new`; default no-arg exists if you declare none. Chaining with `this(...)`; super constructor via `super(...)`.",
          why: "Order matters: static → instance field init → constructor. Initialization blocks run before constructor body.",
          how: "Overload constructors for convenience; factory methods can replace public constructors when needed.",
          keyPoints: ["Compiler inserts super() if omitted", "Final fields must be assigned exactly once"],
          interviewQuestions: [
            { question: "Constructor vs method?", answer: "Constructors initialize new instances, have no return type, and are not inherited (but subclass must invoke super)." },
          ],
        }}
      />
      <C
        id="11"
        number={11}
        title="Encapsulation"
        theory={{
          what: "Hide fields behind accessors (getters/setters) or behavior methods so invariants stay valid.",
          why: "Allows refactoring internals without breaking callers; validation lives in one place.",
          how: "Use private fields; expose minimal API; immutable objects expose no setters.",
          keyPoints: ["JavaBeans conventions in frameworks", "Defensive copies for mutable fields in getters"],
          interviewQuestions: [
            { question: "Why private fields?", answer: "To control how state changes and to preserve class invariants." },
          ],
        }}
      />
      <C
        id="12"
        number={12}
        title="Inheritance"
        theory={{
          what: "`extends` creates an is-a relationship; subclass inherits accessible members; single inheritance for classes.",
          why: "Reuse and substitutability; misuse leads to fragile hierarchies — favor composition when behavior varies.",
          how: "`@Override` for methods; `super` to call parent implementation; prevent subclassing with `final` class.",
          keyPoints: ["Does not inherit private members", "Constructors are not inherited"],
          interviewQuestions: [
            { question: "Composition vs inheritance?", answer: "Composition delegates behavior to contained objects; inheritance shares implementation—use composition when there is no true is-a relation." },
          ],
        }}
      />
      <C
        id="13"
        number={13}
        title="Polymorphism (overload & override)"
        theory={{
          what: "Overloading: same name, different parameter lists (compile-time resolution). Overriding: subclass replaces instance method (dynamic dispatch).",
          why: "Polymorphism lets you program to interfaces (`List`, `Runnable`) and swap implementations.",
          how: "`@Override` catches signature mistakes; static/private/final methods are not overridden.",
          keyPoints: ["Return type covariance allowed on override", "Fields are not polymorphic"],
          interviewQuestions: [
            { question: "Overload vs override?",
              answer: "Overload is same method name, different params, resolved at compile time. Override replaces an inherited instance method, resolved at runtime.",
            },
          ],
        }}
      />
      <C
        id="14"
        number={14}
        title="Abstract classes"
        theory={{
          what: "Cannot be instantiated; may contain abstract and concrete methods and state. Subclasses implement or stay abstract.",
          why: "Share code + partial contract among related types.",
          how: "`abstract class Shape { abstract double area(); }` — use when several subclasses share implementation.",
          keyPoints: ["Can have constructors (for subclass chaining)", "Single inheritance only"],
          interviewQuestions: [
            { question: "Abstract class vs interface?", answer: "Abstract class can hold state and constructors; interfaces (classic) were pure contracts—now also default/static methods." },
          ],
        }}
      />
      <C
        id="15"
        number={15}
        title="Interfaces & default methods"
        theory={{
          what: "Interfaces define behavior contracts; a class may implement many. Java 8+ adds default and static methods.",
          why: "Multiple inheritance of type; evolve APIs without breaking implementors.",
          how: "`implements` keyword; diamond problem resolved by explicit `Interface.super.method()` if needed.",
          keyPoints: ["Implicitly abstract methods (pre-private methods)", "Functional interfaces = one abstract method (for lambdas)"],
          interviewQuestions: [
            { question: "What is a functional interface?", answer: "An interface with exactly one abstract method—target for lambda expressions." },
          ],
        }}
      />
      <C
        id="16"
        number={16}
        title="equals() & hashCode()"
        theory={{
          what: "`equals` defines logical equality; `hashCode` supports hash buckets. Contract: equal objects → same hashCode.",
          why: "Breaking the contract breaks HashMap/HashSet.",
          how: "Override both together; use same fields; prefer `Objects.equals`/`Objects.hash`.",
          keyPoints: ["Symmetry, reflexivity, transitivity for equals", "Do not use mutable fields in hash if object is map key"],
          interviewQuestions: [
            { question: "If equals is true, what about hashCode?", answer: "Must be equal; the converse need not hold." },
          ],
        }}
      />
      <C
        id="17"
        number={17}
        title="Access modifiers & static"
        theory={{
          what: "private, package-private, protected, public. static members belong to the class.",
          why: "Encapsulation + utility methods without instance state.",
          how: "Static cannot access instance fields directly; static nested class has no outer `this`.",
          keyPoints: ["Static methods are hidden, not overridden", "protected = package + subclasses"],
          interviewQuestions: [
            { question: "Can static methods be overridden?", answer: "No—they are resolved on the reference type (hiding), not dynamically dispatched." },
          ],
        }}
      >
        <CodeExample title="Static counter" code={`class Hits {\n  static long total;\n  static void reset() { total = 0; }\n}`} />
      </C>
    </div>
  );
}

export function JavaCollections({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-600 to-amber-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">📦 Collections framework</h3>
        <p className="break-words text-orange-100">Lists, sets, maps — pick structures by ordering, uniqueness, and complexity.</p>
      </div>
      <C
        id="18"
        number={18}
        title="Collections overview & when to use which"
        priority="🔥"
        theory={{
          what: "Core interfaces in java.util: Collection (List, Set, Queue), Map separate. Implementations differ in ordering, duplicates, and Big-O.",
          why: "Wrong choice → performance bugs and subtle bugs (concurrent modification, null keys).",
          how: "Program to interface types on the left; choose Hash* for average O(1), Tree* for sorted order, Linked* for predictable iteration order.",
          keyPoints: ["Map is not a Collection", "ConcurrentHashMap vs synchronized HashMap", "Immutable collections via List.of, Map.of (Java 9+)"],
          interviewQuestions: [
            {
              question: "ArrayList vs LinkedList?",
              answer: "ArrayList: fast random access, cache-friendly; LinkedList: fast inserts in the middle of iterators, poor random access.",
            },
          ],
        }}
      >
        <CodeExample title="Declare against interfaces" code={`List<String> a = new ArrayList<>();\nSet<Integer> s = new HashSet<>();\nMap<String, Long> m = new HashMap<>();`} />
      </C>
      <C
        id="19"
        number={19}
        title="List: ArrayList & LinkedList"
        theory={{
          what: "List = ordered, allows duplicates, indexed. ArrayList: dynamic array. LinkedList: doubly-linked nodes.",
          why: "Most workloads favor ArrayList; LinkedList is niche (deque operations, frequent middle inserts with list iterators).",
          how: "Random access: get(i) is O(1) ArrayList, O(n) LinkedList.",
          keyPoints: ["ListIterator for LinkedList-efficient insertion", "trimToSize on ArrayList to save memory"],
          interviewQuestions: [
            { question: "Fail-fast iterator?", answer: "Throws ConcurrentModificationException if structurally modified outside iterator (except iterator’s own remove)." },
          ],
        }}
      />
      <C
        id="20"
        number={20}
        title="Set: HashSet, TreeSet, LinkedHashSet"
        theory={{
          what: "Set = no duplicates. HashSet: hash table, unordered. LinkedHashSet: insertion order. TreeSet: sorted (natural or Comparator), backed by TreeMap.",
          why: "Use HashSet for membership tests; TreeSet when you need ordered traversal.",
          how: "Elements must honor equals/hashCode (Hash*) or Comparable/Comparator (Tree*).",
          keyPoints: ["TreeSet cannot contain null (Java 7+)", "EnumSet is extremely efficient for enums"],
          interviewQuestions: [
            { question: "HashSet contains complexity?", answer: "Average O(1); worst case O(n) if many hash collisions." },
          ],
        }}
      />
      <C
        id="21"
        number={21}
        title="Map: HashMap, TreeMap, LinkedHashMap"
        theory={{
          what: "Key→value; keys unique. HashMap: average O(1). TreeMap: sorted keys. LinkedHashMap: insertion or access order.",
          why: "Caches, indexes, aggregations; ordering choice affects iteration and range queries.",
          how: "Load factor and capacity tuning; prefer immutable keys; thread-safe: ConcurrentHashMap.",
          keyPoints: ["HashMap allows one null key", "computeIfAbsent for memoization"],
          interviewQuestions: [
            { question: "HashMap vs Hashtable?", answer: "Hashtable is legacy synchronized class; prefer ConcurrentHashMap or Collections.synchronizedMap patterns." },
          ],
        }}
      />
      <C
        id="22"
        number={22}
        title="Iterator, enhanced for, fail-fast"
        theory={{
          what: "Iterator exposes hasNext/next/remove (optional). Enhanced for compiles to iterator. Fail-fast iterators detect concurrent modification.",
          why: "Safe removal while iterating uses iterator.remove(), not collection.remove in a foreach.",
          how: "For concurrent structures use concurrent iterators or snapshots.",
          keyPoints: ["ModCount tracks structural changes", "CopyOnWriteArrayList snapshot iterators"],
          interviewQuestions: [
            { question: "Remove in a for-each loop?", answer: "Illegal—use iterator.remove() or removeIf / new collection." },
          ],
        }}
      />
      <C
        id="23"
        number={23}
        title="Comparable vs Comparator"
        theory={{
          what: "`Comparable<T>` natural ordering (compareTo). `Comparator<T>` external ordering (compare).",
          why: "TreeSet/TreeMap/PriorityQueue need ordering; sometimes you cannot change the class.",
          how: "`Comparator.comparing(Person::getName).thenComparingInt(Person::getAge)` for fluent chains.",
          keyPoints: ["compareTo contract: sign matters, consistent with equals ideally", "reversed(), nullsFirst() helpers"],
          interviewQuestions: [
            { question: "Comparable vs Comparator?", answer: "Comparable is intrinsic order on the class; Comparator is pluggable strategy for sorting." },
          ],
        }}
      >
        <CodeExample title="Sort with Comparator" code={`names.sort(Comparator.comparing(String::length).reversed());`} />
      </C>
      <C
        id="24"
        number={24}
        title="Generics essentials"
        theory={{
          what: "Type parameters (List<String>) give compile-time checks; erasure removes most generic info at runtime.",
          why: "Avoid ClassCastException; clearer APIs.",
          how: "Wildcards: ? extends T (read producer), ? super T (write consumer) — PECS.",
          keyPoints: ["Cannot new T()", "Bridge methods for overrides", "Raw types discouraged"],
          interviewQuestions: [
            { question: "What is type erasure?", answer: "Generic types are mostly erased to their bounds or Object with compiler-inserted casts." },
          ],
        }}
      />
    </div>
  );
}

export function JavaExceptions({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-600 to-zinc-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">⚙️ Exception handling</h3>
        <p className="break-words text-slate-100">Robust error handling: try/catch, throws, and resource cleanup.</p>
      </div>
      <C
        id="25"
        number={25}
        title="try, catch, finally"
        theory={{
          what: "try executes guarded code; catch handles Throwable subtypes; finally runs on almost all paths (use sparingly if try-with-resources suffices).",
          why: "Separate normal flow from error flow; preserve diagnostics.",
          how: "Catch specific exceptions first; avoid empty catch; log or rethrow with context.",
          keyPoints: ["Multi-catch: catch (A | B e)", "finally still runs after return in try"],
          interviewQuestions: [
            { question: "finally when return in try?", answer: "finally executes before the method actually returns." },
          ],
        }}
      />
      <C
        id="26"
        number={26}
        title="throw vs throws"
        theory={{
          what: "`throw` emits an exception instance. `throws` on a method declares checked exceptions callers must handle.",
          why: "Checked exceptions document failure modes; unchecked (RuntimeException) for programming errors.",
          how: "Wrap low-level exceptions in domain exceptions with causes.",
          keyPoints: ["Error generally not caught", "throws is not needed for unchecked"],
          interviewQuestions: [
            { question: "Checked vs unchecked?", answer: "Checked must be declared or caught; unchecked extends RuntimeException and is optional in signatures." },
          ],
        }}
      />
      <C
        id="27"
        number={27}
        title="Custom exceptions"
        theory={{
          what: "Subclass Exception (checked) or RuntimeException (unchecked); add constructors forwarding message/cause.",
          why: "Domain-specific types make catch blocks precise and APIs self-documenting.",
          how: "Keep hierarchy shallow; include context fields when useful.",
          keyPoints: ["serialVersionUID for Serializable exceptions", "Don’t overuse checked exceptions in libraries"],
          interviewQuestions: [
            { question: "When checked custom exception?", answer: "When callers should explicitly handle a recoverable condition; otherwise prefer unchecked." },
          ],
        }}
      />
      <C
        id="28"
        number={28}
        title="try-with-resources"
        theory={{
          what: "Auto-closes AutoCloseable resources; suppresses close exceptions with addSuppressed on primary exception.",
          why: "Prevents resource leaks vs manual finally blocks.",
          how: "try (InputStream in = ...) { } — resources closed in reverse declaration order.",
          keyPoints: ["Works with any AutoCloseable", "Preferred over try/finally close pattern"],
          interviewQuestions: [
            { question: "try-with-resources vs finally close?", answer: "Shorter, safer, and standardized suppression handling for exceptions during close." },
          ],
        }}
      >
        <CodeExample title="Try-with-resources" code={`try (var in = Files.newInputStream(path)) {\n  // read\n} catch (IOException e) {\n  throw new UncheckedIOException(e);\n}`} />
      </C>
    </div>
  );
}

export function JavaModern({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-teal-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🔄 Java 8+ features</h3>
        <p className="break-words text-cyan-100">Lambdas, streams, Optional — standard in modern codebases.</p>
      </div>
      <C
        id="29"
        number={29}
        title="Lambda expressions"
        priority="🔥"
        theory={{
          what: "Anonymous functions: `(a, b) -> a + b`; target type must be a functional interface.",
          why: "Concise callbacks, event handlers, stream operations.",
          how: "Variable capture requires effectively final locals; method references shorthand: `String::length`.",
          keyPoints: ["Lambda is not serializable unless interface is", "this in lambda is enclosing instance (for non-static)"],
          interviewQuestions: [
            { question: "Lambda vs anonymous class?", answer: "Lambda implements a functional interface with less boilerplate; no per-instance this for the lambda itself." },
          ],
        }}
      >
        <CodeExample title="Runnable & Comparator" code={`Runnable r = () -> System.out.println("go");\nlist.sort((a, b) -> a.compareToIgnoreCase(b));`} />
      </C>
      <C
        id="30"
        number={30}
        title="Functional interfaces"
        theory={{
          what: "Single abstract method interfaces: Predicate, Function, Consumer, Supplier, UnaryOperator, etc. in java.util.function.",
          why: "Composable building blocks for streams and APIs.",
          how: "andThen, compose, chaining for functions; primitive specializations reduce boxing.",
          keyPoints: ["@FunctionalInterface annotation", "Default methods don’t count toward SAM"],
          interviewQuestions: [
            { question: "Predicate vs Function?", answer: "Predicate<T> returns boolean test; Function<T,R> maps T to R." },
          ],
        }}
      />
      <C
        id="31"
        number={31}
        title="Streams API"
        theory={{
          what: "Lazy pipeline: source → intermediate ops (map, filter, sorted) → terminal (collect, reduce, forEach).",
          why: "Declarative data processing; easy parallelization (use carefully).",
          how: "collect(Collectors.toList()); groupingBy, joining; avoid side effects in streams.",
          keyPoints: ["Stream can be consumed once", "parallelStream only when safe and beneficial"],
          interviewQuestions: [
            { question: "Intermediate vs terminal?", answer: "Intermediate ops return another stream and are lazy; terminal ops trigger evaluation." },
          ],
        }}
      >
        <CodeExample
          title="Stream example"
          code={`long evens = numbers.stream()\n    .filter(n -> n % 2 == 0)\n    .mapToLong(Integer::longValue)\n    .sum();`}
        />
      </C>
      <C
        id="32"
        number={32}
        title="Optional"
        theory={{
          what: "Container for zero or one value; encourages explicit absence instead of null.",
          why: "Safer APIs than null returns; composable with map/flatMap/filter.",
          how: "Avoid Optional fields/parameters in public DTOs often; fine as return types. orElse vs orElseGet.",
          keyPoints: ["Optional.empty()", "ifPresent", "orElseThrow"],
          interviewQuestions: [
            { question: "Is Optional a silver bullet for null?", answer: "No—it documents absence for returns; misuse everywhere adds overhead and doesn’t remove all null bugs." },
          ],
        }}
      />
    </div>
  );
}

export function JavaConcurrency({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 to-red-700 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🧵 Multithreading & concurrency</h3>
        <p className="break-words text-rose-100">Threads, locks, and pools for scalable backends.</p>
      </div>
      <C
        id="33"
        number={33}
        title="Thread & Runnable"
        theory={{
          what: "Extend Thread (less flexible) or implement Runnable/Callable and pass to Thread/Executor. Callable returns a value and throws checked exceptions.",
          why: "JVM maps threads to OS threads (platform threads); virtual threads (Project Loom) change scalability model on modern JDKs.",
          how: "start() begins new thread; run() executed by thread; don’t call run() directly for concurrency.",
          keyPoints: ["Daemon threads don’t block JVM exit", "Thread.currentThread()"],
          interviewQuestions: [
            { question: "Runnable vs Thread?", answer: "Implement Runnable to separate task from scheduling; Thread is the worker that runs the task." },
          ],
        }}
      >
        <CodeExample title="Start a thread" code={`Thread t = new Thread(() -> doWork());\nt.start();`} />
      </C>
      <C
        id="34"
        number={34}
        title="Synchronization & locks"
        theory={{
          what: "`synchronized` methods/blocks provide mutual exclusion via intrinsic locks. ReentrantLock adds tryLock, fairness, conditions.",
          why: "Prevent race conditions on shared mutable state.",
          how: "Prefer java.util.concurrent over wait/notify in new code; document lock ordering to avoid deadlock.",
          keyPoints: ["volatile visibility, not atomicity for compound ops", "java.util.concurrent.atomic for lock-free counters"],
          interviewQuestions: [
            { question: "synchronized vs ReentrantLock?", answer: "Lock offers advanced features (interruptible, timed, fair); synchronized is simpler and JVM-optimized for many cases." },
          ],
        }}
      />
      <C
        id="35"
        number={35}
        title="Thread lifecycle"
        theory={{
          what: "States: NEW → RUNNABLE → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED.",
          why: "Debugging hangs and thread dumps requires state vocabulary.",
          how: "join, sleep, wait/notify, park/unpark transition states.",
          keyPoints: ["interrupt() sets flag; blocking methods may throw InterruptedException", "Always restore interrupt status if catching"],
          interviewQuestions: [
            { question: "What is a livelock?", answer: "Threads keep responding to each other but make no progress—similar starvation pattern to deadlock." },
          ],
        }}
      />
      <C
        id="36"
        number={36}
        title="Executors & thread pools"
        theory={{
          what: "ExecutorService manages worker threads: fixed, cached, scheduled, ForkJoinPool, etc.",
          why: "Creating unbounded threads exhausts resources; pools reuse threads and queue work.",
          how: "Executors.newFixedThreadPool(n); submit tasks; shutdown/shutdownNow on app stop.",
          keyPoints: ["RejectedExecutionHandler when saturated", "Prefer ThreadPoolExecutor with explicit bounds in production"],
          interviewQuestions: [
            { question: "submit vs execute?", answer: "submit returns Future (swallows exceptions until get); execute void—handle exceptions inside task or handler." },
          ],
        }}
      >
        <CodeExample title="ExecutorService" code={`var ex = Executors.newFixedThreadPool(4);\ntry {\n  ex.invokeAll(tasks);\n} finally {\n  ex.shutdown();\n}`} />
      </C>
    </div>
  );
}

export function JavaFileIo({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-800 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">💾 File handling (I/O)</h3>
        <p className="break-words text-emerald-100">NIO.2, readers/writers, and serialization.</p>
      </div>
      <C
        id="37"
        number={37}
        title="File, Path & Files (NIO.2)"
        theory={{
          what: "`java.nio.file.Path` + `Files` utility replaces many `java.io.File` uses. Better error handling and options.",
          why: "Copy/move/delete, walking trees, watching directories, symbolic links.",
          how: "Paths.get(\"a/b\"); Files.readString(path); Files.walk, newDirectoryStream.",
          keyPoints: ["Charset always explicit when text", "ATOMIC_MOVE option"],
          interviewQuestions: [
            { question: "File vs Path?", answer: "`Path` is modern, immutable, and works with `Files` operations; `File` is older and less expressive." },
          ],
        }}
      >
        <CodeExample title="Read all lines" code={`String text = Files.readString(Path.of("data.txt"));\nFiles.writeString(Path.of("out.txt"), text);`} />
      </C>
      <C
        id="38"
        number={38}
        title="Readers, writers & buffering"
        theory={{
          what: "Reader/Writer for char streams; InputStream/OutputStream for bytes. Buffered* reduces syscalls.",
          why: "Encoding: readers handle charsets; streams are raw bytes.",
          how: "new BufferedReader(new FileReader(path, UTF_8)); try-with-resources mandatory pattern.",
          keyPoints: ["PrintWriter for formatted text", "DataInputStream for binary protocols"],
          interviewQuestions: [
            { question: "When buffering?", answer: "When doing many small reads/writes—buffering batches I/O for performance." },
          ],
        }}
      />
      <C
        id="39"
        number={39}
        title="Serialization"
        theory={{
          what: "Java serialization converts object graphs to bytes via ObjectOutputStream—implements Serializable and serialVersionUID.",
          why: "Legacy remoting and caches; many teams prefer JSON/Protobuf instead for evolution and security.",
          how: "Customize with readObject/writeObject; Externalizable for full control.",
          keyPoints: ["Deserialization is a security risk—validate inputs", "transient fields skipped"],
          interviewQuestions: [
            { question: "serialVersionUID?", answer: "Version stamp; mismatch causes InvalidClassException—set explicitly when evolving Serializable classes." },
          ],
        }}
      />
    </div>
  );
}

export function JavaJdbc({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🗄️ JDBC</h3>
        <p className="break-words text-blue-100">Connect Java apps to relational databases.</p>
      </div>
      <C
        id="40"
        number={40}
        title="Connecting with JDBC"
        theory={{
          what: "DriverManager or DataSource obtain Connection. URL, user, password; JDBC 4+ auto-loads drivers from classpath.",
          why: "Foundation before ORMs; understand for debugging connection leaks.",
          how: "Prefer DataSource (pooled) in apps; try-with-resources on Connection in small scripts.",
          keyPoints: ["Class.forName driver registration mostly legacy", "setAutoCommit for transaction control"],
          interviewQuestions: [
            { question: "DriverManager vs DataSource?", answer: "DataSource is the enterprise pattern with pooling and JNDI lookup; DriverManager is simplistic." },
          ],
        }}
      >
        <CodeExample title="Get connection" code={`try (Connection c = DriverManager.getConnection(url, user, pass)) {\n  // use c\n}`} />
      </C>
      <C
        id="41"
        number={41}
        title="PreparedStatement & CRUD"
        theory={{
          what: "PreparedStatement binds parameters (?), precompiled, prevents SQL injection vs string concat.",
          why: "Security + plan reuse on many DBs.",
          how: "setString(1, value); executeQuery for SELECT; executeUpdate for INSERT/UPDATE/DELETE; ResultSet next/getX.",
          keyPoints: ["Close ResultSet/Statement with try-with-resources", "Generated keys: RETURN_GENERATED_KEYS"],
          interviewQuestions: [
            { question: "Statement vs PreparedStatement?", answer: "PreparedStatement parameterizes inputs and is safe against injection; Statement for static SQL only." },
          ],
        }}
      />
      <C
        id="42"
        number={42}
        title="Transactions & connection pools"
        theory={{
          what: "setAutoCommit(false); commit/rollback groups operations. Pools (HikariCP) reuse connections under load.",
          why: "ACID boundaries and performance.",
          how: "Isolation levels setTransactionIsolation; timeouts; pool sizing metrics.",
          keyPoints: ["Always close connections back to pool", "Leak detection in HikariCP helps find bugs"],
          interviewQuestions: [
            { question: "Why connection pooling?", answer: "Opening DB connections is expensive; pools amortize cost and cap concurrency." },
          ],
        }}
      />
    </div>
  );
}

export function JavaWeb({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky-600 to-blue-800 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🌐 Java web basics</h3>
        <p className="break-words text-sky-100">HTTP, servlets, JSP — context before Spring MVC.</p>
      </div>
      <C
        id="43"
        number={43}
        title="HTTP basics for Java devs"
        theory={{
          what: "Methods (GET/POST/PUT/DELETE), status codes, headers, cookies, sessions. Servlets sit on top of HTTP.",
          why: "REST and Spring MVC map cleanly to HTTP semantics.",
          how: "Idempotent GET; POST for unsafe actions; Content-Type and Accept for negotiation.",
          keyPoints: ["HTTPS terminates at reverse proxy often", "CORS is browser-enforced"],
          interviewQuestions: [
            { question: "Idempotent HTTP methods?", answer: "GET, PUT, DELETE should be idempotent; POST generally is not." },
          ],
        }}
      />
      <C
        id="44"
        number={44}
        title="Servlets"
        theory={{
          what: "`javax/jakarta.servlet.http.HttpServlet` handles doGet/doPost; deployed in servlet containers (Tomcat).",
          why: "Foundation of Java EE web stack; filters, listeners, async support.",
          how: "Servlet lifecycle: init → service → destroy; one instance, multithreaded—no mutable instance fields.",
          keyPoints: ["Request/response per thread", "Forwarding vs redirect"],
          interviewQuestions: [
            { question: "Servlet thread model?", answer: "Typically one thread per request using the same servlet instance—keep servlet stateless." },
          ],
        }}
      />
      <C
        id="45"
        number={45}
        title="JSP overview"
        theory={{
          what: "JavaServer Pages mix HTML with scriptlets/tags compiled to servlets.",
          why: "Legacy view tech; modern apps prefer template engines (Thymeleaf) or SPA + REST.",
          how: "EL `${}` and JSTL replace scriptlets; MVC separates concerns.",
          keyPoints: ["XSS risk if you emit user input raw", "JSP in Spring Boot is uncommon vs templates"],
          interviewQuestions: [
            { question: "Why avoid scriptlets?", answer: "Hard to test/maintain; EL + JSTL + MVC give cleaner separation." },
          ],
        }}
      />
    </div>
  );
}

export function JavaEnterprise({ activeConcept: _ }: { activeConcept: string | null }) {
  return (
    <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-6 md:space-y-8">
      <div className="w-full max-w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-800 p-4 text-white sm:p-5 md:p-6">
        <h3 className="mb-2 break-words text-xl font-bold sm:text-2xl md:text-3xl">🚀 Spring & ecosystem</h3>
        <p className="break-words text-emerald-100">Build, Spring core, Boot, REST, JPA, and microservices orientation.</p>
      </div>
      <C
        id="46"
        number={46}
        title="Maven & Gradle"
        theory={{
          what: "Maven: XML POM, lifecycle phases, coordinates (groupId:artifactId:version). Gradle: Kotlin/Groovy DSL, incremental builds.",
          why: "Dependency resolution, plugins, CI reproducibility.",
          how: "BOMs (Spring Boot parent) align versions; wrapper scripts lock tool versions.",
          keyPoints: ["Scopes: compile, test, provided, runtime", "mvn dependency:tree to debug conflicts"],
          interviewQuestions: [
            { question: "Maven lifecycle phases?", answer: "validate, compile, test, package, verify, install, deploy—plugins bind to phases." },
          ],
        }}
      >
        <CodeExample title="Maven coordinates" code={`<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>`} />
      </C>
      <C
        id="47"
        number={47}
        title="Spring Framework (IoC & DI)"
        theory={{
          what: "Inversion of Control container wires beans (objects) via dependency injection—constructor injection preferred.",
          why: "Testability, modularity, cross-cutting concerns (transactions, security) via AOP/proxies.",
          how: "`@Configuration` + `@Bean` or component scanning `@Component`, `@Service`, `@Repository`.",
          keyPoints: ["Bean scopes: singleton vs prototype", "`@Autowired` on constructors in Boot"],
          interviewQuestions: [
            { question: "What is IoC?", answer: "Framework controls object creation and wiring; your code receives dependencies instead of constructing them." },
          ],
        }}
      />
      <C
        accent="emerald"
        id="48"
        number={48}
        title="What is Spring Boot?"
        priority="🔥"
        theory={{
          what: "Opinionated layer on Spring: starters, auto-configuration, embedded server, fat JAR, actuator endpoints.",
          why: "Ship JVM services quickly with less XML/boilerplate.",
          how: "`@SpringBootApplication`, `SpringApplication.run`, properties/yml for tuning.",
          keyPoints: ["Still Spring under the hood", "Auto-config is conditional on classpath"],
          interviewQuestions: [
            {
              question: "Boot vs Spring Framework?",
              answer: "Boot adds starters, auto-configuration, and embedded server defaults; Framework is the core DI/web stack.",
            },
          ],
        }}
      >
        <CodeExample
          title="Main class"
          code={`@SpringBootApplication\npublic class DemoApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(DemoApplication.class, args);\n  }\n}`}
        />
      </C>
      <C
        accent="emerald"
        id="49"
        number={49}
        title="Starters & auto-configuration"
        theory={{
          what: "Starters bundle compatible dependencies; `@ConditionalOnClass` etc. register beans automatically.",
          why: "Avoid version skew; only enable what classpath suggests.",
          how: "Exclude auto-config with `@SpringBootApplication(exclude=...)` or properties.",
          keyPoints: ["spring-boot-starter-test for JUnit/Mockito", "spring.factories / AutoConfiguration.imports (Boot 3)"],
          interviewQuestions: [
            { question: "What is auto-configuration?",
              answer: "Convention-based bean registration triggered when classes and properties match conditions—reducing manual `@Bean` wiring.",
            },
          ],
        }}
      />
      <C
        accent="emerald"
        id="50"
        number={50}
        title="@SpringBootApplication & runtime"
        theory={{
          what: "Combines `@Configuration`, `@EnableAutoConfiguration`, `@ComponentScan` from the package of the main class.",
          why: "Single entry point for component scanning and defaults.",
          how: "Fat JAR + `JarLauncher`; tune `server.port`, graceful shutdown, virtual threads (JDK 21+).",
          keyPoints: ["Place main in root package for scanning", "ConfigurableApplicationContext returned by run()"],
          interviewQuestions: [
            { question: "What does @SpringBootApplication include?",
              answer: "@SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan with defaults.",
            },
          ],
        }}
      />
      <C
        accent="emerald"
        id="51"
        number={51}
        title="REST controllers"
        theory={{
          what: "`@RestController` = `@Controller` + `@ResponseBody`; map HTTP with `@GetMapping` etc.; bind with `@PathVariable`, `@RequestParam`, `@RequestBody`.",
          why: "Standard JSON APIs; validation with `@Valid` + Bean Validation.",
          how: "`ResponseEntity` for status/headers; `@ControllerAdvice` for errors.",
          keyPoints: ["DTOs vs exposing entities", "Idempotent semantics and status codes"],
          interviewQuestions: [
            { question: "@Controller vs @RestController?",
              answer: "@RestController adds @ResponseBody to all methods so return values serialize to the body (e.g. JSON).",
            },
          ],
        }}
      >
        <CodeExample
          title="REST snippet"
          code={`@RestController\n@RequestMapping("/api/items")\nclass ItemApi {\n  @GetMapping("/{id}")\n  ItemDto get(@PathVariable UUID id) { ... }\n}`}
        />
      </C>
      <C
        accent="emerald"
        id="52"
        number={52}
        title="Configuration & profiles"
        theory={{
          what: "`application.yml`, profiles (`dev`, `prod`), `@ConfigurationProperties`, relaxed binding to env vars.",
          why: "12-factor config: different settings per environment without rebuild.",
          how: "`spring.profiles.active`, `SPRING_PROFILES_ACTIVE`, secrets via env or vault.",
          keyPoints: ["@Value vs grouped @ConfigurationProperties", "`spring.config.import` for optional files"],
          interviewQuestions: [
            { question: "How activate a profile?",
              answer: "Set spring.profiles.active in properties/yml or SPRING_PROFILES_ACTIVE in the environment.",
            },
          ],
        }}
      />
      <C
        accent="emerald"
        id="53"
        number={53}
        title="Spring Data JPA basics"
        theory={{
          what: "`JpaRepository` CRUD + query methods; Hibernate as default provider; `@Entity` mapping.",
          why: "Removes boilerplate DAO code; integrates with `@Transactional`.",
          how: "Migrations with Flyway/Liquibase; mind N+1 (`@EntityGraph`, fetch joins).",
          keyPoints: ["ddl-auto validate in prod", "Lazy loading session boundaries"],
          interviewQuestions: [
            { question: "What is a Spring Data repository?",
              answer: "A Spring-generated implementation of an interface extending JpaRepository, providing CRUD and derived queries.",
            },
          ],
        }}
      >
        <CodeExample
          title="Repository"
          code={`public interface BookRepository extends JpaRepository<Book, Long> {\n  List<Book> findByTitleContainingIgnoreCase(String s);\n}`}
        />
      </C>
      <C
        accent="emerald"
        id="54"
        number={54}
        title="Microservices basics"
        theory={{
          what: "Small deployable services, bounded contexts, API gateways, service discovery, config server, resilience patterns (circuit breaker, retries).",
          why: "Independent scaling and teams; operational complexity increases.",
          how: "Spring Cloud ecosystem; containers/Kubernetes; observability (tracing, metrics, logs correlation).",
          keyPoints: ["Saga/outbox for distributed transactions", "Design for failure—timeouts and bulkheads"],
          interviewQuestions: [
            { question: "Monolith vs microservices tradeoff?",
              answer: "Microservices add network, deployment, and consistency challenges but enable independent scaling and team autonomy when boundaries are clear.",
            },
          ],
        }}
      />
    </div>
  );
}
