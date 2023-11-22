import React, { useEffect, useState } from 'react';
import './WorkerEditAppointment.css';
import { editAppointmentById, getAppointmentById, deleteAppointmentById } from '../../services/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { CustomInput } from '../../common/CustomInput/CustomInput';

export const WorkerEditAppointment = () => {
     const datosRdxUser = useSelector(userData);
     const token = datosRdxUser.credentials.token;
     const role = datosRdxUser.credentials.role;
     const navigate = useNavigate();
     const { id } = useParams();

     if (!token) {
          navigate("/");
     }
     if (role !== "worker" && token) {
          navigate("/");
     }

     const [appointment, setAppointment] = useState({
          date: null,
     });

     const [dateEdit, setdateEdit] = useState(false);

     useEffect(() => {
          const getAppointmentData = async () => {
               try {
                    const resultado = await getAppointmentById(token, id);
                    console.log(resultado.data.data);
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
               await editAppointmentById(token, id, { date: appointment.date });
               console.log('Fecha de la cita cambiada');
          } catch (error) {
               console.error(error);
          }
     };

     const handleDeleteAppointment = async () => {
          try {
               await deleteAppointmentById(token, id);
               console.log('Cita eliminada');
               navigate("/worker");
          } catch (error) {
               console.error(error);
          }
     };

     return (
          <div className="editAppointmentDesign">
               <p><strong>Artista: {appointment.tattooArtist?.firstname || "No date available"}</strong></p>
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
                    <button className="buttonSubmitEdit" onClick={handleEditToggle}>
                         {dateEdit ? 'Disable Editing' : 'Enable Editing'}
                    </button>
                    <button className="buttonSubmitEdit" onClick={handleSaveChanges} disabled={!dateEdit}>
                         Save Changes
                    </button>
                    <button className="buttonSubmitEdit" onClick={handleDeleteAppointment}>
                         Delete Appointment
                    </button>
               </div>
          </div>
     );
};
