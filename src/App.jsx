import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={loggedIn ? "app-dashboard" : "app-login"}>
      {loggedIn
        ? <Dashboard setLoggedIn={setLoggedIn} />
        : <Login setLoggedIn={setLoggedIn} />
      }
    </div>
  );
}

export default App;