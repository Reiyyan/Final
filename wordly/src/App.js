import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Authentication from './components/Authentication';
import Box from '@mui/material/Box';
import Footer from './components/Footer';
export default function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },

        components: {
          MuiInputBase: {
            styleOverrides: {
              input: {
                '&:-webkit-autofill': {
                  WebkitTextFillColor: '#000',
                  WebkitBoxShadow: '0 0 0px 1000px rgba(236, 236, 236, 1) inset !important',
                  transition: 'background-color 5000s ease-in-out 0s !important'
                },
              },
            },
          }

        },
      }),
    [darkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={setDarkMode} themeMode={darkMode} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user={user} />
      <Box sx={{
        minHeight: '95vh',
        backgroundImage: (darkMode ? `url(./static/images/night.svg)` : `url(./static/images/day-light.jpg)`),
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        paddingTop: (loggedIn ? 0 : '12.5%')
      }}>
        {loggedIn ? <Home theme={darkMode} /> : <Authentication setLoggedIn={setLoggedIn} setUser={setUser}/>}
        <Footer sx={{ position: 'relative', bottom: '0px', textAlign: 'center',  left: '50%'}} />
      </Box>
    </ThemeProvider>
  );
}