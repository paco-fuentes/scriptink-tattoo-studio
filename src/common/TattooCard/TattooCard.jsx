
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
      console.log('id del tattoo --> ' + id);
      navigate(`/createappointment/${id}`)
   }

   return (
      <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
         {/* <div>{id}</div> */}
         <div>{title}</div>
         <div><img className='tattoo' src={image} alt={title} /></div>
         <div>{description}</div>
         <div>{price + '€'}</div>
         <div className='buttonSubmit' onClick={SubmitIdToCreateAppointment}>Submit</div>
      </div>
   )
}