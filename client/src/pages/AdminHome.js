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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function AdminHome () {
    let navigate = useNavigate();
    const [listOfFlights, setListOfFlights] = useState([]);
    const [newFlightDate, setNewFlightDate] = useState("");

    const [flagToEdit, setFlagToEdit] = useState(0);
    
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

    //update
    const updateFlight = (id) => {
    Axios.put("http://localhost:3007/update", {newFlightDate: newFlightDate, id: id}).then(() => {
      setListOfFlights(listOfFlights.map((val) => {
        return val._id === id? {_id: id, From: val.From, To: val.To, FlightDate: newFlightDate,
          Cabin: val.Cabin, SeatsAvailableOnFlight: val.SeatsAvailableOnFlight, Price: val.Price,
          DepartureTime: val.DepartureTime, ArrivalTime: val.ArrivalTime} : val;
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
        setListOfFlights(listOfFlights.filter((val) => {
        return val._id != id;
      }));
    });
    }
    else{
      console.log("bravo")
  }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Admin Home Page
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
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
            Welcome Admin
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained"
            onClick={() => {
              navigate("/adminAddFlight");
              }}>Add Flight</Button>
            <Button variant="contained"
            onClick={() => {
            navigate("/adminHomeSearch");
            }} >Want To Search?</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={8}>
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
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
    );
}

export default AdminHome;
