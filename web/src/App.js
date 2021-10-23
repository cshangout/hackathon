import './App.css';
import React from "react";
import UserListComponent from "./components/UserList/UserListComponent";
import NavBar from "./components/NavBar/NavBar";
import AuthProvider from "./store/auth/auth-provider";

function App() {
  return (
    <AuthProvider>
        <div>
            <NavBar />
            <UserListComponent />
        </div>
    </AuthProvider>
  );
}

export default App;
