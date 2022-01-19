import * as React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function GuestHome() {
    let navigate = useNavigate();  
    const theme = createTheme();
    const [listOfFlights, setListOfFlights] = useState([]);

    //display
    useEffect(() => {
        Axios.get("http://localhost:3007/read")
        .then((response) => 
        {
          //setListOfFlights([...listOfFlights, response.data])
          setListOfFlights(response.data)
        })
        .catch(() => {
          console.log(" ");
        });
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Guest Home Page
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
            Want To Search For Flights?
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Button onClick={() => {
                navigate("/guestHomeSearch");
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0.1, mb: 1 }}
            >
              Click Here
            </Button>
             </Box>
            </Box>
          </Container>
          <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {listOfFlights.map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4}>
              <Card
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </ThemeProvider>
        );    
}

export default GuestHome;