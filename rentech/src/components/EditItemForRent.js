import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

class EditItemForRent extends React.Component {

    state = {
        updatedItem: {
            name: "",
            description: "",
            price: 0,
            price_type: "",
            user_id: this.props.userData.id
        }
    }

    updateItem = (e) => {
        e.preventDefault();
        axios
            .put(`https://use-my-tech-stuff-4.herokuapp.com/api/items/${this.props.history.id}`, this.state.updatedItem, config)
            .then(res => {
                console.log('update item put request result', res);
                this.props.history.push("/profile");
            })
            .catch(err => console.log('error in add new item post request', err))
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
        console.log('is this the id?', this.props.history.id)
        return (
            <form onSubmit={this.updateItem}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.updatedItem.name}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.updatedItem.description}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price ($USD)"
                    value={this.state.updatedItem.price}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="price_type"
                    placeholder="'hour', 'day', or 'week''"
                    value={this.state.updatedItem.price_type}
                    onChange={this.handleChange}
                />

                <button>Update Item</button>
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
)(EditItemForRent));