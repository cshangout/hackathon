import AuthContext from "./auth-store";
import React, {useState} from 'react';
import {Constants} from "../../config/globals";
import jwt_decode from "jwt-decode";

function AuthProvider(props) {
    const [userDetails, setUserDetails] = useState({loggedIn: false});

    const logIn = (data, completionCallback) => {
        const claims = jwt_decode(data);
        // Decode jwt
        setUserDetails({
            loggedIn: true,
            username: claims.name,
            token: data
        });

        completionCallback(true);
        // TODO: Save to cookie for future use.
    };

    const logInFailed = (error, completionCallback) => {
        console.log("Failed to log in.");
        completionCallback(false);
    };

    return (
        <AuthContext.Provider value={{
            userDetails: userDetails,
            logIn: (credentials, completionCallback) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                };

                fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.LOGIN_ENDPOINT}`, requestOptions)
                    .then(response => {
                        if (response.status !== 200) {
                            response.json().then(data => logInFailed(data, completionCallback));
                        } else {
                            response.json().then(data => logIn(data, completionCallback));
                        }
                    })
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