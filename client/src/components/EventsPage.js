import axios from "axios";
import { useState, useEffect } from "react";
import utils from "../utils";

const Event = () => {
  return <div>Hi</div>;
};

const EventsPage = (props) => {
  const { userID } = props;
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = utils.baseURL;

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await axios.get(`${baseURL}/api/events`);
      setEvents(allEvents.data);
      setIsLoading(false);
    };
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventView = (event) => {
    console.log(event);
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
