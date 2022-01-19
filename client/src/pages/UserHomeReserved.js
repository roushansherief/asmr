import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UserHomeReserved() {
    let navigate = useNavigate();
    
    const[listOfReserved, setListOfReserved] = useState([]);
    
    let signedInUser = JSON.parse(sessionStorage.getItem("user"))
    let signedInUserID = signedInUser._id;

    const [flagToEdit, setFlagToEdit] = useState(0);

    let seatToBeEdited = "";
    let editedSeat = "";
    
    //displayReserved
    useEffect(() => {
        Axios.get("http://localhost:3007/readReserved")
        .then((response) => 
        {
          //setListOfFlights([...listOfFlights, response.data])
          setListOfReserved(response.data)
        })
        .catch(() => {
          console.log(" ");
        });
      }, []);

     //cancel
  const cancelReservation = (id, fn, not, ReservedSeats) => {
    let flag = window.confirm("Are you sure you want to cancel this reservation?");
    if (flag) 
      {
        window.confirm("A confirmation mail has been successfully sent!");
        console.log("fn is: " , fn)
        Axios.delete(`http://localhost:3007/cancel/${id}`, {data: {FlightNumber: fn, NumberOfTickets: not, 
        ReservedSeats: ReservedSeats}})
          .then(() => {
            setListOfReserved(listOfReserved.filter((val) => {
            return val._id != id;
          }));
        });
        }
    else{
      console.log("bravo")
      }
      };

    const editReservation = (id, fn, stbe, es) => {
        console.log("flight number:" , fn)
        Axios.put("http://localhost:3007/editreservation", 
        {FlightNumber: fn, OldSeat: stbe, NewSeat: es, id: id}).then(() => {
        })
      }
    
    
    console.log(listOfReserved)
    
    const theme = createTheme();

      return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar  position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              My Reservations
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 6,
              pb: 0,
            }}
          >
              <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
              {signedInUser.FirstName}'s Itinerary
            </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listOfReserved.map((card) => {
                if(card.FlightNumber!==0 && card.UserID === signedInUserID)
                {
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
                    image="https://media.istockphoto.com/photos/family-walking-through-airport-passageway-picture-id1331972302?b=1&k=20&m=1331972302&s=170667a&w=0&h=9TLBagzrdNNgir3JPjyJqMbN22kZsxwkRGmMx4J2ZKc="
                    alt="background picture"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.From} --- {card.To}
                    </Typography>
                    <Typography>
                      Booking Ref.: {card._id}
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
                      Number Of Tickets Reserved: {card.NumberOfTickets}
                    </Typography>  
                    <Typography> 
                      Price/1 ticket: {card.Price}
                    </Typography>
                    <Typography> 
                    Total Price: {card.Price * card.NumberOfTickets}
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
                     Seat(s): {(card.ReservedSeats).toString()}
                    </Typography>
                    <Typography>
                     Reserved By: {signedInUser.Username}
                    </Typography>
                    {flagToEdit === 1 && 
                      <Grid>
                      <span>Seat To Edit:</span>
                      <select onChange={(event) => {seatToBeEdited = (event.target.value); } }>
                      <option> </option>
                      {card.ReservedSeats.map(val => (
                        <option>{val}</option>
                      ))}
                    </select><select onChange={(event) => {editedSeat = (event.target.value); } }>
                        <option> </option>
                        {card.NotReservedSeats.map(val => (
                          <option>{val}</option>
                        ))}
                      </select>
                      <Button onClick={() => editReservation(card._id, card.FlightNumber, seatToBeEdited, editedSeat)}>Submit</Button>
                      </Grid>
                    }
                  </CardContent>
                  <CardActions>
                    <Button variant="contained"
                    onClick={() => cancelReservation(card._id, card.FlightNumber, card.NumberOfTickets, card.ReservedSeats)}
                      >Cancel</Button>
                     
                      <Button variant="contained"
                    onClick={() => {
                      fetch('http://localhost:3007/create-checkout-session', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({card: card})
                      }).then(res => {
                        if(res.ok) 
                          return res.json()

                        return res.json().then(json => Promise.reject(json))
                        
                      }).then(({url}) => {
                          window.location = url
                          console.log("url is: ", url)
                        }).catch(e => {console.log(e.error)})
                    }}
                      >Checkout</Button>
                      
                  </CardActions>
                  <Button onClick= {() => {setFlagToEdit(1)}}>Want to change in your reservation?</Button>
                </Card>
              </Grid>)
            }
            })}
          </Grid>
        </Container>
                </main>
    
              </ThemeProvider>
        );    
}

export default UserHomeReserved;