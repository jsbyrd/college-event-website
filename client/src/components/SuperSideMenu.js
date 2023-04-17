import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const SuperSideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="sideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Approve Events",
            icon: <CalendarOutlined />,
            key: "/dashboard/approve-events"
          }
        ]}
      ></Menu>
    </div>
  );
};

export default SuperSideMenu;
