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



