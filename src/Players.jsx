import { useState } from "react";

function Players() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [players, setPlayers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: name,
      age: age,
      position: position
    };

    setPlayers([...players, newPlayer]);

    setName("");
    setAge("");
    setPosition("");
  };

  return (
    <div>

      <h2>Register Player</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <br /><br />

        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="">Select Position</option>
          <option>GS</option>
          <option>GA</option>
          <option>WA</option>
          <option>C</option>
          <option>WD</option>
          <option>GD</option>
          <option>GK</option>
        </select>

        <br /><br />

        <button type="submit">Register Player</button>

      </form>

      <h3>Players List</h3>

      <table border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.position}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Players;