import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userGetAppointments } from "../../services/apiCalls";
import "./MyAppointments.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyAppointments = () => {
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    const navigate = useNavigate();
    if (!token) {
        navigate("/");
    }

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            userGetAppointments(token)
                .then((response) => {
                    console.log(response.data.data);
                    setAppointments(response.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [appointments]);

    return (
        <div className="myAppointmentsDesign">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="appointmentsCards">
                        <p><strong>Cita: {`nº ${appointment.id}` || "No date available"}</strong></p>
                        <p>Cita con fecha: {appointment.date || "No date available"}</p>
                        {/* <p>Mañana o Tarde: {appointment.appointment_time || "No date available"}</p> */}
                        {/* <p>created_at: {appointment.created_at || "No date available"}</p> */}
                        <p>Estado de la cita: {appointment.is_active ? "Cita activa" : "Cita terminada" || "No date available"}</p>
                        {/* <p>Observaciones: {appointment.observations || "No date available"}</p> */}
                        <p>Artista: {appointment.tattooArtist.firstname || "No date available"}</p>
                        <p>Tatuaje: {appointment.tattoo.title || "No date available"}</p>
                        {/* <p>Modificado: {appointment.updated_at || "No date available"}</p> */}
                        {/* <p>Usuario actual: {appointment.user_id|| "No date available"}</p> */}

                        <div className='buttonSubmitAppointment' onClick={() => { navigate(`/myappointments/${appointment.id}`) }}>Edit Appointment</div>
                    </div>
                ))
            ) : (
                appointments.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
    );
};
