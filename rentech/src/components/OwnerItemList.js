import React from 'react';
import { axiosWithAuth } from '../utilities/axiosWithAuth';

class OwnerItemList extends React.Component {
    state = {
        items: []
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get("/users/:id/items")
            //HELP: How do I get the right user id in here?
            .then(res => {
                console.log('getData function in OwnerProfile component results', res)
                this.setState({
                    items: res.data
                })
            })
            .catch(err => {
                console.log('error occurred getting owner profile data', err)
            })

    }

    render() {
        let itemsList = this.state.items;
        return (
            itemsList.map(n => {
                return (
                    <div>
                        <div key={n.id}>
                            <p>Name: {n.name}</p>
                            <p>Description: {n.description}</p>
                            <p>Price: {n.price} per {n.price_type}</p>
                        </div>
                    </div>
                )

            })
        )
    }
}

export default OwnerItemList;