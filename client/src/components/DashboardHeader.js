import { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import utils from "../utils";

const DashboardHeader = (props) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const baseURL = utils.baseURL;

  useEffect(() => {
    const fetchEmail = async () => {
      const sameUserID = sessionStorage.getItem("userID");
      const result = await axios.get(`${baseURL}/api/users/${sameUserID}`);
      setEmail(result.data.recordset[0].email);
    };
    fetchEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className="dashboardHeader">
      <h1>{email === "" ? "User" : email}'s Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>
        <LogoutOutlined />
        &nbsp;&nbsp;Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
