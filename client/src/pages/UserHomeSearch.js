import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getNativeSelectUtilityClasses } from "@mui/material";

function UserHomeSearch() {
    let navigate = useNavigate();

    const [ReservedFlightID, setReservedFlightID] = useState("");
    const [ReservedFlightNumber, setReservedFlightNumber] = useState(0);
    const [ReservedFrom, setReservedFrom] = useState("");
    const [ReservedTo, setReservedTo] = useState("");
    const [ReservedFlightDate, setReservedFlightDate] = useState("");
    const [ReservedCabin, setReservedCabin] = useState("");
    const [ReservedNumberOfTickets, setReservedNumberOfTickets] = useState(0);
    const [ReservedPrice, setReservedPrice] = useState(0);
    const [ReservedDepartureTime, setReservedDepartureTime] = useState("");
    const [ReservedArrivalTime, setReservedArrivalTime] = useState("");
    const [ReservedDuration, setReservedDuration] = useState(0);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfFilteredFlights, setListOfFilteredFlights] = useState([]);
    const [listOfReservedFlights, setListOfReservedFlights] = useState([]);

    let ReservedTicket = ""
    const [ReservedTickets, setReservedTickets] = useState("");
    let ReservedSeats = ReservedTickets.split(',');
    const [NotReservedSeats, setNotReservedSeats] = useState([]); 

    let signedInUser = JSON.parse(sessionStorage.getItem("user"))
    let signedInUserID = signedInUser._id;

    //display all flights
    useEffect(() => {
        Axios.get("http://localhost:3007/read")
        .then((response) => 
        {
          //setListOfFlights([...listOfFlights, response.data])
          setListOfFilteredFlights(response.data)
        })
        .catch(() => {
          console.log(" ");
        });
      }, []);
    
      //search
      const searchFlight = () => {
        setListOfFilteredFlights(listOfFilteredFlights.map((val) => {
            if(val!=null){
                return (val.FlightNumber === searchTerm || val.From === searchTerm || val.To === searchTerm
                    || val.FlightDate === searchTerm || val.Cabin === searchTerm || val.SeatsAvailableOnFlight === parseInt(searchTerm)
                    || val.Price === parseInt(searchTerm) || val.DepartureTime === searchTerm || val. Duration === parseInt(searchTerm) 
                    || val.ArrivalTime === searchTerm)? val : null;
            }
          }))
    }

    //setting number of tickets
    function decrementTickets() {
      ReservedNumberOfTickets>0? setReservedNumberOfTickets(prevCount => prevCount - 1): setReservedNumberOfTickets(0)
    }
    function incrementTickets() {
      ReservedNumberOfTickets<3? setReservedNumberOfTickets(prevCount => prevCount + 1): setReservedNumberOfTickets(3)
    }

    const reserveFlight = () => {
      let flag = window.confirm("Are you sure you want to reserve this flight?");
      if(flag)
      {
        Axios.post("http://localhost:3007/addreservation", {FlightID: ReservedFlightID,FlightNumber: ReservedFlightNumber, From: ReservedFrom, To: ReservedTo,
        FlightDate: ReservedFlightDate, Cabin: ReservedCabin, NumberOfTickets: ReservedNumberOfTickets, Price: ReservedPrice,
        DepartureTime: ReservedDepartureTime, ArrivalTime: ReservedArrivalTime, Duration: ReservedDuration, UserID: signedInUserID, ReservedSeats: ReservedSeats, NotReservedSeats: NotReservedSeats})
        .then(() => {
          setListOfReservedFlights([...listOfReservedFlights, {FlightNumber: ReservedFlightNumber, From: ReservedFrom, To: ReservedTo,
            FlightDate: ReservedFlightDate, Cabin: ReservedCabin, NumberOfTickets: ReservedNumberOfTickets, Price: ReservedPrice,
            DepartureTime: ReservedDepartureTime, ArrivalTime: ReservedArrivalTime, Duration: ReservedDuration, UserID: signedInUserID, ReservedSeats: ReservedSeats,NotReservedSeats: NotReservedSeats}])
        })
        .catch(() => {
          console.log("ERR");
        });
      }
      else
        console.log("but why");
    };
      
      const theme = createTheme();

      return (
        <ThemeProvider theme={theme}>
         <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          User Search
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Grid item xs={15} sm={6}>
            <TextField
                margin="normal"
                fullWidth
                placeholder="Search For Flights"
                onChange = {(event) => {setSearchTerm(event.target.value);}}
              />
              </Grid>
            <Button 
             onClick= {
              () =>  {searchFlight();}}
            variant="contained"
            >Search</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listOfFilteredFlights.map((card) => {
              if(card !== null) {
                return(
              <Grid item key={card._id} xs={10} sm={8} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    style={{height: 250}}
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0%',
                    }}
                    image="https://media.istockphoto.com/photos/airplane-flying-on-tropical-summer-vacation-picture-id1282610198?b=1&k=20&m=1282610198&s=170667a&w=0&h=6tOZ20F7zn_nmnTHKfJUOxv9BYU1dAYBt8xTb8FM9X4="
                    alt="background picture"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                      {card.From} --- {card.To}
                    </Typography>
                    <Typography>
                      Flight Number: {card.FlightNumber}
                    </Typography>  
                    <Typography>
                      Date: {card.FlightDate}
                    </Typography>  
                    <Typography>
                      Cabin: {card.Cabin}
                    </Typography>  
                    <Typography> 
                      Price: {card.Price}
                    </Typography>
                    <Typography>
                      Departure Time: {card.DepartureTime}
                    </Typography>
                    <Typography>
                      Arrival Time: {card.ArrivalTime}
                    </Typography>
                    <Typography>
                      Duration: {card.Duration}h
                    </Typography>
                    <Typography>
                      Tickets:
                      <Button onClick={() => {decrementTickets()}}>-</Button>
                      <span>{ReservedNumberOfTickets}</span>
                      <Button onClick={() => {incrementTickets()}}>+</Button>
                      </Typography>
                      {ReservedNumberOfTickets === 1 &&
                   <Grid>
                     <select onChange={(event) => {ReservedTicket = (event.target.value)
                    setReservedTickets(ReservedTicket)}}>
                        <option>Seat:</option>
                        {card.SeatsAvailable.map(val =>
                        (
                            <option>{val}</option>
                        ))}
                    </select>
                   </Grid>
                  }
                  {ReservedNumberOfTickets === 2 &&
                    <Grid>
                    <select onChange={(event) => {ReservedTicket = (event.target.value)
                      setReservedTickets(ReservedTicket)}}>
                      <option>Seat 1:</option>
                      {card.SeatsAvailable.map(val =>
                      (
                        <option>{val}</option>
                      ))}
                    </select>
                    <select onChange={(event) => {ReservedTicket = (event.target.value)
                    setReservedTickets(ReservedTickets + "," + ReservedTicket)}}>
                        <option>Seat 2:</option>
                        {card.SeatsAvailable.map(val =>
                        (
                          <option>{val}</option>
                        ))}
                      </select></Grid>
                  }
                  {ReservedNumberOfTickets === 3 &&
                    <Grid>
                    <select onChange={(event) => {ReservedTicket = (event.target.value)
                      setReservedTickets(ReservedTicket)}}>
                      <option>Seat 1:</option>
                      {card.SeatsAvailable.map(val =>  
                      (
                        <option>{val}</option>
                      ))}
                    </select>
                    <select onChange={(event) => {ReservedTicket = (event.target.value)
                    setReservedTickets(ReservedTickets + "," + ReservedTicket)}}>
                        <option>Seat 2:</option>
                        {card.SeatsAvailable.map(val => 
                        (
                          <option>{val}</option>
                        ))}
                      </select>
                      <select onChange={(event) => {ReservedTicket = (event.target.value)
                    setReservedTickets(ReservedTickets + "," + ReservedTicket)}}>
                        <option>Seat 3:</option>
                        {card.SeatsAvailable.map(val => 
                        (
                          <option>{val}</option>
                        ))}
                      </select></Grid>
                  }
                  </CardContent>
                  <CardActions>
                  <Button onClick= {
                        () => {
                          setReservedFlightID(card._id);
                          setReservedFlightNumber(card.FlightNumber);
                          setReservedFrom(card.From);
                          setReservedTo(card.To);
                          setReservedFlightDate(card.FlightDate);
                          setReservedCabin(card.Cabin);
                          setReservedPrice(card.Price);
                          setReservedDepartureTime(card.DepartureTime);
                          setReservedArrivalTime(card.ArrivalTime);
                          setNotReservedSeats(card.SeatsAvailable);
                          setReservedDuration(card.Duration)
                          reserveFlight();}} variant="contained"
                      >Reserve</Button>
                      <Typography>{card.SeatsAvailableOnFlight} seats left!</Typography>
                  </CardActions>
                </Card>
              </Grid> )}
            })}
          </Grid>
        </Container>
            </main>

          </ThemeProvider>
      );
}

export default UserHomeSearch;