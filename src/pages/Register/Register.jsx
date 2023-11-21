import React, { useState, useEffect } from "react";
import "./Register.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { userRegister } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })

  const [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: ''
  })

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }
  const [message, setMessage] = useState('');

  // test para ver si funciona el boton de submit
  const Submit = () => {
    userRegister(user)
      .then(
        resultado => {
          //si todo ha ido bien, redirigir a login...
          // console.log(resultado.data.message);
          const { message } = resultado.data.message;
          setMessage(message);
          setTimeout(() => {
            navigate("/login");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="registerDesign">
      <CustomInput
        design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
        type={"email"}
        name={"email"}
        placeholder={"email@email.email"}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.emailError}</div>
      <CustomInput
        design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
        type={"password"}
        name={"password"}
        placeholder={"password"}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.passwordError}</div>
      <CustomInput
        design={`inputDesign ${userError.nameError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"name"}
        placeholder={"name"}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.nameError}</div>
      <CustomInput
        design={`inputDesign ${userError.phoneError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"phone"}
        placeholder={"phone"}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.phoneError}</div>
      <div className='buttonSubmitReg' onClick={Submit}>Submit</div>
    </div>
  );
};
