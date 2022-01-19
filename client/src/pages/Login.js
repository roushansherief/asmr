import * as React from 'react';
import {useState, useEffect} from "react";
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


function Login() {
  
  let navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const checkUser = () => {
    Axios.post("http://localhost:3007/login", {Username: username, Password: password})
    .then(res => {
        if(res){
            console.log(res)
            console.log(res.status.error)
            if(res.data)
            {
                sessionStorage.setItem("jwt",res.data.token)
                sessionStorage.setItem("user",JSON.stringify(res.data.user))
                console.log("res.data.user: ", res.data.user)
                if(res.data.user.UserType === "user")
                  navigate('/userHome')
                if(res.data.user.UserType === "admin")
                  navigate('/adminHome')
            }
        }
          
    }).catch(err => {console.log(err); window.confirm("Invalid username and/or password")})      
}
  console.log("username is:", username)
  console.log("password is:", password)
    return (
      <div className="back">
       <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ASMR AIRLINES
          </Typography>
        </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form"
              // onSubmit={checkUserType} 
              noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                //id="email"
                label="Username"
                onChange = {(event) => {setUsername(event.target.value);}}
                //name="email"
                //autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange = {(event) => {setPassword(event.target.value);}}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button onClick={() => {
                checkUser();
                }}
                //type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                <Button onClick={() => {
                navigate("/guestHome");
                 }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
               >
                Continue As A Guest
              </Button>
              
              
              <Button onClick={() => {
                navigate("/signUp");
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Don't Have An Account? Register Now!
                </Button>

                <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h4s"
                    align="center"
                    color="#05435E00"
                    gutterBottom
                    >
              ASMR AIRLINES
            </Typography>
            </Container>
              </Grid>
              
              </Grid>
              
            </Box>
          </Box>   
        </Container>
        </ThemeProvider>
        </div>
    );
}

export default Login;