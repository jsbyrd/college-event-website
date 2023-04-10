import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./pages/loginForm/LoginForm";
import SignUpForm from "./pages/signUpForm/SignUpForm";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  // On refresh, reset value of userID by retrieving it from sessionStorage

  useEffect(() => {
    const getUserID = sessionStorage.getItem("userID");
    if (getUserID) {
      setUserID(getUserID);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setUserID={setUserID}></LoginForm>}
        />
        <Route
          path="/login"
          element={<LoginForm setUserID={setUserID}></LoginForm>}
        />
        <Route
          path="/signup"
          element={<SignUpForm setUserID={setUserID}></SignUpForm>}
        />
        <Route
          path="/home/*"
          element={<Dashboard userID={userID}></Dashboard>}
        />
      </Routes>
    </div>
  );
};

export default App;
