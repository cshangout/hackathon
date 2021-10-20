import React, { useState } from 'react';
import "./UserListComponent.css"
import {Constants} from "../../config/globals";

function UserComponent(props) {
    const [deleting, setDeleting] = useState(false);

    const deleteUser = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        setDeleting(true);
        // TODO: The server location should be loaded from the environment files.
        fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.USERS_ENDPOINT}/${props.user.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setDeleting(false);
                props.actionCallback();
            });

        console.log('Deleting User')
    }


    return (
        <div className="userContainer">
            <div className="usernameContainer"> <span>Username: </span> {props.user.username}</div>
            <button onClick={deleteUser} className={`deleteButton btn btn-danger ${deleting ? "disabled" : ""}`}> {deleting ? "Deleting..." : "Delete User"}</button>
        </div>
    )
}
export default UserComponent;