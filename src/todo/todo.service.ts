import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = await this.todoRepository.save(createTodoDto) 
      return todo
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      const todos = await this.todoRepository.find()
      return todos
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOneBy({id})

      if (!todo) {
        throw new NotFoundException(`Todo ${id} not found`)
      }

      return todo
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = await this.findOne(id)
      Object.assign(todo, updateTodoDto)
      const newTodo = await this.todoRepository.save(todo)
      return newTodo
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.todoRepository.softDelete({id})
      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
