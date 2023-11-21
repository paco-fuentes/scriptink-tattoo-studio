import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./CreateAppointment.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { userCreateAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const CreateAppointment = () => {
  const { id } = useParams();
  const rdxCredentials = useSelector(userData);
  const token = rdxCredentials.credentials.token;
  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }

  const [appointment, setAppointment] = useState({
    tattoo_id: `${id}`,
    observations: '',
    date: ''
  })

  const [appointmentError, setAppointmentError] = useState({
    tattoo_idError: '',
    observationsError: '',
    dateError: ''
  })

  const functionHandler = (e) => {
    setAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }
  const [message, setMessage] = useState()

  const Submit = () => {
    userCreateAppointment(token, appointment)
      .then(
        resultado => {
          const { message } = resultado.message;
          setMessage(message);
          setTimeout(() => {
            navigate("/myappointments");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="createAppointmentDesign">
      <CustomInput
        design={`inputDesign ${appointmentError.observationsError !== "" ? 'inputDesignError' : ''}`}
        type={""}
        name={"observations"}
        placeholder={"Comentario..."}
        value={''}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.observationsError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
        type={"date"}
        min="1997-01-01"
        max="2030-12-31"
        name={"date"}
        placeholder={"DD/MM/AAAA"}
        value={''}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.dateError}</div>
      <div className='buttonSubmit' onClick={Submit}>Submit</div>
    </div>
  );
};
