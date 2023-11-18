import React, { useState, useEffect } from "react";
import "./MyAppointments.css";
import { userGetAppointments } from "../../services/apiCalls";

// Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyAppointments = () => {

    // Instancio a RDX en modo lectura
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    // console.log(token);

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            userGetAppointments(token)
                .then((appointments) => {
                    setAppointments(appointments.data);
                })
                .catch((error) => console.log(error));
        }
    }, [appointments]);

    console.log(appointments);

    return (
        <div className="myappointmentsDesign">hola
            {/* {
                appointments.length > 0
                    ? (
                        {
                            appointments.map((appointment) => {
                                return (
                                        <
                                    // key={appointment.id}
                                    // id={appointment.id}
                                    />
                                ) : (
                        <div>Aún no han venido</div>

                    )
            } */}

        </div>
    )
};
