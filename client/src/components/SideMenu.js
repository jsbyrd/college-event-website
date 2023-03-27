import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  CalendarOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="sideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Events",
            icon: <CalendarOutlined />,
            key: "/home/events"
          },
          {
            label: "Create RSO",
            icon: <UsergroupAddOutlined />,
            key: "/home/create-rso"
          },
          {
            label: "Create Event",
            icon: <AppstoreAddOutlined />,
            key: "/home/create-event"
          }
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
