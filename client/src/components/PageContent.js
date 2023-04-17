import { Routes, Route } from "react-router-dom";
import EventsPage from "./EventsPage";
import EventInfo from "./EventInfo";
import JoinRso from "./JoinRso";
import CreateRso from "./CreateRso";
import CreateEvent from "./CreateEvent";
import ViewRsos from "./ViewRsos";
import ApproveEvents from "./ApproveEvents";

const PageContent = (props) => {
  const { userID } = props;

  return (
    <div className="pageContent">
      <Routes>
        <Route exact path="events" element={<EventsPage userID={userID} />} />
        <Route path="events/:eventID" element={<EventInfo userID={userID} />} />
        <Route
          exact
          path="join-rso"
          element={<JoinRso userID={userID}></JoinRso>}
        />
        <Route
          exact
          path="create-rso"
          element={<CreateRso userID={userID} />}
        />
        <Route
          exact
          path="create-event"
          element={<CreateEvent userID={userID} />}
        />
        <Route exact path="view-rsos" element={<ViewRsos userID={userID} />} />
        <Route
          exact
          path="approve-events"
          element={<ApproveEvents userID={userID} />}
        />
      </Routes>
    </div>
  );
};

export default PageContent;
