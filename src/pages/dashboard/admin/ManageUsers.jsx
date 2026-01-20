import { useEffect, useState } from "react";
import api, { authFetch } from "../../../utils/api";



export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    authFetch("/api/users").then(data =>
      setUsers(Array.isArray(data) ? data : [])
    );
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {users.map(user => (
        <div key={user._id} className="bg-white border p-4 mb-3 rounded">
          {user.email} — {user.role}
        </div>
      ))}
    </div>
  );
}
