const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(process.cwd(), "tasks.json");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function loadTasks() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]");
    return [];
  }
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return data.trim() === "" ? [] : JSON.parse(data);
  } catch {
    fail("tasks.json rusak atau bukan JSON yang valid.");
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

function nextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
}

module.exports = { fail, loadTasks, saveTasks, nextId };
