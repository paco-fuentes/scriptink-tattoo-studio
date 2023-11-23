
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TattooCard.css'
import { useSelector } from 'react-redux';
import { userData } from "../../pages/userSlice";

export const TattooCard = ({ id, title, image, description, price, selected, SubmitId, selectFunction }) => {
   const rdxCredentials = useSelector(userData);
   const token = rdxCredentials.credentials.token;
   const [change, setChange] = useState(true);
   const navigate = useNavigate();

   const callSelectClick = () => {
      setChange(!change)
      //   selectFunction()
   }

   const SubmitIdToCreateAppointment = () => {
      (!token) 
        ? navigate("/login")
        : navigate(`/createappointment/${id}`)
   }

   return (
      <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
         {/* <div>{id}</div> */}
         <div className='txt'>{title}</div>
         <div><img className='tattoo' src={image} alt={title} /></div>
         <div className='txt'>{description}</div>
         <div className='txt'>{price + '€'}</div>
         <div className='buttonSubmitCard txt' onClick={SubmitIdToCreateAppointment}>Pedir cita</div>
      </div>
   )
}
