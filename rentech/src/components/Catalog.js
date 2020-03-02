import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios"
import { Link, Route } from "react-router-dom"
import ProductPage from "./ProductPage"



const Catalog = () => {

  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')

  const handleQuery = value => {

    setQuery(value)
    console.log(query)


  }

  useEffect(() => {

    axios
      .get(`https://use-my-tech-stuff-4.herokuapp.com/api/items`)
      .then(response => {
        const products = response.data.items.filter(element => element.name.toLowerCase().includes(query.search.toLowerCase()))


        setItems(products);
        console.log(items)


      })
      .catch(error => console.log(error));
  }, [query]);


  return (
    <div>
      <h2>Catalog Page</h2>
      <SearchBar handleQuery={handleQuery} />
      <section className='items' >

        {items.map(item => (
          <Link className='link' to={`/catalog/${item.id}`}>
            <div className='items-list'>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}/{item.price_type}</p>
            </div></Link>
        ))}
      
      </section>
     
    </div>
  )
}



export default Catalog;