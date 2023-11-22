import axios from "axios";

// guest
export const bringTattoos = async () => {
  return await axios.get(`http://localhost:4000/user/alltattoos`);
};

export const userLogin = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);
};

export const staffLogin = async (body) => {
  return await axios.post(`http://localhost:4000/staff/login`, body);
};

export const userRegister = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);
};

// user
export const userProfile = async (token) => {
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
  return await axios.put(
    `http://localhost:4000/user/myappointments/${id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// admin
export const bringAllUsers = async (token) => {
  return await axios.get(`http://localhost:4000/staff/getallusers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserById = async (token, id) => {
  return await axios.delete(`http://localhost:4000/staff/deleteuser/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// worker
export const workerGetAppointments = async (token) => {
  return await axios.get(`http://localhost:4000/staff/myappointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentById = async (token, id) => {
  return await axios.get(`http://localhost:4000/staff/myappointment/${id}'`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editAppointmentById = async (token, id, body) => {
  return await axios.put(
    `http://localhost:4000/staff/myappointment/${id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAppointmentById = async (token, id) => {
  return await axios.delete(`http://localhost:4000/staff/myappointment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
