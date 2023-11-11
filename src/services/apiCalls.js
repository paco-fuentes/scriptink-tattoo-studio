import axios from "axios";

export const bringTattoos = async () => {
  return await axios.get(`http://localhost:4000/user/alltattoos`);
};

// export const bringCharacters = async () => {

//     return await axios.get(`https://rickandmortyapi.com/api/character/?page=6`);
// }

// export const logUser = async (body) => {

//     console.log(body);

//     //SIMULACRO DE CONEXION REAL A API
//     // return await axios.post(`elendpointdemipreciosobackend`, body);

//     return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZGF2aWRAZGF2aWQuY29tIiwiaWF0IjoxNjk5NTMwMDY1LCJleHAiOjE2OTk1NDA4NjV9.UNMBvL7RwP6JylDq9Ut4r5ach9HGVKqBm-5yv0-w_B4`;

// }

// export const registerUser = async (body) => {
//     //SIMULACRO DE CONEXION REAL A API
//     // return await axios.post(`elendpointdemipreciosobackend`, body);
//     return "todo ha ido bien"
// }
