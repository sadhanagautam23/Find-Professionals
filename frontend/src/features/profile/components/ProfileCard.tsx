import React, { useRef } from "react";

interface ProfileCardProps {
  userData: any;
  isCurrentUser: boolean;
  onProfilePicChange: (file: File) => Promise<void>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData, isCurrentUser, onProfilePicChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await onProfilePicChange(e.target.files[0]);
    }
  };

  return (
    <div className="profile-card">
      <div className="cover-photo">
        <img src="../../src/assets/cover.png" width="200px" alt="Cover" />
      </div>

      <div className="profile-info">
        {/* Avatar */}
        <div className="avatar-wrapper" style={{ position: "relative" }}>
          <img
            src={userData?.image?.url || "../../src/assets/photo.png"}
            alt="Avatar"
            className="avatar"
            style={{ cursor: isCurrentUser ? "pointer" : "default" }}
            onClick={() => {
              if (isCurrentUser && fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />

          {/* Hidden input */}
          {isCurrentUser && (
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          )}
        </div>

        {/* User Info */}
        <div className="user-info">
          <h2>{userData?.username || "No name"}</h2>
          <p>245 connections</p>
        </div>

        {/* Action buttons only if not current user */}
        {!isCurrentUser && (
          <div className="action-buttons">
            <button className="btn">Connect</button>
            <button className="btn">Message</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        <button className="tab">Profile</button>
        <button className="tab">Skills</button>
        <button className="tab">Endorsements</button>
        <button className="tab">Posts</button>
        <button className="tab">Recommendations</button>
      </div>
    </div>
  );
};

export default ProfileCard;
