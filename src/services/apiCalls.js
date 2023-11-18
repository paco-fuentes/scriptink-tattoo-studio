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
  return await axios.get(`http://localhost:4000/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = async (token, body) => {
  return await axios.put(`http://localhost:4000/user/profile`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userCreateAppointment = async (token, body) => {
  return await axios.post(`http://localhost:4000/user/appointment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userGetAppointments = async (token) => {
  return await axios.get(`http://localhost:4000/user/myappointments/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userGetAppointmentId = async (token, id) => {
  return await axios.get(`http://localhost:4000/user/myappointments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userUpdateAppointmentId = async (token, id, body) => {
  return await axios.put(`http://localhost:4000/user/myappointments/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

