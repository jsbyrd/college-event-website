import { Routes, Route } from "react-router-dom";
import EventsPage from "../pages/eventsPage/EventsPage";
import CreateRso from "../pages/createRso/CreateRso";
import CreateEvent from "../pages/createEvent/CreateEvent";

const PageContent = () => {
  return (
    <div>
      <Routes>
        <Route path="events" element={<EventsPage />} />
        <Route path="create-rso" element={<CreateRso />} />
        <Route path="create-event" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

export default PageContent;
