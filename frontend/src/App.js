import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Add from "./components/Add";
import Match from "./components/Match";
import Dashboard from "./components/Dashboard";
import AddBiometricCredential from "./components/add-photo";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add-photo" element={<AddBiometricCredential />} />
        <Route path="/match" element={<Match />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
