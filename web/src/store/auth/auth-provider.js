import AuthContext from "./auth-store";
import React, {useState} from 'react';
import {Constants} from "../../config/globals";

function AuthProvider(props) {
    const [userDetails, setUserDetails] = useState({loggedIn: false});
    return (
        <AuthContext.Provider value={{
            userDetails: userDetails,
            logIn: (credentials) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                };

                fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.LOGIN_ENDPOINT}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // TODO: Store JWT into Cookie
                        // Extract user details
                    });
            },
            logOut: () => {
                setUserDetails({
                    loggedIn: false,
                })
            },
            createUser: (credentials) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                };

                fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.USERS_ENDPOINT}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
            }
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;