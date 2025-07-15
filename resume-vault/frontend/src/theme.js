import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // Indigo
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081', // Electric pink
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafc', // Soft off-white
      paper: '#ffffff',
    },
    text: {
      primary: '#212121', // Dark gray for better readability
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          padding: '8px 20px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #3f51b5 0%, #5a55ae 100%)',
        },
      },
    },
  },
});

export default theme;
