import { useState, useEffect } from "react";
import { Input } from "antd";
import axios from "axios";
import utils from "../utils";

const CreateEvent = (props) => {
  const { userID } = props;
  const [adminsRso, setAdminsRso] = useState([]);
  // Used to collect user input
  const [rsoID, setRsoId] = useState("");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [access, setAccess] = useState("public");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const baseURL = utils.baseURL;

  useEffect(() => {
    const fetchRsos = async () => {
      const data = await axios.get(`${baseURL}/api/rosters/${userID}`);
      const allRsos = data.data.recordset;

      let rsoArray = [];
      allRsos.forEach(async (item) => {
        const data2 = await axios.get(`${baseURL}/api/rsos/${item.rso_id}`);
        rsoArray.push(data2.data.recordset[0]);
      });
      setAdminsRso(rsoArray);
    };
    fetchRsos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.get(
        `${baseURL}/api/universities/${userID}`
      );
      const univID = response1.data.recordset[0].univ_id;

      if (access === "rso" && adminsRso.length === 0) {
        alert(
          "You cannot create an RSO event because you do not administrate any RSOs"
        );
        return;
      }

      const finalRsoID =
        rsoID === "" && adminsRso.length > 0 ? adminsRso[0].rso_id : rsoID;

      const eventInfo = {
        name: eventName,
        univID: univID,
        location: location,
        description: eventDescription,
        category: category,
        email: email,
        phone: phone,
        access: access,
        rsoID: access === "rso" ? finalRsoID : null,
        date: date,
        time: time,
        isApproved: access === "public" ? 0 : 1
      };

      console.log("rsoid:", finalRsoID);

      // Create new event
      await axios.post(`${baseURL}/api/events`, eventInfo);

      setEventName("");
      setLocation("");
      setEventDescription("");
      setCategory("");
      setEmail("");
      setPhone("");
      setAccess("public");
      setDate(null);
      setTime(null);
      setRsoId("");
      if (eventInfo.access === "public") {
        alert("Event is pending approval from the super admin");
      } else {
        alert("Event has been successfully created");
      }
    } catch (err) {
      alert(
        `Error: Event overlaps with another existing event taking place at ${location} on ${date} at ${time}`
      );
    }
  };

  // Pretty much the same function copy and pasted 100 times...
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAccessChange = (e) => {
    setAccess(e.target.value);
  };

  const handleRsoIdChange = (e) => {
    setRsoId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="create-event-form-container">
      <h2>Create A New Event</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <Input
          value={eventName}
          onChange={handleEventNameChange}
          placeholder="Event Name"
          maxLength={50}
          required
        ></Input>
        <Input
          value={location}
          onChange={handleLocationChange}
          placeholder="Location"
          maxLength={50}
          required
        ></Input>
        <Input.TextArea
          value={eventDescription}
          onChange={handleEventDescriptionChange}
          placeholder="Add a description for your event! (200 characters max)"
          maxLength={200}
          rows={4}
        ></Input.TextArea>
        <Input
          value={category}
          onChange={handleCategoryChange}
          placeholder="Category"
          maxLength={50}
        ></Input>
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="Contact Email"
          maxLength={50}
        ></Input>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Contact Phone Number"
          maxLength={50}
        ></Input>

        <p style={{ fontSize: "15px" }}>
          Access Level:&nbsp;
          <select
            name="access"
            value={access}
            onChange={handleAccessChange}
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="rso">RSO</option>
          </select>
        </p>
        {access === "rso" ? (
          <p style={{ fontSize: "15px" }}>
            RSO:&nbsp;
            <select name="rso" value={rsoID} onChange={handleRsoIdChange}>
              {adminsRso.length === 0
                ? null
                : adminsRso.map((rso) => {
                    return (
                      <option value={rso.rso_id} key={rso.rso_id}>
                        {rso.name}
                      </option>
                    );
                  })}
            </select>
          </p>
        ) : null}
        <Input
          value={date}
          onChange={handleDateChange}
          type="date"
          required
        ></Input>
        <Input
          value={time}
          onChange={handleTimeChange}
          type="time"
          required
        ></Input>
        <button className="create-event-button">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
