import { Routes, Route } from "react-router-dom";
import EventsPage from "./EventsPage";
import JoinRso from "./JoinRso";
import CreateRso from "./CreateRso";
import CreateEvent from "./CreateEvent";

const PageContent = (props) => {
  const { userID } = props;

  return (
    <div className="pageContent">
      <Routes>
        <Route path="events" element={<EventsPage userID={userID} />} />
        <Route path="join-rso" element={<JoinRso userID={userID}></JoinRso>} />
        <Route path="create-rso" element={<CreateRso userID={userID} />} />
        <Route path="create-event" element={<CreateEvent userID={userID} />} />
      </Routes>
    </div>
  );
};

export default PageContent;
