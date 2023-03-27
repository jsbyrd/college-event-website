import { Typography } from "antd";

const DashboardFooter = () => {
  return (
    <div className="dashboardFooter">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms Of Use
      </Typography.Link>
    </div>
  );
};

export default DashboardFooter;
