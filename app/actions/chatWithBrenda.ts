'use server'

import { getResponse } from '@/lib/mockResponses'

export interface ChatResponse {
  message: string
  suggestions?: string[]
}

/**
 * Server Action for chat with Brenda
 * Fase A: Mock implementation with scripted responses
 * Fase B: Real LLM integration
 */
export async function chatWithBrenda(
  message: string,
  role: string | null = null,
  context?: string
): Promise<ChatResponse> {
  // Fase A: Mock response
  const response = getResponse(message, role)
  
  return {
    message: response,
    suggestions: [
      'Check my design',
      'Explain this guideline',
      'Validate my colors'
    ]
  }

  // Fase B: Real LLM implementation
  // const llmResponse = await callLLM(message, role, context)
  // return processLLMResponse(llmResponse)
}


