const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { anonymizeResume } = require('../utils/anonymizer');

router.post('/submit', (req, res) => {
    const { text, skills, experience } = req.body;
    const anonymizedText = anonymizeResume(text);

    const stmt = db.prepare('INSERT INTO resumes (anonymizedText, skills, experienceYears) VALUES (?, ?, ?)');
    stmt.run(anonymizedText, skills.join(','), experience);

    res.json({ message: 'Resume submitted successfully' });
});

router.get('/resumes', (req, res) => {
    const { skill = '', experience = '' } = req.query;
    let query = `SELECT * FROM resumes WHERE 1=1`;
    const params = [];

    if (skill) {
        query += ` AND skills LIKE ?`;
        params.push(`%${skill}%`);
    }

    if (experience) {
        query += ` AND experienceYears >= ?`;
        params.push(Number(experience));
    }

    const resumes = db.prepare(query).all(...params);
    res.json(resumes);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = 'admin@yopmail.com';
  const ADMIN_PASSWORD = 'password';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});


module.exports = router;
