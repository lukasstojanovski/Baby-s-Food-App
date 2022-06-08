import React from "react";
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Breakfast } from "./components/Breakfast";
import { Dinner } from "./components/Dinner";
import { Brunch } from "./components/Brunch";
import { Lunch } from "./components/Lunch";
import { Register } from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
  <Router>
    <Routes>
      <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/breakfast" element={<Breakfast/>}/>
        <Route path="/brunch" element={<Brunch/>}/>
        <Route path="/lunch" element={<Lunch/>}/>
        <Route path="/dinner" element={<Dinner/>}/>
    </Routes>
  </Router>
  </div>
)