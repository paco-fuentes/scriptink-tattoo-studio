
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './TattooCard.css'

export const TattooCard = ({ id, title, image, description, price, selected, SubmitId, selectFunction }) => {

   // const history = useHistory();
   const [change, setChange] = useState(true);
   const navigate = useNavigate();
   const callSelectClick = () => {
      setChange(!change)
      //   selectFunction()
   }

   const SubmitIdToCreateAppointment = () => {
      navigate(`/createappointment/${id}`)
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