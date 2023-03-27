import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-form-container">
      <h1 className="title">College Events</h1>
      <div className="login-form">
        <form>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input type="email" placeholder="Email" autoComplete="nope" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
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
