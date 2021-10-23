import "./UserListComponent.css"
import React, {useState, useEffect} from "react"
import UserComponent from "./UserComponent";

import { Constants } from "../../config/globals";

function UserListComponent(props) {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        return fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.USERS_ENDPOINT}`)
            .then(data => data.json());
    }

    const refreshPage = () => {
        let mounted = true;
        getUsers().then(users => {
            if (mounted) {
                setUsers(users['data']);
            }
        })
        return () => mounted = false;
    }

    useEffect(() => {
        refreshPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const usersComponents = users.map((user) => {
        return <li className="list-group-item" key={user.id}> <UserComponent user={user} actionCallback={refreshPage} /> </li>;
    })

    return (
        <div className="userListComponent">
            <ul className="list-group">
                {usersComponents}
            </ul>
        </div>
    );
}

export default UserListComponent;