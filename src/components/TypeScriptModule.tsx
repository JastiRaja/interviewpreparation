import { useState } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

export default function TypeScriptModule() {
  const [activeSection, setActiveSection] = useState("fundamentals");

  const sections = [
    { id: "fundamentals", title: "Type System", icon: "🔰", count: "1-8" },
    { id: "custom", title: "Custom Types", icon: "🧱", count: "9-13" },
    { id: "composition", title: "Type Composition", icon: "🧠", count: "14-19" },
    { id: "generics", title: "Generics", icon: "🏗️", count: "20-23" },
    { id: "utilities", title: "Utility Types", icon: "🧰", count: "24-33" },
    { id: "narrowing", title: "Type Narrowing", icon: "🔐", count: "34-38" },
    { id: "meta", title: "Meta Types", icon: "🧩", count: "39-43" },
    { id: "oop", title: "OOP TS", icon: "🧱", count: "44-48" },
    { id: "modules", title: "Modules", icon: "📦", count: "49-54" },
    { id: "compiler", title: "Compiler", icon: "🛠️", count: "55-59" },
    { id: "interop", title: "JS Interop", icon: "🌉", count: "60-62" },
    { id: "expert", title: "Expert", icon: "🚀", count: "63-66" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "fundamentals":
        return <TypeSystemFundamentals />;
      case "custom":
        return <CustomTypeDefinitions />;
      case "composition":
        return <AdvancedTypeComposition />;
      case "generics":
        return <GenericProgramming />;
      case "utilities":
        return <BuiltInUtilityTypes />;
      case "narrowing":
        return <TypeSafetyNarrowing />;
      case "meta":
        return <MetaProgrammingTypes />;
      case "oop":
        return <OOPTypeScript />;
      case "modules":
        return <ModuleDeclarationSystem />;
      case "compiler":
        return <CompilerConfiguration />;
      case "interop":
        return <JSInterop />;
      case "expert":
        return <ExpertLevelConcepts />;
      default:
        return <TypeSystemFundamentals />;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-2 text-gray-900 break-words">
          TypeScript - Complete Guide
        </h2>
        <p className="text-gray-600 break-words">
          Master all TypeScript concepts - TypeScript-unique features only
        </p>
      </div>

      {/* Section Tabs - Scrollable */}
      <div className="overflow-x-auto w-full">
        <div className="flex gap-2 border-b border-gray-200 min-w-max pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeSection === section.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
              <span className="ml-2 text-xs opacity-75">
                ({section.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 w-full max-w-full overflow-x-hidden">{renderContent()}</div>
    </div>
  );
}

// ========== TYPE SYSTEM FUNDAMENTALS (1-8) ==========
function TypeSystemFundamentals() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🔰 Type System Fundamentals</h3>
        <p className="text-blue-100 break-words">
          Core TypeScript type system concepts
        </p>
      </div>

      <ConceptCard
        number={1}
        title="Static Typing"
        priority="🔥"
        theory={{
          what: "Static typing means types are checked at compile-time, before your code runs. TypeScript analyzes your code and catches type errors during development, not at runtime.",
          why: "Static typing catches errors early, provides better IDE support with autocomplete and refactoring, serves as documentation, and improves code quality. It prevents many runtime errors that would occur in JavaScript.",
          how: "TypeScript's compiler (tsc) analyzes your code and type annotations. It builds a type graph and checks for type mismatches. If types don't match, compilation fails with clear error messages.",
          keyPoints: [
            "Types checked at compile-time, not runtime",
            "Catches errors before code runs",
            "Provides better IDE support",
            "TypeScript compiles to JavaScript (types are erased)",
            "Static typing is optional - you can use any when needed"
          ],
          interviewQuestions: [
            {
              question: "What is static typing and how does it differ from dynamic typing?",
              answer: "Static typing checks types at compile-time before code runs. Dynamic typing (JavaScript) checks types at runtime. TypeScript provides static typing - it analyzes your code during compilation and catches type errors early, while JavaScript only discovers type issues when the code executes."
            },
            {
              question: "Why use static typing?",
              answer: "Static typing catches errors early, provides better IDE support (autocomplete, refactoring), serves as documentation, improves code quality, and prevents many runtime errors. It makes code more maintainable and easier to work with in large codebases."
            }
          ]
        }}
      >
        <CodeExample
          title="Static Typing Example"
          description="TypeScript checks types at compile-time"
          code={`// TypeScript catches this error at compile-time
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10); // ✅ OK
add("5", 10); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'

// In JavaScript, this would only fail at runtime
function addJS(a, b) {
  return a + b;
}
addJS("5", 10); // Returns "510" (string concatenation) - runtime bug!`}
        />
      </ConceptCard>

      <ConceptCard
        number={2}
        title="Type Annotations"
        priority="🔥"
        theory={{
          what: "Type annotations explicitly specify the type of a variable, parameter, or return value. They tell TypeScript what type a value should be.",
          why: "Type annotations make your code explicit and self-documenting. They help TypeScript catch errors and provide better IDE support. While TypeScript can infer types, annotations are useful for clarity and when inference isn't possible.",
          how: "Type annotations use the colon syntax: `variable: Type`. You can annotate variables, function parameters, return types, and object properties.",
          keyPoints: [
            "Syntax: variable: Type",
            "Makes code explicit and self-documenting",
            "Helps catch errors early",
            "Not always needed - TypeScript can infer types",
            "Required for function parameters and return types in strict mode"
          ],
          interviewQuestions: [
            {
              question: "What are type annotations?",
              answer: "Type annotations explicitly specify the type of a variable, parameter, or return value using the colon syntax (variable: Type). They make code explicit, help TypeScript catch errors, and provide better IDE support. While TypeScript can often infer types, annotations are useful for clarity."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Annotations"
          description="Explicitly specify types"
          code={`// Variable annotations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Function parameter and return annotations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Array annotations
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Object annotations
let person: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Type annotations are optional when TypeScript can infer
let inferred = "Hello"; // Type: string (inferred)`}
        />
      </ConceptCard>

      <ConceptCard
        number={3}
        title="Type Inference"
        priority="🔥"
        theory={{
          what: "Type inference is TypeScript's ability to automatically determine the type of a variable based on its value or usage, without explicit type annotations.",
          why: "Type inference reduces boilerplate code while maintaining type safety. It makes TypeScript feel less verbose while still catching type errors. It's especially useful for complex types that would be tedious to write manually.",
          how: "TypeScript uses contextual information to infer types. It looks at the value assigned, how the variable is used, and the context (like function return types). Inference happens during type checking.",
          keyPoints: [
            "TypeScript automatically infers types when possible",
            "Reduces boilerplate code",
            "Still maintains type safety",
            "Inference works for variables, function returns, and more",
            "You can still add explicit annotations for clarity"
          ],
          interviewQuestions: [
            {
              question: "What is type inference?",
              answer: "Type inference is TypeScript's ability to automatically determine the type of a variable based on its value or usage, without explicit type annotations. It reduces boilerplate while maintaining type safety. TypeScript infers types from assigned values, function returns, and usage context."
            },
            {
              question: "When should you use explicit type annotations vs inference?",
              answer: "Use explicit annotations for function parameters and return types (required in strict mode), public APIs, complex types, or when you want to be explicit. Use inference for simple variables, local variables, or when the type is obvious from context."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Inference"
          description="TypeScript automatically infers types"
          code={`// TypeScript infers the type from the value
let message = "Hello"; // Type: string (inferred)
let count = 42; // Type: number (inferred)
let isDone = true; // Type: boolean (inferred)

// Inference from function returns
function getMessage() {
  return "Hello"; // Return type inferred as string
}

// Inference from array literals
let numbers = [1, 2, 3]; // Type: number[] (inferred)

// Inference from object literals
let user = {
  name: "John",
  age: 30
}; // Type: { name: string; age: number } (inferred)

// Inference from usage context
function processNumber(num: number) {
  return num * 2;
}
let value = 10; // Type: number (inferred)
processNumber(value); // TypeScript knows value is number`}
        />
      </ConceptCard>

      <ConceptCard
        number={4}
        title="Type Compatibility (Structural Typing)"
        theory={{
          what: "TypeScript uses structural typing (duck typing) - if two types have the same structure, they're compatible, even if they have different names. This is different from nominal typing where types must have the same name.",
          why: "Structural typing is more flexible and aligns with JavaScript's dynamic nature. It allows objects to be used interchangeably if they have compatible shapes, making TypeScript more practical for JavaScript interop.",
          how: "TypeScript checks if the structure (properties and methods) of types match. If type A has all properties of type B (and possibly more), A is assignable to B. This is called structural subtyping.",
          keyPoints: [
            "TypeScript uses structural typing, not nominal typing",
            "If structures match, types are compatible",
            "More flexible than nominal typing",
            "Allows JavaScript-like flexibility with type safety",
            "Enables duck typing: 'if it walks like a duck, it's a duck'"
          ],
          interviewQuestions: [
            {
              question: "What is structural typing?",
              answer: "Structural typing (duck typing) means types are compatible if they have the same structure, regardless of their names. If type A has all properties of type B, A is assignable to B. This is different from nominal typing where types must have the same name to be compatible."
            },
            {
              question: "How does TypeScript's type compatibility work?",
              answer: "TypeScript uses structural subtyping. If an object has all the required properties of a type (and possibly more), it's compatible with that type. This makes TypeScript flexible and practical for JavaScript interop, as it doesn't require exact type names to match."
            }
          ]
        }}
      >
        <CodeExample
          title="Structural Typing"
          description="Types are compatible if structures match"
          code={`// Two different type names, but compatible structures
interface Point {
  x: number;
  y: number;
}

interface Coordinate {
  x: number;
  y: number;
}

// These are compatible because structures match
let point: Point = { x: 1, y: 2 };
let coord: Coordinate = point; // ✅ OK - structures match

// Extra properties are allowed
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let point3d: Point3D = { x: 1, y: 2, z: 3 };
let point2d: Point = point3d; // ✅ OK - Point3D has all Point properties

// Missing properties cause errors
let incomplete: Point = { x: 1 }; // ❌ Error: Property 'y' is missing`}
        />
      </ConceptCard>

      <ConceptCard
        number={5}
        title="Any vs Unknown"
        priority="🔥"
        theory={{
          what: "`any` disables type checking completely - you can do anything with it. `unknown` is type-safe - you must check the type before using it. `unknown` is the type-safe top type.",
          why: "`any` defeats the purpose of TypeScript and should be avoided. `unknown` provides type safety while still allowing flexibility. Use `unknown` when you don't know the type but want type safety.",
          how: "With `any`, TypeScript skips all type checking. With `unknown`, TypeScript requires you to narrow the type (using type guards) before you can use it. This prevents runtime errors.",
          keyPoints: [
            "any: disables all type checking (avoid!)",
            "unknown: type-safe top type (prefer!)",
            "unknown requires type narrowing before use",
            "Use unknown for values from external sources",
            "any should only be used as a last resort"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between any and unknown?",
              answer: "`any` disables all type checking - you can do anything with it, which defeats TypeScript's purpose. `unknown` is type-safe - you must check/narrow the type before using it. `unknown` is the type-safe top type and should be preferred over `any`."
            },
            {
              question: "When should you use unknown?",
              answer: "Use `unknown` when you receive data from external sources (APIs, user input, JSON.parse) and don't know the type. It forces you to validate and narrow the type before use, preventing runtime errors. It's much safer than `any`."
            }
          ]
        }}
      >
        <CodeExample
          title="Any vs Unknown"
          description="Understanding the difference"
          code={`// any: disables type checking (DANGEROUS!)
let value: any = "hello";
value.foo.bar.baz; // ✅ No error (but will crash at runtime!)
value(); // ✅ No error (but will crash!)
value = 42; // ✅ No error

// unknown: type-safe top type
let value2: unknown = "hello";
value2.foo; // ❌ Error: Object is of type 'unknown'
value2(); // ❌ Error: Cannot invoke an object

// Must narrow the type first
if (typeof value2 === "string") {
  console.log(value2.toUpperCase()); // ✅ OK - narrowed to string
}

// Use unknown for external data
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

let data = parseJSON('{"name": "John"}');
// data.name; // ❌ Error - must check type first
if (typeof data === "object" && data !== null && "name" in data) {
  console.log(data.name); // ✅ OK after type guard
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={6}
        title="Void vs Never"
        theory={{
          what: "`void` represents the absence of a value (functions that don't return anything). `never` represents values that never occur (functions that never return, or impossible types).",
          why: "`void` is for functions that complete but return nothing. `never` is for functions that never complete (throw errors, infinite loops) or for impossible type combinations. They help express different kinds of 'no return' scenarios.",
          how: "`void` is the return type of functions that don't return a value. `never` is used for functions that never return (always throw) or for type narrowing that results in impossible types.",
          keyPoints: [
            "void: function returns nothing (completes normally)",
            "never: function never returns (throws, infinite loop)",
            "never: also used for impossible type combinations",
            "never is the bottom type (nothing is assignable to never)",
            "void is assignable to any, never is not"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between void and never?",
              answer: "`void` represents functions that complete but return nothing. `never` represents functions that never return (always throw errors, infinite loops) or impossible type combinations. `never` is the bottom type - nothing is assignable to it."
            }
          ]
        }}
      >
        <CodeExample
          title="Void vs Never"
          description="Understanding return types"
          code={`// void: function returns nothing
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

// never: function never returns
function throwError(message: string): never {
  throw new Error(message);
  // Code after this is unreachable
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// never for impossible types
type Impossible = string & number; // Type: never (impossible)

function assertNever(value: never): never {
  throw new Error("Unexpected value: " + value);
}

// Exhaustive checking
type Status = "pending" | "approved" | "rejected";
function handleStatus(status: Status) {
  switch (status) {
    case "pending": return "Wait";
    case "approved": return "OK";
    case "rejected": return "No";
    default:
      assertNever(status); // Ensures all cases handled
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={7}
        title="Literal Types"
        theory={{
          what: "Literal types are types that represent exact values, not just types. They're created from string, number, or boolean literals.",
          why: "Literal types allow you to specify exact values, enabling precise type checking. They're useful for creating discriminated unions, configuration objects, and ensuring only specific values are allowed.",
          how: "TypeScript infers literal types from const declarations. You can also explicitly create literal types. They're often combined with union types to create specific value sets.",
          keyPoints: [
            "Literal types represent exact values",
            "Created from string, number, or boolean literals",
            "const declarations create literal types",
            "Often combined with union types",
            "Useful for discriminated unions and configuration"
          ],
          interviewQuestions: [
            {
              question: "What are literal types?",
              answer: "Literal types represent exact values, not just types. For example, the literal type 'hello' can only be the string 'hello', not any string. They're created from const declarations or explicitly, and are often combined with union types to create specific value sets."
            }
          ]
        }}
      >
        <CodeExample
          title="Literal Types"
          description="Exact value types"
          code={`// String literal types
let direction: "up" | "down" | "left" | "right" = "up";
// direction = "diagonal"; // ❌ Error: not assignable

// Number literal types
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 4;

// Boolean literal types
let isTrue: true = true; // Can only be true

// const creates literal types
const name = "John"; // Type: "John" (not string)
const age = 30; // Type: 30 (not number)

// Combining with union types
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";

// Literal types in objects
interface Config {
  theme: "light" | "dark";
  language: "en" | "es" | "fr";
}

let config: Config = {
  theme: "dark",
  language: "en"
};`}
        />
      </ConceptCard>

      <ConceptCard
        number={8}
        title="Type Compatibility"
        theory={{
          what: "Type compatibility determines when one type can be used in place of another. TypeScript uses structural typing - types are compatible if their structures match.",
          why: "Understanding type compatibility is crucial for working with TypeScript. It explains why some assignments work and others don't, and helps you design better type systems.",
          how: "TypeScript checks if the source type has all required properties of the target type. If it does (and possibly has more), it's assignable. Function types are compatible if parameters are contravariant and return types are covariant.",
          keyPoints: [
            "Structural typing: structures must match",
            "Source type must have all target type properties",
            "Extra properties are allowed (width subtyping)",
            "Function parameters are contravariant",
            "Return types are covariant"
          ],
          interviewQuestions: [
            {
              question: "How does TypeScript determine type compatibility?",
              answer: "TypeScript uses structural typing. A type A is assignable to type B if A has all the required properties of B (and possibly more). For functions, parameters are checked contravariantly (more specific is assignable to less specific) and return types covariantly (less specific is assignable to more specific)."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Compatibility"
          description="When types are compatible"
          code={`// Structural compatibility
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let animal: Animal = { name: "Generic" };
let dog: Dog = { name: "Buddy", breed: "Labrador" };

animal = dog; // ✅ OK - Dog has all Animal properties
// dog = animal; // ❌ Error - Animal missing 'breed'

// Function compatibility
type Handler = (x: number) => void;
let handler1: Handler = (x: number) => { };
let handler2: Handler = (x: number | string) => { }; // ✅ OK - more specific param
let handler3: Handler = (x: string) => { }; // ❌ Error - incompatible param type`}
        />
      </ConceptCard>
    </div>
  );
}

// Continue with other sections... (I'll add more sections)
// Due to length, I'll create the structure and add key concepts

function CustomTypeDefinitions() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🧱 Custom Type Definitions</h3>
        <p className="text-green-100 break-words">Creating your own types</p>
      </div>

      <ConceptCard
        number={9}
        title="Type Aliases"
        priority="🔥"
        theory={{
          what: "Type aliases create a new name for a type. They're similar to interfaces but can represent any type, not just object shapes.",
          why: "Type aliases make code more readable by giving meaningful names to complex types. They're reusable and help avoid repetition. They can represent unions, intersections, primitives, and more.",
          how: "Use the `type` keyword followed by a name and the type definition. Type aliases are computed once and can't be extended or merged like interfaces.",
          keyPoints: [
            "Created with `type` keyword",
            "Can represent any type (not just objects)",
            "Useful for unions, intersections, primitives",
            "Cannot be extended or merged",
            "Computed once at declaration time"
          ],
          interviewQuestions: [
            {
              question: "What are type aliases?",
              answer: "Type aliases create a new name for a type using the `type` keyword. They can represent any type (unions, intersections, primitives, objects) and make code more readable. Unlike interfaces, they can't be extended or merged."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Aliases"
          description="Create custom type names"
          code={`// Simple type alias
type ID = number | string;
type Status = "pending" | "approved" | "rejected";

// Object type alias
type User = {
  id: ID;
  name: string;
  status: Status;
};

// Function type alias
type Handler = (event: MouseEvent) => void;

// Complex type alias
type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Usage
let userId: ID = "123";
let user: User = { id: 1, name: "John", status: "pending" };
let result: Result<User> = { success: true, data: user };`}
        />
      </ConceptCard>

      <ConceptCard
        number={10}
        title="Interfaces"
        priority="🔥"
        theory={{
          what: "Interfaces define the shape of objects. They describe what properties an object should have and their types.",
          why: "Interfaces provide a way to define contracts for objects. They're essential for type-checking object shapes, especially in React for props. They can be extended and merged, making them flexible.",
          how: "Use the `interface` keyword followed by a name and object shape. Interfaces can extend other interfaces, be implemented by classes, and can be merged (declaration merging).",
          keyPoints: [
            "Created with `interface` keyword",
            "Define object shapes",
            "Can be extended and merged",
            "Can be implemented by classes",
            "Open-ended (can be augmented)"
          ],
          interviewQuestions: [
            {
              question: "What are interfaces?",
              answer: "Interfaces define the shape of objects in TypeScript. They describe what properties an object should have and their types. Interfaces can be extended, merged (declaration merging), and implemented by classes. They're essential for type-checking object structures."
            }
          ]
        }}
      >
        <CodeExample
          title="Interfaces"
          description="Define object shapes"
          code={`// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

// Implementing in class
class UserService implements User {
  id: number;
  name: string;
  email: string;
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// Declaration merging
interface Config {
  apiUrl: string;
}
interface Config {
  timeout: number;
}
// Result: { apiUrl: string; timeout: number }`}
        />
      </ConceptCard>

      <ConceptCard
        number={11}
        title="Interface vs Type"
        priority="🔥"
        theory={{
          what: "Interfaces and type aliases are similar but have key differences. Interfaces are for object shapes and can be extended/merged. Type aliases can represent any type and are computed once.",
          why: "Understanding when to use interfaces vs types is important. Interfaces are better for object shapes that might be extended. Types are better for unions, intersections, and computed types.",
          how: "Use interfaces for object shapes that might be extended or merged. Use types for unions, intersections, primitives, or when you need computed types. In practice, they're often interchangeable for object shapes.",
          keyPoints: [
            "Interfaces: object shapes, can extend/merge",
            "Types: any type, computed once, can't extend",
            "Interfaces: better for public APIs",
            "Types: better for unions/intersections",
            "For object shapes, often interchangeable"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between interface and type?",
              answer: "Interfaces are for object shapes and can be extended/merged (declaration merging). Types can represent any type (unions, intersections, primitives) and are computed once. For object shapes, they're often interchangeable, but interfaces are better when you need extension or merging."
            }
          ]
        }}
      >
        <CodeExample
          title="Interface vs Type"
          description="When to use which"
          code={`// Interface - for object shapes
interface User {
  name: string;
}
interface Admin extends User {
  role: string;
}

// Type - for unions, intersections, etc.
type ID = string | number;
type Status = "pending" | "approved";

// Interface can be merged
interface Config {
  apiUrl: string;
}
interface Config {
  timeout: number;
} // Merged into one

// Type cannot be merged
type Config2 = { apiUrl: string };
// type Config2 = { timeout: number }; // ❌ Error: Duplicate identifier

// Type for computed types
type Keys = keyof User; // "name"
type UserName = User["name"]; // string

// Interface for extending
interface ExtendedUser extends User {
  age: number;
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={12}
        title="Readonly Properties"
        theory={{
          what: "Readonly properties cannot be modified after the object is created. They provide immutability for specific properties.",
          why: "Readonly properties prevent accidental mutations, making code safer. They're useful for configuration objects, constants, and ensuring data integrity.",
          how: "Use the `readonly` modifier before a property name. Readonly properties can be set during object creation but cannot be reassigned afterward.",
          keyPoints: [
            "Use `readonly` modifier",
            "Can be set during creation",
            "Cannot be reassigned after creation",
            "Provides immutability",
            "Useful for config objects"
          ],
          interviewQuestions: [
            {
              question: "What are readonly properties?",
              answer: "Readonly properties cannot be modified after the object is created. They can be set during initialization but cannot be reassigned. They provide immutability and prevent accidental mutations, making code safer."
            }
          ]
        }}
      >
        <CodeExample
          title="Readonly Properties"
          description="Immutable properties"
          code={`interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
  retries: number; // Not readonly
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

// config.apiUrl = "new-url"; // ❌ Error: Cannot assign to 'apiUrl'
config.retries = 5; // ✅ OK

// Readonly modifier
type Point = {
  readonly x: number;
  readonly y: number;
};

let point: Point = { x: 1, y: 2 };
// point.x = 3; // ❌ Error: Cannot assign to 'x'`}
        />
      </ConceptCard>

      <ConceptCard
        number={13}
        title="Optional Properties (?)"
        priority="🔥"
        theory={{
          what: "Optional properties may or may not exist on an object. They're marked with a `?` after the property name.",
          why: "Optional properties make interfaces flexible, allowing objects to omit certain properties. They're essential for partial data, optional configuration, and gradual typing.",
          how: "Add a `?` after the property name. Optional properties have type `T | undefined`. You can check for their existence before using them.",
          keyPoints: [
            "Mark with `?` after property name",
            "Type is `T | undefined`",
            "Can be omitted when creating objects",
            "Must check existence before use",
            "Essential for flexible APIs"
          ],
          interviewQuestions: [
            {
              question: "What are optional properties?",
              answer: "Optional properties may or may not exist on an object, marked with `?` after the property name. Their type is `T | undefined`. They make interfaces flexible, allowing objects to omit certain properties. You should check for their existence before using them."
            }
          ]
        }}
      >
        <CodeExample
          title="Optional Properties"
          description="Properties that may not exist"
          code={`interface User {
  id: number;
  name: string;
  email?: string; // Optional
  age?: number;   // Optional
}

// All valid:
const user1: User = { id: 1, name: "John" };
const user2: User = { id: 2, name: "Jane", email: "jane@example.com" };
const user3: User = { id: 3, name: "Bob", email: "bob@example.com", age: 30 };

// Using optional properties
function getUserEmail(user: User): string {
  // Must check if email exists
  if (user.email) {
    return user.email;
  }
  return "No email";
}

// Optional chaining
const email = user.email?.toUpperCase(); // Safe access`}
        />
      </ConceptCard>
    </div>
  );
}

function AdvancedTypeComposition() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🧠 Advanced Type Composition</h3>
        <p className="text-purple-100 break-words">Combining types in powerful ways</p>
      </div>

      <ConceptCard
        number={14}
        title="Union Types (|)"
        priority="🔥"
        theory={{
          what: "Union types represent a value that can be one of several types. They're created using the pipe operator (|).",
          why: "Union types provide flexibility by allowing values to be one of multiple types. They're essential for handling different data shapes, optional values, and creating type-safe APIs.",
          how: "Use the `|` operator between types. A union type `A | B` means the value can be type A or type B. TypeScript will only allow operations that work on all types in the union.",
          keyPoints: [
            "Created with `|` operator",
            "Value can be any of the unioned types",
            "TypeScript narrows based on usage",
            "Common for optional values and variants",
            "Must handle all cases in union"
          ],
          interviewQuestions: [
            {
              question: "What are union types?",
              answer: "Union types represent a value that can be one of several types, created with the `|` operator. For example, `string | number` means the value can be a string or a number. TypeScript will only allow operations that work on all types in the union."
            }
          ]
        }}
      >
        <CodeExample
          title="Union Types"
          description="Values that can be multiple types"
          code={`// Basic union
type ID = string | number;
let userId: ID = "123";
userId = 456; // Also valid

// Union with literals
type Status = "pending" | "approved" | "rejected";
let status: Status = "pending";

// Union with different object shapes
type Result = 
  | { success: true; data: string }
  | { success: false; error: string };

function handleResult(result: Result) {
  if (result.success) {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.log(result.error); // TypeScript knows error exists
  }
}

// Union with null/undefined
type MaybeString = string | null | undefined;`}
        />
      </ConceptCard>

      <ConceptCard
        number={15}
        title="Intersection Types (&)"
        priority="🔥"
        theory={{
          what: "Intersection types combine multiple types into one. A value of an intersection type must satisfy all the types in the intersection.",
          why: "Intersection types allow you to combine types, creating new types that have all properties from the combined types. They're useful for mixins, extending types, and combining interfaces.",
          how: "Use the `&` operator between types. An intersection type `A & B` means the value must be both type A and type B (have all properties from both).",
          keyPoints: [
            "Created with `&` operator",
            "Value must satisfy ALL types",
            "Combines properties from all types",
            "Useful for mixins and extending",
            "Opposite of union types"
          ],
          interviewQuestions: [
            {
              question: "What are intersection types?",
              answer: "Intersection types combine multiple types using the `&` operator. A value of type `A & B` must satisfy both A and B (have all properties from both). They're useful for combining types, mixins, and extending functionality."
            }
          ]
        }}
      >
        <CodeExample
          title="Intersection Types"
          description="Combining multiple types"
          code={`// Basic intersection
interface Person {
  name: string;
}
interface Employee {
  employeeId: number;
}
type EmployeePerson = Person & Employee;

let emp: EmployeePerson = {
  name: "John",
  employeeId: 123
};

// Intersection with unions
type A = { a: string } | { a: number };
type B = { b: boolean };
type C = A & B; // { a: string | number; b: boolean }

// Mixin pattern
type Timestamped = { createdAt: Date };
type Named = { name: string };
type TimestampedNamed = Timestamped & Named;

let item: TimestampedNamed = {
  name: "Item",
  createdAt: new Date()
};`}
        />
      </ConceptCard>

      <ConceptCard
        number={16}
        title="Discriminated Unions"
        priority="🔥"
        theory={{
          what: "Discriminated unions are union types with a common property (discriminant) that TypeScript can use to narrow the type. They enable exhaustive type checking.",
          why: "Discriminated unions provide type-safe handling of different data shapes. The discriminant property allows TypeScript to narrow types automatically, enabling exhaustive checking and preventing bugs.",
          how: "Create a union where each member has a common literal property (the discriminant). TypeScript uses this property to narrow the type in switch statements or if conditions.",
          keyPoints: [
            "Union with common literal property",
            "Discriminant enables type narrowing",
            "Enables exhaustive checking",
            "Prevents handling wrong cases",
            "Common pattern for state machines"
          ],
          interviewQuestions: [
            {
              question: "What are discriminated unions?",
              answer: "Discriminated unions are union types where each member has a common literal property (discriminant). TypeScript uses this property to narrow types automatically. They enable exhaustive type checking and are commonly used for state machines and different data shapes."
            }
          ]
        }}
      >
        <CodeExample
          title="Discriminated Unions"
          description="Type-safe unions with discriminants"
          code={`// Discriminated union
type Result<T> =
  | { type: "success"; data: T }
  | { type: "error"; message: string };

function handleResult<T>(result: Result<T>) {
  switch (result.type) {
    case "success":
      console.log(result.data); // TypeScript knows data exists
      break;
    case "error":
      console.log(result.message); // TypeScript knows message exists
      break;
  }
}

// State machine example
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function handleState(state: State) {
  switch (state.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return state.data; // TypeScript knows data exists
    case "error":
      return state.error.message; // TypeScript knows error exists
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={17}
        title="Index Signatures"
        theory={{
          what: "Index signatures allow you to define types for properties that aren't explicitly named. They enable dynamic property access with type safety.",
          why: "Index signatures are useful for objects with dynamic keys, dictionaries, maps, and when you don't know all property names at compile time. They provide type safety for dynamic access.",
          how: "Use `[key: KeyType]: ValueType` syntax. The key type is usually `string` or `number`. You can combine index signatures with explicit properties.",
          keyPoints: [
            "Syntax: [key: KeyType]: ValueType",
            "Allows dynamic property access",
            "Key type usually string or number",
            "Can combine with explicit properties",
            "Useful for dictionaries and maps"
          ],
          interviewQuestions: [
            {
              question: "What are index signatures?",
              answer: "Index signatures allow you to define types for properties that aren't explicitly named, using `[key: KeyType]: ValueType` syntax. They enable dynamic property access with type safety, useful for dictionaries, maps, and objects with unknown property names."
            }
          ]
        }}
      >
        <CodeExample
          title="Index Signatures"
          description="Dynamic property access"
          code={`// String index signature
interface StringDictionary {
  [key: string]: string;
}

let dict: StringDictionary = {
  name: "John",
  city: "NYC"
};
dict["age"] = "30"; // ✅ OK

// Number index signature
interface NumberArray {
  [index: number]: string;
}

let arr: NumberArray = ["a", "b", "c"];
arr[0]; // ✅ OK

// Combined with explicit properties
interface User {
  name: string; // Explicit
  [key: string]: string | number; // Index signature
}

let user: User = {
  name: "John",
  age: 30, // Dynamic property
  city: "NYC"
};`}
        />
      </ConceptCard>

      <ConceptCard
        number={18}
        title="Mapped Types"
        theory={{
          what: "Mapped types create new types by transforming properties of existing types. They iterate over properties and apply transformations.",
          why: "Mapped types enable powerful type transformations without manual repetition. They're used to create utility types, make properties optional/readonly, and transform types systematically.",
          how: "Use `{ [K in keyof T]: Transformation }` syntax. TypeScript iterates over each property key and applies the transformation. Common patterns include making properties optional, readonly, or nullable.",
          keyPoints: [
            "Syntax: { [K in keyof T]: Transformation }",
            "Iterates over property keys",
            "Applies transformation to each property",
            "Used in utility types (Partial, Readonly, etc.)",
            "Enables powerful type transformations"
          ],
          interviewQuestions: [
            {
              question: "What are mapped types?",
              answer: "Mapped types create new types by transforming properties of existing types. They use `{ [K in keyof T]: Transformation }` syntax to iterate over properties and apply transformations. They're used in utility types like Partial and Readonly."
            }
          ]
        }}
      >
        <CodeExample
          title="Mapped Types"
          description="Transforming types systematically"
          code={`// Make all properties optional
type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  age: number;
}
type OptionalUser = Optional<User>; // { name?: string; age?: number }

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Custom transformation
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Config {
  port: number;
  host: string;
}
type StringConfig = Stringify<Config>; // { port: string; host: string }`}
        />
      </ConceptCard>

      <ConceptCard
        number={19}
        title="Template Literal Types"
        theory={{
          what: "Template literal types are types built from string literal types using template literal syntax. They enable string manipulation at the type level.",
          why: "Template literal types enable powerful string type manipulation, useful for creating type-safe APIs, route types, CSS property types, and string-based type transformations.",
          how: "Use template literal syntax with type parameters. TypeScript can concatenate, transform, and manipulate string literal types, creating new literal types from existing ones.",
          keyPoints: [
            "Built from string literal types",
            "Use template literal syntax",
            "Enable string manipulation at type level",
            "Useful for type-safe APIs and routes",
            "Can combine with unions and conditionals"
          ],
          interviewQuestions: [
            {
              question: "What are template literal types?",
              answer: "Template literal types are types built from string literal types using template literal syntax. They enable string manipulation at the type level, useful for creating type-safe APIs, route types, and string-based transformations."
            }
          ]
        }}
      >
        <CodeExample
          title="Template Literal Types"
          description="String manipulation at type level"
          code={`// Basic template literal type
type Greeting = \`Hello, \${string}!\`;
let greeting: Greeting = "Hello, World!";

// With union types
type EventName = "click" | "scroll" | "mousemove";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// Result: "onClick" | "onScroll" | "onMouseMove"

// Route types
type Route = "/" | "/about" | "/contact";
type ApiRoute = \`/api\${Route}\`;
// Result: "/api/" | "/api/about" | "/api/contact"

// CSS property types
type CSSValue = "px" | "em" | "rem";
type Width = \`\${number}\${CSSValue}\`;
let width: Width = "100px"; // ✅ OK
// let width2: Width = "100"; // ❌ Error`}
        />
      </ConceptCard>
    </div>
  );
}

function GenericProgramming() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🏗️ Generic Programming</h3>
        <p className="text-yellow-100 break-words">Reusable type-safe code</p>
      </div>

      <ConceptCard
        number={20}
        title="Generics"
        priority="🔥"
        theory={{
          what: "Generics allow you to create reusable components that work with multiple types. They provide type variables that can be used to create type-safe, reusable code.",
          why: "Generics enable code reuse while maintaining type safety. Instead of using `any` or creating multiple versions of the same function, generics let you write one implementation that works with many types.",
          how: "Use angle brackets `<T>` to declare type parameters. The type parameter can be used like a type throughout the function or class. When you call it, you specify the actual type.",
          keyPoints: [
            "Declared with angle brackets <T>",
            "Type parameters act as placeholders",
            "Maintains type safety",
            "Enables code reuse",
            "Common names: T, U, V or descriptive names"
          ],
          interviewQuestions: [
            {
              question: "What are generics?",
              answer: "Generics allow you to create reusable components that work with multiple types. They use type parameters (like `<T>`) as placeholders that get replaced with actual types when used. They enable code reuse while maintaining type safety."
            }
          ]
        }}
      >
        <CodeExample
          title="Generics"
          description="Reusable type-safe code"
          code={`// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);
let output3 = identity("hello"); // Type inferred

// Generic interface
interface Box<T> {
  value: T;
}

let numberBox: Box<number> = { value: 42 };
let stringBox: Box<string> = { value: "hello" };

// Generic class
class Container<T> {
  private items: T[] = [];
  
  add(item: T) {
    this.items.push(item);
  }
  
  get(index: number): T {
    return this.items[index];
  }
}

let numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);`}
        />
      </ConceptCard>

      <ConceptCard
        number={21}
        title="Generic Constraints"
        priority="🔥"
        theory={{
          what: "Generic constraints limit the types that can be used with a generic. They ensure the type parameter has certain properties or extends certain types.",
          why: "Constraints allow you to use properties or methods of the type parameter safely. Without constraints, you can only use properties common to all types. Constraints enable more specific operations.",
          how: "Use `extends` keyword to constrain type parameters. `T extends U` means T must be assignable to U. You can then safely use properties from U on values of type T.",
          keyPoints: [
            "Use `extends` keyword",
            "Limits possible type arguments",
            "Enables safe property access",
            "Can constrain to interfaces, types, or unions",
            "Multiple constraints with intersection"
          ],
          interviewQuestions: [
            {
              question: "What are generic constraints?",
              answer: "Generic constraints limit the types that can be used with a generic using the `extends` keyword. `T extends U` means T must be assignable to U, allowing you to safely use properties from U on values of type T."
            }
          ]
        }}
      >
        <CodeExample
          title="Generic Constraints"
          description="Limiting generic types"
          code={`// Constraint to interface
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // ✅ OK - T has length
  return arg;
}

logLength("hello"); // ✅ OK - string has length
logLength([1, 2, 3]); // ✅ OK - array has length
// logLength(42); // ❌ Error - number has no length

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user = { name: "John", age: 30 };
getProperty(user, "name"); // ✅ OK
// getProperty(user, "email"); // ❌ Error - not a key

// Multiple constraints
function combine<T extends string, U extends number>(a: T, b: U): string {
  return a + b.toString();
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={22}
        title="Default Generic Types"
        theory={{
          what: "Default generic types allow you to specify a default type for a generic parameter. If no type is provided, the default is used.",
          why: "Default types make generics more convenient to use. They reduce boilerplate when the default type is commonly used, while still allowing customization when needed.",
          how: "Use `=` to assign a default type: `<T = DefaultType>`. When you use the generic without specifying a type argument, the default is used.",
          keyPoints: [
            "Syntax: <T = DefaultType>",
            "Reduces boilerplate",
            "Still allows customization",
            "Useful for optional generics",
            "Common in utility types"
          ],
          interviewQuestions: [
            {
              question: "What are default generic types?",
              answer: "Default generic types allow you to specify a default type for a generic parameter using `=` syntax. If no type argument is provided, the default is used, reducing boilerplate while still allowing customization."
            }
          ]
        }}
      >
        <CodeExample
          title="Default Generic Types"
          description="Default type arguments"
          code={`// Default type parameter
interface Container<T = string> {
  value: T;
}

let container1: Container = { value: "hello" }; // Uses default (string)
let container2: Container<number> = { value: 42 }; // Override default

// Multiple defaults
function createArray<T = string, U = number>(
  item: T,
  count: U
): T[] {
  return Array(Number(count)).fill(item);
}

let arr1 = createArray("hello", 3); // T=string, U=number (defaults)
let arr2 = createArray<number, number>(42, 5); // Explicit types`}
        />
      </ConceptCard>

      <ConceptCard
        number={23}
        title="Generic Utility Patterns"
        theory={{
          what: "Common patterns for using generics effectively, including conditional types, mapped types with generics, and recursive types.",
          why: "Understanding these patterns enables you to create powerful, reusable type utilities. They're the foundation of many TypeScript utility types and advanced type manipulations.",
          how: "Combine generics with conditional types, mapped types, and recursive patterns. Use type inference and constraints to create flexible, type-safe utilities.",
          keyPoints: [
            "Combine with conditional types",
            "Use with mapped types",
            "Recursive generic types",
            "Type inference in generics",
            "Common in utility type libraries"
          ],
          interviewQuestions: [
            {
              question: "What are common generic patterns?",
              answer: "Common patterns include combining generics with conditional types for type transformations, using mapped types with generics for property manipulation, and recursive generic types for complex data structures. These patterns enable powerful type utilities."
            }
          ]
        }}
      >
        <CodeExample
          title="Generic Utility Patterns"
          description="Advanced generic patterns"
          code={`// Conditional generic type
type NonNullable<T> = T extends null | undefined ? never : T;

// Generic mapped type
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Recursive generic
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Generic with inference
function inferReturn<T extends () => any>(): ReturnType<T> {
  // ...
}

// Generic utility
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};`}
        />
      </ConceptCard>
    </div>
  );
}

function BuiltInUtilityTypes() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🧰 Built-in Utility Types</h3>
        <p className="text-cyan-100 break-words">TypeScript's powerful utility types</p>
      </div>

      <ConceptCard
        number={24}
        title="Partial"
        priority="🔥"
        theory={{
          what: "Partial<T> makes all properties of T optional. It's useful for update operations where you only need to change some properties.",
          why: "Partial enables type-safe partial updates. Instead of making properties optional manually, Partial does it systematically for all properties.",
          how: "Partial is a mapped type that adds `?` to all properties: `{ [K in keyof T]?: T[K] }`.",
          keyPoints: [
            "Makes all properties optional",
            "Useful for update operations",
            "Built-in utility type",
            "Type-safe partial objects",
            "Common in CRUD operations"
          ],
          interviewQuestions: [
            {
              question: "What is Partial<T>?",
              answer: "Partial<T> is a utility type that makes all properties of T optional. It's useful for update operations where you only need to change some properties. It's implemented as a mapped type that adds `?` to all properties."
            }
          ]
        }}
      >
        <CodeExample
          title="Partial"
          description="Make all properties optional"
          code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;
// Result: { id?: number; name?: string; email?: string }

function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
  // ...
}

updateUser(1, { name: "John" }); // ✅ OK
updateUser(1, { email: "john@example.com" }); // ✅ OK
updateUser(1, { name: "John", email: "john@example.com" }); // ✅ OK`}
        />
      </ConceptCard>

      <ConceptCard
        number={25}
        title="Required"
        theory={{
          what: "Required<T> makes all properties of T required (removes optional modifiers). Opposite of Partial.",
          why: "Required ensures all properties must be provided, useful when you need complete objects or want to enforce all properties.",
          how: "Required removes `?` from all properties: `{ [K in keyof T]-?: T[K] }`.",
          keyPoints: [
            "Makes all properties required",
            "Removes optional modifiers",
            "Opposite of Partial",
            "Useful for complete objects",
            "Uses `-?` to remove optional"
          ],
          interviewQuestions: [
            {
              question: "What is Required<T>?",
              answer: "Required<T> is a utility type that makes all properties of T required by removing optional modifiers. It's the opposite of Partial and ensures all properties must be provided."
            }
          ]
        }}
      >
        <CodeExample
          title="Required"
          description="Make all properties required"
          code={`interface Config {
  apiUrl?: string;
  timeout?: number;
}

// Required makes all properties required
type RequiredConfig = Required<Config>;
// Result: { apiUrl: string; timeout: number }

function initialize(config: RequiredConfig) {
  // All properties guaranteed to exist
  console.log(config.apiUrl);
  console.log(config.timeout);
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={26}
        title="Readonly"
        theory={{
          what: "Readonly<T> makes all properties of T readonly. Prevents mutation of object properties.",
          why: "Readonly provides immutability at the type level. It prevents accidental mutations and makes code safer, especially for configuration objects.",
          how: "Readonly adds `readonly` modifier to all properties: `{ readonly [K in keyof T]: T[K] }`.",
          keyPoints: [
            "Makes all properties readonly",
            "Prevents mutation",
            "Provides immutability",
            "Shallow readonly (not deep)",
            "Useful for config objects"
          ],
          interviewQuestions: [
            {
              question: "What is Readonly<T>?",
              answer: "Readonly<T> is a utility type that makes all properties of T readonly, preventing mutation. It provides immutability at the type level, though it's shallow (nested objects aren't readonly)."
            }
          ]
        }}
      >
        <CodeExample
          title="Readonly"
          description="Make all properties readonly"
          code={`interface User {
  name: string;
  age: number;
}

// Readonly makes all properties readonly
type ReadonlyUser = Readonly<User>;
// Result: { readonly name: string; readonly age: number }

let user: ReadonlyUser = { name: "John", age: 30 };
// user.name = "Jane"; // ❌ Error: Cannot assign to 'name'`}
        />
      </ConceptCard>

      <ConceptCard
        number={27}
        title="Pick"
        priority="🔥"
        theory={{
          what: "Pick<T, K> creates a type with only selected properties from T. K must be a subset of keys of T.",
          why: "Pick enables you to create new types from existing ones by selecting specific properties. It's useful for creating focused types and API responses.",
          how: "Pick uses a mapped type over the selected keys: `{ [P in K]: T[P] }` where K extends keyof T.",
          keyPoints: [
            "Selects specific properties",
            "K must be subset of keyof T",
            "Creates focused types",
            "Useful for API responses",
            "Common utility type"
          ],
          interviewQuestions: [
            {
              question: "What is Pick<T, K>?",
              answer: "Pick<T, K> is a utility type that creates a new type with only the selected properties from T. K must be a subset of keys of T. It's useful for creating focused types from larger interfaces."
            }
          ]
        }}
      >
        <CodeExample
          title="Pick"
          description="Select specific properties"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick only name and email
type PublicUser = Pick<User, "name" | "email">;
// Result: { name: string; email: string }

function getPublicProfile(user: User): PublicUser {
  return {
    name: user.name,
    email: user.email
    // password excluded
  };
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={28}
        title="Omit"
        priority="🔥"
        theory={{
          what: "Omit<T, K> creates a type by removing specified properties from T. Opposite of Pick.",
          why: "Omit is useful for creating types that exclude certain properties, like removing sensitive data or creating update types.",
          how: "Omit uses Pick with Exclude: `Pick<T, Exclude<keyof T, K>>`.",
          keyPoints: [
            "Removes specified properties",
            "Opposite of Pick",
            "Useful for excluding properties",
            "Common for update types",
            "Removes sensitive data"
          ],
          interviewQuestions: [
            {
              question: "What is Omit<T, K>?",
              answer: "Omit<T, K> is a utility type that creates a new type by removing specified properties from T. It's the opposite of Pick and is useful for excluding properties, like removing sensitive data or creating update types."
            }
          ]
        }}
      >
        <CodeExample
          title="Omit"
          description="Remove specific properties"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Omit password
type UserWithoutPassword = Omit<User, "password">;
// Result: { id: number; name: string; email: string }

// Omit multiple properties
type CreateUser = Omit<User, "id" | "password">;
// Result: { name: string; email: string }`}
        />
      </ConceptCard>

      <ConceptCard
        number={29}
        title="Record"
        theory={{
          what: "Record<K, T> creates an object type with keys of type K and values of type T. Useful for dictionaries and maps.",
          why: "Record provides a clean way to type objects with known key and value types. It's more explicit than index signatures for objects with specific key/value types.",
          how: "Record is defined as `{ [P in K]: T }` where K must be a string, number, or symbol union.",
          keyPoints: [
            "Creates object type with specific keys/values",
            "K is key type, T is value type",
            "More explicit than index signatures",
            "Useful for dictionaries",
            "Common for configuration objects"
          ],
          interviewQuestions: [
            {
              question: "What is Record<K, T>?",
              answer: "Record<K, T> is a utility type that creates an object type with keys of type K and values of type T. It's useful for dictionaries, maps, and objects with known key/value types. It's more explicit than index signatures."
            }
          ]
        }}
      >
        <CodeExample
          title="Record"
          description="Create object types"
          code={`// Record with string keys
type UserRoles = Record<string, boolean>;
let roles: UserRoles = {
  admin: true,
  user: false
};

// Record with specific keys
type Status = "pending" | "approved" | "rejected";
type StatusConfig = Record<Status, string>;
let config: StatusConfig = {
  pending: "Wait",
  approved: "OK",
  rejected: "No"
};

// Record for API responses
type ApiResponse = Record<string, any>;`}
        />
      </ConceptCard>

      <ConceptCard
        number={30}
        title="Exclude / Extract"
        theory={{
          what: "Exclude<T, U> removes types from T that are assignable to U. Extract<T, U> keeps only types from T that are assignable to U.",
          why: "These utilities enable filtering union types. Exclude removes unwanted types, Extract keeps desired types. Useful for type manipulation.",
          how: "Exclude uses conditional types: `T extends U ? never : T`. Extract: `T extends U ? T : never`.",
          keyPoints: [
            "Exclude: removes types from union",
            "Extract: keeps types from union",
            "Useful for union filtering",
            "Based on conditional types",
            "Common in type utilities"
          ],
          interviewQuestions: [
            {
              question: "What are Exclude and Extract?",
              answer: "Exclude<T, U> removes types from T that are assignable to U. Extract<T, U> keeps only types from T that are assignable to U. They're useful for filtering union types."
            }
          ]
        }}
      >
        <CodeExample
          title="Exclude / Extract"
          description="Filter union types"
          code={`type AllStatus = "pending" | "approved" | "rejected" | "cancelled";

// Exclude removes types
type ActiveStatus = Exclude<AllStatus, "cancelled">;
// Result: "pending" | "approved" | "rejected"

// Extract keeps only matching types
type PositiveStatus = Extract<AllStatus, "approved" | "pending">;
// Result: "approved" | "pending"

// Remove null/undefined
type NonNullable<T> = Exclude<T, null | undefined>;`}
        />
      </ConceptCard>

      <ConceptCard
        number={31}
        title="NonNullable"
        theory={{
          what: "NonNullable<T> removes null and undefined from type T. Creates a type that cannot be null or undefined.",
          why: "NonNullable is useful for ensuring values are defined, especially after type narrowing or when working with optional values.",
          how: "NonNullable is defined as `Exclude<T, null | undefined>`.",
          keyPoints: [
            "Removes null and undefined",
            "Ensures value is defined",
            "Useful after type narrowing",
            "Common utility type",
            "Based on Exclude"
          ],
          interviewQuestions: [
            {
              question: "What is NonNullable<T>?",
              answer: "NonNullable<T> is a utility type that removes null and undefined from type T, ensuring the value is defined. It's useful after type narrowing or when working with optional values."
            }
          ]
        }}
      >
        <CodeExample
          title="NonNullable"
          description="Remove null and undefined"
          code={`type MaybeString = string | null | undefined;

// NonNullable removes null and undefined
type DefiniteString = NonNullable<MaybeString>;
// Result: string

function process(value: MaybeString) {
  if (value !== null && value !== undefined) {
    // After narrowing, value is NonNullable<MaybeString>
    let definite: DefiniteString = value; // ✅ OK
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={32}
        title="ReturnType / Parameters"
        priority="🔥"
        theory={{
          what: "ReturnType<T> extracts the return type of a function type. Parameters<T> extracts parameter types as a tuple.",
          why: "These utilities enable extracting types from functions, useful for type inference, creating related types, and working with function types.",
          how: "ReturnType uses conditional types with `infer`. Parameters extracts the parameter tuple type.",
          keyPoints: [
            "ReturnType: extracts return type",
            "Parameters: extracts parameter types",
            "Useful for type inference",
            "Based on conditional types and infer",
            "Common in type utilities"
          ],
          interviewQuestions: [
            {
              question: "What are ReturnType and Parameters?",
              answer: "ReturnType<T> extracts the return type of a function type T. Parameters<T> extracts the parameter types as a tuple. They're useful for type inference and creating related types from functions."
            }
          ]
        }}
      >
        <CodeExample
          title="ReturnType / Parameters"
          description="Extract function types"
          code={`function getUser(id: number): { name: string; age: number } {
  return { name: "John", age: 30 };
}

// Extract return type
type User = ReturnType<typeof getUser>;
// Result: { name: string; age: number }

// Extract parameters
type GetUserParams = Parameters<typeof getUser>;
// Result: [number]

// Use in generic functions
function wrapFunction<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args) => {
    return fn(...args);
  };
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={33}
        title="Utility Type Patterns"
        theory={{
          what: "Common patterns for creating custom utility types and combining built-in utilities for powerful type transformations.",
          why: "Understanding these patterns enables you to create sophisticated type utilities tailored to your needs, beyond what built-in utilities provide.",
          how: "Combine utility types, use conditional types, mapped types, and type inference to create custom utilities.",
          keyPoints: [
            "Combine multiple utilities",
            "Use with conditional types",
            "Create custom utilities",
            "Pattern for common transformations",
            "Reusable type utilities"
          ],
          interviewQuestions: [
            {
              question: "How do you create custom utility types?",
              answer: "Combine built-in utilities, use conditional types for transformations, mapped types for property manipulation, and type inference. Common patterns include making properties nullable, creating update types, and extracting nested types."
            }
          ]
        }}
      >
        <CodeExample
          title="Utility Type Patterns"
          description="Custom utility types"
          code={`// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Function that returns promise
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : never;`}
        />
      </ConceptCard>
    </div>
  );
}

function TypeSafetyNarrowing() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🔐 Type Safety & Narrowing</h3>
        <p className="text-red-100 break-words">Narrowing types for safety</p>
      </div>

      <ConceptCard
        number={34}
        title="Type Guards"
        priority="🔥"
        theory={{
          what: "Type guards are expressions that narrow types within a conditional block. They help TypeScript understand which type a value is.",
          why: "Type guards enable safe type narrowing, allowing you to use specific types after checking. They're essential for working with union types and unknown values safely.",
          how: "Type guards use typeof, instanceof, in operator, or custom functions. TypeScript narrows the type based on the guard condition.",
          keyPoints: [
            "Narrow types in conditional blocks",
            "Use typeof, instanceof, in, or custom",
            "Enable safe type usage",
            "Essential for union types",
            "TypeScript tracks narrowing"
          ],
          interviewQuestions: [
            {
              question: "What are type guards?",
              answer: "Type guards are expressions that narrow types within conditional blocks. They use typeof, instanceof, in operator, or custom functions to help TypeScript understand which specific type a value is, enabling safe usage."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Guards"
          description="Narrow types safely"
          code={`// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // Type: string
  } else {
    console.log(value.toFixed(2)); // Type: number
  }
}

// instanceof guard
class Dog {
  bark() { }
}
class Cat {
  meow() { }
}
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // Type: Dog
  } else {
    animal.meow(); // Type: Cat
  }
}

// in operator guard
interface Bird {
  fly(): void;
}
interface Fish {
  swim(): void;
}
function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // Type: Bird
  } else {
    animal.swim(); // Type: Fish
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={35}
        title="Custom Type Guards (is)"
        priority="🔥"
        theory={{
          what: "Custom type guards are functions that return a type predicate (`value is Type`). They tell TypeScript that if the function returns true, the value is of that type.",
          why: "Custom type guards enable reusable type narrowing logic. They're more powerful than built-in guards and allow you to create domain-specific type checks.",
          how: "Define a function that returns `value is Type`. TypeScript will narrow the type when the function returns true.",
          keyPoints: [
            "Return type predicate: `value is Type`",
            "Reusable narrowing logic",
            "More powerful than built-in guards",
            "TypeScript trusts the predicate",
            "Common for validation"
          ],
          interviewQuestions: [
            {
              question: "What are custom type guards?",
              answer: "Custom type guards are functions that return a type predicate (`value is Type`). They tell TypeScript that if the function returns true, the value is of that type. They enable reusable, domain-specific type narrowing."
            }
          ]
        }}
      >
        <CodeExample
          title="Custom Type Guards"
          description="Reusable type narrowing"
          code={`// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // Type: string
  }
}

// Domain-specific guard
interface User {
  name: string;
  email: string;
}
function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  );
}

function handleData(data: unknown) {
  if (isUser(data)) {
    console.log(data.email); // Type: User
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={36}
        title="Type Narrowing"
        theory={{
          what: "Type narrowing is TypeScript's process of reducing a type to a more specific type based on control flow analysis.",
          why: "Type narrowing enables safe usage of union types and unknown values. It's automatic in many cases and makes TypeScript's type system powerful.",
          how: "TypeScript narrows types based on typeof, instanceof, in, equality checks, truthiness, discriminated unions, and type guards.",
          keyPoints: [
            "Automatic in many cases",
            "Based on control flow",
            "Works with typeof, instanceof, etc.",
            "Enables safe union type usage",
            "TypeScript tracks narrowing"
          ],
          interviewQuestions: [
            {
              question: "What is type narrowing?",
              answer: "Type narrowing is TypeScript's process of reducing a type to a more specific type based on control flow analysis. It happens automatically with typeof, instanceof, equality checks, and type guards, enabling safe usage of union types."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Narrowing"
          description="Automatic type reduction"
          code={`// Narrowing with truthiness
function process(value: string | null) {
  if (value) {
    console.log(value.toUpperCase()); // Type: string (null excluded)
  }
}

// Narrowing with equality
function check(value: string | number) {
  if (value === "hello") {
    console.log(value); // Type: "hello" (literal)
  }
}

// Narrowing with discriminated unions
type Result = { type: "success"; data: string } | { type: "error"; message: string };
function handle(result: Result) {
  if (result.type === "success") {
    console.log(result.data); // Type narrowed to success case
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={37}
        title="Control Flow Analysis"
        theory={{
          what: "Control flow analysis is TypeScript's ability to track how types change as code executes, narrowing types based on control flow.",
          why: "Control flow analysis enables sophisticated type narrowing. TypeScript understands how types change through if/else, switch, loops, and early returns.",
          how: "TypeScript analyzes the control flow of your code, tracking type changes at each point. It understands unreachable code, early returns, and conditional branches.",
          keyPoints: [
            "Tracks types through control flow",
            "Understands unreachable code",
            "Handles early returns",
            "Analyzes conditional branches",
            "Enables sophisticated narrowing"
          ],
          interviewQuestions: [
            {
              question: "What is control flow analysis?",
              answer: "Control flow analysis is TypeScript's ability to track how types change as code executes. It narrows types based on control flow through if/else, switch, loops, and early returns, enabling sophisticated type safety."
            }
          ]
        }}
      >
        <CodeExample
          title="Control Flow Analysis"
          description="TypeScript tracks types through code"
          code={`function process(value: string | number | null) {
  if (value === null) {
    return; // Early return, null excluded below
  }
  
  // Type: string | number (null excluded)
  if (typeof value === "string") {
    // Type: string
    return value.toUpperCase();
  }
  
  // Type: number (string excluded)
  return value.toFixed(2);
}

// Unreachable code detection
function neverReturns(): never {
  throw new Error();
}
function test() {
  neverReturns();
  console.log("This is unreachable"); // TypeScript knows this
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={38}
        title="Non-null Assertion Operator (!)"
        theory={{
          what: "The non-null assertion operator `!` tells TypeScript that a value is not null or undefined, even if TypeScript can't prove it.",
          why: "Useful when you know a value is defined but TypeScript can't infer it. However, it should be used sparingly as it bypasses type safety.",
          how: "Add `!` after a value: `value!`. This removes null and undefined from the type. Use with caution - if you're wrong, you'll get runtime errors.",
          keyPoints: [
            "Syntax: value!",
            "Removes null/undefined",
            "Bypasses type safety",
            "Use sparingly",
            "Can cause runtime errors if wrong"
          ],
          interviewQuestions: [
            {
              question: "What is the non-null assertion operator?",
              answer: "The non-null assertion operator `!` tells TypeScript that a value is not null or undefined. It removes null/undefined from the type but should be used sparingly as it bypasses type safety and can cause runtime errors if you're wrong."
            }
          ]
        }}
      >
        <CodeExample
          title="Non-null Assertion"
          description="Assert value is defined"
          code={`// Non-null assertion
function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

let element = getElement("myId");
element!.style.color = "red"; // Assert element is not null

// Array access
let arr: (string | undefined)[] = ["a", "b"];
let first = arr[0]!; // Assert first element exists

// Optional chaining alternative (safer)
let element2 = getElement("myId");
element2?.style.color = "red"; // Safer - checks if exists`}
        />
      </ConceptCard>
    </div>
  );
}

function MetaProgrammingTypes() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🧩 Meta-Programming Types</h3>
        <p className="text-indigo-100 break-words">Advanced type manipulation</p>
      </div>

      <ConceptCard
        number={39}
        title="Conditional Types"
        priority="🔥"
        theory={{
          what: "Conditional types select one of two types based on a condition. They use the syntax `T extends U ? X : Y`.",
          why: "Conditional types enable powerful type transformations and type-level logic. They're the foundation of many utility types and advanced type patterns.",
          how: "Use `T extends U ? X : Y` syntax. If T is assignable to U, the type is X, otherwise Y. Can be nested and combined with infer.",
          keyPoints: [
            "Syntax: T extends U ? X : Y",
            "Type-level if/else",
            "Foundation of utility types",
            "Can be nested",
            "Works with infer keyword"
          ],
          interviewQuestions: [
            {
              question: "What are conditional types?",
              answer: "Conditional types select one of two types based on a condition using `T extends U ? X : Y` syntax. If T is assignable to U, the type is X, otherwise Y. They enable powerful type transformations and are the foundation of utility types."
            }
          ]
        }}
      >
        <CodeExample
          title="Conditional Types"
          description="Type-level conditionals"
          code={`// Basic conditional type
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type Element = ArrayElement<string[]>; // string

// Non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`}
        />
      </ConceptCard>

      <ConceptCard
        number={40}
        title="Infer Keyword"
        priority="🔥"
        theory={{
          what: "The `infer` keyword allows you to extract and name types within conditional types. It's used to infer types from other types.",
          why: "Infer enables extracting types from complex types like function signatures, array types, and promise types. It's essential for utility types like ReturnType and Parameters.",
          how: "Use `infer` in the true branch of a conditional type. TypeScript will infer the type and make it available. Can infer multiple types.",
          keyPoints: [
            "Extracts types in conditionals",
            "Used in conditional types",
            "Enables type extraction",
            "Essential for utility types",
            "Can infer multiple types"
          ],
          interviewQuestions: [
            {
              question: "What is the infer keyword?",
              answer: "The `infer` keyword allows you to extract and name types within conditional types. It's used to infer types from other types, like extracting return types from functions or element types from arrays. It's essential for utility types."
            }
          ]
        }}
      >
        <CodeExample
          title="Infer Keyword"
          description="Extract types from other types"
          code={`// Infer return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Infer parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Infer array element
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Infer promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Multiple inference
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;`}
        />
      </ConceptCard>

      <ConceptCard
        number={41}
        title="Keyof Operator"
        priority="🔥"
        theory={{
          what: "The keyof operator gets the union of all property keys of a type. It's used to create types based on object keys.",
          why: "keyof enables type-safe property access, creating types from object keys, and building utility types that work with object properties.",
          how: "Use keyof T to get a union of all keys of type T. The result is a union of string literal types representing the keys.",
          keyPoints: [
            "Gets union of property keys",
            "Result is string literal union",
            "Enables type-safe property access",
            "Used in utility types",
            "Works with interfaces and types"
          ],
          interviewQuestions: [
            {
              question: "What is the keyof operator?",
              answer: "The keyof operator gets the union of all property keys of a type. For example, keyof { a: string; b: number } is 'a' | 'b'. It enables type-safe property access and is used in utility types."
            }
          ]
        }}
      >
        <CodeExample
          title="Keyof Operator"
          description="Get property keys as union"
          code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Get keys as union
type UserKeys = keyof User; // "id" | "name" | "email"

// Type-safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user: User = { id: 1, name: "John", email: "john@example.com" };
getProperty(user, "name"); // ✅ OK
// getProperty(user, "age"); // ❌ Error - not a key

// Create mapped type from keys
type Optional<T> = {
  [K in keyof T]?: T[K];
};`}
        />
      </ConceptCard>

      <ConceptCard
        number={42}
        title="Lookup Types"
        theory={{
          what: "Lookup types (indexed access types) access property types using bracket notation. They get the type of a property from an object type.",
          why: "Lookup types enable extracting specific property types, creating related types, and building type utilities that work with object properties.",
          how: "Use `T[K]` where K is a key of T. The result is the type of property K in type T. K can be a single key or a union of keys.",
          keyPoints: [
            "Syntax: T[K]",
            "Gets property type",
            "K must be key of T",
            "Can use union of keys",
            "Enables type extraction"
          ],
          interviewQuestions: [
            {
              question: "What are lookup types?",
              answer: "Lookup types (indexed access types) access property types using bracket notation like `T[K]`. They get the type of property K from type T, enabling type extraction and creating related types."
            }
          ]
        }}
      >
        <CodeExample
          title="Lookup Types"
          description="Access property types"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

// Get property type
type UserName = User["name"]; // string
type UserId = User["id"]; // number

// Get nested property type
type City = User["address"]["city"]; // string

// Get union of property types
type UserValue = User["id" | "name"]; // number | string

// Use in utilities
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};`}
        />
      </ConceptCard>

      <ConceptCard
        number={43}
        title="Template Literal Types"
        theory={{
          what: "Template literal types are types built from string literal types using template literal syntax. They enable string manipulation at the type level.",
          why: "Template literal types enable powerful string type manipulation, useful for creating type-safe APIs, route types, CSS property types, and string-based type transformations.",
          how: "Use template literal syntax with type parameters. TypeScript can concatenate, transform, and manipulate string literal types, creating new literal types from existing ones.",
          keyPoints: [
            "Built from string literal types",
            "Use template literal syntax",
            "Enable string manipulation at type level",
            "Useful for type-safe APIs and routes",
            "Can combine with unions and conditionals"
          ],
          interviewQuestions: [
            {
              question: "What are template literal types?",
              answer: "Template literal types are types built from string literal types using template literal syntax. They enable string manipulation at the type level, useful for creating type-safe APIs, route types, and string-based transformations."
            }
          ]
        }}
      >
        <CodeExample
          title="Template Literal Types"
          description="String manipulation at type level"
          code={`// Basic template literal type
type Greeting = \`Hello, \${string}!\`;
let greeting: Greeting = "Hello, World!";

// With union types
type EventName = "click" | "scroll" | "mousemove";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// Result: "onClick" | "onScroll" | "onMouseMove"

// Route types
type Route = "/" | "/about" | "/contact";
type ApiRoute = \`/api\${Route}\`;
// Result: "/api/" | "/api/about" | "/api/contact"

// CSS property types
type CSSValue = "px" | "em" | "rem";
type Width = \`\${number}\${CSSValue}\`;
let width: Width = "100px"; // ✅ OK`}
        />
      </ConceptCard>
    </div>
  );
}

function OOPTypeScript() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🧱 Object-Oriented TypeScript</h3>
        <p className="text-emerald-100 break-words">OOP features beyond JavaScript</p>
      </div>

      <ConceptCard
        number={44}
        title="Access Modifiers"
        priority="🔥"
        theory={{
          what: "Access modifiers (public, private, protected) control visibility of class members. They're compile-time only (erased in JavaScript).",
          why: "Access modifiers enable encapsulation and proper OOP design. They help prevent accidental access to internal implementation details and make APIs clearer.",
          how: "Use `public` (default), `private`, or `protected` before class members. Public is accessible everywhere, private only in the class, protected in class and subclasses.",
          keyPoints: [
            "public: accessible everywhere (default)",
            "private: only in class",
            "protected: class and subclasses",
            "Compile-time only (erased in JS)",
            "Enables encapsulation"
          ],
          interviewQuestions: [
            {
              question: "What are access modifiers in TypeScript?",
              answer: "Access modifiers (public, private, protected) control visibility of class members. Public is accessible everywhere, private only in the class, protected in class and subclasses. They're compile-time only and enable encapsulation."
            }
          ]
        }}
      >
        <CodeExample
          title="Access Modifiers"
          description="Control member visibility"
          code={`class User {
  public name: string; // Accessible everywhere
  private email: string; // Only in this class
  protected id: number; // Class and subclasses
  
  constructor(name: string, email: string, id: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
  
  public getName() {
    return this.name; // ✅ OK
  }
  
  private getEmail() {
    return this.email; // ✅ OK - in same class
  }
}

class Admin extends User {
  getUserId() {
    return this.id; // ✅ OK - protected accessible
    // return this.email; // ❌ Error - private not accessible
  }
}

let user = new User("John", "john@example.com", 1);
user.name; // ✅ OK - public
// user.email; // ❌ Error - private`}
        />
      </ConceptCard>

      <ConceptCard
        number={45}
        title="Abstract Classes"
        theory={{
          what: "Abstract classes cannot be instantiated directly. They're meant to be extended and can contain abstract methods that must be implemented by subclasses.",
          why: "Abstract classes provide a way to define a base class with some implementation and require subclasses to implement specific methods. They enable polymorphism and code reuse.",
          how: "Use `abstract` keyword before class. Abstract methods are declared without implementation and must be implemented by subclasses.",
          keyPoints: [
            "Cannot be instantiated",
            "Use `abstract` keyword",
            "Can have abstract methods",
            "Must be extended",
            "Enables polymorphism"
          ],
          interviewQuestions: [
            {
              question: "What are abstract classes?",
              answer: "Abstract classes cannot be instantiated directly and are meant to be extended. They can contain abstract methods that must be implemented by subclasses. They provide a base implementation while requiring specific methods to be implemented."
            }
          ]
        }}
      >
        <CodeExample
          title="Abstract Classes"
          description="Base classes that must be extended"
          code={`abstract class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Abstract method - must be implemented
  abstract makeSound(): void;
  
  // Concrete method
  move() {
    console.log(\`\${this.name} is moving\`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow!");
  }
}

// let animal = new Animal("Generic"); // ❌ Error - cannot instantiate abstract
let dog = new Dog("Buddy");
dog.makeSound(); // ✅ OK`}
        />
      </ConceptCard>

      <ConceptCard
        number={46}
        title="Implements Keyword"
        theory={{
          what: "The `implements` keyword ensures a class implements an interface. It provides a contract that the class must fulfill.",
          why: "Implements enables interface-based design, ensuring classes have required methods and properties. It provides compile-time checking that a class matches an interface.",
          how: "Use `implements InterfaceName` after the class declaration. The class must implement all required members of the interface.",
          keyPoints: [
            "Ensures class implements interface",
            "Compile-time checking",
            "Enables interface-based design",
            "Can implement multiple interfaces",
            "Provides contract"
          ],
          interviewQuestions: [
            {
              question: "What is the implements keyword?",
              answer: "The `implements` keyword ensures a class implements an interface. It provides compile-time checking that the class has all required members of the interface, enabling interface-based design."
            }
          ]
        }}
      >
        <CodeExample
          title="Implements Keyword"
          description="Ensure class implements interface"
          code={`interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly() {
    console.log("Flying");
  }
  
  swim() {
    console.log("Swimming");
  }
}

// Must implement all interface members
class Bird implements Flyable {
  fly() {
    console.log("Flying");
  }
  // Missing methods cause error
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={47}
        title="Readonly Class Properties"
        theory={{
          what: "Readonly class properties can only be assigned during initialization or in the constructor. They provide immutability for class members.",
          why: "Readonly properties prevent accidental mutation of class members, making classes safer and more predictable. They're useful for configuration and constants.",
          how: "Use `readonly` modifier before property declaration. Can be assigned in constructor or with initializer, but not after.",
          keyPoints: [
            "Use `readonly` modifier",
            "Can assign in constructor",
            "Cannot reassign after",
            "Provides immutability",
            "Useful for constants"
          ],
          interviewQuestions: [
            {
              question: "What are readonly class properties?",
              answer: "Readonly class properties can only be assigned during initialization or in the constructor. They prevent accidental mutation and provide immutability for class members, useful for configuration and constants."
            }
          ]
        }}
      >
        <CodeExample
          title="Readonly Class Properties"
          description="Immutable class members"
          code={`class User {
  readonly id: number;
  readonly createdAt: Date;
  name: string; // Not readonly
  
  constructor(id: number, name: string) {
    this.id = id; // ✅ OK - in constructor
    this.createdAt = new Date(); // ✅ OK
    this.name = name;
  }
  
  updateName(newName: string) {
    this.name = newName; // ✅ OK - not readonly
    // this.id = 999; // ❌ Error - readonly
  }
}

let user = new User(1, "John");
// user.id = 2; // ❌ Error - readonly`}
        />
      </ConceptCard>

      <ConceptCard
        number={48}
        title="Parameter Properties"
        theory={{
          what: "Parameter properties allow you to declare and initialize class members directly in the constructor parameters. They combine parameter declaration and property initialization.",
          why: "Parameter properties reduce boilerplate by combining parameter declaration and property initialization. They make constructors more concise.",
          how: "Add access modifier (public, private, protected) or readonly to constructor parameters. TypeScript automatically creates and initializes the property.",
          keyPoints: [
            "Combine parameter and property",
            "Add modifier to constructor param",
            "Reduces boilerplate",
            "Automatic initialization",
            "Common pattern"
          ],
          interviewQuestions: [
            {
              question: "What are parameter properties?",
              answer: "Parameter properties allow you to declare and initialize class members directly in constructor parameters by adding access modifiers or readonly. They combine parameter declaration and property initialization, reducing boilerplate."
            }
          ]
        }}
      >
        <CodeExample
          title="Parameter Properties"
          description="Declare properties in constructor"
          code={`// Without parameter properties
class User {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// With parameter properties (shorter)
class User2 {
  constructor(
    public name: string,
    public age: number,
    private email: string
  ) {
    // Properties automatically created and initialized
  }
}

// Equivalent to:
class User3 {
  public name: string;
  public age: number;
  private email: string;
  
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}`}
        />
      </ConceptCard>
    </div>
  );
}

function ModuleDeclarationSystem() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">📦 Module & Declaration System</h3>
        <p className="text-slate-100 break-words">TypeScript's module system</p>
      </div>

      <ConceptCard
        number={49}
        title="Declaration Files (.d.ts)"
        priority="🔥"
        theory={{
          what: "Declaration files provide type information for JavaScript code. They have `.d.ts` extension and contain only type information, no implementation.",
          why: "Declaration files enable TypeScript to understand JavaScript libraries and code. They provide type safety when using JavaScript code in TypeScript projects.",
          how: "Create `.d.ts` files with type declarations. They're automatically loaded by TypeScript. Can declare types, interfaces, functions, and modules.",
          keyPoints: [
            "Extension: .d.ts",
            "Contains only types, no implementation",
            "Enables JS library type safety",
            "Automatically loaded",
            "Essential for JS interop"
          ],
          interviewQuestions: [
            {
              question: "What are declaration files?",
              answer: "Declaration files (.d.ts) provide type information for JavaScript code. They contain only type declarations, no implementation, and enable TypeScript to understand JavaScript libraries, providing type safety."
            }
          ]
        }}
      >
        <CodeExample
          title="Declaration Files"
          description="Type information for JavaScript"
          code={`// mylib.d.ts
declare module "mylib" {
  export function doSomething(x: number): string;
  export interface Config {
    apiUrl: string;
  }
}

// Global declarations
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// Ambient declarations
declare const API_URL: string;
declare function log(message: string): void;`}
        />
      </ConceptCard>

      <ConceptCard
        number={50}
        title="Ambient Declarations"
        theory={{
          what: "Ambient declarations tell TypeScript about code that exists elsewhere (like global variables, external libraries). They use the `declare` keyword.",
          why: "Ambient declarations enable TypeScript to understand code that exists at runtime but isn't written in TypeScript. They're essential for JavaScript interop.",
          how: "Use `declare` keyword before variables, functions, classes, or modules. They provide type information without implementation.",
          keyPoints: [
            "Use `declare` keyword",
            "No implementation, only types",
            "For code that exists elsewhere",
            "Global or module-scoped",
            "Essential for JS interop"
          ],
          interviewQuestions: [
            {
              question: "What are ambient declarations?",
              answer: "Ambient declarations use the `declare` keyword to tell TypeScript about code that exists elsewhere (global variables, external libraries). They provide type information without implementation, essential for JavaScript interop."
            }
          ]
        }}
      >
        <CodeExample
          title="Ambient Declarations"
          description="Declare external code"
          code={`// Global variable
declare const VERSION: string;

// Global function
declare function log(message: string): void;

// External module
declare module "external-lib" {
  export function doWork(): void;
}

// Global augmentation
declare global {
  interface Array<T> {
    myMethod(): T[];
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={51}
        title="Declaration Merging"
        theory={{
          what: "Declaration merging allows multiple declarations of the same name to be merged into one. Interfaces and namespaces can be merged.",
          why: "Declaration merging enables extending types across multiple files, augmenting library types, and creating extensible type systems.",
          how: "TypeScript automatically merges multiple interface or namespace declarations with the same name. Properties are combined into one type.",
          keyPoints: [
            "Interfaces can be merged",
            "Namespaces can be merged",
            "Properties are combined",
            "Enables type augmentation",
            "Automatic in TypeScript"
          ],
          interviewQuestions: [
            {
              question: "What is declaration merging?",
              answer: "Declaration merging allows multiple declarations of the same name (interfaces, namespaces) to be merged into one. TypeScript automatically combines properties, enabling type augmentation and extensible type systems."
            }
          ]
        }}
      >
        <CodeExample
          title="Declaration Merging"
          description="Merge multiple declarations"
          code={`// Multiple interface declarations merge
interface User {
  name: string;
}
interface User {
  email: string;
}
// Result: { name: string; email: string }

// Namespace merging
namespace MyLib {
  export function func1(): void;
}
namespace MyLib {
  export function func2(): void;
}
// Result: namespace with both functions

// Augmenting external types
declare module "express" {
  interface Request {
    user?: User;
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={52}
        title="Module Augmentation"
        theory={{
          what: "Module augmentation allows you to add types to existing modules. You can extend interfaces and add new declarations to external modules.",
          why: "Module augmentation enables extending third-party library types without modifying their source code. It's essential for adding types to JavaScript libraries.",
          how: "Use 'declare module' with the module name to augment a module. Add new types, extend interfaces, or add properties to existing types.",
          keyPoints: [
            "Extend external modules",
            "Use declare module syntax",
            "Add types to existing modules",
            "Doesn't modify original",
            "Essential for library types"
          ],
          interviewQuestions: [
            {
              question: "What is module augmentation?",
              answer: "Module augmentation allows you to add types to existing modules using 'declare module'. You can extend interfaces and add new declarations to external modules without modifying their source code."
            }
          ]
        }}
      >
        <CodeExample
          title="Module Augmentation"
          description="Extend external modules"
          code={`// Augment express module
declare module "express" {
  interface Request {
    user?: {
      id: number;
      name: string;
    };
  }
}

// Now Request has user property
import { Request } from "express";
function handler(req: Request) {
  req.user?.name; // ✅ OK - augmented type`}
        />
      </ConceptCard>

      <ConceptCard
        number={53}
        title="Namespaces"
        theory={{
          what: "Namespaces organize code into logical groups and prevent naming conflicts. They're TypeScript's way of organizing code before ES modules.",
          why: "Namespaces provide organization and prevent global namespace pollution. However, ES modules are preferred in modern TypeScript.",
          how: "Use `namespace` keyword to create a namespace. Export members with `export`. Can be nested and merged.",
          keyPoints: [
            "Use `namespace` keyword",
            "Organize code into groups",
            "Prevent naming conflicts",
            "Can be nested",
            "ES modules preferred now"
          ],
          interviewQuestions: [
            {
              question: "What are namespaces?",
              answer: "Namespaces organize code into logical groups and prevent naming conflicts. They're TypeScript's way of organizing code, though ES modules are now preferred. Namespaces can be nested and merged."
            }
          ]
        }}
      >
        <CodeExample
          title="Namespaces"
          description="Organize code into groups"
          code={`namespace Utils {
  export function format(str: string): string {
    return str.toUpperCase();
  }
  
  export namespace Math {
    export function add(a: number, b: number): number {
      return a + b;
    }
  }
}

// Usage
Utils.format("hello");
Utils.Math.add(1, 2);`}
        />
      </ConceptCard>

      <ConceptCard
        number={54}
        title="Path Aliases"
        theory={{
          what: "Path aliases allow you to create shortcuts for import paths. Instead of relative paths like `../../../utils`, you can use `@/utils`.",
          why: "Path aliases make imports cleaner and easier to refactor. They reduce the need for relative path navigation and make code more maintainable.",
          how: "Configure in `tsconfig.json` with `paths` option. Map alias patterns to actual paths. Also configure in your bundler (Vite, Webpack, etc.).",
          keyPoints: [
            "Configure in tsconfig.json",
            "Use `paths` option",
            "Makes imports cleaner",
            "Easier refactoring",
            "Also configure in bundler"
          ],
          interviewQuestions: [
            {
              question: "What are path aliases?",
              answer: "Path aliases create shortcuts for import paths, configured in tsconfig.json with the `paths` option. Instead of relative paths like `../../../utils`, you can use `@/utils`, making imports cleaner and easier to refactor."
            }
          ]
        }}
      >
        <CodeExample
          title="Path Aliases"
          description="Clean import paths"
          code={`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}

// Usage
import { Button } from "@/components/Button";
import { formatDate } from "@/utils/date";
// Instead of: import { Button } from "../../components/Button";`}
        />
      </ConceptCard>
    </div>
  );
}

function CompilerConfiguration() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🛠️ Compiler & Configuration</h3>
        <p className="text-amber-100 break-words">Configuring TypeScript compiler</p>
      </div>

      <ConceptCard
        number={55}
        title="tsconfig.json"
        priority="🔥"
        theory={{
          what: "tsconfig.json is the configuration file for TypeScript. It specifies compiler options, which files to include/exclude, and how to compile your project.",
          why: "tsconfig.json controls how TypeScript compiles your code. It enables you to configure strictness, target JavaScript version, module system, and more.",
          how: "Create tsconfig.json in project root. Specify compiler options, include/exclude patterns, and extends other configs. TypeScript automatically finds and uses it.",
          keyPoints: [
            "Project configuration file",
            "Controls compiler behavior",
            "Specifies compiler options",
            "Include/exclude files",
            "Can extend other configs"
          ],
          interviewQuestions: [
            {
              question: "What is tsconfig.json?",
              answer: "tsconfig.json is the configuration file for TypeScript that specifies compiler options, which files to include/exclude, and how to compile your project. It controls TypeScript's behavior and strictness."
            }
          ]
        }}
      >
        <CodeExample
          title="tsconfig.json"
          description="TypeScript configuration"
          code={`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={56}
        title="Strict Mode Flags"
        priority="🔥"
        theory={{
          what: "Strict mode flags enable additional type checking options that make TypeScript more strict. They catch more potential bugs.",
          why: "Strict mode flags help catch bugs early and enforce better coding practices. They make TypeScript more effective at preventing runtime errors.",
          how: "Enable `strict: true` or individual flags like `strictNullChecks`, `strictFunctionTypes`, `noImplicitAny`, etc. Each flag adds additional checks.",
          keyPoints: [
            "Enable with strict: true",
            "Or enable individual flags",
            "Catches more potential bugs",
            "Enforces better practices",
            "Recommended for new projects"
          ],
          interviewQuestions: [
            {
              question: "What are strict mode flags?",
              answer: "Strict mode flags enable additional type checking options that make TypeScript more strict. Enable with `strict: true` or individual flags. They catch more potential bugs and enforce better coding practices."
            }
          ]
        }}
      >
        <CodeExample
          title="Strict Mode Flags"
          description="Additional type checking"
          code={`{
  "compilerOptions": {
    "strict": true, // Enables all strict flags
    
    // Or enable individually:
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={57}
        title="Target / Module Configuration"
        theory={{
          what: "`target` specifies which JavaScript version to compile to. `module` specifies which module system to use (CommonJS, ES modules, etc.).",
          why: "These options control the output JavaScript. `target` affects syntax and features, `module` affects how modules are handled. Must match your runtime environment.",
          how: "Set `target` to ES version (ES2020, ES2015, etc.). Set `module` to module system (commonjs, esnext, es2015, etc.).",
          keyPoints: [
            "target: JavaScript version",
            "module: module system",
            "Must match runtime",
            "Affects output code",
            "Common: target ES2020, module ESNext"
          ],
          interviewQuestions: [
            {
              question: "What do target and module options do?",
              answer: "`target` specifies which JavaScript version to compile to (ES2020, ES2015, etc.). `module` specifies which module system to use (commonjs, esnext, etc.). They control the output JavaScript and must match your runtime environment."
            }
          ]
        }}
      >
        <CodeExample
          title="Target / Module"
          description="Control output JavaScript"
          code={`{
  "compilerOptions": {
    // Compile to ES2020 JavaScript
    "target": "ES2020",
    
    // Use ES modules
    "module": "ESNext",
    
    // Or CommonJS for Node.js
    // "module": "commonjs",
    
    // Module resolution
    "moduleResolution": "node" // or "bundler"
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={58}
        title="Source Maps"
        theory={{
          what: "Source maps map compiled JavaScript back to original TypeScript. They enable debugging TypeScript code in browsers/dev tools.",
          why: "Source maps make debugging possible. Without them, you debug the compiled JavaScript, not your TypeScript source. They're essential for development.",
          how: "Enable with `sourceMap: true`. TypeScript generates `.map` files that map compiled code to source. Browsers and dev tools use them automatically.",
          keyPoints: [
            "Enable with sourceMap: true",
            "Maps JS back to TS",
            "Enables debugging",
            "Generated .map files",
            "Essential for development"
          ],
          interviewQuestions: [
            {
              question: "What are source maps?",
              answer: "Source maps map compiled JavaScript back to original TypeScript, enabling debugging of TypeScript code in browsers and dev tools. Enable with `sourceMap: true`. They're essential for development."
            }
          ]
        }}
      >
        <CodeExample
          title="Source Maps"
          description="Debug TypeScript code"
          code={`{
  "compilerOptions": {
    "sourceMap": true,
    // Generates .map files
    // Enables debugging in browser/dev tools
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={59}
        title="Incremental Builds"
        theory={{
          what: "Incremental builds only recompile changed files, making compilation faster. TypeScript tracks what's changed and only rebuilds necessary files.",
          why: "Incremental builds significantly speed up compilation in large projects. They're essential for developer experience in large codebases.",
          how: "Enable with `incremental: true`. TypeScript generates `.tsbuildinfo` files that track what's been compiled. Only changed files are recompiled.",
          keyPoints: [
            "Enable with incremental: true",
            "Only recompiles changed files",
            "Much faster in large projects",
            "Generates .tsbuildinfo files",
            "Essential for large codebases"
          ],
          interviewQuestions: [
            {
              question: "What are incremental builds?",
              answer: "Incremental builds only recompile changed files, making compilation much faster. Enable with `incremental: true`. TypeScript tracks what's changed and only rebuilds necessary files, essential for large projects."
            }
          ]
        }}
      >
        <CodeExample
          title="Incremental Builds"
          description="Faster compilation"
          code={`{
  "compilerOptions": {
    "incremental": true,
    // Generates .tsbuildinfo
    // Only recompiles changed files
    // Much faster in large projects
  }
}`}
        />
      </ConceptCard>
    </div>
  );
}

function JSInterop() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🌉 JS ↔ TS Interop</h3>
        <p className="text-rose-100 break-words">Working with JavaScript</p>
      </div>

      <ConceptCard
        number={60}
        title="Type Assertions"
        priority="🔥"
        theory={{
          what: "Type assertions tell TypeScript to treat a value as a specific type. They're compile-time only and don't change the runtime value.",
          why: "Type assertions are useful when you know more about a type than TypeScript can infer. However, they bypass type checking, so use carefully.",
          how: "Use `as Type` syntax or `<Type>value` (angle bracket syntax, not in JSX). TypeScript trusts your assertion but doesn't verify it.",
          keyPoints: [
            "Syntax: value as Type",
            "Compile-time only",
            "Bypasses type checking",
            "Use when you know the type",
            "Can be unsafe if wrong"
          ],
          interviewQuestions: [
            {
              question: "What are type assertions?",
              answer: "Type assertions tell TypeScript to treat a value as a specific type using `as Type` syntax. They're compile-time only and bypass type checking, so use carefully when you know more about the type than TypeScript can infer."
            }
          ]
        }}
      >
        <CodeExample
          title="Type Assertions"
          description="Tell TypeScript the type"
          code={`// Type assertion
let value: unknown = "hello";
let str = value as string; // Assert it's a string

// Angle bracket syntax (not in JSX)
let num = <number>value;

// Asserting to more specific type
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
let animal: Animal = { name: "Buddy" };
let dog = animal as Dog; // Assert it's a Dog

// Double assertion (unsafe)
let str2 = value as unknown as string;`}
        />
      </ConceptCard>

      <ConceptCard
        number={61}
        title="AllowJs / CheckJs"
        theory={{
          what: "`allowJs` allows JavaScript files in your TypeScript project. `checkJs` enables type checking for JavaScript files.",
          why: "These options enable gradual migration from JavaScript to TypeScript. You can mix JS and TS files and gradually add types.",
          how: "Enable `allowJs: true` to allow .js files. Enable `checkJs: true` to type-check them. Use JSDoc comments for types in JS files.",
          keyPoints: [
            "allowJs: allow .js files",
            "checkJs: type-check .js files",
            "Enables gradual migration",
            "Use JSDoc for types",
            "Common in migration scenarios"
          ],
          interviewQuestions: [
            {
              question: "What do allowJs and checkJs do?",
              answer: "`allowJs` allows JavaScript files in your TypeScript project. `checkJs` enables type checking for JavaScript files. They enable gradual migration from JavaScript to TypeScript, allowing you to mix JS and TS files."
            }
          ]
        }}
      >
        <CodeExample
          title="AllowJs / CheckJs"
          description="Work with JavaScript files"
          code={`// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,  // Allow .js files
    "checkJs": true   // Type-check .js files
  }
}

// In .js file, use JSDoc for types
/**
 * @param {string} name
 * @param {number} age
 * @returns {string}
 */
function greet(name, age) {
  return \`Hello, \${name}, age \${age}\`;
}`}
        />
      </ConceptCard>

      <ConceptCard
        number={62}
        title="JS Migration Strategy"
        theory={{
          what: "Strategies for migrating JavaScript codebases to TypeScript gradually, without rewriting everything at once.",
          why: "Gradual migration is practical for large codebases. It allows you to add types incrementally while keeping the codebase working.",
          how: "Start with allowJs/checkJs, add types to new files, gradually convert files, use JSDoc for types in JS, and configure strictness incrementally.",
          keyPoints: [
            "Start with allowJs/checkJs",
            "Add types to new files",
            "Gradually convert existing files",
            "Use JSDoc for JS types",
            "Increase strictness over time"
          ],
          interviewQuestions: [
            {
              question: "How do you migrate JavaScript to TypeScript?",
              answer: "Start with allowJs/checkJs to allow mixing JS and TS. Add types to new files first, gradually convert existing files, use JSDoc for types in JS files, and increase strictness over time. This enables gradual migration without rewriting everything."
            }
          ]
        }}
      >
        <CodeExample
          title="Migration Strategy"
          description="Gradual JavaScript to TypeScript"
          code={`// 1. Enable allowJs/checkJs
// 2. Rename .js to .ts gradually
// 3. Add types incrementally
// 4. Use JSDoc in remaining .js files

// Step 1: Keep .js, add types with JSDoc
/**
 * @typedef {Object} User
 * @property {string} name
 * @property {number} age
 */

// Step 2: Convert to .ts
interface User {
  name: string;
  age: number;
}

// Step 3: Increase strictness gradually`}
        />
      </ConceptCard>
    </div>
  );
}

function ExpertLevelConcepts() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🚀 Expert-Level TS Concepts</h3>
        <p className="text-violet-100 break-words">Advanced TypeScript mastery</p>
      </div>

      <ConceptCard
        number={63}
        title="Structural vs Nominal Typing"
        theory={{
          what: "Structural typing (TypeScript) checks if types have compatible structure. Nominal typing (Java, C#) checks if types have the same name. TypeScript uses structural typing.",
          why: "Understanding this distinction is crucial for advanced TypeScript. It explains why TypeScript's type system works the way it does and how to work with it effectively.",
          how: "In structural typing, if two types have the same structure, they're compatible. In nominal typing, types must have the same name. TypeScript's structural typing is more flexible.",
          keyPoints: [
            "Structural: checks structure",
            "Nominal: checks name",
            "TypeScript uses structural",
            "More flexible than nominal",
            "Enables JavaScript interop"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between structural and nominal typing?",
              answer: "Structural typing checks if types have compatible structure (TypeScript). Nominal typing checks if types have the same name (Java, C#). TypeScript's structural typing is more flexible and enables better JavaScript interop."
            }
          ]
        }}
      >
        <CodeExample
          title="Structural vs Nominal"
          description="Type compatibility models"
          code={`// Structural typing (TypeScript)
interface Point {
  x: number;
  y: number;
}
interface Coordinate {
  x: number;
  y: number;
}
let point: Point = { x: 1, y: 2 };
let coord: Coordinate = point; // ✅ OK - structures match

// In nominal typing (Java/C#), this would fail
// Types must have the same name to be compatible

// TypeScript's structural typing is more flexible
// but can sometimes be too permissive`}
        />
      </ConceptCard>

      <ConceptCard
        number={64}
        title="Variance (Covariance / Contravariance)"
        theory={{
          what: "Variance describes how subtyping relationships change when types are used in different contexts. Covariance preserves subtyping, contravariance reverses it.",
          why: "Understanding variance is crucial for advanced generic types and function types. It explains why some type assignments work and others don't.",
          how: "Arrays are covariant (A[] extends B[] if A extends B). Function parameters are contravariant (more specific is assignable to less specific). Return types are covariant.",
          keyPoints: [
            "Covariance: preserves subtyping",
            "Contravariance: reverses subtyping",
            "Arrays are covariant",
            "Function params are contravariant",
            "Return types are covariant"
          ],
          interviewQuestions: [
            {
              question: "What is variance in TypeScript?",
              answer: "Variance describes how subtyping relationships change in different contexts. Covariance preserves subtyping (arrays, return types), contravariance reverses it (function parameters). Understanding variance is crucial for advanced generic types."
            }
          ]
        }}
      >
        <CodeExample
          title="Variance"
          description="Subtyping in different contexts"
          code={`// Covariance: arrays
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
let dogs: Dog[] = [];
let animals: Animal[] = dogs; // ✅ OK - covariant

// Contravariance: function parameters
type Handler = (animal: Animal) => void;
let dogHandler: (dog: Dog) => void = (dog) => { };
let animalHandler: Handler = dogHandler; // ✅ OK - contravariant
// More specific (Dog) is assignable to less specific (Animal)

// Covariance: return types
type Getter = () => Animal;
let dogGetter: () => Dog = () => ({ name: "Buddy", breed: "Lab" });
let animalGetter: Getter = dogGetter; // ✅ OK - covariant`}
        />
      </ConceptCard>

      <ConceptCard
        number={65}
        title="Exact Optional Property Types"
        theory={{
          what: "Exact optional property types make optional properties truly optional - they can be missing, but if present, must be the exact type (not `T | undefined`).",
          why: "This is a subtle but important distinction. With exact optional properties, `{ prop?: string }` means the property can be missing, but if present, it's `string`, not `string | undefined`.",
          how: "Enable with `exactOptionalPropertyTypes: true` in tsconfig.json. This makes optional properties more precise.",
          keyPoints: [
            "Enable with exactOptionalPropertyTypes",
            "Optional means missing, not undefined",
            "More precise type checking",
            "If present, must be exact type",
            "Subtle but important distinction"
          ],
          interviewQuestions: [
            {
              question: "What are exact optional property types?",
              answer: "Exact optional property types make optional properties truly optional - they can be missing, but if present, must be the exact type (not `T | undefined`). Enable with `exactOptionalPropertyTypes: true` for more precise type checking."
            }
          ]
        }}
      >
        <CodeExample
          title="Exact Optional Properties"
          description="More precise optional types"
          code={`// Without exactOptionalPropertyTypes
interface Config {
  timeout?: number; // Type: number | undefined
}
let config1: Config = { timeout: undefined }; // ✅ OK

// With exactOptionalPropertyTypes: true
interface Config2 {
  timeout?: number; // Type: number (if present)
}
// let config2: Config2 = { timeout: undefined }; // ❌ Error
// Property can be missing, but if present, must be number`}
        />
      </ConceptCard>

      <ConceptCard
        number={66}
        title="Satisfies Operator"
        theory={{
          what: "The `satisfies` operator (TypeScript 4.9+) ensures a value matches a type while preserving the most specific type. It's like `as` but safer.",
          why: "Satisfies provides type checking without widening the type. It ensures the value matches the type while keeping the most specific inferred type, enabling better autocomplete and type inference.",
          how: "Use `value satisfies Type`. TypeScript checks that value matches Type, but the type of value remains its inferred type, not Type.",
          keyPoints: [
            "Syntax: value satisfies Type",
            "Checks type without widening",
            "Preserves specific type",
            "Safer than type assertion",
            "TypeScript 4.9+"
          ],
          interviewQuestions: [
            {
              question: "What is the satisfies operator?",
              answer: "The `satisfies` operator ensures a value matches a type while preserving the most specific inferred type. It's like a type assertion but safer - it checks the type without widening it, enabling better autocomplete and type inference."
            }
          ]
        }}
      >
        <CodeExample
          title="Satisfies Operator"
          description="Type check without widening"
          code={`// Without satisfies
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as Config; // Type is Config (widened)

// With satisfies
const config2 = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} satisfies Config;
// Type is { apiUrl: string; timeout: number } (specific)
// But checked against Config

// Better autocomplete and type inference
// while ensuring it matches the interface`}
        />
      </ConceptCard>
    </div>
  );
}

// Helper component for concept cards
interface ConceptCardProps {
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children: React.ReactNode;
  theory?: {
    what: string;
    why?: string;
    how?: string;
    keyPoints?: string[];
    interviewQuestions?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function ConceptCard({
  number,
  title,
  description,
  priority,
  children,
  theory,
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 w-full max-w-full flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
        <span className="text-2xl font-bold text-blue-500 flex-shrink-0">#{number}</span>
        <h4 className="text-2xl font-bold text-gray-900 break-words flex-1 min-w-0">{title}</h4>
        {priority && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold flex-shrink-0">
            {priority}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-600 mb-4 break-words w-full">{description}</p>
      )}
      
      {/* Theory Section - Always Visible */}
      {theory && (
        <div className="mb-6">
          <TheorySection {...theory} />
        </div>
      )}
      
      {/* Code Examples - Toggleable - Always show button if children exist */}
      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md z-10 relative"
            type="button"
          >
            <span className="text-black font-semibold">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-xl text-black">{showExamples ? "▲" : "▼"}</span>
          </button>
          {showExamples && (
            <div className="mt-4 w-full max-w-full flex flex-col space-y-4 overflow-hidden">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
