import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home.jsx";
import Trending from "../../pages/Trending.jsx";
import Profil from "../../pages/Profil.jsx";
import Navbar from "../Navbar.jsx";

const index = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </>
    );
};

export default index;
