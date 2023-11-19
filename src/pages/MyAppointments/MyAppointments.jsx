import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userGetAppointments } from "../../services/apiCalls";
import "./MyAppointments.css";

// Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";


export const MyAppointments = () => {
    // Instancio a RDX en modo lectura
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length === 0) {
            userGetAppointments(token)
                .then((response) => {
                    // console.log("Response data:", response.data);
                    setAppointments(response.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [appointments]);

    return (
        <div className="myAppointmentsDesign">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id}>
                        <p><strong>Cita con el id: {appointment.id|| "No date available"}</strong></p>
                        <p>Cita con fecha: {appointment.date || "No date available"}</p>
                        <p>Mañana o Tarde: {appointment.appointment_time || "No date available"}</p>
                        <p>created_at: {appointment.created_at || "No date available"}</p>
                        <p>Estado de la cita: {appointment.is_active ? "Cita activa" : "Cita terminada" || "No date available"}</p>
                        <p>Observaciones: {appointment.observations || "No date available"}</p>
                        <p>Artista: {appointment.tattoo_artist_id|| "No date available"}</p>
                        <p>Tatuaje: {appointment.tattoo_id || "No date available"}</p>
                        <p>Modificado: {appointment.updated_at || "No date available"}</p>
                        <p>Usuario actual: {appointment.user_id|| "No date available"}</p>

                        <div className='buttonSubmit' onClick={() => {navigate(`/myappointments/${appointment.id}`)}}>Edit Appointment</div>
                    </div>
                ))
            ) : (
                appointments.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
    );
};