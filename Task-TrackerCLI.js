#!/usr/bin/env node
const { addTask } = require("./add");
const { listTasks } = require("./list");
const { updateTask } = require("./update");
const { deleteTask } = require("./delete");
const { markTask } = require("./mark");

function main() {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case "add":
      addTask(args[0]);
      break;
    case "update":
      updateTask(args[0], args[1]);
      break;
    case "delete":
      deleteTask(args[0]);
      break;
    case "mark-in-progress":
      markTask(args[0], "in-progress");
      break;
    case "mark-done":
      markTask(args[0], "done");
      break;
    case "list":
      listTasks(args[0]);
      break;
    default:
      console.log(`Penggunaan:
  task-cli add "deskripsi"
  task-cli update <id> "deskripsi baru"
  task-cli delete <id>
  task-cli mark-in-progress <id>
  task-cli mark-done <id>
  task-cli list [todo|in-progress|done]`);
  }
}

main();
