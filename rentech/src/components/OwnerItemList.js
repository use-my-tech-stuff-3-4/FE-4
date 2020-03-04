import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllUsers, setCurrentUser } from '../actions';
import { withRouter } from 'react-router-dom';

let currentUser = JSON.parse(window.localStorage.getItem("current_user"))
console.log('currentUser', currentUser)

class OwnerItemList extends React.Component {
    state = {
        items: [],
    };

    componentDidMount() {
        this.getCurrentUserItems();
        this.props.setCurrentUser(currentUser);
    }

    getCurrentUserItems = () => {
        axios
            .get(`https://use-my-tech-stuff-4.herokuapp.com/api/users/${this.props.userData.id}/items`)
            .then(res => {
                //console.log('id', this.props.userData.id)
                //console.log('getUserItems function in OwnerProfile component results', res)
                this.setState({
                    items: res.data.items
                })
            })
            .catch(err => {
                console.log('error occurred getting owner profile data', err)
            })

    }
    goToItemPage = (item) => {
        this.props.history.push(`/edit-item/${item}`)
    }

    deleteItem = (item) => {
        axios
            .delete(`https://use-my-tech-stuff-4.herokuapp.com/api/items/${item}`)
            .then(res => {
                console.log('res in the delete item request', res);
                this.props.history.push("/profile")
            })
            .catch(err => {
                console.log('error in deleting the item', err);
            })
    }

    render() {
        //console.log('allUsers in OwnerItemList', this.props.allUsers);
        let itemsList = this.state.items;
        return (
            itemsList.map(n => {
                return (
                    <div key={n.id}>
                        <div >
                            <p>Name: {n.name}</p>
                            <p>Description: {n.description}</p>
                            <p>Price: {n.price} per {n.price_type}</p>
                        </div>
                        <button onClick={() => { this.goToItemPage(n.id) }}>Edit Item</button>
                        <button onClick={() => { this.deleteItem(n.id) }}>Delete Item</button>
                    </div>
                )

            })
        )
    }
}

const mapStateToProps = state => {
    return {
        allUsers: state.allUsers,
        error: state.error,
        isFetchingData: state.isFetchingData,
        userData: state.userData
    }
}

export default withRouter(connect(
    mapStateToProps,
    { getAllUsers, setCurrentUser }
)(OwnerItemList));