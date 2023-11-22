import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { updateUserProfile, userProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const datosRdxUser = useSelector(userData);
  const token = datosRdxUser.credentials.token;
  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }

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
      const body = {
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        phone: profile.phone,
        adress: profile.adress
      };

      const response = await updateUserProfile(token, body);
      setIsEnabled(true);
      setUserProfileData(response.data.data);
    } catch (error) {
      console.error(`Error al actualizar el perfil ${error}`);
    }
  };
  // const [isEnabled, setIsEnabled] = useState(true);
  return (
    <div className="profileDesign bg-container-prof">
      <div className="profilePanel inputDesign">
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${profileError.firstnameError !== "" ? "inputDesignError" : ""
          }`}
        type={"text"}
        name={"firstname"}
        placeholder={"nombre"}
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
        placeholder={"apellido"}
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
        placeholder={"email"}
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
        placeholder={"teléfono"}
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
        placeholder={"domicilio"}
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
    </div>
  );
};
