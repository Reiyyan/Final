import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { Button } from '@mui/material';
export default function Navbar(props) {

    const handleTheme = () => {
        props.toggleTheme(!props.themeMode);
    };

    const handleLogout = () => {
        props.setLoggedIn(!props.loggedIn);
        props.setUser('');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    <LibraryBooksIcon fontSize="large" />
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, marginLeft: '5px' }}>
                        Wordly
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.user ? `${props.user}` : ''}
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={props.themeMode}
                                    onChange={handleTheme}
                                    aria-label="login switch"
                                />
                            }
                            label={props.themeMode ? 'Dark' : 'Light'}
                        />
                    </FormGroup>
                    {props.loggedIn && (
                        <Button variant="contained" color='secondary' endIcon={<LogoutSharpIcon />} onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
