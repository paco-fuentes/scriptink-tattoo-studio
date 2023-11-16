import React, { useState, useEffect } from "react";
import "./Profile.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

// Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { updateUserProfile, userProfile } from "../../services/apiCalls";

export const Profile = () => {
  // Instancio a RDX en modo lectura
  const datosRdxUser = useSelector(userData);

  const token = datosRdxUser.credentials.token;
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await userProfile(token);
        console.log('Respuesta del servidor:', response.data);
        setUserProfileData(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };
  
    getProfile();
  }, [token]);
  

  const [profile, setProfile] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    adress: '',
  });

  const [profileError, setProfileError] = useState({
    emailError: '',
    firstnameError: '',
    lastnameError: '',
    phoneError: '',
    adressError: ''
  });

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (userProfileData && userProfileData.data) {
      const { email, firstname, lastname, phone, adress } = userProfileData.data;
      setProfile({
        email: email || '',
        firstname: firstname || '',
        lastname: lastname || '',
        phone: phone || '',
        adress: adress || '',
      });
    }
  }, [userProfileData]);

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);

    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const functionHandler = (e, fieldName) => {
    setProfile((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };

  const sendData = async () => {
    try {
      // Crear el cuerpo de la solicitud con los datos actualizados del perfil
      const body = {
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        phone: profile.phone,
        adress: profile.adress
      };

      // Realizar la llamada a la API para actualizar el perfil
      const response = await updateUserProfile(token, body);

      // Manejar la respuesta según sea necesario
      // console.log('Respuesta al actualizar perfil:', response);

      // Actualizar el estado de isEnabled después de la actualización exitosa
      setIsEnabled(true);

      // Actualizar el estado local con los nuevos datos del perfil
      setUserProfileData(response.data.data);

      // Puedes realizar más acciones aquí, como mostrar un mensaje de éxito, etc.

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      // Aquí puedes manejar errores, mostrar mensajes de error, etc.
    }
  };
  // const [isEnabled, setIsEnabled] = useState(true);

// console.log('ultimo----> ' + response.data);
  
  return (
    <div className="profileDesign">
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.firstnameError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"firstname"}
        placeholder={""}
        value={profile.firstname}
        functionProp={(e) => functionHandler(e, "firstname")}
        functionBlur={errorCheck}
      />

      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.lastnameError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"lastname"}
        placeholder={""}
        value={profile.lastname}
        functionProp={(e) => functionHandler(e, "lastname")}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.emailError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={(e) => functionHandler(e, "email")}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.phoneError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"phone"}
        placeholder={""}
        value={profile.phone}
        functionProp={(e) => functionHandler(e, "phone")}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.adressError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"adress"}
        placeholder={""}
        value={profile.adress}
        functionProp={(e) => functionHandler(e, "adress")}
        functionBlur={errorCheck}
      />
      {
        isEnabled
          ? (<div className="editDesign" onClick={() => setIsEnabled(!isEnabled)}>Edit</div>)

          : (<div className="sendDesign" onClick={() => sendData()}>Send</div>)
      }
    </div>
  );
};
