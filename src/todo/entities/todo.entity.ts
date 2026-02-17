import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TodoStatus } from "../enums/todo-status.enum"
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  dueDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date | null

  @DeleteDateColumn()
  deletedAt: Date | null

}
