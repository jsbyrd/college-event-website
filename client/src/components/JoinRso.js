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
      const allRsos = await axios.get(`${baseURL}/api/rsos`);
      console.log(allRsos);
      setRsos(allRsos.data.recordset);
    };
    fetchRsos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinRso = async (rsoID) => {
    // add to roster
    // update num_members
    try {
      console.log("yippie");
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
