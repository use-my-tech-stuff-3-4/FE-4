import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditItemForRent extends React.Component {
    paramItemId = this.props.match.params.id;

    state = {
        updatedItem: {
            name: "",
            description: "",
            price: 0,
            price_type: "",
            user_id: this.props.userData.id
        },
        currentItem: {}
    }

    componentDidMount() { this.findCurrentItem() };

    findCurrentItem = () => {
        axios
            .get(`https://use-my-tech-stuff-4.herokuapp.com/api/items/${this.paramItemId}`)
            .then(res => {
                console.log('res in getting current item by id', res)
                this.setState({ currentItem: res.data.item[0] });
            })
            .catch(err => console.log("error in finding the item you clicked on", err))
    }


    updateItem = (e) => {
        e.preventDefault();
        console.log('state going into PUT request', this.state.updatedItem);
        axios
            .put(`https://use-my-tech-stuff-4.herokuapp.com/api/items/${this.paramItemId}`, this.state.updatedItem)
            .then(res => {
                console.log('update item put request result', res);
                this.props.history.push("/profile");
            })
            .catch(err => console.log('error in add new item post request', err))
    }

    handleChange = e => {
        this.setState({
            updatedItem: {
                ...this.state.updatedItem,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.updateItem} className="form">
                <input
                    type="text"
                    name="name"
                    placeholder={this.state.currentItem.name}
                    value={this.state.updatedItem.name}
                    onChange={this.handleChange}
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder={this.state.currentItem.description}
                    value={this.state.updatedItem.description}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder={this.state.currentItem.price}
                    value={this.state.updatedItem.price}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="price_type"
                    placeholder={this.state.currentItem.price_type}
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