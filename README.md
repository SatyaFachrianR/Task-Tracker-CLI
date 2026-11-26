# Task Tracker CLI

Aplikasi command line sederhana untuk mencatat apa yang perlu dikerjakan, sedang dikerjakan, dan udah selesai.

Dibuat dengan **Node.js murni**: tanpa library atau framework eksternal, hanya modul bawaan `fs` dan `path`. Semua task disimpan di file `tasks.json`.

Project ini untuk kebutuhan belajar pribadi

## Fitur

- Menambah, mengubah, dan menghapus task
- Menandai task sebagai `in-progress` atau `done`
- Menampilkan semua task, atau difilter berdasarkan status (`todo`, `in-progress`, `done`)
- `tasks.json` dibuat otomatis jika belum ada
- Pesan error yang jelas untuk input yang salah, tanpa crash

## Kebutuhan

- [Node.js](https://nodejs.org) versi 14 atau lebih baru

Cek versi yang terpasang:

```bash
node -v
```

## Instalasi

```bash
git clone https://github.com/SatyaFachrianR/Task-Tracker-CLI.git
cd Task-Tracker-CLI
npm link
```

`npm link` mendaftarkan command `task-cli` sehingga bisa dipakai dari terminal.

Tidak ingin memasang command global? Jalankan langsung dengan Node:

```bash
node Task-TrackerCLI.js <command>
```

## Penggunaan

```bash
# Menambah task
task-cli add "Buy groceries"
# Task added successfully (ID: 1)

# Mengubah deskripsi task
task-cli update 1 "Buy groceries and cook dinner"
# Task 1 updated successfully

# Menandai status task
task-cli mark-in-progress 1
# Task 1 marked as in-progress
task-cli mark-done 1
# Task 1 marked as done

# Menghapus task
task-cli delete 1
# Task 1 deleted successfully

# Menampilkan task
task-cli list                 # semua task
task-cli list todo            # yang belum dikerjakan
task-cli list in-progress     # yang sedang dikerjakan
task-cli list done            # yang sudah selesai
```


### Contoh sesi

```
$ task-cli add "Buy groceries"
Task added successfully (ID: 1)
$ task-cli add "Cook dinner"
Task added successfully (ID: 2)
$ task-cli mark-in-progress 1
Task 1 marked as in-progress
$ task-cli mark-done 2
Task 2 marked as done
$ task-cli list
[1] Buy groceries (in-progress)
[2] Cook dinner (done)
$ task-cli list todo
Tidak ada task.
```

### Daftar command

| Command | Fungsi |
| --- | --- |
| `add "<deskripsi>"` | Menambah task baru dengan status `todo` |
| `update <id> "<deskripsi baru>"` | Mengubah deskripsi task |
| `delete <id>` | Menghapus task |
| `mark-in-progress <id>` | Mengubah status menjadi `in-progress` |
| `mark-done <id>` | Mengubah status menjadi `done` |
| `list [todo\|in-progress\|done]` | Menampilkan task, opsional difilter status |

## Penanganan error

Input yang salah tidak membuat program crash. Program menampilkan pesan dan berhenti dengan exit code `1`.

| Situasi | Pesan |
| --- | --- |
| Deskripsi kosong | `Error: Deskripsi tidak boleh kosong. Contoh: task-cli add "Buy groceries"` |
| ID tidak ditemukan | `Error: Task dengan ID 99 tidak ditemukan.` |
| ID bukan angka positif | `Error: ID "abc" tidak valid. ID harus berupa angka positif.` |
| Status filter salah | `Error: Status "selesai" tidak valid. Pilih salah satu: todo, in-progress, done` |
| `tasks.json` rusak | `Error: tasks.json rusak atau bukan JSON yang valid.` |

Menjalankan program tanpa command, atau dengan command yang tidak dikenal, menampilkan daftar penggunaan.

## Struktur data

Setiap task disimpan di `tasks.json` sebagai object di dalam sebuah array:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2026-11-26T15:58:46.893Z",
    "updatedAt": "2026-11-26T15:58:46.893Z"
  }
]
```

| Properti | Keterangan |
| --- | --- |
| `id` | Identitas unik task (ID terbesar yang ada + 1) |
| `description` | Deskripsi singkat task |
| `status` | `todo`, `in-progress`, atau `done` |
| `createdAt` | Waktu task dibuat, format ISO 8601 (UTC) |
| `updatedAt` | Waktu task terakhir diubah, format ISO 8601 (UTC) |

`tasks.json` dibuat di **folder tempat command dijalankan**, bukan di folder project. Menjalankan `task-cli` dari dua folder berbeda berarti dua daftar task yang terpisah.

## Struktur project

```
Task-Tracker-CLI/
├── Task-TrackerCLI.js   Pintu masuk dan router: membaca command lalu memanggil fungsi yang tepat
├── add.js               Command add
├── list.js              Command list (beserta filter status)
├── update.js            Command update
├── delete.js            Command delete
├── mark.js              Command mark-in-progress dan mark-done
├── helpers.js           Alat bantu: parseId dan findTaskOrFail
├── storage.js           Satu-satunya file yang membaca/menulis tasks.json, plus fungsi fail
├── package.json         Identitas project dan pendaftaran command task-cli
└── .gitignore           Daftar file yang tidak dilacak Git (tasks.json, dst.)
```

Alur ketergantungan antar file selalu satu arah, sehingga tidak ada `require` yang saling memanggil melingkar:

```
Task-TrackerCLI.js → add / list / update / delete / mark → helpers → storage
```

## Cara kerja

Setiap command mengikuti pola **baca → ubah → simpan**:

1. `loadTasks()` membaca `tasks.json` menjadi array di memori (membuat file baru berisi `[]` jika belum ada).
2. Array diubah di memori: ditambah, diperbarui, atau difilter.
3. `saveTasks()` menulis array itu kembali ke `tasks.json`.

Command `list` hanya melakukan langkah 1, sehingga tidak pernah mengubah data.

## Batasan

- Cocok untuk penggunaan pribadi oleh satu pengguna. Menjalankan dua command pada saat yang bersamaan bisa saling menimpa perubahan.
- ID dihitung dari ID terbesar yang ada ditambah satu, jadi ID task terakhir yang dihapus bisa dipakai ulang oleh task berikutnya.
