import React from "react";
import "./App.css";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Route } from "react-router-dom";
import Register from "./Components/Register";

export default function App() {
  return (
    <div className="App">
      <h1>Forms</h1>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
    </div>
  );
}
