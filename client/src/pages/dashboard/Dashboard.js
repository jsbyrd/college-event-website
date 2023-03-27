import { Space } from "antd";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardFooter from "../../components/DashboardFooter";
import PageContent from "../../components/PageContent";
import SideMenu from "../../components/SideMenu";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <Space className="sideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
