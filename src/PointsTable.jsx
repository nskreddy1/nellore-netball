function PointsTable() {

  const teams = [
    { name: "Team A", played: 2, won: 1, lost: 1, points: 2 },
    { name: "Team B", played: 2, won: 2, lost: 0, points: 4 },
    { name: "Team C", played: 2, won: 0, lost: 2, points: 0 }
  ];

  return (
    <div>

      <h2>Points Table</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default PointsTable;