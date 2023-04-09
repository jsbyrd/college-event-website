import { Routes, Route } from "react-router-dom";
import EventsPage from "../pages/eventsPage/EventsPage";
import JoinRso from "../pages/joinRso/JoinRso";
import CreateRso from "../pages/createRso/CreateRso";
import CreateEvent from "../pages/createEvent/CreateEvent";

const PageContent = (props) => {
  const { userID } = props;

  return (
    <div className="pageContent">
      <Routes>
        <Route path="events" element={<EventsPage userID={userID} />} />
        <Route path="join-rso" element={<JoinRso></JoinRso>} />
        <Route path="create-rso" element={<CreateRso />} />
        <Route path="create-event" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

export default PageContent;
