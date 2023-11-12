import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [msgError, setMsgError] = useState('');

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  //   useEffect(()=>{
  //     console.log(credenciales);
  //   },[credenciales]);

  const logMe = () => {

    userLogin(credenciales)
      .then(
        resultado => {
          // console.log('resultado ----> ' + resultado.data.token)
          //Aqui guardaría el token........
          // console.log(resultado.data.role)
          if (resultado.data.role) {
            localStorage.setItem("userToken", (resultado.data.token))
          }
          //Una vez guardado el token....nos vamos a home....
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
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
      // onBlur={}
      />
      <CustomInput
        design={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
      // onBlur={}
      />
      <div className='buttonSubmit' onClick={logMe}>Log Me!</div>
      <div>{msgError}</div>
    </div>
  );
};
