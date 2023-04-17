import DashboardHeader from "../../components/DashboardHeader";
import PageContent from "../../components/PageContent";
import SuperSideMenu from "../../components/SuperSideMenu";

const SuperDashboard = (props) => {
  const { userID } = props;

  return (
    <div className="dashboard">
      <DashboardHeader userID={userID} />
      <div className="main-container">
        <SuperSideMenu userID={userID}></SuperSideMenu>
        <PageContent userID={userID}></PageContent>
      </div>
    </div>
  );
};

export default SuperDashboard;
