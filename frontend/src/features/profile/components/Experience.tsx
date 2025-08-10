import React, { useState } from "react";

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
}

export default function Experience({
  experiences,
  isCurrentUser,
  onAdd,
  onEdit,
}: ExperienceProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<ExperienceItem>({
    title: "",
    company: "",
    period: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.period) return;

    setIsSaving(true);
    try {
      if (editId) {
        await onEdit(editId, formData);
      } else {
        await onAdd(formData);
      }
      setFormData({ title: "", company: "", period: "" });
      setEditId(null);
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Failed to save experience", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>
        Experience{" "}
        {isCurrentUser &&  (
          <button onClick={() => setIsPopupOpen(true)}>➕</button>
        )}
      </h3>

      {experiences.length > 0 ? (
        <ul>
          {experiences.map((exp) => (
            <li key={exp._id || exp.title}>
              <strong>{exp.title}</strong> – {exp.company} ({exp.period})
              {isCurrentUser && (
                <button
                  onClick={() => {
                    setFormData(exp);
                    setEditId(exp._id || "");
                    setIsPopupOpen(true);
                  }}
                >
                  ✏️
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !isCurrentUser && <p>No experiences available</p>
      )}

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{editId ? "Edit Experience" : "Add Experience"}</h4>
            <input
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Period"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
            />
            <button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
