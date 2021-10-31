import "./LoginHandler.css";

import CreateUserComponent from "./CreateUser/CreateUserComponent";
import {useContext, useState} from "react";
import AuthContext from "../../store/auth/auth-store";
import LoginComponent from "./Login/Login";

function LoginHandler(props) {
    const authContext = useContext(AuthContext);
    const [creatingUser, setCreatingUser] = useState(false);

    const createUser = (event) => {
        event.preventDefault();
        setCreatingUser(!creatingUser);
    }

    return (
        <div className="d-flex loginHandler text-light">
            { creatingUser ? <CreateUserComponent register={createUser} />
                : <div> { !authContext.userDetails.loggedIn ? <LoginComponent register={createUser}/> :
                    <div>
                        <span>Welcome, { authContext.userDetails.username }!</span>
                        <a onClick={authContext.logOut}> Log out </a>
                    </div> }
                </div>
            }
        </div>
    )
}

export default LoginHandler;