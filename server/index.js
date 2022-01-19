require('dotenv').config();

const express = require("express");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./keys')
//const requireLogin = require("./middleware/requireLogin")

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const FlightModel = require("./models/Flights");
const UserModel = require("./models/ExistingUsers");
const ReservedModel = require("./models/Reserved");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://userito:passwordito@cluster0.j4smg.mongodb.net/airlines?authSource=admin&replicaSet=atlas-s0bcyn-shard-0&readPreference=primary&ssl=true', 
    {useNewUrlParser: true}).then(result => console.log("mongodb is connected")).catch(error => console.log(error))

//admin creates flight
app.post("/addflight", async (req,res) => {
    const FlightNumber = req.body.FlightNumber;
    const From = req.body.From;
    const To = req.body.To;
    const FlightDate = req.body.FlightDate;
    const Cabin = req.body.Cabin;
    const SeatsAvailableOnFlight = req.body.SeatsAvailableOnFlight;
    const Price = req.body.Price;
    const DepartureTime = req.body.DepartureTime;
    const ArrivalTime = req.body.ArrivalTime;
    const Duration = req.body.Duration;
    const SeatsAvailable = req.body.SeatsAvailable;
    
    const newFlight = new FlightModel({
        FlightNumber: FlightNumber,
        From: From,
        To: To,
        FlightDate: FlightDate,
        Cabin: Cabin,
        SeatsAvailableOnFlight: SeatsAvailableOnFlight,
        Price: Price,
        DepartureTime: DepartureTime,
        ArrivalTime: ArrivalTime,
        Duration: Duration,
        SeatsAvailable: SeatsAvailable
        });
    await newFlight.save();
    res.send("Success!");
    });
    
//user reserves a flight
app.post("/addreservation", async (req,res) => {
    const rFlightID = req.body.FlightID;
    const rFlightNumber = req.body.FlightNumber;
    const rFrom = req.body.From;
    const rTo = req.body.To;
    const rFlightDate = req.body.FlightDate;
    const rCabin = req.body.Cabin;
    const rNumberOfTickets = req.body.NumberOfTickets;
    const rPrice = req.body.Price;
    const rDepartureTime = req.body.DepartureTime;
    const rArrivalTime = req.body.ArrivalTime;
    const rDuration = req.body.Duration
    const UserID = req.body.UserID;
    const rSeats = req.body.ReservedSeats;
    const notRSeats = req.body.NotReservedSeats;

    //console.log("rSeats is:" , rSeats);

    let flag = false;

    await FlightModel.findById(rFlightID)
        .then(flightToReserve => {
            let sa = flightToReserve.SeatsAvailableOnFlight;
            if(sa >= rNumberOfTickets)
                flag = true;
        }).catch(err => {console.log(err)});
    
    if(flag) {
        for(let j = 0; j<rSeats.length; j++)
        {
            let reservedseat = rSeats[j]
            let index = notRSeats.indexOf(reservedseat);
            notRSeats[index] = "taken";
        }
        
        const newReservedFlight = new ReservedModel({
            FlightNumber: rFlightNumber,
            From: rFrom,
            To: rTo,
            FlightDate: rFlightDate,
            Cabin: rCabin,
            NumberOfTickets: rNumberOfTickets,
            Price: rPrice,
            DepartureTime: rDepartureTime,
            ArrivalTime: rArrivalTime,
            Duration: rDuration,
            UserID: UserID,
            ReservedSeats: rSeats,
            NotReservedSeats: notRSeats
            });
        await newReservedFlight.save();
        
        await FlightModel.findById(rFlightID)
        .then(flightToReserve => {
            flightToReserve.SeatsAvailableOnFlight -= rNumberOfTickets;
            for(let j = 0; j<rSeats.length; j++)
            {
                let reservedseat = rSeats[j]
                let seats = flightToReserve.SeatsAvailable;
                let index = seats.indexOf(reservedseat);
                flightToReserve.SeatsAvailable[index] = "taken";
            }
            flightToReserve.save();
        }).catch(err => {console.log(err)});
    }
    
    else
        console.log("sorry") 
    res.send("Success!");
    }); 

