import { ProblemSolvingStage, PromptContext } from '../types';

/**
 * Main system prompt for the teaching assistant
 */
export const SYSTEM_PROMPT = `
You are an expert DSA (Data Structures and Algorithms) teaching assistant. Your goal is to help students understand LeetCode problems and develop their problem-solving skills without giving away direct solutions.

Guidelines:
1. Never provide complete solutions or working code that solves the entire problem.
2. Focus on guiding questions that lead students to discover the solution themselves.
3. Provide hints, not answers. Suggest relevant data structures or algorithms.
4. Encourage step-by-step thinking and logical reasoning.
5. If appropriate, provide small code snippets to illustrate concepts, but never the full solution.
6. Use Socratic questioning to help students arrive at insights themselves.
7. If students are completely stuck, provide progressively more specific hints.
8. Relate the current problem to similar classic problems they might have seen before.

Your responses should be supportive, encouraging, and foster independent learning.
`;

/**
 * Prompts for different stages of problem-solving
 */
export const PROMPTS: Record<ProblemSolvingStage, string> = {
  // For understanding the problem
  UNDERSTAND_PROBLEM: `
Let's first make sure we understand the problem correctly:
1. What are the inputs to this problem?
2. What are the expected outputs?
3. Are there any constraints or edge cases we need to consider?
4. Can you come up with a simple example to test our understanding?
  `,
  
  // For identifying useful data structures
  DATA_STRUCTURE_GUIDANCE: `
When approaching this problem, think about which data structures might be helpful:
- Arrays: Good for sequential data or when you need O(1) access by index
- Hash Maps: Useful for O(1) lookups, frequency counting, or mapping values
- Stacks: Helpful for problems involving LIFO (last-in-first-out) operations or parsing
- Queues: Good for FIFO (first-in-first-out) operations or BFS
- Linked Lists: Useful when you need to insert/delete frequently
- Trees: Good for hierarchical data or when you need a specific search order
- Heaps: Useful for getting min/max elements efficiently
- Graphs: Good for representing connections between items

Which of these structures seem most relevant to the problem at hand?
  `,
  
  // For identifying algorithmic patterns
  ALGORITHM_PATTERNS: `
This problem seems to fit into one or more common algorithmic patterns:
- Two Pointers: Often used for sorted arrays or string problems
- Sliding Window: Useful for subarray/substring problems
- Binary Search: Great for sorted arrays or finding a specific element
- BFS/DFS: Used for tree/graph traversal or search
- Dynamic Programming: Helpful when you need to build solutions from subproblems
- Greedy: Works when local optimal choices lead to a global optimum
- Backtracking: Useful for generating all valid combinations or permutations
- Divide and Conquer: Breaking a problem into smaller subproblems

Does one of these patterns seem applicable to your problem?
  `,
  
  // For approaching a solution step-by-step
  STEP_BY_STEP_APPROACH: `
Let's develop a step-by-step approach:
1. First, can we solve this problem with a simple brute force solution?
2. What's the time and space complexity of that approach?
3. Can we optimize it by using a different data structure?
4. Is there any redundant work we can eliminate?
5. Are there any patterns in the problem that we can leverage?

Let's start with step 1 and work through this methodically.
  `,
  
  // For struggling students
  PROGRESSIVE_HINTS: `
Here's a sequence of hints that get progressively more specific:

Hint 1: Think about what the key operation is that you need to perform repeatedly.

Hint 2: Consider how to efficiently look up or store information you've seen before.

Hint 3: This problem is related to the concept of [related concept] which typically uses [data structure or algorithm].

Let me know if you want to see the next hint, but try to solve it with just these first.
  `,
  
  // For time/space complexity analysis
  COMPLEXITY_ANALYSIS: `
Let's analyze the time and space complexity of your approach:

Time Complexity:
- What operations are in your main loops?
- How many times does each operation run?
- Are there any nested loops or recursive calls?

Space Complexity:
- What additional data structures are you using?
- Do they scale with the input size?
- Is there any way to reduce the space needed?
  `,
  
  // For connecting to similar problems
  RELATED_PROBLEMS: `
This problem is similar to some classic problems you might have seen before:
- [Related problem 1]: The technique used there is...
- [Related problem 2]: The key insight from that problem is...

Understanding these connections helps build your problem-solving toolkit.
  `,
};

/**
 * Generates a prompt for a specific problem-solving stage
 * @param stage - The problem-solving stage
 * @param context - Additional context for the prompt
 * @returns The generated prompt
 */
export const generatePrompt = (
  stage: ProblemSolvingStage, 
  context: PromptContext = {}
): string => {
  const basePrompt = PROMPTS[stage] || '';
  
  // Customize prompt based on context
  let customizedPrompt = basePrompt;
  
  // Replace placeholders with context values
  Object.entries(context).forEach(([key, value]) => {
    customizedPrompt = customizedPrompt.replace(`[${key}]`, value);
  });
  
  return customizedPrompt;
};

export default {
  SYSTEM_PROMPT,
  PROMPTS,
  generatePrompt,
};