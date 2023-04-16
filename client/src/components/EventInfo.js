import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
import "./EventInfo.css";
import utils from "../utils";

const EventInfo = (props) => {
  const { userID } = props;
  const { eventID } = useParams();
  const [eventInfo, setEventInfo] = useState({});
  const [comment, setComment] = useState(""); // User Input
  const [comments, setComments] = useState([]); // Already existing comments
  const [rsoName, setRsoName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = utils.baseURL;

  // Fetch Event Info
  useEffect(() => {
    const fetchEvent = async () => {
      const event = await axios.get(`${baseURL}/api/events/${eventID}`);
      setEventInfo(event.data[0]);
      const comment = await axios.get(
        `${baseURL}/api/rsos/${event.data[0].rso_id}`
      );
      if (comment.data.recordset.length > 0) {
        setRsoName(comment.data.recordset[0].name);
      }
      setIsLoading(false);
    };
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch comments for this particular event
  useEffect(() => {
    const fetchComments = async () => {
      const result = await axios.get(`${baseURL}/api/comments/${eventID}`);
      setComments(result.data);
    };
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentCreation = async (e) => {
    e.preventDefault();
    try {
      const commentInfo = {
        userID: userID,
        eventID: eventID,
        description: comment
      };
      await axios.post(`${baseURL}/api/comments/`, commentInfo);
      setComment("");
      window.location.reload(false);
      alert("Your comment has successfully been published!");
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong with your comment submission, please try again"
      );
    }
  };

  const handleCommentEdit = async (commentID) => {
    const response = prompt("Please enter your edited comment here:");
    try {
      const editedCommentInfo = {
        commentID: commentID,
        description: response
      };
      await axios.put(`${baseURL}/api/comments/`, editedCommentInfo);
      window.location.reload(false);
      alert("Your comment has been successfully edited!");
    } catch (err) {
      console.log(err);
      alert("Something went wrong with trying to edit your comment :(");
    }
  };

  const handleCommentDelete = async (commentID) => {
    try {
      await axios.delete(`${baseURL}/api/comments/${commentID}`);
      window.location.reload(false);
      alert("Your comment has been successfully deleted");
    } catch (err) {
      console.log(err);
      alert("Something went wrong with trying to delete your comment :(");
    }
  };

  if (isLoading) {
    return <p style={{ marginTop: "20px" }}>Loading Event...</p>;
  }

  return (
    <div className="event-info-container">
      <div className="event-info-info">
        <p>
          <strong>Event Name: </strong>
          {eventInfo.name}
        </p>
        <p>
          <strong>Description: </strong>
          {eventInfo.description}
        </p>
        <p>
          <strong>Location: </strong>
          {eventInfo.location}
        </p>
        <p>
          <strong>Date: </strong>
          {eventInfo.date.substr(0, 10)}
        </p>
        <p>
          <strong>Time: </strong>
          {eventInfo.time.substr(11, 8)}
        </p>
        <p>
          <strong>Category: </strong>
          {eventInfo.category}
        </p>
        <p>
          <strong>Access: </strong>
          {eventInfo.access.charAt(0).toUpperCase() + eventInfo.access.slice(1)}
        </p>
        <p>
          <strong>RSO: </strong>&nbsp;
          {eventInfo.rso_id === null || eventInfo.rso_id === undefined
            ? "N/A"
            : rsoName}
        </p>
        <p>
          <strong>Contact Email: </strong>
          {eventInfo.email}
        </p>
        <p>
          <strong>Contact Phone: </strong>
          {eventInfo.phone}
        </p>
      </div>
      <form className="event-info-form" onSubmit={handleCommentCreation}>
        <Input.TextArea
          className="create-comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add your comment here! (200 characters max)"
          maxLength={200}
          rows={3}
          required
        ></Input.TextArea>
        <button className="create-comment-button">Comment</button>
      </form>
      <ul className="comment-list">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-list-item">
              <div className="comment-list-item-top">
                <p className="comment-name">
                  <strong>{comment.email}</strong>
                </p>
                {comment.user_id === userID ? (
                  <div className="comment-buttons">
                    <button
                      className="comment-edit-button"
                      onClick={() => handleCommentEdit(comment.comment_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="comment-delete-button"
                      onClick={() => handleCommentDelete(comment.comment_id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
              <p>{comment.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventInfo;
