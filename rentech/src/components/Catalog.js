import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

const Catalog = props => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = value => {
    setQuery(value);
    console.log(query);
  };

  useEffect(() => {
    axios
      .get(`https://use-my-tech-stuff-4.herokuapp.com/api/items`)
      .then(response => {
        const products = response.data.items.filter(element =>
          element.name.toLowerCase().includes(query.search.toLowerCase())
        );

        setItems(products);
        console.log(items);
        props.handleData(products);
      })
      .catch(error => console.log(error));
  }, [query]);

  return (
    <div className="catalog">
      <SearchBar handleQuery={handleQuery} />
      <section className="items">
        {items.map(item => (
          <Link className="link" to={`/catalog/${item.id}`} key={item.id}>
            <Card className="card">
              <Image className="image-card" src="https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" wrapped ui={false} />
              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>${item.price}/{item.price_type}</Card.Meta>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Catalog;
