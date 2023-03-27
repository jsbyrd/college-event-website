import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./pages/loginForm/LoginForm";
import SignUpForm from "./pages/signUpForm/SignUpForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm></LoginForm>} />
        <Route path="/login" element={<LoginForm></LoginForm>} />
        <Route path="/signup" element={<SignUpForm></SignUpForm>} />
      </Routes>
    </div>
  );
};

export default App;
