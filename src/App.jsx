import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

// --- SETTINGS (CHANGE YOUR USERNAME/PASSWORD HERE) ---
const ADMIN_USER = "Hemanth";
const ADMIN_PASS = "Hemu200201";

// --- THEME ---
const theme = {
  primary: "#004085",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
  lightGrey: "#f0f2f5",
  white: "#ffffff",
  shadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const printStyles = `
  @media print {
    .no-print, button, form, a, .search-container { display: none !important; }
    body { background-color: white !important; padding: 0 !important; margin: 0 !important; }
    @page { size: landscape; margin: 0.5cm; }
    table { width: 100% !important; border-collapse: collapse !important; table-layout: fixed !important; }
    th, td { border: 1px solid #000 !important; padding: 4px !important; font-size: 8px !important; word-wrap: break-word !important; }
    thead { display: table-header-group; }
    div { width: 100% !important; max-width: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; }
  }
`;

const pageWrapper = { backgroundColor: theme.lightGrey, minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" };
const contentContainer = { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" };
const cardStyle = { backgroundColor: theme.white, padding: "40px", borderRadius: "15px", boxShadow: theme.shadow, width: "100%", maxWidth: "450px", textAlign: "center" };
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", boxSizing: "border-box", fontSize: "14px" };
const labelStyle = { display: "block", textAlign: "left", fontSize: "11px", fontWeight: "bold", color: theme.primary, marginTop: "12px", marginBottom: "3px", textTransform: "uppercase" };
const tableInput = { padding: "4px", borderRadius: "4px", border: "1px solid #007bff", width: "95%", fontSize: "10px", marginBottom: "2px" };

// --- COMPONENTS ---
function Header() {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ width: "100%", position: "absolute", top: "0", left: "0", padding: "30px 50px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", boxSizing: "border-box" }} className="no-print">
      <div style={{ textAlign: "left" }}>
        <h1 style={{ color: theme.primary, margin: "0", fontSize: "42px", fontWeight: "800", lineHeight: "1" }}>Nellore Netball Portal</h1>
        <div style={{ color: theme.secondary, fontWeight: "bold", fontSize: "14px", letterSpacing: "2px", marginTop: "5px", textTransform: "uppercase" }}>District Player Records & Archive</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: theme.secondary, fontWeight: "600", fontSize: "18px" }}>{time.toLocaleDateString('en-GB')}</div>
        <div style={{ color: theme.primary, fontSize: "28px", fontWeight: "800", marginTop: "2px" }}>{time.toLocaleTimeString()}</div>
        {localStorage.getItem("isLoggedIn") && (
          <button onClick={handleLogout} style={{ color: theme.danger, background: "none", border: "none", cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginTop: "10px" }}>Logout</button>
        )}
      </div>
    </div>
  );
}

function Signature() {
  return (
    <div style={{ marginTop: "auto", padding: "20px 0", textAlign: "center", width: "100%" }} className="no-print">
      <span style={{ color: "#888", fontSize: "11px" }}>Developed by</span><br />
      <strong style={{ color: theme.primary, fontSize: "16px" }}>Hemanth Pacha</strong>
    </div>
  );
}

// --- PROTECTION ---
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("isLoggedIn") ? children : <Navigate to="/login" />;
};

// --- PAGES ---
function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid Admin Credentials!");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={contentContainer}>
        <div style={cardStyle}>
          <h2 style={{ color: theme.primary, marginBottom: "20px" }}>Admin Portal Login</h2>
          <form onSubmit={handleLogin}>
            <label style={labelStyle}>Username</label>
            <input style={{ ...inputStyle, marginBottom: "15px" }} type="text" onChange={(e) => setUser(e.target.value)} required />
            <label style={labelStyle}>Password</label>
            <input style={{ ...inputStyle, marginBottom: "25px" }} type="password" onChange={(e) => setPass(e.target.value)} required />
            <button type="submit" style={{ padding: "15px", cursor: "pointer", borderRadius: "10px", border: "none", backgroundColor: theme.primary, color: "white", width: "100%", fontWeight: "bold", fontSize: "16px" }}>Access Portal</button>
          </form>
        </div>
      </div>
      <Signature />
    </div>
  );
}

function Dashboard() {
  return (
    <div style={pageWrapper}>
      <Header />
      <div style={contentContainer}>
        <div style={cardStyle}>
          <h2 style={{ color: theme.primary, marginBottom: "30px", fontSize: "22px" }}>Database Menu</h2>
          <Link to="/add-player" style={{ textDecoration: "none" }}>
            <button style={{ padding: "16px", cursor: "pointer", borderRadius: "10px", border: "none", backgroundColor: theme.primary, color: "white", width: "100%", fontWeight: "bold", fontSize: "15px", marginBottom: "15px" }}>Register New Player</button>
          </Link>
          <Link to="/view-database" style={{ textDecoration: "none" }}>
            <button style={{ padding: "16px", cursor: "pointer", borderRadius: "10px", border: "none", backgroundColor: theme.success, color: "white", width: "100%", fontWeight: "bold", fontSize: "15px" }}>View District Registry</button>
          </Link>
        </div>
      </div>
      <Signature />
    </div>
  );
}

function AddPlayer() {
  const navigate = useNavigate();
  const [db, setDb] = useState(JSON.parse(localStorage.getItem("nellore_final_db")) || []);
  const [photo, setPhoto] = useState("");
  const [form, setForm] = useState({ name: "", fatherName: "", dob: "", category: "Sub-Junior", districtNo: "", stateNo: "", aadhar: "", institution: "", location: "", address: "", mobile: "", yearPlayed: "", venue: "", position: "" });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const save = (e) => {
    e.preventDefault();
    const updated = [...db, { ...form, photo, id: Date.now() }];
    localStorage.setItem("nellore_final_db", JSON.stringify(updated));
    alert("Player Profile Saved Successfully!");
    navigate("/view-database");
  };

  return (
    <div style={{ ...pageWrapper, overflowY: "auto", height: "auto", minHeight: "100vh" }}>
      <Header />
      <div style={{ ...contentContainer, paddingTop: "150px" }}>
        <div style={{ ...cardStyle, maxWidth: "800px" }}>
          <h2 style={{ color: theme.primary, textAlign: "center" }}>Registration Form</h2>
          <form onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Full Name</label><input style={inputStyle} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <label style={labelStyle}>Father's Name</label><input style={inputStyle} onChange={e => setForm({ ...form, fatherName: e.target.value })} required />
                <label style={labelStyle}>Date of Birth</label><input style={inputStyle} type="date" onChange={e => setForm({ ...form, dob: e.target.value })} required />
                <label style={labelStyle}>Aadhar Card</label><input style={inputStyle} onChange={e => setForm({ ...form, aadhar: e.target.value })} required />
              </div>
              <div>
                <label style={labelStyle}>Photo</label><input type="file" accept="image/*" onChange={handlePhoto} style={inputStyle} />
                <label style={labelStyle}>Mobile</label><input style={inputStyle} type="tel" onChange={e => setForm({ ...form, mobile: e.target.value })} required />
                <label style={labelStyle}>District Number.</label><input style={inputStyle} onChange={e => setForm({ ...form, districtNo: e.target.value })} />
                <label style={labelStyle}>State Number.</label><input style={inputStyle} onChange={e => setForm({ ...form, stateNo: e.target.value })} />
              </div>
            </div>
            <label style={labelStyle}>School / College / Job</label><input style={inputStyle} onChange={e => setForm({ ...form, institution: e.target.value })} required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div><label style={labelStyle}>Village / City</label><input style={inputStyle} onChange={e => setForm({ ...form, location: e.target.value })} required /></div>
              <div><label style={labelStyle}>Full Address</label><input style={inputStyle} onChange={e => setForm({ ...form, address: e.target.value })} required /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "20px", background: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
              <div><label style={labelStyle}>Category</label><select style={inputStyle} onChange={e => setForm({ ...form, category: e.target.value })}><option value="Sub-Junior">Sub-Junior</option><option value="Junior">Junior</option><option value="Senior">Senior</option></select></div>
              <div><label style={labelStyle}>Year</label><input style={inputStyle} type="number" onChange={e => setForm({ ...form, yearPlayed: e.target.value })} /></div>
              <div><label style={labelStyle}>Position</label><input style={inputStyle} onChange={e => setForm({ ...form, position: e.target.value })} /></div>
            </div>
            <label style={labelStyle}>Tournament Venue</label><input style={inputStyle} onChange={e => setForm({ ...form, venue: e.target.value })} />
            <button type="submit" style={{ marginTop: "30px", padding: "18px", backgroundColor: theme.primary, color: "white", border: "none", borderRadius: "10px", width: "100%", fontWeight: "bold", cursor: "pointer" }}>Complete Registration</button>
          </form>
          <br /><Link to="/" className="no-print" style={{ fontWeight: "bold", color: theme.primary, textDecoration: "none" }}>← Back to Dashboard</Link>
        </div>
      </div>
      <Signature />
    </div>
  );
}

function ViewDatabase() {
  const [db, setDb] = useState(JSON.parse(localStorage.getItem("nellore_final_db")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (p) => { setEditId(p.id); setEditData({ ...p }); };
  const cancelEdit = () => setEditId(null);
  const saveEdit = () => {
    const updated = db.map(p => p.id === editId ? editData : p);
    setDb(updated);
    localStorage.setItem("nellore_final_db", JSON.stringify(updated));
    setEditId(null);
  };
  const deletePlayer = (id) => { if (window.confirm("Delete record?")) { const updated = db.filter(p => p.id !== id); setDb(updated); localStorage.setItem("nellore_final_db", JSON.stringify(updated)); } };

  const exportToExcel = () => {
    const fileData = db.map(({ photo, id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(fileData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Players");
    XLSX.writeFile(workbook, "Nellore_Netball_Registry.xlsx");
  };

  const filteredData = db.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.aadhar.includes(searchTerm) ||
    p.mobile.includes(searchTerm)
  );

  return (
    <div style={{ ...pageWrapper, overflowY: "auto", height: "auto", minHeight: "100vh" }}>
      <style>{printStyles}</style>
      <div style={{ ...contentContainer, paddingTop: "150px", maxWidth: "100%" }}>
        <Header />
        <div style={{ width: "95%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }} className="no-print">
          <div style={{ position: "relative", width: "350px" }}>
            <input
              style={{ ...inputStyle, paddingLeft: "35px", border: `2px solid ${theme.primary}` }}
              placeholder="Search Name, Aadhar, or Mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span style={{ position: "absolute", left: "10px", top: "10px" }}>🔍</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={exportToExcel} style={{ padding: "10px 18px", backgroundColor: theme.success, color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Export Excel</button>
            <button onClick={() => window.print()} style={{ padding: "10px 18px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Print Registry</button>
          </div>
        </div>

        <div style={{ width: "98%", backgroundColor: "white", borderRadius: "12px", boxShadow: theme.shadow, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1550px" }}>
            <thead>
              <tr style={{ backgroundColor: theme.primary, color: "white", fontSize: "11px" }}>
                <th style={{ padding: "12px", width: "60px" }}>Photo</th>
                <th>Identity Details</th>
                <th>Official Numbers</th>
                <th>Career & Venue</th>
                <th>Contact & Address</th>
                <th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #ddd", fontSize: "11px" }}>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {p.photo ? <img src={p.photo} style={{ width: "45px", height: "45px", borderRadius: "4px", objectFit: "cover" }} /> : "—"}
                  </td>
                  {editId === p.id ? (
                    <>
                      <td>
                        <input style={tableInput} value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                        <input style={tableInput} value={editData.fatherName} onChange={e => setEditData({ ...editData, fatherName: e.target.value })} />
                        <input style={tableInput} type="date" value={editData.dob} onChange={e => setEditData({ ...editData, dob: e.target.value })} />
                      </td>
                      <td>
                        <input style={tableInput} value={editData.aadhar} onChange={e => setEditData({ ...editData, aadhar: e.target.value })} />
                        <input style={tableInput} value={editData.districtNo} onChange={e => setEditData({ ...editData, districtNo: e.target.value })} />
                        <input style={tableInput} value={editData.stateNo} onChange={e => setEditData({ ...editData, stateNo: e.target.value })} />
                      </td>
                      <td>
                        <select style={tableInput} value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })}>
                          <option value="Sub-Junior">Sub-Junior</option><option value="Junior">Junior</option><option value="Senior">Senior</option>
                        </select>
                        <input style={tableInput} value={editData.yearPlayed} onChange={e => setEditData({ ...editData, yearPlayed: e.target.value })} />
                        <input style={tableInput} value={editData.position} onChange={e => setEditData({ ...editData, position: e.target.value })} />
                        <input style={tableInput} value={editData.venue} onChange={e => setEditData({ ...editData, venue: e.target.value })} />
                      </td>
                      <td>
                        <input style={tableInput} value={editData.mobile} onChange={e => setEditData({ ...editData, mobile: e.target.value })} />
                        <input style={tableInput} value={editData.institution} onChange={e => setEditData({ ...editData, institution: e.target.value })} />
                        <input style={tableInput} value={editData.location} onChange={e => setEditData({ ...editData, location: e.target.value })} />
                      </td>
                      <td className="no-print" style={{ textAlign: "center" }}>
                        <button onClick={saveEdit} style={{ color: theme.success, fontWeight: "bold", border: "none", background: "none", cursor: "pointer", display: "block", width: "100%" }}>SAVE</button>
                        <button onClick={cancelEdit} style={{ color: "#888", border: "none", background: "none", cursor: "pointer", display: "block", width: "100%", marginTop: "5px" }}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: "10px" }}><strong>{p.name.toUpperCase()}</strong><br />S/O: {p.fatherName}<br />DOB: {p.dob}</td>
                      <td>Aadhar: <strong>{p.aadhar}</strong><br />Dist No: {p.districtNo}<br />State No: {p.stateNo}</td>
                      <td>Cat: {p.category}<br />Year: {p.yearPlayed}<br />Pos: {p.position}<br />Venue: <strong>{p.venue}</strong></td>
                      <td>Mob: {p.mobile}<br />{p.institution}<br />{p.location}, {p.address}</td>
                      <td className="no-print" style={{ textAlign: "center" }}>
                        <button onClick={() => startEdit(p)} style={{ color: theme.primary, fontWeight: "bold", border: "none", background: "none", cursor: "pointer", marginRight: "10px" }}>EDIT</button>
                        <button onClick={() => deletePlayer(p.id)} style={{ color: theme.danger, fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}>DELETE</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br /><Link to="/" className="no-print" style={{ fontWeight: "bold", color: theme.primary, textDecoration: "none", marginBottom: "80px" }}>← Back to Dashboard</Link>
      </div>
      <Signature />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-player" element={<ProtectedRoute><AddPlayer /></ProtectedRoute>} />
        <Route path="/view-database" element={<ProtectedRoute><ViewDatabase /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}