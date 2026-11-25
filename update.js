const { fail, loadTasks, saveTasks } = require("./storage");
const { parseId, findTaskOrFail } = require("./helpers");

function updateTask(rawId, newDescription) {
  const id = parseId(rawId);
  if (!newDescription || !newDescription.trim()) {
    fail(
      'Deskripsi baru tidak boleh kosong. Contoh: task-cli update 1 "Teks baru"',
    );
  }
  const tasks = loadTasks();
  const task = findTaskOrFail(tasks, id);

  task.description = newDescription.trim();
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} updated successfully`);
}

module.exports = { updateTask };
