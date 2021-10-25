import React, {useContext, useReducer} from 'react';
import AuthContext from "../../../store/auth/auth-store";
import "./Login.css"
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
        event.preventDefault();
        authContext.logIn(formData);
    };

    return (
        <div className="loginForm">
            <form className="loginForm-content" onSubmit={handleSubmit}>
                <div >
                    <input name="username" placeholder="username" onChange={handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" className="btn-outline-secondary">Log In</button>
                    <button className="btn-outline-secondary" onClick={props.register}>Register</button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;