const { fail, loadTasks, saveTasks, nextId } = require("./storage");

function addTask(description) {
  if (!description || !description.trim()) {
    fail('Deskripsi tidak boleh kosong. Contoh: task-cli add "Buy groceries"');
  }
  const tasks = loadTasks();
  const now = new Date().toISOString();

  const task = {
    id: nextId(tasks),
    description: description.trim(),
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${task.id})`);
}

module.exports = { addTask };
