import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function AdminAddFlight () {
    let navigate = useNavigate();
    const theme = createTheme();
    const [FlightNumber, setFlightNumber] = useState(0);
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [FlightDate, setFlightDate] = useState("");
    const [Cabin, setCabin] = useState("");
    const [SeatsAvailableOnFlight, setSeatsAvailableOnFlight] = useState(0);
    const [Price, setPrice] = useState(0);
    const [DepartureTime, setDepartureTime] = useState("");
    const [ArrivalTime, setArrivalTime] = useState("");
    //const [DepartureTime, setDepartureTime] = useState("");
    const [listOfFlights, setListOfFlights] = useState([]);

    const SeatsAvailable = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3',
                          'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'H1', 'H2', 'H3'];

    let at = ArrivalTime.split(':');
    let dt = DepartureTime.split(':');
    let atint = parseInt(at[0]);
    let dtint = parseInt(dt[0]);
    let Duration = atint - dtint;

    //insert
    const addFlight = () => {
        Axios.post("http://localhost:3007/addflight", {FlightNumber: FlightNumber, From: From, To: To,
        FlightDate: FlightDate, Cabin: Cabin, SeatsAvailableOnFlight: SeatsAvailableOnFlight, Price: Price,
        DepartureTime: DepartureTime, ArrivalTime: ArrivalTime, SeatsAvailable: SeatsAvailable, Duration: Duration})
        .then(() => {
          setListOfFlights([...listOfFlights, {FlightNumber: FlightNumber, From: From, To: To,
            FlightDate: FlightDate, Cabin: Cabin, SeatsAvailableOnFlight: SeatsAvailableOnFlight, Price: Price,
            DepartureTime: DepartureTime, ArrivalTime: ArrivalTime, SeatsAvailable: SeatsAvailable, Duration: Duration}])
        })
        .catch(() => {
          console.log("ERR");
        });
      };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Add Flight
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
            Please Enter New Flight Details
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="Flight Number"
                  autoFocus
                  onChange = {(event) => {setFlightNumber(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder="From"
                  name="lastName"
                  autoComplete="family-name"
                  onChange = {(event) => {setFrom(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="To"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setTo(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Flight Date"
                  type="text"
                  id="password"
                  autoComplete="new-password"
                  onChange = {(event) => {setFlightDate(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Cabin"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setCabin(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Seats Available On Flight"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setSeatsAvailableOnFlight(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Price"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setPrice(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Departure Time"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setDepartureTime(event.target.value);}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Arrival Time"
                  name="email"
                  autoComplete="email"
                  onChange = {(event) => {setArrivalTime(event.target.value);}}
                />
              </Grid>
            </Grid>
            <Button
            onClick={() => {
              addFlight();
              navigate("/adminHome");
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Flight
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default AdminAddFlight;