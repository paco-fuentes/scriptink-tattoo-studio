import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { userProfile } from "../../services/apiCalls";

export const Profile = () => {
  const datosRdxUser = useSelector(userData);
  const token = datosRdxUser.credentials.token;
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userProfile(token);
        setUserProfileData(response.data.data); // Actualiza el estado con los datos del perfil
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };
    
    fetchUserProfile();
  }, [token]);

  return (
    <div>
      {userProfileData ? (
        <div>
          <p>Email: {userProfileData.email}</p>
          <p>Nombre: {userProfileData.firstname}</p>
          <p>Apellido: {userProfileData.lastname}</p>
          {/* Asegúrate de utilizar las claves correctas */}
          <p>Género: {userProfileData.gender}</p>
        </div>
      ) : (
        <p>Cargando datos del perfil...</p>
      )}
    </div>
  );
};
