import type { User } from '../Interface/User';
import axiosInstance from './axiosInstance';


export const loginApi = (data:{username:string, password:string})=>{
    return axiosInstance.post('/auth/login', data);
} ;

export const registerApi= (data:{email:string, username:string, password:string})=>{
    return axiosInstance.post('/auth/register', data);
} ;

export const getUserListApi= () =>{
    return axiosInstance.get('/auth/getAllUsers');
};

export const getUserSearchApi = (username: string) => {
    return axiosInstance.get(`/auth/searchUsers?q=${username}`);
};

export const userProfile = (data: { category: string; subcategory: string ,skills: string[] }) => {
    return axiosInstance.post('/auth/userProfile', data );
};

export const updateAbout = (about: string) => {
    return axiosInstance.put('/auth/updateAbout', { about });
};

export const getCurrentUser = () => {
    return axiosInstance.get('/auth/currentUser');
};


export const getProfileById = (id: string) => {
    return axiosInstance.get(`/auth/profile/${id}`);
};

export const updateProfile = (id: string, updateData: Partial<User>) => {
  return axiosInstance.put(`/auth/profile/${id}`, updateData);
};






