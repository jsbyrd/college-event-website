import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils";

const EventsPage = (props) => {
  const { userID } = props;
  const [events, setEvents] = useState([]);

  const baseURL = utils.baseURL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await axios.get(`${baseURL}/api/events`);
      console.log(allEvents.data);
      setEvents(allEvents.data);
    };
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventView = (event) => {
    navigate(`${event.event_id}`);
  };

  return (
    <ul className="event-list">
      {events.map((event) => {
        return (
          <li key={event.event_id} className="event-list-item">
            <div className="event-list-item-top">
              <p className="event-name">
                <strong>Event: {event.name}</strong>
              </p>
              <button
                className="event-view-button"
                onClick={() => handleEventView(event)}
              >
                View Event
              </button>
            </div>
            <p>{event.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default EventsPage;
