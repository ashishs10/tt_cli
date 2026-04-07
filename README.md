# 📝 Task Tracker CLI

A simple and lightweight **Command Line Interface (CLI)** tool to manage your daily tasks.

Track what you need to do, what you're working on, and what you've completed — all from your terminal.

---

# 🚀 Features

- ✅ Add new tasks  
- ✏️ Update existing tasks  
- ❌ Delete tasks  
- 🔄 Mark tasks as:
  - `todo`
  - `in-progress`
  - `done`  
- 📋 List all tasks  
- 🔍 Filter tasks by status  
- 🗂 Persistent storage using JSON file  
- 🧾 Clean and formatted CLI output  

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd task_tracker_cli
```

## 2. Install dependencies

```bash
npm install
```

## 3. Link CLI globally

```bash
npm link
```

Now you can use:

```bash
task-cli
```

---

# ⚙️ Usage

## ➕ Add a Task
```bash
task-cli add "Buy groceries"
```

## ✏️ Update a Task
```bash
task-cli update 1 "Buy groceries and cook dinner"
```

## ❌ Delete a Task
```bash
task-cli delete 1
```

## 🔄 Mark Task Status

### Mark as In Progress
```bash
task-cli mark-in-progress 1
```

### Mark as Done
```bash
task-cli mark-done 1
```

## 📋 List Tasks

### List all tasks
```bash
task-cli list
```

### List by status
```bash
task-cli list done
task-cli list todo
task-cli list in-progress
```

---

# 🧾 Example Output

```
ID    | Status       | Description
----------------------------------------
1     | todo         | Buy groceries
2     | in-progress  | Learn Node.js
3     | done         | Build CLI tool
```

---

# 📁 Data Storage

Tasks are stored in:

```
todo.json
```

Example:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": 1710000000000,
  "updatedAt": 1710000000000
}
```

---

# 🛠 Tech Stack

- Node.js
- Native fs/promises
- No external libraries

---

# 🚧 Future Improvements

- Add help command  
- Improve validation  
- Add colors  
- Search tasks  
- Database integration  

---

# 👨‍💻 Author

Ashish Singh

---

# 🏁 License

ISC

