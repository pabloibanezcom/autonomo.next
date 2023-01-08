import { blue, green, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { IBM_Plex_Sans, Plus_Jakarta_Sans } from '@next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '600', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001e3c'
    },
    primary: blue,
    secondary: green,
    error: red
  },
  typography: {
    fontFamily: ibmPlexSans.style.fontFamily,
    h1: {
      fontSize: '4rem',
      fontWeight: 800,
      fontFamily: plusJakartaSans.style.fontFamily
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 700,
          lineHeight: 1.3125,
          padding: '0.875rem 1rem'
        },
        sizeLarge: {
          fontSize: 16
        },
        sizeMedium: {
          fontSize: 14
        },
        sizeSmall: {
          fontSize: 12,
          lineHeight: 'normal',
          padding: '0.5rem 0.5rem'
        }
      }
    }
  }
});

export default theme;
