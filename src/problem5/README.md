# Task Manager API

A RESTful API for managing tasks built with Express.js, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Yarn package manager

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Start PostgreSQL using Docker:

```bash
docker-compose -p task-manager up -d
```

3. Create a `.env` file in the root directory with the following content:

```
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=taskdb
```

## Running the Application

1. Run development server:

```bash
yarn dev
```

2. Run production server:

```bash
yarn build
yarn start
```

## API Endpoints

### Create a Task

- **POST** `/api/tasks`
- Body:
  ```json
  {
    "title": "Task title",
    "description": "Task description" // optional
  }
  ```

### List Tasks

- **GET** `/api/tasks`
- Query Parameters:
  - `isCompleted`: boolean (filter by completion status)
  - `search`: string (search in title and description)

### Get Task by ID

- **GET** `/api/tasks/:id`

### Update Task

- **PUT** `/api/tasks/:id`
- Body:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "isCompleted": true
  }
  ```

### Delete Task

- **DELETE** `/api/tasks/:id`
