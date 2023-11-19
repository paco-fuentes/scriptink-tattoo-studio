import React, { useEffect, useState } from 'react';
import './Admin.css'
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllUsers } from '../../services/apiCalls';

export const Admin = () => {
    // Instancio a RDX en modo lectura
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;

    const [getUsers, setGetUsers] = useState([]);

    useEffect(() => {
        if (getUsers.length === 0) {
            bringAllUsers(token)
                .then((response) => {
                    console.log("Response data:", response.data);
                    setGetUsers(response.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [getUsers]);

    return (
        <div>
            {getUsers.length > 0 ? (
                getUsers.map((getUser) => (
                    <div>
                        <div key={getUser.id}>
                            <p>id: {getUser.id}</p>
                            <p>Nombre: {getUser.firstname}</p>
                            <p>Apellido: {getUser.lastname}</p>
                            <p>Email: {getUser.email}</p>
                            <p>Teléfono: {getUser.phone}</p>
                            <p>Dirección: {getUser.adress}</p>
                            <p>Provilegios: {getUser.role}</p>
                            <p>Activo: {getUser.is_active ? "Sí" : "No"}</p>

                            {/* <div className='buttonSubmit' onClick={() => {navigate(`/myappointments/${appointment.id}`)}}>Edit Appointment</div> */}
                        </div>
                    </div>
                ))
            ) : (
                getUsers.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
    );
}