import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, ServiceUnavailableException } from "@nestjs/common";
import Groq from "groq-sdk";
import { TodoSuggestionDto } from "./dto/todo-suggestion.dto";
import { TodoSuggestionResponse } from "./interfaces/todo-suggestion.interface";
import { ConfigService } from "@nestjs/config";
import { buildTodoSuggestionPrompt, TODO_SUGGESTION_SYSTEM_PROMPT } from "./prompts/todo-suggestion.prompt";

@Injectable()
export class SuggestionService {
  private readonly logger = new Logger(SuggestionService.name)

  constructor(
    @Inject('AI_CLIENT')
    private client: Groq,

    @Inject()
    private config: ConfigService
  ) {}

  async suggestTodoDetail(payload: TodoSuggestionDto): Promise<TodoSuggestionResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.config.get<string>('LLM_MODEL') as string,
        temperature: +(this.config.get<number>('LLM_TEMPERATURE') ?? 0.7),
        response_format: {
          type: 'json_object'
        },
        messages: [
          {
            role: 'system',
            content: TODO_SUGGESTION_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: buildTodoSuggestionPrompt(payload),
          }
        ]
      })

      const content = response.choices[0]?.message?.content
      if (!content) throw new Error('No AI response')

      this.logger.log(`AI tokens: ${JSON.stringify(response.usage)}`)

      const raw = JSON.parse(content)

      // ✅ Transform string → Date
      return {
        description: raw.description,
        suggestedDateTime: new Date(raw.suggestedDateTime),
        reasoning: raw.reasoning,
      }
    } catch (error) {
      this.handleAIError(error)
    }
  }

  private handleAIError(error: any): never {
    // Log error details
    this.logger.error('Groq API error:', {
      message: error.message,
      status: error.status,
      code: error.code,
    })

    // 401 - Invalid API Key
    if (error.status === 401) {
      throw new InternalServerErrorException('AI service authentication failed')
    }

    // 429 - Rate Limit
    if (error.status === 429) {
      throw new ServiceUnavailableException(
        'AI service is temporarily unavailable due to rate limiting. Please try again later.',
      )
    }

    // 400 - Bad Request
    if (error.status === 400) {
      this.logger.error('Bad request to Groq:', error.message)
      throw new BadRequestException(
        'Invalid request to AI service. Please check your input.',
      )
    }

    // 500+ - Server Error
    if (error.status >= 500) {
      throw new ServiceUnavailableException(
        'AI service is temporarily unavailable. Please try again later.',
      )
    }

    // Network errors (no status)
    if (!error.status && error.code === 'ENOTFOUND') {
      throw new ServiceUnavailableException(
        'Cannot connect to AI service. Please check your network.',
      )
    }

    // Timeout
    if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
      throw new ServiceUnavailableException(
        'AI service request timed out. Please try again.',
      )
    }

    // Unknown error
    throw new InternalServerErrorException(
      'An unexpected error occurred with the AI service',
    )
  }
}
