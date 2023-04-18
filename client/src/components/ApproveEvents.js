import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../utils";

const ApproveEvents = (props) => {
  const { userID } = props;
  const [events, setEvents] = useState([]);

  const baseURL = utils.baseURL;

  useEffect(() => {
    // Update to only show rsos within same university as user
    const fetchRsos = async () => {
      const finalUserID =
        userID === null ? sessionStorage.getItem("userID") : userID;
      const response1 = await axios.get(
        `${baseURL}/api/superAdmin/${finalUserID}`
      );
      setEvents(response1.data.recordset);
    };
    fetchRsos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventApprove = async (eventID) => {
    try {
      const eventInfo = {
        eventID: eventID
      };
      await axios.put(`${baseURL}/api/superAdmin/`, eventInfo);
      alert("Event has successfully been approved!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong with trying to approve this event, please try again later"
      );
    }
  };

  const handleEventDelete = async (eventID) => {
    try {
      await axios.delete(`${baseURL}/api/superAdmin/${eventID}`);
      alert("Event has been successfully been deleted!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong with trying to delete this event, please try again later"
      );
    }
  };

  return (
    <ul className="comment-list">
      {events.map((event) => {
        return (
          <li key={event.event_id} className="comment-list-item">
            <div className="comment-list-item-top">
              <p className="comment-name">
                <strong>{event.name}</strong>
              </p>
              <div className="comment-buttons">
                <button
                  className="comment-edit-button"
                  onClick={() => handleEventApprove(event.event_id)}
                >
                  Approve
                </button>
                <button
                  className="comment-delete-button"
                  onClick={() => handleEventDelete(event.event_id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{event.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ApproveEvents;
