import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  workerGetAppointments } from "../../services/apiCalls";
import "./Worker.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Worker = () => {
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    const role = datosRdxUser.credentials.role;
    const navigate = useNavigate();

    if (!token) {
        navigate("/");
    }
    if (role !== "worker" && token) {
        navigate("/");
    }

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            workerGetAppointments(token)
                .then((response) => {
                    console.log("Response data:", response.data);
                    setAppointments(response.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, []);



    return (
        <div className="myAppointmentsDesign">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="appointmentsCards">
                        <p><strong>Cita con el id: {appointment.id || "No date available"}</strong></p>
                        <p>Cita con fecha: {appointment.date || "No date available"}</p>
                        {/* <p>Mañana o Tarde: {appointment.appointment_time || "No date available"}</p> */}
                        {/* <p>created_at: {appointment.created_at || "No date available"}</p> */}
                        <p>Estado de la cita: {appointment.is_active ? "Cita activa" : "Cita terminada" || "No date available"}</p>
                        {/* <p>Observaciones: {appointment.observations || "No date available"}</p> */}
                        <p>Artista: {appointment.tattoo_artist_id || "No date available"}</p>
                        <p>Tatuaje: {appointment.tattoo_id || "No date available"}</p>
                        {/* <p>Modificado: {appointment.updated_at || "No date available"}</p> */}
                        {/* <p>Usuario actual: {appointment.user_id|| "No date available"}</p> */}

                        <div className='buttonSubmitAppointment' onClick={() => { navigate(`/myappointment/${appointment.id}`) }}>Edit Appointment</div>
                    </div>
                ))
            ) : (
                appointments.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
    );
};