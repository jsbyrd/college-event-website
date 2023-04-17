import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../utils";

const ViewRsos = (props) => {
  const { userID } = props;
  const [rsos, setRsos] = useState([]);

  const baseURL = utils.baseURL;

  useEffect(() => {
    // Update to only show rsos within same university as user
    const fetchRsos = async () => {
      const response1 = await axios.get(`${baseURL}/api/viewRosters/${userID}`);
      setRsos(response1.data.recordset);
    };
    fetchRsos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeaveRso = async (rsoID) => {
    try {
      // check to see if user is admin (admins NEVER LEAVE MWUAHAHAHA)
      const count = await axios.get(
        `${baseURL}/api/viewRosters/${userID}/${rsoID}/`
      );
      console.log(count.data.recordset[0][""]);
      if (count.data.recordset[0][""] === 1) {
        alert(
          "Error: Admins cannot leave their RSOs! (how dare you try to abandon your child)"
        );
        return;
      }

      await axios.delete(`${baseURL}/api/viewRosters/${userID}/${rsoID}`);

      const rsoInfo = {
        rsoID: rsoID
      };

      await axios.put(`${baseURL}/api/viewRosters/`, rsoInfo);
      alert("You have been removed from this RSO");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("There has been an error, please try again later");
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
              </p>
              <button
                className="rso-join-button"
                onClick={() => handleLeaveRso(rso.rso_id)}
              >
                Leave
              </button>
            </div>
            <p>{rso.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ViewRsos;
