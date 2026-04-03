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

const userAction = process.argv[2];
const input = process.argv[3];

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
  const id = data.map((task) => task.id).reduce((a, b) => Math.max(a, b)) + 1;

  data.push({ description: description, status: "todo", id });
  await writeFile("todo.json", data);
  return;
}

async function updateTask(description) {}

if (userAction === "add") {
  addTask(input);
} else if (userAction === "update") {
  updateTask(input);
}
