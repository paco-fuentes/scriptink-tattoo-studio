
import React, { useState } from 'react';
import './TattooCard.css'

export const TattooCard = ({image}) => {

     const [change, setChange] = useState(true);

     const callSelectClick = () => {

        setChange(!change)

        selectFunction()

     }

     return (
        <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <div><img className='tattoo' src={image}/></div>
            <div>{location}</div>
        </div>
     )
}