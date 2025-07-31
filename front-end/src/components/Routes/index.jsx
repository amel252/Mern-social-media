import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home.jsx";
import Trending from "../../pages/Trending.jsx";
import Profil from "../../pages/Profil.jsx";

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    );
};

export default index;
