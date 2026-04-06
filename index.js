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
  try {
    let data = await initFile("todo.json");
    if (!description) {
      console.log("no description of the task given");
      return;
    }

    if (data.length === 0) {
      data.push({
        id: 1,
        description: description,
        status: "todo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      await writeFile("todo.json", data);
      return;
    }

    // [{},{},{},{}]
    const id =
      data.length > 0
        ? data.map((task) => task.id).reduce((a, b) => Math.max(a, b)) + 1
        : 0;

    data.push({
      id,
      description: description,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await writeFile("todo.json", data);
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateTask(description, id) {
  // const task =
  try {
    const data = await initFile("todo.json");

    const taskIndex = data.findIndex((task) => task.id === Number(id));
    console.log("task index : ", taskIndex);

    if (taskIndex === -1) {
      console.log("No task exist with id");
      return;
    }

    data[taskIndex].description = description;
    data[taskIndex].updatedAt = Date.now();
    await writeFile("todo.json", data);
    console.log("Task updated");
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function markTask(id, status) {
  try {
    const data = await initFile("todo.json");

    const taskIndex = data.findIndex((task) => task.id === Number(id));
    console.log("task index : ", taskIndex);

    if (taskIndex === -1) {
      console.log("No task exist with id");
      return;
    }

    data[taskIndex].status = status;
    data[taskIndex].updatedAt = Date.now();
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

async function showAllTask(status) {
  try {
    if (!status) {
      const data = await initFile("todo.json");
      console.log(data);
      return;
    }

    const response = await initFile("todo.json");

    const data = response.filter((task) => task.status === status);
    console.log(data);
    return;
  } catch (error) {
    console.log(error.message);
  }
}

if (userAction === "add") {
  const description = cliInput.slice(1).join(" ");
  addTask(description);
} else if (userAction === "update") {
  const id = cliInput[1];
  const description = cliInput.slice(2).join(" ");

  if (!id) {
    console.log("No id given");
  }

  const updateId = Number.isNaN(Number(input));
  updateTask(description, id);
} else if (userAction === "delete") {
  const id = cliInput[1];
  deleteTask(id);
} else if (userAction === "list") {
  const status = cliInput[1];
  showAllTask(status);
} else if (userAction === "mark-in-progress") {
  const id = cliInput[1];
  const status = cliInput[0].split("-").slice(1).join("-");
  console.log(status);

  markTask(id, status);
} else if (userAction === "mark-done") {
  const id = cliInput[1];
  const status = cliInput[0].split("-").slice(1).join("-");

  console.log(status);
  markTask(id, status);
}

// TODO
