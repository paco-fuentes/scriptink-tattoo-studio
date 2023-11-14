import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

//Importo Rdx

import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { login } from "../userSlice";

export const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: '',
    passwordError: ''
  })

  const [msgError, setMsgError] = useState('');

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
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

  //   useEffect(()=>{
  //     console.log(credenciales);
  //   },[credenciales]);

  // falta aqui el ... test para ver si funciona el boton de submit (register) en el logme
  const logMe = () => {

    userLogin(credenciales)
      .then(
        resultado => {
          // console.log('resultado ----> ' + resultado.data.token)
          //Aqui guardaría el token........
          // console.log(resultado.data.role)
          // if (resultado.data.role) {
          //   localStorage.setItem("userToken", (resultado.data.token))
          // }

          //Aqui guardaría el token........en RDXXX
          dispatch(login({ credentials: resultado.data }))
          
          // localStorage.setItem("token", (resultado.data.token));
          // const logToken = localStorage.getItem("token");
          // console.log(logToken);

          // let decToken = {};
          // if (logToken) {
          //   decToken = jwtDecode(logToken)
          //   localStorage.setItem("role", decToken.role);
          //   localStorage.setItem("email", decToken.email);
          //   // localStorage.setItem("username", decToken.user);
          // }

          //Una vez guardado el token....nos vamos a home.... pero con el role del token vamos a donde haga falta
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      )
      .catch(error => {
        console.log(error)
        setMsgError(error.message);
      });

  }

  return (
    <div className="loginDesign">
      <CustomInput
        design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
        type={"email"}
        name={"email"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.emailError}</div>
      <CustomInput
        design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
        type={"password"}
        name={"password"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='buttonSubmit' onClick={logMe}>Log Me!</div>
      <div>{msgError}</div>
    </div>
  );
};
