
import React, { useState } from 'react';
import './TattooCard.css'

export const TattooCard = ({name, image, status, location, selected, selectFunction}) => {

     const [change, setChange] = useState(true);

     const callSelectClick = () => {

        setChange(!change)

        selectFunction()

     }

     return (
        <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <div>{name}</div>
            <div><img className='tattoo' src={image} alt={name}/></div>
            <div>{status}</div>
            <div>{location}</div>
        </div>
     )
}