import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@mui/material';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ResumeForm() {
  const [inputType, setInputType] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(reader.result);

      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let extractedText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let lastY = null;
        content.items.forEach(item => {
          // item.transform[5] is the y position
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
            extractedText += '\n';
          }
          extractedText += item.str;
          lastY = item.transform[5];
        });
        extractedText += '\n';
      }
      setText(extractedText);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileType = selectedFile.type;

    if (fileType === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(selectedFile);
    } else if (fileType === 'application/pdf') {
      extractTextFromPDF(selectedFile);
    } else {
      alert('Only .txt or .pdf files are supported.');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/api/submit', {
        text,
        skills: skills.split(',').map(s => s.trim()),
        experience: parseInt(experience),
      });
      setText('');
      setFile(null);
      setSkills('');
      setExperience('');
      setInputType('text');
      setOpenSnackbar(true);
    } catch (err) {
      alert('Failed to submit');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Submit Resume</Typography>

      <FormLabel component="legend">Choose Input Method</FormLabel>
      <RadioGroup
        row
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
      >
        <FormControlLabel value="text" control={<Radio />} label="Enter Text" />
        <FormControlLabel value="file" control={<Radio />} label="Upload File (.txt, .pdf)" />
      </RadioGroup>

      {inputType === 'text' ? (
        <TextField
          label="Resume Text"
          multiline
          rows={6}
          fullWidth
          margin="normal"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleFileChange}
          inputProps={{ accept: '.txt,.pdf' }}
        />
      )}

      <TextField
        label="Skills (comma separated)"
        fullWidth
        margin="normal"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <TextField
        label="Experience (years)"
        type="number"
        fullWidth
        margin="normal"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
          Resume submitted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ResumeForm;