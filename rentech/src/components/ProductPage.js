import React, { useState, useEffect } from "react";
import axios from "axios"

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
    }, [item.user_id]);



    console.log('renter', renter)
    return (

        <div className="item-wrapper">
            <div className="item-header">
                <div >
                    <img className="image" src="https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="placeholder" />
                </div>
                <div className="item-title-wrapper">
                    <h2>{item.name}</h2>
                    <h4>${item.price}/{item.price_type}</h4>
                    <p>{item.description}</p>

                </div>
            </div>

        </div>

    )
}

export default ProductPage;