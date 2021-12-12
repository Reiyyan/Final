import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Login, SignUp } from '../LoginAPI';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function Authentication(props) {
    const [email, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [signUp, setSignUp] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');

    const handleUsername = (event) => {


            setUsername(event.target.value);
    
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === '') {
            setToastMessage("Please Enter Email!")
            setOpen(true);
        }
        else if(emailRegex.test(email) === false){
            setToastMessage("Incorrect Email Format! Try formatting it as 'email@server.com'")
            setOpen(true);
        }
        else if (password === '') {
            setToastMessage("Please Enter Password!")
            setOpen(true);
        }
        else if (password.length < 8) {
            setToastMessage("Password must be at least 8 letters!")
            setOpen(true);
        }
        else {
            if (signUp === true) {
                SignUp(email, password).then(e => {
                    if (e.data && e.data.user) {
                        props.setUser(e?.data?.user)
                        props.setLoggedIn(true)
                    }
                    else {
                        setToastMessage("Failed to Sign Up!");
                        setOpen(true);
                    }
                });
            }
            else {
                console.log("Trying to login")
                Login(email, password).then(e => {
                    if (e.data && e.data.user) {
                        props.setUser(e?.data?.user)
                        props.setLoggedIn(true)
                    }
                    else {
                        setToastMessage("Incorrect Email and Password Combination!");
                        setOpen(true);
                    }
                });
            }
        }
    };

    const toggleSignUp = () => {
        setSignUp(!signUp);
    }

    const handleEnter = (event) => {
        if (event.charCode === 13) {
            handleLogin();
        }
    }

    return (
        <>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                <CardMedia
                    component="img"
                    alt="Books Images"
                    image="/static/images/books.jpg"
                    sx={{
                        objectPosition: "center"
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Wordly!
                    </Typography>
                </CardContent>
                <form>
                    <TextField id="email" label="Email" variant="standard" autoComplete="email" sx={{ mx: '5%', width: '-webkit-fill-available' }} value={email} onChange={handleUsername} onKeyPress={handleEnter}/>
                    <TextField id="password" label="Password" type="password" autoComplete="current-password" variant="standard" sx={{ mx: '5%', mt: '5%', width: '-webkit-fill-available' }} value={password} onChange={handlePassword} onKeyPress={handleEnter}/>
                </form>

                <CardActions sx={{ justifyContent: 'right' }}>
                    <Button size="medium" sx={{ mx: '5%', mt: '2%' }} variant="outlined" onClick={handleLogin} >
                        {(signUp ? "Sign Up" : "Log In" )}
                    </Button>
                </CardActions>
            </Card>

            <Box sx={{ textAlign: 'center' }}>
                <Button variant="text" onClick={toggleSignUp}>
                    {(signUp ? "Log In" : "Sign Up" )}
                </Button>
            </Box>

            <Collapse in={open} sx={{ my: '2rem' }}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity="error"
                    sx={{
                        maxWidth: '30%',
                        margin: 'auto',
                    }}
                >
                    {toastMessage}
                </Alert>
            </Collapse>
        </>
    );
}