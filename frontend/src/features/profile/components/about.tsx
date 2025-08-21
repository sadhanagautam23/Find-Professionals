import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface AboutProps {
  aboutText: string | undefined;
  isCurrentUser: boolean;
  onSave: (newAbout: string) => Promise<void>;
}

export default function About({ aboutText, isCurrentUser, onSave }: AboutProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newAbout, setNewAbout] = useState(aboutText || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNewAbout(aboutText || '');
  }, [aboutText]);

  const handleSave = async () => {
    if (!newAbout.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      await onSave(newAbout);
      setIsPopupOpen(false);
    } catch (e) {
      setError('Failed to save changes.');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>
        About{" "}
        {isCurrentUser && (
          <span onClick={() => setIsPopupOpen(true)}><FaEdit/></span>
        )}
      </h3>

      <p>{aboutText || 'No information available'}</p>

      {isPopupOpen && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '500px',
              maxWidth: '90%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Edit About</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <textarea
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
              rows={6}
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
              }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsPopupOpen(false)}
                style={{
                  backgroundColor: '#1259e6ff',
                  border: '1px solid #ccccccff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: '#0a66c2',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
