import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/login"
          exact
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          exact
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
      </Routes>
    </div>
  );
}

export default App;
