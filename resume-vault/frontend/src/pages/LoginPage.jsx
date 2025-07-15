import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@yopmail.com');
  const [password, setPassword] = useState('password');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('asdfhydf', { email, password });
      const res = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });

      if (res.data.success) {
        setSnack({ open: true, message: 'Login successful', severity: 'success' });
        onLogin();
        navigate('/dashboard');
      }
    } catch (err) {
      setSnack({ open: true, message: 'Invalid credentials', severity: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h6" gutterBottom>Admin Login</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default LoginPage;
