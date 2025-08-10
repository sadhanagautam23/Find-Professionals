import React from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { getProfileById, updateProfile } from '../../shared/config/api';
import Header from '../../shared/components/header/Header';
import type { AxiosResponse } from 'axios';
import About from './components/about';
import type { User } from '../../shared/Interface/User';
import Experience from './components/Experience';
import Skills from './components/Skillls';





interface ApiResponse {
  user: User;
}



export default function Profile() {
  

  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
 
  const [isCurrentUser, setCurrentUser] = useState<boolean>(false);
  const { id: profileUserId } = useParams<{ id: string }>();
  



 
  


useEffect(() => {
  if (!profileUserId) return;

  getProfileById(profileUserId)
    .then((res: AxiosResponse<ApiResponse>) => {
     
      setUserData(res.data.user);
    })
    .catch((error) => {
      console.error('Failed to fetch profile user data:', error);
    });
}, [profileUserId]);







useEffect(() => {
  if (!profileUserId) return;

  function fetch() {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      setCurrentUser(false);
      return;
    }

    const currentUser = JSON.parse(currentUserStr);
    const userIdFromStorage = currentUser._id || ''; // or 'id' depending on your user object structure

    

    setCurrentUserId(userIdFromStorage);

    if (userIdFromStorage === profileUserId) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }

  fetch();
}, [profileUserId]);




  console.log('isCurrentUser:', isCurrentUser);
 


  return (
    <>
      <Header/>
      {/* Profile Card */}
      <div className="profile-card">
        <div className="cover-photo">
          <img src="../../src/assets/cover.png" width= "200px" alt="Cover" />
        </div>

        <div className="profile-info">
          <img src="../../src/assets/photo.png" alt="Avatar" className="avatar" />

          <div className="user-info">
            <h2>{userData?.username || 'No name'}</h2>
            <p>245 connections</p>
          </div>

          <div className="action-buttons">
            <button className="btn">Connect</button>
            <button className="btn">Message</button>
          </div>
        </div>

        <div className="tab-bar">
          <button className="tab">Profile</button>
          <button className="tab">Skills</button>
          <button className="tab">Endorsements</button>
          <button className="tab">Posts</button>
          <button className="tab">Recommendations</button>
        </div>
      </div>

      {/* About Section */}
    <About
      aboutText={userData?.about}
      isCurrentUser={isCurrentUser}
      onSave={async (newAbout) => {
       
        try {
          await updateProfile(profileUserId!, { about: newAbout });
         
          setUserData((prev) => (prev ? { ...prev, about: newAbout } : null));
        } catch (error) {
          console.error('Failed to update about:', error);
        }
      }}
    />


      {/* Experience Section */}
<Experience
  experiences={userData?.experiences || []}
  isCurrentUser={isCurrentUser}
  onAdd={async (newExp) => {
    const res = await updateProfile(profileUserId!, {
      experiences: [...(userData?.experiences || []), newExp],
    });
    setUserData((prev) =>
      prev ? { ...prev, experiences: [...(prev.experiences || []), newExp] } : null
    );
  }}
  onEdit={async (id, updatedExp) => {
    const updatedList = (userData?.experiences || []).map((exp) =>
      exp._id === id ? updatedExp : exp
    );
    await updateProfile(profileUserId!, { experiences: updatedList });
    setUserData((prev) =>
      prev ? { ...prev, experiences: updatedList } : null
    );
  }}
/>


      {/* Skills Section */}
      <Skills
        skills={userData?.skills}
        isCurrentUser={isCurrentUser}
        onAddSkill={async (skill) => {
          if (!userData) return;
          const updatedSkills = [...(userData.skills || []), skill];
          await updateProfile(userData._id, { skills: updatedSkills });
          setUserData({ ...userData, skills: updatedSkills });
        }}
        onDeleteSkill={async (skill) => {
          if (!userData) return;
          const updatedSkills = (userData.skills || []).filter(s => s !== skill);
          await updateProfile(userData._id, { skills: updatedSkills });
          setUserData({ ...userData, skills: updatedSkills });
        }}
      />


    </>
  );
}
