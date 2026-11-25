const { loadTasks, saveTasks } = require("./storage");
const { parseId, findTaskOrFail } = require("./helpers");

function deleteTask(rawId) {
  const id = parseId(rawId);
  const tasks = loadTasks();
  findTaskOrFail(tasks, id); // pastikan ada dulu, supaya tidak ada pesan sukses palsu

  saveTasks(tasks.filter((t) => t.id !== id));
  console.log(`Task ${id} deleted successfully`);
}

module.exports = { deleteTask };
