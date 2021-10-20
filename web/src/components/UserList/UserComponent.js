import React from 'react';
import "./UserListComponent.css"

function UserComponent(props) {
    const deleteUser = (event) => {
        event.preventDefault();

        console.log('Deleting User')
    }
    return (
        <div className="userContainer">
            <div className="usernameContainer"> <span>Username: </span> {props.user.username}</div>
            <button onClick={deleteUser} className="deleteButton btn btn-danger"> Delete User</button>
        </div>
    )
}
export default UserComponent;