const { loadTasks, saveTasks } = require("./storage");
const { parseId, findTaskOrFail } = require("./helpers");

function markTask(rawId, status) {
  const id = parseId(rawId);
  const tasks = loadTasks();
  const task = findTaskOrFail(tasks, id);

  task.status = status;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} marked as ${status}`);
}

module.exports = { markTask };
