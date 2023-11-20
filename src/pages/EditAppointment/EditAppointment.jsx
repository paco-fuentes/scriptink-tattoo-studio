import React, { useEffect, useState } from 'react';
import "./EditAppointment.css"
// import './EditAppointment'
import { userGetAppointmentId, userUpdateAppointmentId } from '../../services/apiCalls';


// Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

import { useNavigate, useParams } from 'react-router-dom';
import { CustomInput } from '../../common/CustomInput/CustomInput';

export const EditAppointment = () => {
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    const { id } = useParams();

    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        date: null,
    });

    const [dateEdit, setdateEdit] = useState(false);

    useEffect(() => {
        const getAppointmentData = async () => {
            try {
                const resultado = await userGetAppointmentId(token, id);
                console.log(resultado.data);
                setAppointment(resultado.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAppointmentData();
    }, [token, id]);

    const handleDateChange = (e) => {
        setAppointment({ ...appointment, date: e.target.value });
    };

    const handleEditToggle = () => {
        setdateEdit(!dateEdit);
    };

    const handleSaveChanges = async () => {
        try {
            await userUpdateAppointmentId(token, id, { date: appointment.date });

            console.log('Fecha de la cita cambiada');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="editAppointmentDesign">
            <div>
                <p><strong>Artista: {appointment.tattooArtist?.firstname || "No date available"}</strong></p>
                <p>Tatuaje: {appointment.tattoo?.title || "No date available"}</p>
                <p>Precio: {`${appointment.tattoo?.price}€` || "No date available"}</p>
                <p>Observaciones: {appointment.observations || "No date available"}</p>
                <img src={appointment.tattoo?.img_url || "Fecha no disponible"} width="200" />
                <p><strong>Modificar fecha actual: {appointment.date}</strong></p>
                <CustomInput
                    disabled={!dateEdit}
                    design=""
                    type="date"
                    name="date"
                    placeholder="Enter date"
                    value={appointment.date || ''}
                    functionProp={handleDateChange}
                    functionBlur={() => { }}
                />
                <div className='buttonPanel'>
                <button className="buttonSubmitEdit"  onClick={handleEditToggle}>
                    {dateEdit ? 'Disable Editing' : 'Enable Editing'}
                </button>
                <button className="buttonSubmitEdit" onClick={handleSaveChanges} disabled={!dateEdit}>
                    Save Changes
                </button>
                </div>
            </div>
        </div>
    );
};