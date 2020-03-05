import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddItemForRent extends React.Component {
    state = {
        newItem: {
            name: "",
            description: "",
            price: 0,
            price_type: "",
            user_id: this.props.userData.id
        }
    }
    redirectToProfile = () => {
        this.props.history.push("/profile")
    }
    addItem = (e) => {
        e.preventDefault();
        axios
            .post('https://use-my-tech-stuff-4.herokuapp.com/api/items', this.state.newItem)
            .then(res => {
                console.log('add new item post result', res);
                this.redirectToProfile();
            })
            .catch(err => console.log('error in add new item post request', err))

        this.setState(
            {
                newItem: {
                    id: 0,
                    name: "",
                    description: "",
                    price: 0,
                    price_type: "",
                    user_id: 0
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
            <form onSubmit={this.addItem} className="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.newItem.name}
                    onChange={this.handleChange}
                />
                <textarea
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

                <button>Add Item For Rent</button>
            </form>
        )
    };
}

const mapStateToProps = state => {
    return {
        allUsers: state.allUsers,
        userData: state.userData
    }
}

export default withRouter(connect(
    mapStateToProps,
    {}
)(AddItemForRent));
