import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminAccessLogs() {
  const [adminToken, setAdminToken] = useState("");
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLogs(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/admin/access-logs`, {
        headers: { "X-Admin-Token": adminToken }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load access logs.");
      setLogs(data.logs || []);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section admin-logs-page">
      <div className="container">
        <h1 className="section-title heading-line is-visible">Access Logs</h1>
        <form className="admin-token-form card" onSubmit={loadLogs}>
          <label htmlFor="admin-token">Admin access token</label>
          <input
            id="admin-token"
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Enter ADMIN_ACCESS_TOKEN"
            required
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Load Logs"}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <div className="access-log-table card">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Login Time</th>
                <th>Expires</th>
                <th>IP</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.email}</td>
                  <td>{new Date(log.login_at).toLocaleString()}</td>
                  <td>{new Date(log.expires_at).toLocaleString()}</td>
                  <td>{log.login_ip}</td>
                  <td>{log.user_agent}</td>
                </tr>
              ))}
              {!logs.length && (
                <tr>
                  <td colSpan="5">No logs loaded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
