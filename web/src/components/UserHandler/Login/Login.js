import React, {useContext, useReducer} from 'react';
import AuthContext from "../../../store/auth/auth-store";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    };
}
function LoginComponent(props) {
    const [formData, setFormData] = useReducer(formReducer, {}, ()=>{});
    const authContext = useContext(AuthContext);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        authContext.logIn(formData);
    };

    return (
        <div className="loginComponent">
            <div className="createUser">
                <form onSubmit={handleSubmit}>
                    <input name="username" placeholder="username" onChange={handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                    <button type="submit" className="btn-outline-secondary">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;