//user pays
app.post("/create-checkout-session", async (req,res) => {
    let array = new Array()
    array.push(req.body.card)
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: array.map(item => {
                const reservation = item
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: reservation._id
                        },
                        unit_amount: reservation.Price * 100
                    },
                    quantity: reservation.NumberOfTickets
                }
            }),
            success_url: `${process.env.SERVER_URL}/Success.js`,
            cancel_url: `${process.env.SERVER_URL}/Cancel.js`
        })
        res.json({url:session.url})
    }
    catch(e) {
        res.status(500).json({error: e.message})
    }
})
    
//user signs up
app.post("/addusers", async (req,res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const HomeAddress = req.body.HomeAddress;
    const CountryCode = req.body.CountryCode;
    const TelephoneNumber = req.body.TelephoneNumber;
    const CountryCode2 = req.body.CountryCode2;
    const TelephoneNumber2 = req.body.TelephoneNumber2;
    const Email = req.body.Email;
    const PassportNumber = req.body.PassportNumber;
    const Username = req.body.Username;
    const Password = req.body.Password;
    
    bcrypt.hash(Password, 12)
    .then(hashedpassword=>{
        const newExistingUser = new UserModel({
            FirstName: FirstName,
            LastName: LastName,
            HomeAddress: HomeAddress,
            CountryCode: CountryCode,
            TelephoneNumber: TelephoneNumber,
            CountryCode2: CountryCode2,
            TelephoneNumber2: TelephoneNumber2,
            Email: Email,
            PassportNumber: PassportNumber,
            Username: Username,
            Password: hashedpassword
            });
         newExistingUser.save();
        res.send("Success!");
    })
    }); 
    
//display all flights
app.get("/read" , async (req,res) => {
    FlightModel.find({}, (err,result) => {
        if(err){
            res.send(err)
        } else{
            //console.log(result);
            res.send(result);
        }
    })
}
);

//display all reserved flights
app.get("/readReserved" , async (req,res) => {
    ReservedModel.find({}, (err,result) => {
        if(err){
            res.send(err)
        } else{
            //console.log(result);
            res.send(result);
        }
    })
}
);

// app.get('/protected', requireLogin, (req,res) => {
//     res.send("hello user")
// }); 

//user login
app.post("/login", async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username, Password)
    if(!Username|| !Password) {
        return res.status(422).json({error:"Please enter both username AND password"})
    }
    UserModel.findOne({Username:Username})
    .then(savedUser => {
        
        if(savedUser === null){
            return res.status(422).json({error:"Invalid username"})
        }
        bcrypt.compare(Password, savedUser.Password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "Successfully signed up"})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id, FirstName, LastName, HomeAddress, CountryCode, TelephoneNumber,
                    CountryCode2, TelephoneNumber2, Email, PassportNumber, UserType, Username, Password} = savedUser;
                res.json({token, user:{_id, FirstName, LastName, HomeAddress, CountryCode, TelephoneNumber,
                    CountryCode2, TelephoneNumber2, Email, PassportNumber, UserType, Username, Password}})
            }
            else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err => {console.log(err)})
    })
})

//admin updates flight
app.put("/update", async (req, res) => {
    const newFlightDate = req.body.newFlightDate;
    const id = req.body.id;
    try{
        await FlightModel.findById(id, (error, flightToUpdate) => {
            flightToUpdate.FlightDate = newFlightDate;
            flightToUpdate.save();
        });
    } catch(err){
        console.log(err);
    }
    res.send("Updated!")
});

