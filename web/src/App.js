import './App.css';
import React, {useState} from "react";
import CreateUserComponent from './components/CreateUser/CreateUserComponent.js'

function App() {
  return (
    <div className="Hackathons">
      <h1> Let's create a hackathon</h1>
      <CreateUserComponent />
    </div>
  );
}

export default App;
