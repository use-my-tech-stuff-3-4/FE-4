import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios"
import { Link } from "react-router-dom"



const Catalog = () => {

const [items, setItems ] = useState([])
const [query, setQuery] = useState("")

const handleQuery = value => {

    setQuery(value)
    console.log(query)

  }

  useEffect(() => {

    axios
    .get(`https://use-my-tech-stuff-4.herokuapp.com/api/items`)
    .then(response =>{
      const products = response.data.filter(item =>
      item.name.toLowerCase().includes(query.name.toLowerCase())
      );
  
      setItems(products);
      console.log(items) 
      console.log(query) 
  
    })
    .catch(error => console.log(error));
  }, [query]);


    return(
        <div>
            <h2>Catalog Page</h2>
            <SearchBar handleQuery={handleQuery} />
            <section>

                {items.map(item => (
                  <Link to={`/Catalog/${item.id}`}><div>{item.name}</div></Link>  
                ))}

            </section>
        </div>
    )
}



export default Catalog;