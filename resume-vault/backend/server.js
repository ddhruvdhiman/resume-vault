const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', resumeRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
