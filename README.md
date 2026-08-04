# MyToDo - Task Management System

A modern web-based task management application built with **Laravel**, **React**, and **Inertia.js**. MyToDo helps users organize daily tasks, monitor productivity, and manage priorities through a clean and responsive dashboard.

---

## ✨ Features

- 📋 Create, edit, and delete tasks
- ✅ Mark tasks as completed or pending
- 📊 Dashboard with task statistics
  - Total Tasks
  - Completed Tasks
  - Tasks Due Today
  - Progress Overview
- 🔍 Search tasks by title
- 🎯 Filter tasks by status
- 🏷️ Organize tasks with categories
- 🚩 Set task priorities (High, Medium, Low)
- 📅 Due date management
- 📝 Additional notes for each task
- 👀 Task detail page
- 📱 Responsive user interface

---

## 🛠 Tech Stack

### Backend

- Laravel 12
- PHP
- Eloquent ORM
- MySQL

### Frontend

- React
- Inertia.js
- TypeScript
- Vite

### UI

- Tailwind CSS
- Radix UI
- Lucide React

### Development Tools

- Composer
- npm
- Git
- GitHub Actions

---

## 📂 Project Structure

```
app/
database/
resources/
 ├── js/
 │   ├── components/
 │   ├── layouts/
 │   ├── pages/
 │   └── hooks/
routes/
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/ZamiFaiz24/My_ToDo---Laravel-Inertia-React.git

cd My_ToDo---Laravel-Inertia-React
```

Install backend dependencies

```bash
composer install
```

Install frontend dependencies

```bash
npm install
```

Copy environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure your database in `.env`

Run database migration

```bash
php artisan migrate
```

Start the development server

```bash
php artisan serve
```

Run Vite

```bash
npm run dev
```

---

## 📸 Screenshots

> Coming soon

- Dashboard
- Add Task
- Task Detail
- Mobile View

---

## 🎯 Future Improvements

- User authentication
- Calendar integration
- Email reminders
- Dark mode
- Drag & Drop task management
- Task labels
- File attachments
- REST API
- Unit & Feature Testing

---

## 📄 License

This project is licensed under the MIT License.
