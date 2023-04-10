import { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import utils from "../utils";

const CreateRso = (props) => {
  const { userID } = props;
  const [rsoName, setRsoName] = useState("");
  const [rsoDescription, setRsoDescription] = useState("");

  const baseURL = utils.baseURL;

  const handleRsoNameChange = (e) => {
    setRsoName(e.target.value);
  };

  const handleRsoDescriptionChange = (e) => {
    setRsoDescription(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response1 = await axios.get(
        `${baseURL}/api/universities/${userID}`
      );
      const univID = response1.data.recordset[0].univ_id;
      console.log(univID);

      const rsoInfo = {
        userID: userID,
        univID: univID,
        name: rsoName,
        description: rsoDescription
      };

      // Create new RSO
      const response = await axios.post(`${baseURL}/api/rsos`, rsoInfo);
      const rsoID = response.data;

      const rosterInfo = {
        userID: userID,
        rsoID: rsoID,
        isAdmin: 1
      };

      // Add User & RSO to Roster
      await axios.post(`${baseURL}/api/rosters`, rosterInfo);

      setRsoName("");
      setRsoDescription("");
      alert("RSO has successfully been created!");
    } catch (err) {
      alert("Error: RSO name already exists!");
    }
  };

  return (
    <div className="create-rso-form-container">
      <h2>Create a new RSO</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <Input
          value={rsoName}
          onChange={handleRsoNameChange}
          placeholder="Name"
          maxLength={50}
          required
        ></Input>
        <Input.TextArea
          value={rsoDescription}
          onChange={handleRsoDescriptionChange}
          placeholder="Add a description for your RSO! (200 characters max)"
          maxLength={200}
          rows={6}
        ></Input.TextArea>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateRso;
