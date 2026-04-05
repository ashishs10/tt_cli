// #!/usr/bin/env node

// process.stdin.setEncoding("utf-8");

// process.stdout.write("> ");

// process.stdin.on("data", (input) => {
//   const trimmed = input.trim();

//   if (trimmed === "exit") {
//     process.exit(0);
//   }

//   console.log(typeof trimmed);
//   console.log("You typed : ", trimmed);

//   process.stdout.write("> ");
// });
const fs = require("fs/promises");

const input = process.argv[3];

const cliInput = process.argv.slice(2);

const userAction = cliInput[0];

let id;
let description;

if (cliInput.length === 3) {
  id = cliInput[1];
  description = cliInput[2];
} else if (cliInput.length === 2) {
  description = cliInput[1];
}
// -----------------HELPER FUNCTIONS
async function readFile(file) {
  try {
    const data = await fs.readFile(file, "utf-8");
    const parsedData = JSON.parse(data, null, 2);
    return parsedData;
  } catch (error) {
    throw error;
  }
}

async function initFile(file) {
  try {
    await fs.access(file);
    const data = await readFile(file);

    console.log("file exists");
    return data;
  } catch (err) {
    try {
      await fs.writeFile(file, JSON.stringify([], null, 2));
      console.log("file created");
      return [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

async function writeFile(file, data) {
  try {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    console.log("task added successfully");
    return;
  } catch (error) {
    throw error;
  }
}
// -----------------HELPER FUNCTIONS END

// initFile("todo.json");
// ADD TASK
async function addTask(description) {
  let data = await initFile("todo.json");
  if (!description) {
    console.log("no description of the task given");
    return;
  }

  if (data.length === 0) {
    data.push({ description: description, status: "todo", id: 1 });
    await writeFile("todo.json", data);
    return;
  }

  // [{},{},{},{}]
  const id =
    data.length > 0
      ? data.map((task) => task.id).reduce((a, b) => Math.max(a, b)) + 1
      : 0;

  data.push({ description: description, status: "todo", id });
  await writeFile("todo.json", data);
  return;
}

async function updateTask(description, id) {
  // const task =
  try {
    const data = await initFile("todo.json");
    console.log("data : ", data);

    const taskIndex = data.findIndex((task) => task.id === Number(id));
    console.log("task index : ", taskIndex);

    if (taskIndex === -1) {
      console.log("No task exist with id");
      return;
    }

    data[taskIndex].description = description;
    await writeFile("todo.json", data);
    console.log("Task updated");
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTask(id) {
  try {
    const taskId = Number(id);

    const tasks = await initFile("todo.json");

    // getting the index of the task
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw Error("Wrong task ID");
    }
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    console.log("Remaining tasks : ", remainingTasks);

    await writeFile("todo.json", remainingTasks);
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function showAllTask() {
  try {
    const data = await readFile("todo.json");
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

if (userAction === "add") {
  addTask(description);
} else if (userAction === "update") {
  console.log(cliInput.length);
  if (cliInput.length != 3) {
    console.log("Some arguments missing");
    return;
  }
  if (!id) {
    console.log("No id given");
  }

  const updateId = Number.isNaN(Number(input));
  if (!updateId) {
    updateTask(description, id);
  }
  console.log(updateId);
} else if (userAction === "delete") {
  deleteTask(description);
} else if (userAction === "list") {
  showAllTask();
}
