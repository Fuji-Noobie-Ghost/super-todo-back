import { Module } from "@nestjs/common";
import { SuggestionService } from "./suggestion.service";
import { ConfigModule } from "@nestjs/config";
import { AiProvider } from "./ai.provider";

@Module({
  providers: [
    AiProvider,
    SuggestionService
  ],
  imports: [ConfigModule],
  exports: [SuggestionService]
})
export class SuggestionModule {}
