import axios from 'axios';
import { ApiMessage, DeepseekResponse } from '../types';

const API_URL = 'https://api.openai.com/v1/chat/completions';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getChatCompletion = async (
  messages: ApiMessage[], 
  leetCodeUrl = ''
): Promise<string> => {
  try {
    const systemPrompt: ApiMessage = {
      role: 'system',
      content: generateSystemPrompt(leetCodeUrl)
    };
    
    const formattedMessages: ApiMessage[] = [systemPrompt, ...messages];
    
    const response = await axios.post<DeepseekResponse>(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI. Please try again.');
  }
};

const generateSystemPrompt = (leetCodeUrl: string): string => {
  let prompt = `
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

  if (leetCodeUrl && leetCodeUrl.includes('leetcode.com/problems/')) {
    const problemName = leetCodeUrl.split('/problems/')[1].split('/')[0].replace(/-/g, ' ');
    prompt += `\nThe student is currently working on the LeetCode problem "${problemName}".`;
  }

  return prompt;
};

export default { getChatCompletion };
