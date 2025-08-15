import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../services/db";
import { getUserLocal, saveUserLocal } from "../services/storage";
import type { User } from "../types/user";

function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) return;
    const uid = Number(id);
    const local = getUserLocal(uid);
    if (local) {
      setUser(local);
      return;
    }
    fetchUserById(uid).then((u) => {
      if (u) setUser(u);
    });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Employee Information</h1>
      <div
        className="status-box"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      >
        <span>
          {/* status inside box */}
          Pending
        </span>
      </div>

      <section
        dangerouslySetInnerHTML={{
          __html: `
        <h2>Achievements</h2>
        <p>• Successfully completed ...</p>
        <p>• Led ...</p>
      `,
        }}
      />

      <button
        onClick={() => {
          // example save to local
          saveUserLocal(user);
          alert("Saved locally");
        }}
      >
        Save
      </button>
    </div>
  );
}

export default UserDetails;
