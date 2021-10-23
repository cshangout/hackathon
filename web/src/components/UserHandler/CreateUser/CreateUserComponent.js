import React, {useState, useReducer, useContext} from "react";
import './CreateUserComponent.css'
import AuthContext from "../../../store/auth/auth-store";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    };
}
function CreateUserComponent(props) {
    const [formData, setFormData] = useReducer(formReducer, {}, ()=>{});
    const [submitting, setSubmitting] = useState(false);

    const authContext = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);

        setSubmitting(true);



        authContext.createUser(formData)
        // TODO: The server location should be loaded from the environment files.



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
                    <input name="username" placeholder="username" onChange={handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                    <button type="submit">Create User</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUserComponent;