import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Netball Tournament Dashboard</h1>

      <Link to="/teams">
        <button>Create Team</button>
      </Link>

      <br /><br />

      <Link to="/players">
        <button>Register Player</button>
      </Link>

      <br /><br />

      <Link to="/matches">
        <button>Create Match</button>
      </Link>
    </div>
  );
}

export default Dashboard;