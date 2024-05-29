import { useState } from "react";
import React from "react";
import "./styles/Doors.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

export const Doors = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [doors, setDoors] = useState([]);
  const [doorInput, setDoorInput] = useState("");
  const [selectedDoor, setSelectedDoor] = useState("");
  const [openedDoor, setOpenedDoor] = useState("");
  const [timedAccess, setTimedAccess] = useState("");
  const [timedMessage, setTimedMessage] = useState("");

  const user = auth.currentUser; // Kirjautunut käyttäjä

  //Uloskirjautuminen
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Virhe uloskirjautumisessa");
    }
  };

  //Oven lisääminen listaan
  const handleAddDoor = () => {
    if (doorInput.trim() !== "") {
      setDoors([...doors, doorInput]);
      setDoorInput("");
    }
  };

  //Ajastetun kulkuoideuden käsittely
  const handleTimedAccess = (event) => {
    setTimedAccess(event.target.value);
  };

  const handleAccessButton = () => {
    setTimedMessage(`Ajastettu ${timedAccess}!`);
  };
  //Oven avaaminen
  const handleOpenDoor = () => {
    setOpenedDoor(`ovi ${selectedDoor} on auki!`);
  };

  return (
    <div className="doors-page">
      {/* Uloskirjautuminen */}

      {user && (
        <div className="logout">
          <p>Käyttäjä: {user.email}</p>
          <button onClick={handleLogout} className="logout-btn">
            Kirjaudu ulos
          </button>
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : null}
        </div>
      )}

      <div className="welcome">
        <h2>Tervetuloa kulunhallintaan</h2>
        <p>Lisää uusia ovia tai valitse avattava ovi listasta</p>
      </div>
      <div>
        {/* Oven avaaminen */}
        <button
          onClick={handleOpenDoor}
          disabled={!selectedDoor}
          className="btn"
        >
          Avaa ovi {selectedDoor}
        </button>
        <p>{openedDoor}</p>

        {/* Ajastettu kulkuoikeus */}
        <button onClick={handleAccessButton} className="btn">
          Ajastettu kulkuoikeus {timedAccess}
        </button>
        <div className="timed">
          <select value={timedAccess} onChange={handleTimedAccess}>
            <option value="valitse">Valitse aika</option>
            <option value="30min">30min</option>
            <option value="1h">1h</option>
            <option value="3h">3h</option>
            <option value="5h">5h</option>
          </select>
          {timedMessage}
        </div>

        {/* Oven lisääminen */}
        <div>
          <div>
            <input
              type="text"
              value={doorInput}
              onChange={(e) => setDoorInput(e.target.value)}
            />
            <button onClick={handleAddDoor} className="btn">
              Lisää ovi
            </button>
          </div>

          {/* Ovilista */}
          <div>
            <h3>Omat ovet</h3>
            <ol>
              {doors.map((door, index) => (
                <li key={index} onClick={() => setSelectedDoor(door)}>
                  {door}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
