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

function App() {


  ///State variable to manage data of items in Catalog component using a callback function
  const [items, setItems] = useState("")

  const handleData = value => {

    setItems(value)
  }
  ////////////////////////


  return (
    <div>

      <Router>

        <ul className="nav-bar">
          <li>
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/login">Login / Logout</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/profile">Your Profile</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/add-item">Add Item For Rent</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeStyle={{ color: 'navy' }} to="/catalog">Catalog</NavLink>
          </li>
        </ul>
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
  );
}

export default App;
