import React from 'react';
import "bootstrap/js/src/collapse.js";
import LoginHandler from "../UserHandler/LoginHandler";
import { Link } from "react-router-dom";

function NavBar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SNHU Computer Science</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <Link className="nav-link" to={"/users"}> Users </Link>
                        </li>
                    </ul>
                    <LoginHandler />

                </div>

            </div>
        </nav>
    )
}

export default NavBar;