app.put("/editreservation", async(req,res) => {
    const id = req.body.id;
    const FlightNumber = req.body.FlightNumber;
    const OldSeat = req.body.OldSeat;
    const NewSeat = req.body.NewSeat;

    //try{
        await ReservedModel.findById(id).then(reservationToUpdate => {
            let index = reservationToUpdate.ReservedSeats.indexOf(OldSeat);
            reservationToUpdate.ReservedSeats[index] = NewSeat;
            let index2 = reservationToUpdate.NotReservedSeats.indexOf("taken");
            reservationToUpdate.NotReservedSeats[index2] = OldSeat; 
            let index3 = reservationToUpdate.NotReservedSeats.indexOf(NewSeat);
            reservationToUpdate.NotReservedSeats[index3] = "taken";
            reservationToUpdate.save();
        }).catch(err => {console.log(err)});
        
        await FlightModel.findOne({FlightNumber:FlightNumber})
        .then(flightToUpdate => {
            console.log("ftu: " , flightToUpdate);
            let as = flightToUpdate.SeatsAvailable
            let index = as.indexOf("taken");
            flightToUpdate.SeatsAvailable[index] = OldSeat;
            let index2 = as.indexOf(NewSeat);
            flightToUpdate.SeatsAvailable[index2] = "taken";
            flightToUpdate.save();
        }).catch(err => {console.log(err)});
        
    // } catch(err){
    //     console.log(err);
    // }
    res.send("Updated!")
})

//user updates info
app.put("/updateinfo", async (req, res) => {
    const id = req.body.id;
    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const newEmail = req.body.newEmail;
    const newPassportNumber = req.body.newPassportNumber;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    console.log(newLastName);
    try{
        await UserModel.findById(id, (error, userToUpdate) => {
            if(newFirstName)
                userToUpdate.FirstName = newFirstName;
            if(newLastName)
                userToUpdate.LastName = newLastName;
            if(newEmail)
                userToUpdate.Email = newEmail;
            if(newPassportNumber)
                userToUpdate.PassportNumber = newPassportNumber;
            if(newPassword)
            {
                bcrypt.compare(oldPassword, userToUpdate.Password)
                .then(doMatch => {
                    console.log("old password: " , userToUpdate.Password);
                    if(doMatch){
                        bcrypt.hash(newPassword, 12)
                        .then(hashedpassword => {
                            //console.log("new password: " , hashedpassword)
                            userToUpdate.Password = hashedpassword;
                            console.log("password updated successfully!")
                            userToUpdate.save();
                    })}
                }).catch(err => {console.log(err)})
            } 
            userToUpdate.save();
        });
    } catch(err){
        console.log(err);
    }
    res.send("Updated!")
});


//admin deletes flight
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await FlightModel.findByIdAndRemove(id).exec().catch(err => {console.log(err)});
    res.send("Item Deleted!");
});

//user cancels a reservation
app.delete('/cancel/:id', async (req, res) => {
    const id = req.params.id;
    const FlightNumber = req.body.FlightNumber;
    const NumberOfTickets = req.body.NumberOfTickets;
    const ReservedSeats = req.body.ReservedSeats; 

    // console.log("Flight Number is: ", FlightNumber);
    
    await ReservedModel.findByIdAndRemove(id).exec();
    console.log("FlightNumber is:" , FlightNumber)
    await FlightModel.findOne({FlightNumber:FlightNumber})
    .then(cancelledFlight => {
        console.log("cancelledFlight info is: ", cancelledFlight)
       console.log("oldNum: ", cancelledFlight.SeatsAvailableOnFlight)
        cancelledFlight.SeatsAvailableOnFlight =  cancelledFlight.SeatsAvailableOnFlight + NumberOfTickets;
        console.log("newNum: ", cancelledFlight.SeatsAvailableOnFlight)
       for(let j = 0; j<ReservedSeats.length; j++)
            {
                let reservedseat = ReservedSeats[j];
                let seats = cancelledFlight.SeatsAvailable;
                let index = seats.indexOf("taken");
                cancelledFlight.SeatsAvailable[index] = reservedseat;
            }
       //console.log("new available seats is: " , cancelledFlight.SeatsAvailableOnFlight);
       cancelledFlight.save();
        })
        .catch(err => {console.log(err)})
    res.send("Item Deleted!");
});


app.listen(3007, () => {
    console.log("You're connected");
});