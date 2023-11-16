import axios from "axios";

export const bringTattoos = async () => {
  return await axios.get(`http://localhost:4000/user/alltattoos`);
};

export const userLogin = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);
};

export const userRegister = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);
};

export const userProfile = async (token) => {
  // console.log('Token en userProfile:', token);
  return await axios.get(`http://localhost:4000/user/profile`, 
  {headers:{
    Authorization:`Bearer ${token}`}});
};

