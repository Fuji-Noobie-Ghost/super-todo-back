import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SuggestionService } from 'src/suggestion/suggestion.service';
import { TodoSuggestionDto } from 'src/suggestion/dto/todo-suggestion.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly suggestionService: SuggestionService,
  ) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Post('suggestion')
  async suggestTodoDetail(@Body() dto: TodoSuggestionDto) {
    return this.suggestionService.suggestTodoDetail(dto)
  }
}
