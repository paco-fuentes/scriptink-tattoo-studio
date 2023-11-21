import React, { useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { userLogin, staffLogin } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
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

  const logMe = () => {
    userLogin(credenciales)
      .then(resultado => {
        loginPath(resultado);
      })
      .catch(error => {
        setMsgError(error.message);
        staffLogin(credenciales)
          .then(resultado => {
            loginPath(resultado);
          })
          .catch(error => {
            setMsgError(error.message);
          });
      });
  };

  const loginPath = resultado => {
    dispatch(login({ credentials: resultado.data }));
    const currentRole = resultado.data.role;
    // console.log(currentRole);
    setTimeout(() => {
      switch (currentRole) {
        case "user":
          navigate("/");
          break;
        case "worker":
          navigate("/worker");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          break;
      }
    }, 500);
  };

  return (
    <div className="loginDesign bg-container-log">
      <div className="logPanel inputDesign2 ">
        <CustomInput className="logPanel inputDesign"
          design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
          type={"email"}
          name={"email"}
          placeholder={"Enter email"}
          // value={}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.emailError}</div>
        <CustomInput className="logPanel inputDesign"
          design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
          type={"password"}
          name={"password"}
          placeholder={"Enter password"}
          // value={}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='buttonSubmitLog' onClick={logMe}>Login</div>
        <div>{msgError}</div>
      </div>
    </div>
  );
};
