import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import OwnerProfile from './components/OwnerProfile';
import AddItemForRent from './components/AddItemForRent';
import ProtectedRoute from './components/ProtectedRoute';
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";
import EditItemForRent from "./components/EditItemForRent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App() {


  ///State variable to manage data of items in Catalog component using a callback function
  const [items, setItems] = useState("")

  const handleData = value => {

    setItems(value)
  }
  ////////////////////////


  return (
    <MuiThemeProvider>
      <div>


        <Router>
          <h1>Rentech</h1>
          <nav className="nav-bar">
            <NavLink className="nav-link" to="https://elegant-kilby-53fb52.netlify.com/index.html">Home</NavLink>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/catalog">Catalog</NavLink>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/profile">Your Profile</NavLink>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/add-item">Add Item For Rent</NavLink>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/login">Login / Logout</NavLink>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/register">Register</NavLink>
          </nav>
          <Switch>
            <ProtectedRoute exact path="/profile" component={OwnerProfile} />
            <ProtectedRoute exact path="/add-item" component={AddItemForRent} />
            <Route path="/edit-item/:id" component={EditItemForRent} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/catalog/:id" render={routeProps => { return (<ProductPage match={routeProps.match} items={items} />) }} />
            <Route path="/catalog" render={routeProps => { return (<Catalog handleData={handleData} />) }} />
            <Route component={Home} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
