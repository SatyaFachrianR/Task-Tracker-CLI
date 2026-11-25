const { fail } = require("./storage");

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    fail(`ID "${raw ?? ""}" tidak valid. ID harus berupa angka positif.`);
  }
  return id;
}

function findTaskOrFail(tasks, id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) fail(`Task dengan ID ${id} tidak ditemukan.`);
  return task;
}

module.exports = { parseId, findTaskOrFail };
