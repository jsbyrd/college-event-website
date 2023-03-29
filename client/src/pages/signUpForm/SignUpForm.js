import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import axios from "axios";
import utils from "../../utils";
import "./SignUpForm.css";

const CreateUniversity = (props) => {
  const { universityName, setUniversityName } = props;

  return (
    <div className="content-2">
      <div className="input-field-2">
        <input
          type="text"
          value={universityName}
          onChange={setUniversityName}
          placeholder="University Name"
          autoComplete="nope"
        />
      </div>
    </div>
  );
};

const FindUniversity = (props) => {
  const { universities, setUnivID, isLoading } = props;

  const handleUniversityNameChange = (e) => {
    setUnivID(e.target.value);
  };

  if (isLoading) return null;

  return (
    <div className="signup-dropdown-container">
      <p className="signup-question">
        Select your university from the dropdown below
      </p>
      <select
        className="signup-dropdown"
        defaultValue={universities[0].key}
        onChange={handleUniversityNameChange}
        name="universities"
      >
        {universities.map((university) => {
          return (
            <option value={university.univ_id} key={university.univ_id}>
              {university.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const SignUpForm = () => {
  // Used to store all university names
  const [universities, setUniversities] = useState([]);
  // Used for weird stuff :/
  const [isLoading, setIsLoading] = useState(true);
  // Used for storing user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [univ_id, setUnivID] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const baseURL = utils.baseURL;

  useEffect(() => {
    const fetchUniversities = async () => {
      const allUniversities = await axios.get(`${baseURL}/api/universities`);
      setUniversities(allUniversities.data);
      setIsLoading(false);
    };
    fetchUniversities();
    console.log(universities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRadioChange = (e) => {
    setIsAdmin(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!");

    // The select tag wants to be weird, so here is my solution to that
    const new_univ_id = univ_id === null ? universities[0].univ_id : univ_id;

    console.log(email, password, new_univ_id, isAdmin);
    // IF ADMIN, CREATE UNIVERSITY FIRST

    // CREATE USER ACCOUNT

    // LOG USER INTO DASHBOARD/HOME PAGE
  };

  return (
    <div className="signup-form-container">
      <h1 className="title">College Events</h1>
      <div className="signup-form">
        <form onSubmit={handleFormSubmit}>
          <h1>Create Account</h1>
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
          <div className="signup-question-container">
            <p className="signup-question">Are you a university admin?</p>
            <Radio.Group onChange={handleRadioChange} value={isAdmin}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
          <div className="signup-university-container">
            {!isAdmin ? (
              <FindUniversity
                universities={universities}
                setUnivID={setUnivID}
                isLoading={isLoading}
              />
            ) : (
              <CreateUniversity
                universityName={universityName}
                setUniversityName={setUniversityName}
              />
            )}
          </div>
          <p>
            <Link to="/login" className="link">
              Already have an account? Click here to login!
            </Link>
          </p>
          <div className="action">
            <button>CREATE ACCOUNT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
