import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  SearchOutlined,
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
            label: "Join RSO",
            icon: <PlusCircleOutlined />,
            key: "/home/join-rso"
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
          },
          {
            label: "View Your RSOs",
            icon: <SearchOutlined />,
            key: "/home/view-rsos"
          }
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
