import * as React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function AdminHomeSearch() {
    let navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [listOfFilteredFlights, setListOfFilteredFlights] = useState([]);
    const [flagToEdit, setFlagToEdit] = useState(0);
    const [newFlightDate, setNewFlightDate] = useState("");

    
    //const [listOfFilteredFlights, setListOfFilteredFlights] = useState([]);

    //display all flights
    useEffect(() => {
        Axios.get("http://localhost:3007/read")
        .then((response) => 
        {
          //setListOfFilteredFlights([...listOfFilteredFlights, response.data])
          setListOfFilteredFlights(response.data)
        })
        .catch(() => {
          console.log(" ");
        });
      }, []);

    // useEffect(() => {
    //     setListOfFilteredFlights(listOfFilteredFlights);
    // })

    //update
    const updateFlight = (id) => {
    Axios.put("http://localhost:3007/update", {newFlightDate: newFlightDate, id: id}).then(() => {
      setListOfFilteredFlights(listOfFilteredFlights.map((val) => {
        if(val !== undefined){
          return val._id === id? {_id: id, From: val.From, To: val.To, FlightDate: newFlightDate,
            Cabin: val.Cabin, SeatsAvailableOnFlight: val.SeatsAvailableOnFlight, Price: val.Price,
            DepartureTime: val.DepartureTime, ArrivalTime: val.ArrivalTime} : val;
        }
       
      }))
    })
  };

    //delete
    const deleteFlight = (id) => {
    let flag = window.confirm("Are you sure you want to delete this flight?");
    if (flag) 
    {
      Axios.delete(`http://localhost:3007/delete/${id}`)
      .then(() => {
        setListOfFilteredFlights(listOfFilteredFlights.filter((val) => {
        return val._id != id;
      }));
    });
    }
    else{
      console.log("bravo")
  }
  };
  
  console.log("search term: ", searchTerm);
  console.log("list of filtered: ", listOfFilteredFlights);

    //search
    const searchFlight = () => {
      console.log("hiiii")  
      setListOfFilteredFlights(listOfFilteredFlights.map((val) => {   
        if(val !== undefined){
                return (val.FlightNumber === searchTerm || val.From === searchTerm || val.To === searchTerm || val.Duration === parseInt(searchTerm)
                    || val.FlightDate === searchTerm || val.Cabin === searchTerm || val.SeatsAvailableOnFlight === searchTerm
                    || val.Price === parseInt(searchTerm) || val.DepartureTime === searchTerm || val.ArrivalTime === searchTerm)? val : undefined;
           }
        console.log("list of filtered: ", listOfFilteredFlights);
            //else{console.log("ana fl else")}
          }))
    }



    const theme = createTheme();

      return ( 
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Admin Search
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
            <Grid item xs={20} sm={6}>
                <TextField
                  fullWidth
                  onChange = {(event) => {setSearchTerm(event.target.value);}}
                  label="Search For Flights"
                />
              </Grid>
            <Button variant="contained" onClick = {() => {searchFlight();}}>Search</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={8}>
          {listOfFilteredFlights.map((card) => {
            //if (card !== undefined)
            if(typeof(card) !== 'undefined')
          {
            console.log(typeof(card));
            console.log("card is ", card)
            return(
            <Grid item key={card._id} xs={12} sm={6} md={4}>
            <Card
              //key={card._id}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: '0%',
                }}
                image="https://media.istockphoto.com/photos/airplane-flying-on-tropical-summer-vacation-picture-id1282610198?b=1&k=20&m=1282610198&s=170667a&w=0&h=6tOZ20F7zn_nmnTHKfJUOxv9BYU1dAYBt8xTb8FM9X4="
                alt="background pic"
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
                      Seats Available:   
                      {<select>
                        <option></option>
                        {card.SeatsAvailable.map(val =>
                        (
                            <option>{val}</option>
                        ))}
                    </select>}
                    </Typography>
                </CardContent>
              <CardActions>
              <div>
                  <Button
                  variant="contained"
                  onClick={() => {
                  setFlagToEdit(1);
                  }} size="small">Edit Flight</Button>
                  </div>
                  <div>
                    {flagToEdit === 1 && 
                    <input size="4"
                        type="text" placeholder="New Date"
                        onChange={(event) => { setNewFlightDate(event.target.value); } }></input>
                    }
                    {flagToEdit === 1 && 
                    <Button onClick={() => {
                      updateFlight(card._id);
                    } }>Submit</Button>}
                    </div>
                    <div>
                  <Button variant="contained"
                  onClick={() => {
                  deleteFlight(card._id);}}
                  size="small">Delete Flight</Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
             ) }
          }
            
            
            )}
          </Grid>
        </Container>
            </main>

          </ThemeProvider>
        );    
}

export default AdminHomeSearch;