import "./LoginHandler.css";

import CreateUserComponent from "./CreateUser/CreateUserComponent";
import {useContext, useState} from "react";
import AuthContext from "../../store/auth/auth-store";
import LoginComponent from "./Login/Login";

function LoginHandler(props) {
    const authContext = useContext(AuthContext);
    const [creatingUser, setCreatingUser] = useState(false);

    console.log(authContext)
    return (
        <div className="d-flex loginHandler text-light">
            { creatingUser ? <CreateUserComponent />
                : !authContext.userDetails.loggedIn ? <LoginComponent/> :
                    <div> Logged In </div>
            }
        </div>
    )
}

export default LoginHandler;