import React, {useState, useReducer} from "react";
import './CreateUserComponent.css'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    };
}
function CreateUserComponent() {
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
        fetch('http://localhost:8080/v1/users', requestOptions)
            .then(response => response.json())
            .then(data => {
               console.log('New user: ');
               console.log(data);
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
        <div className="createUser">
            { submitting &&
                <div>Submitting Form...</div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <span>Username: </span>
                        <input name="username" onChange={handleChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Password: </span>
                        <input name="password" onChange={handleChange}/>
                    </label>
                </fieldset>
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default CreateUserComponent;