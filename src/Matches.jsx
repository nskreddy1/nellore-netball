import { useState } from "react";

function Matches() {

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [matches, setMatches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMatch = {
      team1: team1,
      team2: team2
    };

    setMatches([...matches, newMatch]);

    setTeam1("");
    setTeam2("");
  };

  return (
    <div>

      <h2>Create Match</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Team 1"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Team 2"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create Match</button>

      </form>

      <h3>Match List</h3>

      <table border="1">

        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
          </tr>
        </thead>

        <tbody>
          {matches.map((m, index) => (
            <tr key={index}>
              <td>{m.team1}</td>
              <td>{m.team2}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Matches;