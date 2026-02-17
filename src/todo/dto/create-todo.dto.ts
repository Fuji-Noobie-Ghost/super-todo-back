import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TodoStatus } from "../enums/todo-status.enum"
import { Type } from "class-transformer"

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  description: string

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dueDate: Date
}
