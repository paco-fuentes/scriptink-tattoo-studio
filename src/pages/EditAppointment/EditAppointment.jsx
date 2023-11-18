import React, { useEffect, useState } from 'react';
import "./EditAppointment.css"
// import './EditAppointment'
import { userGetAppointmentId, userUpdateAppointmentId } from '../../services/apiCalls';


// Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

import { useParams } from 'react-router-dom';
import { CustomInput } from '../../common/CustomInput/CustomInput';

export const EditAppointment = () => {
    const datosRdxUser = useSelector(userData);
    const token = datosRdxUser.credentials.token;
    const { id } = useParams();

    const [appointment, setAppointment] = useState({
        date: '',
    });

    const [isDateEditable, setIsDateEditable] = useState(false);

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
        setIsDateEditable(!isDateEditable);
    };

    const handleSaveChanges = async () => {
        try {
            await userUpdateAppointmentId(token, id, { date: appointment.date });
            // Puedes agregar lógica adicional aquí después de guardar los cambios
            console.log('Cambios guardados exitosamente');
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    return (
        <div className="myAppointmentsDesign">
            <div>
                <CustomInput
                    disabled={!isDateEditable}
                    design="your-input-styles"
                    type="text"
                    name="date"
                    placeholder="Enter date"
                    value={appointment.date}
                    functionProp={handleDateChange}
                    functionBlur={() => {}}
                />
                {/* Botón para habilitar/deshabilitar la edición */}
                <button onClick={handleEditToggle}>
                    {isDateEditable ? 'Disable Editing' : 'Enable Editing'}
                </button>
                {/* Botón para guardar cambios */}
                <button onClick={handleSaveChanges} disabled={!isDateEditable}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};