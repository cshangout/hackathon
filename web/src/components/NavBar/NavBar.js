import React from 'react';
import "bootstrap/js/src/collapse.js";
import LoginHandler from "../UserHandler/LoginHandler";

function NavBar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SNHU Computer Science</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                        </li>
                    </ul>
                    <LoginHandler />

                </div>

            </div>
        </nav>
    )
}

export default NavBar;