// console.log(process.argv);
process.stdin.setEncoding("utf-8");

process.stdout.write("> ");

process.stdin.on("data", (input) => {
  const trimmed = input.trim();

  if (trimmed === "exit") {
    process.exit(0);
  }

  console.log("You typed : ", trimmed);

  process.stdout.write("> ");
});
