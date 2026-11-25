const { fail, loadTasks } = require("./storage");

const VALID_STATUSES = ["todo", "in-progress", "done"];

function listTasks(filter) {
  if (filter && !VALID_STATUSES.includes(filter)) {
    fail(
      `Status "${filter}" tidak valid. Pilih salah satu: ${VALID_STATUSES.join(", ")}`,
    );
  }

  const tasks = loadTasks();
  const result = filter ? tasks.filter((t) => t.status === filter) : tasks;

  if (result.length === 0) {
    console.log("Tidak ada task.");
    return;
  }

  result.forEach((t) => {
    console.log(`[${t.id}] ${t.description} (${t.status})`);
  });
}

module.exports = { listTasks };
