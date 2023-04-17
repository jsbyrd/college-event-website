import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../utils";

const JoinRso = (props) => {
  const { userID } = props;
  const [rsos, setRsos] = useState([]);

  const baseURL = utils.baseURL;

  useEffect(() => {
    // Update to only show rsos within same university as user
    const fetchRsos = async () => {
      const response1 = await axios.get(
        `${baseURL}/api/universities/${userID}`
      );
      const univID = response1.data.recordset[0].univ_id;
      const allRsos = await axios.get(`${baseURL}/api/rsos/univOnly/${univID}`);
      setRsos(allRsos.data.recordset);
    };
    fetchRsos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinRso = async (rsoID) => {
    try {
      // check to see if user is already part of rso

      const res1 = await axios.get(`${baseURL}/api/rosters/${userID}/${rsoID}`);
      console.log(res1.data.recordset);
      if (res1.data.recordset[0][""] >= 1) {
        alert("You are already a member of this RSO!");
        return;
      }

      // add to roster
      const rosterInfo = {
        userID: userID,
        rsoID: rsoID,
        isAdmin: 0
      };
      await axios.post(`${baseURL}/api/rosters/`, rosterInfo);

      // update num_members
      const rsoInfo = {
        rsoID: rsoID
      };
      await axios.put(`${baseURL}/api/rsos`, rsoInfo);
      alert("You have been successfully added to the RSO!");
    } catch (err) {
      console.log(err);
      alert("You are already a member of this RSO!");
    }
  };

  return (
    <ul className="rso-list">
      {rsos.map((rso) => {
        return (
          <li key={rso.rso_id} className="rso-list-item">
            <div className="rso-list-item-top">
              <p className="rso-name">
                <strong>{rso.name}</strong>
                {rso.num_members >= 5 ? null : " (unofficial)"}
              </p>
              <button
                className="rso-join-button"
                onClick={() => handleJoinRso(rso.rso_id)}
              >
                Join
              </button>
            </div>
            <p>{rso.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default JoinRso;
