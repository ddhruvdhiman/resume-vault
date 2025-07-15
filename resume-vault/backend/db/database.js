const Database = require('better-sqlite3');
const db = new Database('./resumes.db');

db.exec(`
CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    anonymizedText TEXT,
    skills TEXT,
    experienceYears INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

module.exports = db;
