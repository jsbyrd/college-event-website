import DashboardHeader from "../../components/DashboardHeader";
import PageContent from "../../components/PageContent";
import SideMenu from "../../components/SideMenu";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { userID } = props;

  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="main-container">
        <SideMenu></SideMenu>
        <PageContent userID={userID}></PageContent>
      </div>
    </div>
  );
};

export default Dashboard;
