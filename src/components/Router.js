import React from "react";
import { Routes, Route } from 'react-router-dom'
import Login from "./Login";
import Home from "./Home";
import Logout from "./Logout";
import About from "./About";
import Breweries from "./breweries/ChoiseByCities";
import BreweryDetails from './breweries/BreweryDetails'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breweries" element={<Breweries />} />
            <Route path="/brewerydetails" element={<BreweryDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}

export default Router;