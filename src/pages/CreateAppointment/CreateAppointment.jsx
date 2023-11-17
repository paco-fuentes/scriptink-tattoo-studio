import React, { useState, useEffect } from "react";
import "./CreateAppointment.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { userCreateAppointment } from "../../services/apiCalls";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../pages/userSlice";



export const CreateAppointment = () => {

  // const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);
  const token = rdxCredentials.credentials.token;
  // console.log(token);

  const [appointment, setAppointment] = useState({
    tattoo_id: '',
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

  // test para ver si funciona el boton de submit
  const Submit = () => {

    // for (let test1 in appointment) {
    //   if (appointment[test1] === "") {
    //     return;
    //   }

    // }

    // for (let test in appointmentError) {
    //   if (appointmentError[test] !== "") {
    //     return;
    //   }
    // }

    userCreateAppointment(token, appointment)
      .then(
        resultado => {
          //si todo ha ido bien, redirigiremos a login...
          console.log(resultado.data);
          const { message } = resultado.data;
          setMessage(message);
          setTimeout(() => {
            // navigate("/login");
          }, 500)
        }
      )
      .catch(error => console.log(error));
  }

  return (
    <div className="createAppointmentDesign">
      <CustomInput
        design={`inputDesign ${appointmentError.tattoo_idError !== "" ? 'inputDesignError' : ''}`}
        type={""}
        name={"tattoo_id"}
        placeholder={"tattoo_id"}
        value={''}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.tattoo_idError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.observationsError !== "" ? 'inputDesignError' : ''}`}
        type={""}
        name={"observations"}
        placeholder={"Observations"}
        value={''}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.observationsError}</div>
      <CustomInput
        design={`inputDesign ${appointmentError.dateError !== "" ? 'inputDesignError' : ''}`}
        type={""}
        name={"date"}
        placeholder={"00/00/0000"}
        value={''}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{appointmentError.dateError}</div>

      <div className='buttonSubmit' onClick={Submit}>Submit</div>
    </div>
  );
};
