import './App.css';
import React from "react";
import UserListComponent from "./components/UserList/UserListComponent";
import NavBar from "./components/NavBar/NavBar";
import AuthProvider from "./store/auth/auth-provider";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/home/home";

function App() {
  return (
    <AuthProvider>
        <div>
            <Router>
                <NavBar />

                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/users" component={UserListComponent} />
                    <Route render={() => <h1>404: The princess is in another castle!</h1>} />
                </Switch>
            </Router>
        </div>
    </AuthProvider>
  );
}

export default App;
