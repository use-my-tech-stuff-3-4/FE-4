import React from 'react';
import OwnerItemList from "./OwnerItemList";
import { axiosWithAuth } from '../utilities/axiosWithAuth';

function OwnerProfile() {
    axiosWithAuth();
    return (
        <div>
            <h1>Username's Profile</h1>
            <OwnerItemList />
        </div>
    )
}
export default OwnerProfile;