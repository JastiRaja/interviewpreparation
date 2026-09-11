import type { FullStackTrack } from "../fullstackTrackTypes";

export const dsaTrack: FullStackTrack = {
  layoutTitle: "Data Structures, Algorithms & Patterns",
  layoutSubtitle: "Top 14 LeetCode patterns, Big-O reference, and algorithmic problem-solving templates",
  accent: "amber",
  defaultSectionId: "linear-patterns",
  sections: [
    {
      id: "linear-patterns",
      title: "Linear & Pointer patterns",
      icon: "👉",
      heroTitle: "👉 Two Pointers, Sliding Window & Interval Patterns",
      heroSubtitle: "Master array and linked list algorithmic templates with O(N) time complexity",
      heroGradient: "from-amber-600 via-orange-600 to-amber-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Two Pointers Pattern",
          priority: "🔥",
          theory: {
            what: "The Two Pointers pattern uses two indices to iterate across a data structure simultaneously. Variations include: (1) Opposite Direction (left starting at 0, right starting at n-1 moving inward on sorted arrays), (2) Same Direction (slow and fast pointers for in-place array manipulation).",
            why: "Transforms naive O(N^2) nested loop brute-force solutions into linear O(N) time with O(1) extra space.",
            how: "Sort the array first if not already sorted. Compare array[left] + array[right] against the target: increment left if sum is too small; decrement right if sum is too large.",
            keyPoints: [
              "When to use: Sorted arrays, searching for pairs/triplets (Two Sum II, 3Sum), container with most water, trapping rain water",
              "In-place filtering: Fast pointer scans, slow pointer writes (Remove Duplicates, Move Zeroes)",
              "Time: O(N) or O(N log N) if sorting required; Space: O(1)",
            ],
            interviewQuestions: [
              {
                question: "How do you solve 3Sum (finding all unique triplets [a, b, c] summing to 0) in O(N^2) time?",
                answer: "1. Sort the array. 2. Loop through the array with index i. 3. Skip duplicate numbers (nums[i] === nums[i-1]). 4. Use Two Pointers (left = i+1, right = n-1) to find pairs where nums[left] + nums[right] === -nums[i], skipping duplicate left/right values when a match is found.",
              },
            ],
          },
          codeExample: {
            title: "3Sum Algorithm Template (TypeScript)",
            code: `export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // Sum of 3 positive numbers can never be 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicate i

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicate left
        while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicate right
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Sliding Window Pattern",
          priority: "🔥",
          theory: {
            what: "The Sliding Window pattern maintains a sub-array/sub-string boundary defined by [windowStart, windowEnd]. As windowEnd expands rightward, the window state is updated. When a constraint is violated, windowStart shrinks from the left until the window is valid again.",
            why: "Avoids recomputing contiguous sub-arrays/sub-strings from scratch, reducing time complexity from O(N^2) or O(N^3) to O(N).",
            how: "Two primary variants: (1) Fixed Size Window (size k: add new element on right, drop oldest on left), (2) Dynamic Size Window (expand right until invalid, then shrink left to find shortest/longest valid window).",
            keyPoints: [
              "When to use: Contiguous sub-array or sub-string problems (Longest Substring Without Repeating Characters, Minimum Window Substring, Max Consecutive Ones III)",
              "Use a Hash Map or Frequency Array to track character counts inside the current window",
              "Each element enters and leaves the window at most once -> Strict O(N) amortized time",
            ],
            interviewQuestions: [
              {
                question: "How do you find the Longest Substring Without Repeating Characters in O(N) time?",
                answer: "Use a Dynamic Sliding Window and a Map storing each character's last seen index. Expand the right pointer; if char is in the map and within the current window, jump the left pointer to map.get(char) + 1. Update max length at each step.",
              },
            ],
          },
          codeExample: {
            title: "Longest Substring Without Repeating Characters Template",
            code: `export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let maxLength = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const char = s[windowEnd];
    if (lastSeen.has(char) && lastSeen.get(char)! >= windowStart) {
      // Shrink window past the previous duplicate instance
      windowStart = lastSeen.get(char)! + 1;
    }
    lastSeen.set(char, windowEnd);
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Fast & Slow Pointers (Floyd's Cycle Finding)",
          priority: "🔥",
          theory: {
            what: "Also known as the Tortoise and Hare algorithm. The Slow pointer moves 1 step per iteration, while the Fast pointer moves 2 steps. If a cycle exists, the fast pointer will inevitably lap and meet the slow pointer.",
            why: "Detects cycles in Linked Lists and mathematical sequences with O(1) auxiliary space (eliminating the need for a Hash Set to track visited nodes).",
            how: "Move slow = slow.next, fast = fast.next?.next. If slow === fast, a cycle is detected. To find the cycle entry node: reset slow to head, then advance both pointers 1 step at a time until they collide.",
            keyPoints: [
              "When to use: Linked List Cycle, Find Middle Node of Linked List, Palindrome Linked List, Happy Number",
              "Finding the middle of a Linked List: When fast reaches the end (fast === null || fast.next === null), slow is exactly at the midpoint",
              "Mathematical cycle detection: Used in Find the Duplicate Number in an array of size N+1",
            ],
            interviewQuestions: [
              {
                question: "Why do the fast and slow pointers meet at the cycle entry when one pointer is reset to head?",
                answer: "Let distance from head to cycle start be L1, and distance from cycle start to meeting point be L2. Fast traveled twice the distance of Slow (2 * (L1 + L2) = L1 + L2 + k*C, where C is cycle length). Simplifying gives L1 = k*C - L2. Thus, moving one pointer from head and one from the meeting point at speed 1 guarantees they meet at the cycle entry.",
              },
            ],
          },
          codeExample: {
            title: "Linked List Cycle II (Find Entry Node) Template",
            code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  // 1. Detect if cycle exists
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      // 2. Find cycle start node
      let ptr1 = head;
      let ptr2 = slow;
      while (ptr1 !== ptr2) {
        ptr1 = ptr1!.next;
        ptr2 = ptr2!.next;
      }
      return ptr1;
    }
  }
  return null;
}`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "Merge Intervals Pattern",
          priority: "🔥",
          theory: {
            what: "The Merge Intervals pattern deals with overlapping intervals [start, end]. Intervals are sorted by their start times. Two intervals [A, B] and [C, D] overlap if C <= B; they merge into [min(A, C), max(B, D)].",
            why: "Standard pattern for scheduling, calendar booking, resource allocation, and timeline merging problems.",
            how: "1. Sort intervals by start time: intervals.sort((a, b) => a[0] - b[0]). 2. Iterate through intervals, comparing current interval with the last merged interval. If overlapping, update lastMerged.end = max(lastMerged.end, current.end); otherwise append current interval.",
            keyPoints: [
              "When to use: Merge Intervals, Insert Interval, Meeting Rooms I & II, Non-overlapping Intervals",
              "Meeting Rooms II (Minimum conference rooms required): Can be solved with Min-Heap of end times or Chronological Event sorting",
              "Time: O(N log N) for sorting; Space: O(N) to store merged results",
            ],
            interviewQuestions: [
              {
                question: "How do you find the minimum number of meeting rooms required for a set of time intervals?",
                answer: "Separate start times and end times into two sorted arrays. Iterate with two pointers: if current start time is earlier than the earliest end time, a new room is needed (rooms++ and advance start pointer); otherwise, a previous meeting finished (advance end pointer and start pointer).",
              },
            ],
          },
          codeExample: {
            title: "Merge Overlapping Intervals Template",
            code: `export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  // 1. Sort by interval start time
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlap detected: merge by taking maximum end time
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // Disjoint interval: push to result
      merged.push(current);
    }
  }

  return merged;
}`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Cyclic Sort Pattern",
          theory: {
            what: "The Cyclic Sort pattern solves problems involving arrays containing numbers in a given range (e.g. 1 to N or 0 to N). Because the numbers match the array indices, we can sort the array in O(N) time by placing each number at its correct index (number X belongs at index X - 1).",
            why: "Achieves O(N) time and O(1) space without standard O(N log N) comparison sorting or O(N) hash sets.",
            how: "Loop with while (i < n). If nums[i] !== nums[nums[i] - 1], swap nums[i] with the number at its target index. Otherwise, increment i.",
            keyPoints: [
              "When to use: Missing Number, Find All Duplicates in an Array, First Missing Positive",
              "First Missing Positive: Ignore numbers <= 0 or > N, place valid numbers in range 1..N at index num - 1",
              "Each number is swapped at most once to its final position -> Strict O(N) time complexity",
            ],
            interviewQuestions: [
              {
                question: "How do you find the First Missing Positive integer in O(N) time and O(1) extra space?",
                answer: "Use Cyclic Sort: iterate through the array, swapping positive integers in range [1, N] to index (num - 1). After sorting, iterate from 0 to N-1; the first index where nums[i] !== i + 1 corresponds to the missing positive integer (i + 1). If all match, return N + 1.",
              },
            ],
          },
          codeExample: {
            title: "First Missing Positive (Cyclic Sort) Template",
            code: `export function firstMissingPositive(nums: number[]): number {
  let i = 0;
  const n = nums.length;

  while (i < n) {
    const correctIdx = nums[i] - 1;
    // If number is in range [1, n] and not already at its correct position: swap
    if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correctIdx]) {
      const temp = nums[i];
      nums[i] = nums[correctIdx];
      nums[correctIdx] = temp;
    } else {
      i++;
    }
  }

  // Find first index that does not match i + 1
  for (let j = 0; j < n; j++) {
    if (nums[j] !== j + 1) {
      return j + 1;
    }
  }

  return n + 1;
}`,
          },
        },
      ],
    },
    {
      id: "trees-graphs",
      title: "Trees, Heaps & Graphs",
      icon: "🌳",
      heroTitle: "🌳 Trees, Heaps & Graph Traversal Patterns",
      heroSubtitle: "BFS level-order, DFS recursion, Two Heaps, and Topological Sort",
      heroGradient: "from-emerald-600 via-teal-600 to-cyan-700",
      concepts: [
        {
          id: "6",
          number: 6,
          title: "Tree Breadth-First Search (BFS)",
          priority: "🔥",
          theory: {
            what: "Tree BFS explores tree nodes level by level from top to bottom using a FIFO Queue. By measuring the queue length at the start of each level (levelSize = queue.length), all nodes at the current depth are processed together.",
            why: "Essential for finding the shortest path in unweighted trees/graphs, right-side views, and level averages.",
            how: "Initialize queue with root. While queue is not empty: loop levelSize times, dequeue current node, process value, and enqueue left/right children.",
            keyPoints: [
              "When to use: Binary Tree Level Order Traversal, Zigzag Level Order, Right Side View, Minimum Depth of Binary Tree",
              "Queue size snapshot (const levelSize = queue.length) is the key idiom to separate levels",
              "Time: O(N) visits every node once; Space: O(W) where W is the maximum tree width (up to N/2 nodes at leaf level)",
            ],
            interviewQuestions: [
              {
                question: "How do you find the Right Side View of a Binary Tree using BFS?",
                answer: "Perform a level-order BFS traversal. For each level, loop from 0 to levelSize - 1. When index === levelSize - 1 (the last node processed at that level), append its value to the result array.",
              },
            ],
          },
          codeExample: {
            title: "Binary Tree Level-Order & Right Side View Template",
            code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

export function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      // If last node in current level: add to right side view
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}`,
          },
        },
        {
          id: "7",
          number: 7,
          title: "Tree Depth-First Search (DFS) & LCA",
          priority: "🔥",
          theory: {
            what: "Tree DFS explores deep into subtrees before backtracking, using recursion or an explicit Stack. Traversals include Pre-order (Node, Left, Right), In-order (Left, Node, Right — sorted for BSTs), and Post-order (Left, Right, Node — bottom-up evaluation). Lowest Common Ancestor (LCA) finds the deepest shared ancestor node.",
            why: "Fundamental for tree validation, path calculations, serialization, and diameter problems.",
            how: "Bottom-up recursion: Compute results on left and right subtrees first, then combine at the parent node and return to the caller.",
            keyPoints: [
              "When to use: Lowest Common Ancestor (LCA), Diameter of Binary Tree, Path Sum I/II/III, Validate BST, Max Path Sum",
              "In-order traversal of a Binary Search Tree (BST) produces strictly ascending values",
              "Time: O(N); Space: O(H) call stack height (O(log N) for balanced trees, O(N) for skewed trees)",
            ],
            interviewQuestions: [
              {
                question: "How do you find the Lowest Common Ancestor (LCA) of two nodes p and q in a Binary Tree?",
                answer: "Use Post-order DFS. If current node is null, p, or q, return current node. Recursively search left and right subtrees. If both left and right return non-null, current node is the LCA (p and q are in different subtrees). Otherwise, return whichever subtree returned non-null.",
              },
            ],
          },
          codeExample: {
            title: "Lowest Common Ancestor (LCA) Algorithm Template",
            code: `export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // Base case: reached leaf, or found p, or found q
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // If p and q found in opposite subtrees, current root is their LCA
  if (left && right) return root;

  // Otherwise return the non-null branch
  return left ? left : right;
}`,
          },
        },
        {
          id: "8",
          number: 8,
          title: "Two Heaps Pattern (Median Stream)",
          priority: "🔥",
          theory: {
            what: "The Two Heaps pattern divides data into two halves using a Max-Heap (stores smaller half) and a Min-Heap (stores larger half). The median is calculated instantly from the heap roots.",
            why: "Maintains running median in O(log N) insertion time and O(1) lookup time, whereas re-sorting on every stream item costs O(N log N).",
            how: "Balance property: Max-heap has either equal size or 1 more element than Min-heap. The median is either the top of Max-heap (odd count) or average of both tops (even count).",
            keyPoints: [
              "When to use: Find Median from Data Stream, Sliding Window Median, IPO / Project Capital maximization",
              "Top 'K' Elements: Min-Heap of size K maintains top K largest elements in O(N log K) time",
              "JavaScript lacks a built-in Heap; use array-based binary heap implementation in interviews",
            ],
            interviewQuestions: [
              {
                question: "How do you find the Kth Largest Element in an unsorted array efficiently?",
                answer: "1. Min-Heap of size K: Insert elements; if heap size > K, pop minimum. Top of heap is the Kth largest in O(N log K) time and O(K) space. 2. QuickSelect: Average O(N) time with O(1) space using Dutch National Flag partitioning.",
              },
            ],
          },
          codeExample: {
            title: "Two Heaps Median Finder Concept (TypeScript)",
            code: `// Conceptual MedianFinder balancing Max-Heap (lower half) & Min-Heap (upper half)
export class MedianFinder {
  private small: number[] = []; // Max-heap: holds smaller half
  private large: number[] = []; // Min-heap: holds larger half

  addNum(num: number): void {
    // 1. Always push to small, then rebalance top to large
    this.small.push(num);
    this.small.sort((a, b) => b - a); // In production use Binary Heap

    const maxSmall = this.small.shift()!;
    this.large.push(maxSmall);
    this.large.sort((a, b) => a - b);

    // 2. Maintain size invariant (small size >= large size)
    if (this.large.length > this.small.length) {
      const minLarge = this.large.shift()!;
      this.small.unshift(minLarge);
    }
  }

  findMedian(): number {
    if (this.small.length > this.large.length) {
      return this.small[0]; // Odd total count
    }
    return (this.small[0] + this.large[0]) / 2; // Even total count
  }
}`,
          },
        },
        {
          id: "9",
          number: 9,
          title: "Graph BFS/DFS & Topological Sort",
          priority: "🔥",
          theory: {
            what: "Graphs represent networks of vertices and edges (directed/undirected, cyclic/acyclic). Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, U comes before V (Kahn's Algorithm via In-Degree array).",
            why: "Topological Sort is the standard algorithm for package build dependencies (npm/pip), task scheduling, and course prerequisites.",
            how: "Kahn's Algorithm (BFS): 1. Compute in-degree (number of incoming edges) for all nodes. 2. Push all nodes with in-degree = 0 to queue. 3. Dequeue node, add to ordering, decrement in-degree of its neighbors. If neighbor in-degree reaches 0, push to queue. If processed nodes !== total nodes, a cycle exists!",
            keyPoints: [
              "When to use: Course Schedule I & II, Alien Dictionary, Number of Islands, Clone Graph",
              "Cycle Detection in DAG: If topological sort result length < numCourses, a dependency cycle exists",
              "Number of Islands: Grid-based DFS/BFS flood-fill (sink visited land to '0')",
            ],
            interviewQuestions: [
              {
                question: "How do you detect a cycle in a Directed Graph (Course Schedule problem)?",
                answer: "Use Kahn's Algorithm (BFS Topological Sort) or 3-Color DFS (WHITE=unvisited, GRAY=in current recursion stack, BLACK=fully processed). If DFS encounters a GRAY node, a back-edge (cycle) exists.",
              },
            ],
          },
          codeExample: {
            title: "Course Schedule / Topological Sort (Kahn's Algorithm Template)",
            code: `export function canFinishCourses(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adjList = new Map<number, number[]>();

  // 1. Build Adjacency List and compute In-Degree
  for (const [course, pre] of prerequisites) {
    inDegree[course]++;
    if (!adjList.has(pre)) adjList.set(pre, []);
    adjList.get(pre)!.push(course);
  }

  // 2. Add all courses with 0 prerequisites (in-degree 0) to queue
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completedCount = 0;

  // 3. Process BFS
  while (queue.length > 0) {
    const current = queue.shift()!;
    completedCount++;

    const neighbors = adjList.get(current) || [];
    for (const neighbor of neighbors) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If completedCount === numCourses, all courses can be taken (No Cycle)
  return completedCount === numCourses;
}`,
          },
        },
        {
          id: "10",
          number: 10,
          title: "Modified Binary Search",
          priority: "🔥",
          theory: {
            what: "Modified Binary Search applies O(log N) divide-and-conquer on sorted, partially sorted (Rotated Sorted Array), or monotonic search spaces (Binary Search on Answer).",
            why: "Reduces search space by half at each comparison, achieving logarithmic time.",
            how: "Calculate mid = left + Math.floor((right - left) / 2) to avoid 32-bit integer overflow. In rotated arrays, determine which half (left or right) is sorted, and check if target falls inside that sorted range.",
            keyPoints: [
              "When to use: Search in Rotated Sorted Array, Find Peak Element, Koko Eating Bananas, Capacity To Ship Packages",
              "Binary Search on Answer: When question asks for 'minimum capacity / maximum speed to accomplish X in T days', search range [min_possible, max_possible] with a canComplete() helper function",
              "Mid calculation: left + ((right - left) >> 1) avoids integer overflow",
            ],
            interviewQuestions: [
              {
                question: "How does Search in Rotated Sorted Array work in O(log N) time?",
                answer: "At any mid index in a rotated array, at least one half (left to mid OR mid to right) is guaranteed to be strictly sorted. 1. Check if nums[left] <= nums[mid] (left half sorted). If target is within [nums[left], nums[mid]], search left; else search right. 2. Otherwise right half is sorted; check if target is within [nums[mid], nums[right]].",
              },
            ],
          },
          codeExample: {
            title: "Search in Rotated Sorted Array Template",
            code: `export function searchRotatedArray(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    // Check if left half is normally sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1; // Target in left half
      } else {
        left = mid + 1;  // Target in right half
      }
    } else {
      // Right half is normally sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;  // Target in right half
      } else {
        right = mid - 1; // Target in left half
      }
    }
  }

  return -1;
}`,
          },
        },
      ],
    },
    {
      id: "advanced-complexity",
      title: "Backtracking, DP & Big-O",
      icon: "⚡",
      heroTitle: "⚡ Backtracking, Dynamic Programming & Complexity",
      heroSubtitle: "Permutations, 0/1 Knapsack, Coin Change, and Big-O Reference Cheat Sheet",
      heroGradient: "from-rose-600 via-purple-700 to-indigo-800",
      concepts: [
        {
          id: "11",
          number: 11,
          title: "Subsets, Permutations & Backtracking",
          priority: "🔥",
          theory: {
            what: "Backtracking builds candidates incrementally and abandons ('backtracks') as soon as a candidate cannot lead to a valid solution. Follows the standard template: (1) Base Case / Goal check, (2) Loop through choices, (3) Make Choice, (4) Recurse, (5) Undo Choice (Backtrack).",
            why: "Solves exhaustive combinatorial search problems (Subsets 2^N, Permutations N!, Combinations N choose K, Sudoku, N-Queens).",
            how: "Pass current path array and track visited state. Pop from path array immediately after recursive call returns.",
            keyPoints: [
              "Subsets / Combinations: Pass startIndex to avoid duplicate combinations and enforce forward ordering",
              "Permutations: Use a boolean visited[] array or swap in-place to explore all element orderings",
              "Pruning: Sort array and break early if current number exceeds remaining target (e.g. Combination Sum)",
            ],
            interviewQuestions: [
              {
                question: "What is the general 3-step template for Backtracking problems?",
                answer: "1. Base case: If current state satisfies target, clone and save path to results (result.push([...path])). 2. Iterate choices: For each candidate, check constraints (pruning). 3. Choose, Recurse, and Backtrack: path.push(choice) -> backtrack(nextState) -> path.pop().",
              },
            ],
          },
          codeExample: {
            title: "Combination Sum Backtracking Template",
            code: `export function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];

  function backtrack(startIdx: number, remain: number, path: number[]) {
    if (remain === 0) {
      result.push([...path]); // Found valid combination
      return;
    }

    for (let i = startIdx; i < candidates.length; i++) {
      if (candidates[i] > remain) break; // Prune: candidates are sorted

      path.push(candidates[i]);               // 1. Make choice
      backtrack(i, remain - candidates[i], path); // 2. Recurse (i allows reuse of same element)
      path.pop();                             // 3. Undo choice (backtrack)
    }
  }

  backtrack(0, target, []);
  return result;
}`,
          },
        },
        {
          id: "12",
          number: 12,
          title: "Dynamic Programming: Knapsack & Subsequences",
          priority: "🔥",
          theory: {
            what: "Dynamic Programming (DP) solves complex problems by breaking them down into overlapping subproblems with optimal substructure. Techniques include: (1) Top-Down with Memoization (Recursion + Cache), (2) Bottom-Up Tabulation (Iterative table building).",
            why: "Transforms exponential O(2^N) recursive branching into polynomial O(N * Capacity) or O(N^2) time.",
            how: "Identify DP State (e.g. dp[i][w] = max value using first i items with weight w), write the Recurrence Relation, define Base Cases, and optimize space (e.g. 1D rolling array).",
            keyPoints: [
              "0/1 Knapsack: Each item can be picked at most once (iterate weight backwards in 1D array)",
              "Unbounded Knapsack / Coin Change: Items can be picked unlimited times (iterate weight forwards)",
              "Longest Common Subsequence (LCS) / Edit Distance: 2D grid DP comparing prefixes of two strings",
            ],
            interviewQuestions: [
              {
                question: "How do you solve the Coin Change (Minimum Coins to make amount) problem using DP?",
                answer: "Define dp[i] as the minimum coins needed for amount i. Initialize array of size amount + 1 filled with Infinity, with dp[0] = 0. Loop i from 1 to amount, and for each coin: if coin <= i, dp[i] = min(dp[i], dp[i - coin] + 1). Return dp[amount] === Infinity ? -1 : dp[amount].",
              },
            ],
          },
          codeExample: {
            title: "Coin Change (Bottom-Up 1D DP Template)",
            code: `export function coinChange(coins: number[], amount: number): number {
  // dp[i] represents minimum coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
          },
        },
        {
          id: "13",
          number: 13,
          title: "Big-O Time & Space Complexity Reference",
          priority: "🔥",
          theory: {
            what: "Big-O notation describes the upper bound limiting behavior of an algorithm's execution time or memory as input size N grows towards infinity. Common complexities: O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).",
            why: "Every coding interview problem requires stating and justifying time and auxiliary space complexity before writing code.",
            how: "Count fundamental operations and maximum memory allocations (recursion call stack height, hash maps, result buffers).",
            keyPoints: [
              "Array / Dynamic Array: Access O(1), Search O(N), Insert/Delete End O(1) amortized, Insert/Delete Middle O(N)",
              "Hash Table: Average Search/Insert/Delete O(1); Worst case O(N) during hash collision degradation",
              "Binary Search Tree (Balanced / Red-Black): Search/Insert/Delete O(log N)",
              "Binary Heap: Get Min/Max O(1), Insert O(log N), Extract Min/Max O(log N)",
            ],
            interviewQuestions: [
              {
                question: "Compare MergeSort vs QuickSort time and space complexities.",
                answer: "MergeSort guarantees O(N log N) time in all cases (best, average, worst) but requires O(N) auxiliary space for merging arrays. QuickSort runs in average O(N log N) time with O(log N) in-place stack space, but degrades to O(N^2) worst-case time if a poor pivot is selected on sorted inputs.",
              },
            ],
          },
          codeExample: {
            title: "Data Structure & Algorithm Complexity Cheat Sheet",
            code: `/*
================================================================================
DATA STRUCTURE COMPLEXITY
================================================================================
Data Structure         | Access (Avg) | Search (Avg) | Insert (Avg) | Delete (Avg) | Space
Array / Vector         | O(1)         | O(N)         | O(N)         | O(N)         | O(N)
Stack / Queue          | O(N)         | O(N)         | O(1)         | O(1)         | O(N)
Singly Linked List     | O(N)         | O(N)         | O(1)         | O(1)         | O(N)
Hash Table (Map/Set)   | N/A          | O(1)         | O(1)         | O(1)         | O(N)
Binary Search Tree     | O(log N)     | O(log N)     | O(log N)     | O(log N)     | O(N)
Binary Heap (Min/Max)  | O(1) (peak)  | O(N)         | O(log N)     | O(log N)     | O(N)

================================================================================
SORTING ALGORITHMS COMPLEXITY
================================================================================
Algorithm              | Best Time    | Average Time | Worst Time   | Space Complexity
QuickSort              | O(N log N)   | O(N log N)   | O(N^2)       | O(log N)
MergeSort              | O(N log N)   | O(N log N)   | O(N log N)   | O(N)
HeapSort               | O(N log N)   | O(N log N)   | O(N log N)   | O(1)
TimSort (Array.sort)   | O(N)         | O(N log N)   | O(N log N)   | O(N)
*/`,
          },
        },
        {
          id: "14",
          number: 14,
          title: "Monotonic Stack & Monotonic Queue",
          priority: "🔥",
          theory: {
            what: "A Monotonic Stack maintains its elements in strictly increasing or decreasing order. As you iterate through an array, elements smaller/larger than the current element are popped. A Monotonic Deque maintains order at both ends to find minimum/maximum in a sliding window in O(1) amortized time.",
            why: "Reduces O(N^2) range-lookup problems (e.g. finding the next higher temperature or largest rectangle under skyline) to linear O(N) time because each element is pushed and popped at most once.",
            how: "Monotonic Decreasing Stack: While stack is non-empty and nums[current] > nums[stack.top()]: pop top and record current as its 'Next Greater Element'. Push current index.",
            keyPoints: [
              "When to use: Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water, Sliding Window Maximum",
              "Store array INDICES in the stack (not values) to calculate distances and width spans easily",
              "Time: Strict O(N); Space: O(N)",
            ],
            interviewQuestions: [
              {
                question: "How do you solve the Daily Temperatures problem (how many days until a warmer temperature) in O(N) time?",
                answer: "Use a Monotonic Decreasing Stack storing indices. Iterate i from 0 to N-1: while stack has elements and temperatures[i] > temperatures[stack.top()], pop prevIndex and set result[prevIndex] = i - prevIndex. Push i to stack. Remaining stack indices get 0.",
              },
            ],
          },
          codeExample: {
            title: "Daily Temperatures (Monotonic Stack Template)",
            code: `export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack: number[] = []; // Monotonic Decreasing Stack of indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      result[prevIdx] = i - prevIdx; // Calculate days distance
    }
    stack.push(i);
  }

  return result;
}`,
          },
        },
        {
          id: "15",
          number: 15,
          title: "Trie (Prefix Tree) & Autocomplete",
          priority: "🔥",
          theory: {
            what: "A Trie (Prefix Tree) is a specialized n-ary search tree used for efficient storage and retrieval of strings. Each node represents a single character; all descendants of a node share a common string prefix.",
            why: "Searches prefixes, spell-checks, and generates autocomplete suggestions in O(L) time (where L is word length), independent of dictionary size N.",
            how: "Node structure: children Map<char, TrieNode> + boolean isEndOfWord. Insert: Walk/create nodes character by character; mark last node as end. StartsWith: Traverse characters; if any character path missing return false.",
            keyPoints: [
              "When to use: Autocomplete systems, Typeahead, IP routing (Longest Prefix Match), Word Search II",
              "Word Search II: Combine 2D Grid DFS Backtracking with a Trie to search thousands of dictionary words in parallel without duplicate board scans",
              "Time: Insert/Search/StartsWith O(L); Space: O(ALPHABET_SIZE * N * L)",
            ],
            interviewQuestions: [
              {
                question: "How does a Trie achieve faster prefix searches than a Hash Set?",
                answer: "A Hash Set takes O(L) to compute the hash and can only look up exact whole words (prefix matching requires scanning all N entries in O(N*L)). A Trie directly traverses the prefix path in exactly O(L) steps, instantly determining if any word begins with that prefix.",
              },
            ],
          },
          codeExample: {
            title: "Trie (Prefix Tree) Implementation (TypeScript)",
            code: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char)!;
    }
    return current.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char)!;
    }
    return true; // Valid prefix found
  }
}`,
          },
        },
        {
          id: "16",
          number: 16,
          title: "Disjoint Set Union (Union-Find / DSU)",
          priority: "🔥",
          theory: {
            what: "Disjoint Set Union (DSU / Union-Find) maintains a collection of disjoint non-overlapping sets. Supports two primary operations: find(x) (finds the representative root of x's set) and union(x, y) (merges the sets containing x and y).",
            why: "Determines graph connectivity and cycle existence in near-constant O(α(N)) time (inverse Ackermann function, effectively ≤ 4).",
            how: "Two optimizations make DSU optimal: (1) Path Compression in find() (flattens tree by pointing visited nodes directly to root), (2) Union by Rank / Size in union() (attaches smaller tree under root of larger tree).",
            keyPoints: [
              "When to use: Number of Connected Components in Undirected Graph, Redundant Connection (Cycle detection), Accounts Merge, Kruskal's MST",
              "Cycle Detection in Undirected Graph: If union(u, v) returns false (u and v already share same root), edge (u, v) forms a cycle!",
              "Time: O(α(N)) ≈ O(1) amortized per operation; Space: O(N)",
            ],
            interviewQuestions: [
              {
                question: "What are Path Compression and Union by Rank in Union-Find?",
                answer: "Path Compression makes every node along the find path point directly to the root, keeping trees extremely flat. Union by Rank always attaches the tree with smaller depth under the root of the tree with greater depth, preventing unbalanced linked-list degradation.",
              },
            ],
          },
          codeExample: {
            title: "Union-Find (DSU with Path Compression & Rank Template)",
            code: `export class UnionFind {
  private parent: number[];
  private rank: number[];
  public count: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n; // Number of connected components
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already in same set (Cycle!)

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--;
    return true;
  }
}`,
          },
        },
        {
          id: "17",
          number: 17,
          title: "Dijkstra's Shortest Path Algorithm",
          priority: "🔥",
          theory: {
            what: "Dijkstra's Algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights using a Greedy approach powered by a Min-Heap Priority Queue.",
            why: "The foundation of network packet routing (OSPF protocol), GPS mapping turn-by-turn navigation, and network latency optimization.",
            how: "1. Initialize distances array dist[] = Infinity, with dist[source] = 0. 2. Push [0, source] to Min-Heap. 3. Pop node with smallest distance [d, u]. If d > dist[u], skip (stale). 4. For each neighbor (v, weight): if dist[u] + weight < dist[v], update dist[v] and push [dist[v], v] to heap.",
            keyPoints: [
              "Negative edge weights: Dijkstra fails with negative weights (use Bellman-Ford instead)",
              "Time: O((V + E) log V) with Binary Min-Heap Priority Queue; Space: O(V + E)",
              "Network Delay Time & Cheapest Flights Within K Stops: Common LeetCode variants",
            ],
            interviewQuestions: [
              {
                question: "Why does Dijkstra's Algorithm fail if a graph contains negative edge weights?",
                answer: "Dijkstra greedily marks a node as 'visited/finalized' once popped from the Min-Heap, assuming no future path can yield a smaller distance. A negative edge weight later in the graph violates this assumption, requiring distance updates to already finalized nodes (which Dijkstra will not do).",
              },
            ],
          },
          codeExample: {
            title: "Dijkstra's Shortest Path Algorithm (TypeScript)",
            code: `export function networkDelayTime(times: number[][], n: number, k: number): number {
  // Build adjacency list: node -> [[neighbor, weight], ...]
  const adj = new Map<number, [number, number][]>();
  for (const [u, v, w] of times) {
    if (!adj.has(u)) adj.set(u, []);
    adj.get(u)!.push([v, w]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Min-Heap simulated with priority array: [distance, node]
  const pq: [number, number][] = [[0, k]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // Smallest distance first
    const [d, u] = pq.shift()!;

    if (d > dist[u]) continue; // Stale heap entry

    for (const [v, weight] of adj.get(u) || []) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push([dist[v], v]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1; // Unreachable node
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}`,
          },
        },
        {
          id: "18",
          number: 18,
          title: "Bit Manipulation Tricks & Bitmasks",
          theory: {
            what: "Bit manipulation performs direct bitwise operations (AND &, OR |, XOR ^, NOT ~, Left Shift <<, Right Shift >>) on binary representations of numbers at machine-level speeds in O(1) time and O(1) space.",
            why: "Unlocks space-efficient algorithms, subset state tracking, and classic trick interview questions.",
            how: "Key Bit Tricks: (1) n & (n - 1) clears the lowest set bit (Brian Kernighan's bit-counting). (2) n & -n isolates the lowest set bit. (3) x ^ x = 0 and x ^ 0 = x (XOR cancellation). (4) (1 << k) creates a bitmask with only the k-th bit set.",
            keyPoints: [
              "Single Number I: XOR all numbers together; identical pairs cancel out to 0, leaving the unique element",
              "Power of Two: n > 0 && (n & (n - 1)) === 0",
              "Bitmask Subsets: Represent presence/absence of N items as an integer from 0 to (1 << N) - 1",
            ],
            interviewQuestions: [
              {
                question: "How does Brian Kernighan's Algorithm count the number of 1-bits in an integer efficiently?",
                answer: "The expression n & (n - 1) flips the lowest (rightmost) set 1-bit of n to 0. By looping while (n !== 0) { n = n & (n - 1); count++; }, the loop executes exactly as many times as there are 1-bits (rather than checking all 32 bits).",
              },
            ],
          },
          codeExample: {
            title: "Bit Manipulation Essential Helper Tricks",
            code: `// 1. Single Number: Find the element appearing once while others appear twice
export function singleNumber(nums: number[]): number {
  return nums.reduce((acc, num) => acc ^ num, 0);
}

// 2. Hamming Weight: Count set bits in O(k) where k = number of 1s
export function countSetBits(n: number): number {
  let count = 0;
  let num = n;
  while (num !== 0) {
    num = num & (num - 1); // Clears rightmost set bit
    count++;
  }
  return count;
}

// 3. Check if Number is a Power of Two
export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,
          },
        },
      ],
    },
  ],
};
