# Super Todo Backend

A NestJS-based REST API for a Todo application with PostgreSQL database support.

## Features

- 📝 Full CRUD operations for todos
- 🗄️ PostgreSQL database with TypeORM
- 🐳 Docker support for easy deployment
- ✅ Request validation with class-validator
- 🏥 Health check endpoint
- 🔄 Soft delete support
- 📅 Due date tracking
- 📊 Status tracking (PENDING, COMPLETED)

## Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Package Manager**: pnpm
- **Container**: Docker

## Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm
- PostgreSQL (for local development without Docker)
- Docker & Docker Compose (optional, for containerized development)

### Installation

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Copy the environment example file and configure it:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:

```env
NODE_ENV=development
APP_PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=super_todo

LLM_API_KEY=
LLM_MODEL=
LLM_TEMPERATURE=
```

### Running with Docker (Recommended)

#### Using Helper Scripts

The project includes helper scripts in the `scripts/` directory for common Docker operations.

**First, make the scripts executable:**

```bash
chmod +x scripts/*.sh
```

**Then use them:**

```bash
# Development environment (uses docker-compose.dev.yml overrides)
./scripts/start-dev.sh    # Start dev containers
./scripts/stop-dev.sh     # Stop dev containers

# Production environment
./scripts/start-prod.sh   # Start production containers
./scripts/stop-prod.sh    # Stop production containers
```

#### Manual Docker Commands

```bash
# Development environment
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Production environment
docker compose -f docker-compose.yml up --build -d
docker compose -f docker-compose.yml down
```

#### View Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f todo-api
docker-compose logs -f todo-db
```

### Running Locally

```bash
# Development mode with watch
pnpm run start:dev

# Production mode
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

## API Endpoints

All endpoints are prefixed with `/api`

### Health Check

```
GET /api/health
```

Returns the health status of the application.

### Todos

```
POST   /api/todo       - Create a new todo
GET    /api/todo       - Get all todos
GET    /api/todo/:id   - Get a single todo by ID
PATCH  /api/todo/:id   - Update a todo
DELETE /api/todo/:id   - Soft delete a todo
```

#### Create Todo Request Body

```json
{
  "title": "My Task",
  "description": "Task description",
  "status": "PENDING",
  "dueDate": "2026-02-20T10:00:00Z"
}
```

#### Todo Status Enum

- `PENDING` - Task not yet started
- `COMPLETED` - Task finished

## Database Migrations

```bash
# Generate a new migration
pnpm run migration:generate -- src/database/migrations/<migration-name>

# Run pending migrations
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert

# Run migrations in production
pnpm run prod:migration:run
```

## Project Structure

```
src/
├── database/
│   ├── migrations/      # Database migrations
│   └── data-source.ts   # TypeORM data source configuration
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
├── todo/
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # TypeORM entities
│   ├── enums/           # TypeScript enums
│   ├── todo.controller.ts
│   ├── todo.module.ts
│   └── todo.service.ts
├── app.module.ts
└── main.ts
```

## Build

```bash
# Build for production
pnpm run build
```

## Code Quality

```bash
# Format code
pnpm run format

# Lint code
pnpm run lint
```

## License

This project is [UNLICENSED](LICENSE).
