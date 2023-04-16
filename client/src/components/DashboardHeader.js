import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className="dashboardHeader">
      <h1>College Events Home Page</h1>
      <button className="logout-button" onClick={handleLogout}>
        <LogoutOutlined />
        &nbsp;&nbsp;Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
