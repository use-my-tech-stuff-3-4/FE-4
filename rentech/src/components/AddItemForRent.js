import React from 'react';
import { axiosWithAuth } from '../utilities/axiosWithAuth';

class AddItemForRent extends React.Component {
    state = {
        items: [],
        newItem: {
            id: 0,
            user_id: 0,
            name: "",
            description: "",
            price: 0,
            price_type: "",
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get("/users/:id/items")
            //HELP: How do I get the right user id in here?
            .then(res => {
                console.log('getData function in AddItemForRent component', res)
                this.setState({
                    items: res.data
                })
            })
            .catch(err => {
                console.log('error occurred getting owner items data', err)
            })
    }

    updateNewItemID = () => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                id: this.state.friends.length + 1
            }
        })

    }

    addItem = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/users/register', this.state.newItem)
            .then(res => console.log('post result', res))
            .catch(err => console.log('error in post request', err))

        this.setState(
            {
                newItem: {
                    id: 0,
                    name: "",
                    age: 0,
                    email: ""
                }
            })
    }

    handleChange = e => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.addItem}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.newItem.name}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.newItem.description}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price ($USD)"
                    value={this.state.newItem.price}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="price_type"
                    placeholder="'hour', 'day', or 'week''"
                    value={this.state.newItem.price_type}
                    onChange={this.handleChange}
                />

                <button onClick={this.updateNewItemID}>Add Item For Rent</button>
            </form>
        )
    };
}

export default AddItemForRent;