# Project Management Frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Introduction

Welcome to the Project Management Frontend! This project is a web application built with React and Ant Design, designed to help users manage projects and tasks efficiently. The application supports user authentication and authorization, ensuring that users can only access and modify their own data.

## Features

- **User Authentication**: Register, login, and manage sessions securely.
- **Project Management**: Create, view, update, and delete projects.
- **Task Management**: Add, edit, delete, and complete tasks within projects.
- **Responsive Design**: Mobile-friendly and responsive user interface.
- **Access Control**: Ensure users can only access and modify their own projects and tasks.

## Tech Stack

- **Frontend**: React, TypeScript
- **UI Framework**: Ant Design
- **State Management**: React Context API
- **Routing**: React Router
- **HTTP Client**: Fetch API
- **Backend**: NestJS (not included in this repository, see [backend repository](https://github.com/joachimaok/saqara_ges_project_backend))

## Prerequisites

- Node.js (version 14.x or later)
- `pnpm` package manager

### Installing `pnpm`

If you don't have `pnpm` installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

Or, if you prefer using curl:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

For more information about pnpm, please refer to the [official documentation](https://pnpm.io/).

## Getting Started

To get started with the frontend, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/joachimaok/saqara_ges_project_frontend.git
   cd project-management-frontend
   ```

2. **Install dependencies**:

   ```sh
   pnpm install
   ```

3. **Start the development server**:

   ```sh
   pnpm start
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
SERVER_API_URL=http://localhost:3000
```

Replace the value of `SERVER_API_URL` with the URL of your backend API.

## Usage

- **Register**: Create a new account.
- **Login**: Access your account.
- **Dashboard**: View a list of your projects.
- **Project Details**: View tasks within a project, create new tasks, edit or delete existing tasks.
- **Create Project**: Add new projects.
- **Edit Project**: Modify existing projects.
- **Delete Project**: Remove projects you no longer need.

## API Endpoints

### Authentication

- **POST** `/auth/register`: Register a new user
- **POST** `/auth/login`: Login and receive a token

### Projects

- **GET** `/projects`: Get all projects for the authenticated user
- **POST** `/projects`: Create a new project
- **GET** `/projects/:id`: Get a specific project by ID
- **PUT** `/projects/:id`: Update a project by ID
- **DELETE** `/projects/:id`: Delete a project by ID

### Tasks

- **POST** `/tasks`: Create a new task
- **PUT** `/tasks/:id`: Update a task by ID
- **DELETE** `/tasks/:id`: Delete a task by ID
