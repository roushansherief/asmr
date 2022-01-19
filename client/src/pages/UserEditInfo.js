import React from "react";
import {useState, useEffect} from "react";
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UserEditInfo() {
    let navigate = useNavigate();
    const theme = createTheme();
    
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassportNumber, setPassportNumber] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    let signedInUser = JSON.parse(sessionStorage.getItem("user"));
    let signedInUserID = signedInUser._id;

    const updateInfo = (id) => {
        Axios.put("http://localhost:3007/updateinfo", {newFirstName: newFirstName, newLastName: newLastName,
        newEmail: newEmail, newPassportNumber: newPassportNumber, oldPassword: oldPassword, 
        newPassword: newPassword, id: id}).then(() => {
        })
    }
    
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Edit Info
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
          <Typography component="h1" variant="h5">
            Please Enter Your New Information
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  //required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange = {(event) => {setNewFirstName(event.target.value);}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange = {(event) => {setNewLastName(event.target.value);}}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  id="email"
                  label="Email"
                  onChange = {(event) => {setNewEmail(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  name="password"
                  label="Passport Number"
                  //type="password"
                  onChange = {(event) => {setPassportNumber(event.target.value);}}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Toolbar>
            <Typography component="h2" variant="h6">
                Want To Change Your Password?
            </Typography>
            </Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Old Password (*)"
                  onChange = {(event) => {setOldPassword(event.target.value);}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="New Password"
                  onChange = {(event) => {setNewPassword(event.target.value);}}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>
            <Button onClick = {() => {updateInfo(signedInUserID); navigate("/userHome")}}
              //type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update My Information
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
};

export default UserEditInfo;