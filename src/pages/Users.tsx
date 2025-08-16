import { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/db";
import type { User } from "../types/user";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchAllUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul>
        {users.slice(0, 20).map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>
              {u.fullName} — {u.emailAddress}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
