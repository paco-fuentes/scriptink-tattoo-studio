import React, { useEffect, useState } from 'react';
import './Admin.css'
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllUsers, deleteUserById } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    const navigate = useNavigate();

    if (!token) {
        navigate("/");
      }

    const [getUsers, setGetUsers] = useState([]);

    const deleteUserId = async (userId) => {
        try {
            await deleteUserById(token, userId);
            // actualiar la lista de usuarios ...
            const response = await bringAllUsers(token);
            console.log("Response data:", response.data);
            setGetUsers(response.data.data);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        if (getUsers.length === 0) {
            bringAllUsers(token)
                .then((response) => {
                    console.log("Response data:", response.data);
                    setGetUsers(response.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [getUsers, token]);

    const selectedUser = (userId) => {
        deleteUserId(userId);
    };

    return (
        <div>
            {getUsers.length > 0 ? (
                getUsers.map((getUser) => (
                    <div key={getUser.id}>
                        <div>
                            <p>id: {getUser.id}</p>
                            <p>Nombre: {getUser.firstname}</p>
                            <p>Apellido: {getUser.lastname}</p>
                            <p>Email: {getUser.email}</p>
                            <p>Teléfono: {getUser.phone}</p>
                            <p>Dirección: {getUser.adress}</p>
                            <p>Provilegios: {getUser.role}</p>
                            <p>Activo: {getUser.is_active ? "Sí" : "No"}</p>

                            <div className='buttonSubmit' onClick={() => { selectedUser(getUser.id) }}>Borrar Usuario</div>
                        </div>
                    </div>
                ))
            ) : (
                getUsers.length === 0 && <p>Spinner de usuarios...</p>
            )}
        </div>
    );
}
