import axios from "axios";
import { useState, useEffect } from "react";
import utils from "../../utils";

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

  return <div>Events</div>;
};

export default EventsPage;
