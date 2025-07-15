import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Typography, Paper, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');

  const fetchResumes = async () => {
    const res = await axios.get('http://localhost:4000/api/resumes', {
      params: { skill, experience },
    });
    setResumes(res.data);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Resumes</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Filter by Skill" fullWidth onChange={e => setSkill(e.target.value)} />
        <TextField label="Min Experience" type="number" onChange={e => setExperience(e.target.value)} />
        <Button variant="contained" onClick={fetchResumes}>Filter</Button>
      </Box>
      {resumes.map(r => (
        <Accordion key={r.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>#{r.id} Resume  - {r.experienceYears} yrs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{r.anonymizedText}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default ResumeList;
