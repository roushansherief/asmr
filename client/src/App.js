import './App.css';
import {useState, useEffect} from "react";
import Axios from 'axios';
import GuestHome from './pages/GuestHome';
import GuestHomeSearch from './pages/GuestHomeSearch';
import UserHome from './pages/UserHome';
import UserHomeReserved from './pages/UserHomeReserved';
import UserHomeSearch from './pages/UserHomeSearch';
import UserEditInfo from './pages/UserEditInfo';
import AdminHome from './pages/AdminHome';
import AdminAddFlight from './pages/AdminAddFlight';
import AdminHomeSearch from './pages/AdminHomeSearch';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() 
{
    return (
        <Router>
            <Routes>
                <Route path="/" element ={<Login />} />
                <Route path="/guestHome" element ={<GuestHome />} /> 
                <Route path="/guestHomeSearch" element ={<GuestHomeSearch />} />  
                <Route path="/userHome" element ={<UserHome />} /> 
                <Route path="/userEditInfo" element ={<UserEditInfo />} /> 
                <Route path="/userHomeReserved" element ={<UserHomeReserved />} />
                <Route path="/userHomeSearch" element ={<UserHomeSearch />} />  
                <Route path="/adminHome" element ={<AdminHome />} />
                <Route path="/adminHomeSearch" element ={<AdminHomeSearch />} />  
                <Route path="/adminAddFlight" element ={<AdminAddFlight />} />
                <Route path="/signUp" element ={<SignUp />} /> 
            </Routes>
        </Router>
    )
}

export default App;
