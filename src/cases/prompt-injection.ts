// Prompt injection vulnerabilities
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Direct user input concatenation to system prompt
export async function unsafeChatbot(userMessage: string) {
  const prompt = `You are a helpful assistant. User says: ${userMessage}`;
  
  return await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: prompt,
  });
}

// Unsafe template injection
export async function unsafeEmailGenerator(recipientName: string, userContent: string) {
  const systemPrompt = `Generate a professional email to ${recipientName}. Include this content: ${userContent}`;
  
  return await generateText({
    model: openai('gpt-4'),
    prompt: systemPrompt,
  });
}

export class VulnerableAIService {
  async processUserQuery(query: string, context: string) {
    // Direct injection of user input into system instructions
    const prompt = `
      System: You are a customer service bot. Follow these rules strictly.
      Context: ${context}
      User Query: ${query}
      
      Respond helpfully to the user query above.
    `;
    
    return await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: prompt,
    });
  }
  
  async translateText(text: string, targetLang: string) {
    // Unsafe prompt construction allowing instruction override
    return await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Translate the following to ${targetLang}: ${text}`,
    });
  }
}