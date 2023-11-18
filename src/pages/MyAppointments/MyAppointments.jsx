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

    // console.log(appointments);

    return (
        <div className="myappointmentsDesign">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id}>
                        <p><strong>id: {appointment.id|| "No date available"}</strong></p>
                        <p>Date: {appointment.date || "No date available"}</p>
                        <p>appointment_time: {appointment.appointment_time || "No date available"}</p>
                        <p>created_at: {appointment.created_at || "No date available"}</p>
                        <p>isActive: {appointment.isActive || "No date available"}</p>
                        <p>observations: {appointment.observations || "No date available"}</p>
                        <p>tattoo_artist_id: {appointment.tattoo_artist_id|| "No date available"}</p>
                        <p>tattoo_id: {appointment.tattoo_id || "No date available"}</p>
                        <p>updated_at: {appointment.updated_at || "No date available"}</p>
                        <p>user_id: {appointment.user_id|| "No date available"}</p>
                        {/* Render other appointment properties as needed */}
                    </div>
                ))
            ) : (
                appointments.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
    );
};