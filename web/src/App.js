import './App.css';
import React from "react";
import UserListComponent from "./components/UserList/UserListComponent";
function App() {
  return (
    <div className="Hackathons">
        <h1> Let's create a hackathon</h1>
        <UserListComponent />
    </div>
  );
}

export default App;
