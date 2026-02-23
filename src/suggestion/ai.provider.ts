import Groq from "groq-sdk";
import { ConfigService } from "@nestjs/config";

export const AI_CLIENT = 'AI_CLIENT'

export const AiProvider = {
  provide: AI_CLIENT,
  useFactory: (config: ConfigService) => {
    return new Groq({ apiKey: config.get<string>('LLM_API_KEY') })
  },
  inject: [ConfigService]
}
