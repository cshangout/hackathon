import './App.css';
import React from "react";
import CreateUserComponent from './components/CreateUser/CreateUserComponent.js'
import UserListComponent from "./components/UserList/UserListComponent";
function App() {
  return (
    <div className="Hackathons">
        <h1> Let's create a hackathon</h1>
        <CreateUserComponent />
        <UserListComponent />
    </div>
  );
}

export default App;
