import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TodoStatus } from "../enums/todo-status.enum"

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  description: string

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus
}
