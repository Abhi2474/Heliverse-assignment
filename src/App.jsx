import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Team from "./pages/Team";
import TeamContext from "./context/TeamContext";
import Navbar from "./components/Navbar";

function App() {
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(newUser));
  }, [newUser]);

  useEffect(() => {
    // Retrieve newUser array from local storage on component mount
    const savedUser = localStorage.getItem("team");
    if (savedUser) {
      setNewUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <TeamContext.Provider value={{ newUser, setNewUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </BrowserRouter>
      </TeamContext.Provider>
    </>
  );
}

export default App;
