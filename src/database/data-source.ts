import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import 'dotenv/config'
import { resolve } from 'path'
import { Todo } from '../todo/entities/todo.entity'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env

export function createDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: NODE_ENV === 'development' ? 'localhost' : DB_HOST,
    port: +(DB_PORT || 5432),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: NODE_ENV === 'development',
    entities: [Todo],
    migrations: [resolve(__dirname, '**/migrations/**/*{.ts,.js}')],
    // subscribers: [resolve(__dirname, '**/subscribers/**/*{.ts,.js}']
  }
}

export const AppDataSource = new DataSource(createDataSourceOptions())
