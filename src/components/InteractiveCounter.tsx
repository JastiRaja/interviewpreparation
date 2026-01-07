import { useState } from "react";
import { motion } from "framer-motion";
import CodeExample from "./CodeExample";

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="text-xl font-bold mb-4">Try it yourself!</h4>
        <div className="flex items-center gap-6 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCount(count - 1)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Decrement
          </motion.button>
          <motion.div
            key={count}
            initial={{ scale: 1.2, color: "#3b82f6" }}
            animate={{ scale: 1, color: "#111827" }}
            className="text-4xl font-bold min-w-[80px] text-center"
          >
            {count}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Increment
          </motion.button>
        </div>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
        >
          Reset
        </button>
      </div>
      <CodeExample
        title="Implementation"
        description="This counter uses useState hook to manage state"
        code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`}
      />
    </div>
  );
}

