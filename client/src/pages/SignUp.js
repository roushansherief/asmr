import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useEffect} from "react";
import Axios from 'axios';

function SignUp() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [HomeAddress, setHomeAddress] = useState("");
    const [CountryCode, setCountryCode] = useState("");
    const [TelephoneNumber, setTelephoneNumber] = useState("");
    const [CountryCode2, setCountryCode2] = useState("");
    const [TelephoneNumber2, setTelephoneNumber2] = useState("");
    const [Email, setEmail] = useState("");
    const [PassportNumber, setPassportNumber] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [listOfUsers, setListOfUsers] = useState([]);

    let navigate = useNavigate(); 
    const theme = createTheme();

    const signUpFunc = () => {
      Axios.post("http://localhost:3007/addusers", {FirstName: FirstName, LastName: LastName, HomeAddress: HomeAddress,
      CountryCode: CountryCode, TelephoneNumber: TelephoneNumber, CountryCode2: CountryCode2, TelephoneNumber2: TelephoneNumber2,
      Email: Email, PassportNumber: PassportNumber, Username: Username, Password: Password})
      .then(() => {
        setListOfUsers([...listOfUsers, {FirstName: FirstName, LastName: LastName, HomeAddress: HomeAddress,
          CountryCode: CountryCode, TelephoneNumber: TelephoneNumber, CountryCode2: CountryCode2, TelephoneNumber2: TelephoneNumber2,
          Email: Email, PassportNumber: PassportNumber, Username: Username, Password: Password}])
      })
      .catch(() => {
        console.log("ERR");
      });
    };
    
    return (
    
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                Registration
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange = {(event) => {setFirstName(event.target.value);}}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange = {(event) => {setLastName(event.target.value);}}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Home Address"
                  onChange = {(event) => {setHomeAddress(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Country Code"
                  onChange = {(event) => {setCountryCode(event.target.value);}}
                  //type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Telephone Number"
                  onChange = {(event) => {setTelephoneNumber(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange = {(event) => {setEmail(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Passport Number"
                  onChange = {(event) => {setPassportNumber(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  onChange = {(event) => {setUsername(event.target.value);}}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Password"
                  onChange = {(event) => {setPassword(event.target.value);}}
                  type="password"
                  name="email"
                  autoComplete="email"
                />
              </Grid > 
              <Grid item xs={11}>
                <Typography>
                       Additional Phone Number (optional):
                </Typography>
                </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  name="password"
                  label="Country Code"
                  onChange = {(event) => {setCountryCode2(event.target.value);}}
                  //type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  name="password"
                  label="Telephone Number"
                  onChange = {(event) => {setCountryCode2(event.target.value);}}
                  //type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button onClick={() => {
                signUpFunc();
                navigate("/");
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button onClick={() => {
                navigate("/");
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Already Have An Account? Click Here
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}
export default SignUp;