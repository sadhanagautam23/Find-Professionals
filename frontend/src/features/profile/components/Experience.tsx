import React, { useState } from "react";
import "./Experience.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface ExperienceItem {
  _id?: string;
  title: string;
  company: string;
  period: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
  isCurrentUser: boolean;
  onAdd: (exp: ExperienceItem) => Promise<void>;
  onEdit: (id: string, updated: ExperienceItem) => Promise<void>;
  onDelete?: (id: string) => Promise<void>; // optional delete handler
}

export default function Experience({
  experiences,
  isCurrentUser,
  onAdd,
  onEdit,
  onDelete,
}: ExperienceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ExperienceItem>({
    title: "",
    company: "",
    period: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openAddModal = () => {
    setFormData({ title: "", company: "", period: "" });
    setEditId(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exp: ExperienceItem) => {
    setFormData(exp);
    setEditId(exp._id || null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.period) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSaving(true);
    try {
      if (editId) {
        await onEdit(editId, formData);
      } else {
        await onAdd(formData);
      }
      setIsModalOpen(false);
      setFormData({ title: "", company: "", period: "" });
      setEditId(null);
    } catch (err) {
      setError("Failed to save experience.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (editId && onDelete) {
      if (window.confirm("Are you sure you want to delete this experience?")) {
        await onDelete(editId);
        setIsModalOpen(false);
        setFormData({ title: "", company: "", period: "" });
        setEditId(null);
      }
    }
  };

  return (
    <div className="profile-section">
      <h3>
        Experience{" "}
        {isCurrentUser && (
          <span
            onClick={openAddModal}
            title="Add Experience"
            style={{ fontSize: "17px", cursor: "pointer" }}
          >
            <FaPlus />
          </span>
        )}
      </h3>

      {experiences.length > 0 ? (
        <ul>
          {experiences.map((exp) => (
            <li
              key={exp._id || exp.title}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{exp.title}</strong> – {exp.company} ({exp.period})
              </span>
              {isCurrentUser && (
                <span
                  style={{ fontSize: "17px", cursor: "pointer" }}
                  onClick={() => openEditModal(exp)}
                  title="Edit Experience"
                >
                  <FaEdit />
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !isCurrentUser && <p>No experiences available</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{editId ? "Edit Experience" : "Add Experience"}</h4>

            <input
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isSaving}
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              disabled={isSaving}
            />
            <input
              type="text"
              placeholder="Period"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
              disabled={isSaving}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>

              {editId && (
                <button className="delete-btn" onClick={handleDelete}>
                  <FaTrash style={{ marginRight: "5px" }} />
                  Delete
                </button>
              )}

              <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
