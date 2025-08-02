import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ProfileSetUp.css'; 
import { userProfile } from '../../shared/config/api'; // Adjust the path as per your structure

const categories = [
  "Developer", "Designer", "Marketer", "Writer", "Finance", "Legal", "Engineer", "Teacher"
];

const categoryOptions: { [key: string]: string[] } = {
  Developer: ["Frontend", "Backend", "Fullstack", "Mobile"],
  Designer: ["UI/UX", "Graphic", "Product", "Motion"],
  Marketer: ["Digital", "SEO", "Content", "Social Media"],
  Writer: ["Technical", "Copywriting", "Creative", "Content"],
  Finance: ["Accounting", "Auditing", "Investment", "Taxation"],
  Legal: ["Corporate", "Criminal", "Civil", "IPR"],
  Engineer: ["Mechanical", "Electrical", "Civil", "Software"],
  Teacher: ["Math", "Science", "History", "English"],
};

export default function ProfileSetup() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const navigate = useNavigate();

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (!category || !subcategory || skills.length === 0) {
    alert("Please complete all fields before submitting.");
    return;
  }

    try {
      // Send data to backend and mark profileCompleted as true
      await userProfile({ category,subcategory, skills });
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Something went wrong while saving your profile.");
    }
  };

  return (
    <div className="profile-setup">
      <h2>Complete Your Profile</h2>
      
      <div className="profile-avatar-wrapper">
        <div className="avatar-circle">
          <img
            src="../../src/assets/react.svg" // Replace with actual path or URL
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <button
            type="button"
            className="avatar-upload-btn"
            title="Upload Photo"
            onClick={() => alert("Upgrade or upload triggered")}
          >
            +
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">

        {/* Category Dropdown */}
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
                        {/* Subcategory Dropdown */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="subcategory">Subcategory:</label>
          <select
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category} // disables when no category is selected
            required
          >
            <option value="">-- Select Subcategory --</option>
            {categoryOptions[category]?.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>

        

        {/* Skills Input */}
        <label>Skills</label>
        <div className="skill-input-wrapper">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Type a skill and press Enter"
          />
        </div>


        <div className="skills-tags">
          {skills.map(skill => (
            <span key={skill} className="skill-tag">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
            </span>
          ))}
        </div>

        <button type="submit" className="submit-btn">Save Profile</button>
      </form>
    </div>
  );
}
