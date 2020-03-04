import React from 'react';
import OwnerItemList from "./OwnerItemList";
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { connect } from 'react-redux';

function OwnerProfile(props) {
    axiosWithAuth();
    return (
        <div>
            <h1>{props.userData.username}'s Profile</h1>
            <OwnerItemList />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(
    mapStateToProps
)(OwnerProfile);