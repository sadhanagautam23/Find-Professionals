import React from "react";
import "./Suggestions.css";

interface Suggestion {
  id: number;
  name: string;
  role: string;
  avatarUrl?: string;
}

const suggestions: Suggestion[] = [
  { id: 1, name: "Indu Gautam", role: "Web developer" },
  { id: 2, name: "Indu Gautam", role: "Web developer" },
];

export default function Suggestions() {
  return (
    <div className="suggestions-container">
      <h3>Suggestions</h3>
      {suggestions.map((user) => (
        <div key={user.id} className="suggestion-item">
          <img
            src={user.avatarUrl || "https://via.placeholder.com/40"}
            alt={user.name}
            className="suggestion-avatar"
          />
          <div className="suggestion-info">
            <strong>{user.name}</strong>
            <p>{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
