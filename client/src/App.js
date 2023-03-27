import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./pages/loginForm/LoginForm";
import SignUpForm from "./pages/signUpForm/SignUpForm";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm setUser={setUser}></LoginForm>} />
        <Route
          path="/login"
          element={<LoginForm setUser={setUser}></LoginForm>}
        />
        <Route
          path="/signup"
          element={<SignUpForm setUser={setUser}></SignUpForm>}
        />
        <Route path="/home/*" element={<Dashboard></Dashboard>} />
      </Routes>
    </div>
  );
};

export default App;
