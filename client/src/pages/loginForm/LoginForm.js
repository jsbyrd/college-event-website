import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import utils from "../../utils";
import "./LoginForm.css";

const LoginForm = (props) => {
  const { setUserID } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseURL = utils.baseURL;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginInfo = {
        email: email,
        password: password
      };

      const response = await axios.post(`${baseURL}/api/login/`, loginInfo);
      const user_id = response.data.recordset[0].user_id;
      console.log(user_id);
      setUserID(user_id);
      navigate("/home/events");
    } catch (err) {
      alert("Either your username or password is incorrect, please try again");
      console.log(err);
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="title">College Events</h1>
      <div className="login-form">
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                autoComplete="nope"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <p>
            <Link to="/signup" className="link">
              Don't have an account? Click here to create one!
            </Link>
          </p>
          <div className="action">
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
