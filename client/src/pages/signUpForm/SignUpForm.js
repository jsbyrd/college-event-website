import { Link } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm = () => {
  return (
    <div className="signup-form-container">
      <h1 className="title">College Events</h1>
      <div className="signup-form">
        <form>
          <h1>Create Account</h1>
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
            <Link to="/login" className="link">
              Already have an account? Click here to login!
            </Link>
          </p>
          <div className="action">
            <button>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
