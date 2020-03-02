import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import OwnerProfile from './components/OwnerProfile';
import AddItemForRent from './components/AddItemForRent';
import ProtectedRoute from './components/ProtectedRoute';
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <div>

      <Router>
      
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login / Logout</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Your Profile</Link>
          </li>
          <li>
            <Link to="/add-item">Add Item For Rent</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
        </ul>
        <Switch>
          <ProtectedRoute exact path="/profile" component={OwnerProfile} />
          <ProtectedRoute exact path="/add-item" component={AddItemForRent} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/catalog/:id" component={ProductPage}/>
          <Route path="/catalog" component={Catalog}/>
          <Route component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
