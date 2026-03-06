import { useState } from "react";

function Teams() {

  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = {
      name: teamName
    };

    setTeams([...teams, newTeam]);
    setTeamName("");
  };

  return (
    <div>

      <h2>Create Team</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />

        <br /><br />

        <button type="submit">Add Team</button>

      </form>

      <h3>Teams List</h3>

      <table border="1">

        <thead>
          <tr>
            <th>Team Name</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Teams;