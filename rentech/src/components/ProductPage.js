import React, { useState, useEffect } from "react";
import axios from "axios"
import { NavLink } from "react-router-dom";

const ProductPage = props => {

    const [renter, setRenter] = useState("")
    const paramItemId = props.match.params.id;

    const item = props.items.find(item => {
        return item.id === Number(paramItemId);
    });


    useEffect(() => {

        axios
            .get(`https://use-my-tech-stuff-4.herokuapp.com/api/users/${item.user_id}`)
            .then(response => {
                setRenter(response.data.user)

            })
            .catch(error => console.log(error));
    }, []);



    console.log('renter', renter)
    return (

        <div >
            <NavLink to="/catalog"><h3>Go back</h3></NavLink>
            <div className="item-wrapper">
                <div >
                    <img className="image" src="https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="placeholder" />
                </div>
                <div className="item-title-wrapper">
                    <h2>{item.name}</h2>
                    <h4>${item.price}/{item.price_type}</h4>
                    <h3>Description:</h3>
                    <p className="description">{item.description}</p>

                </div>
            </div>

        </div>

    )
}

export default ProductPage;