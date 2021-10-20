import React, {useState, useReducer} from "react";
import { Constants } from "../../../config/globals";
import './CreateUserComponent.css'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    };
}
function CreateUserComponent(props) {
    const [formData, setFormData] = useReducer(formReducer, {}, ()=>{});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);

        setSubmitting(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        // TODO: The server location should be loaded from the environment files.
        fetch(`${Constants.SERVER}:${Constants.PORT}${Constants.API_VERSION}${Constants.USERS_ENDPOINT}`, requestOptions)
            .then(response => response.json())
            .then(data => {
               console.log('New user: ');
               console.log(data);
               props.actionCallback();
               setSubmitting(false);
            });

    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        })
    }

    return (
        <div className="createUserComponent">
            <div className="createUser">
                { submitting &&
                    <div>Submitting Form...</div>
                }
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <span>Username: </span>
                        <input name="username" onChange={handleChange}/>
                    </fieldset>
                    <fieldset>
                        <span>Password: </span>
                        <input type="password" name="password" onChange={handleChange}/>
                    </fieldset>
                    <button type="submit">Create User</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUserComponent;