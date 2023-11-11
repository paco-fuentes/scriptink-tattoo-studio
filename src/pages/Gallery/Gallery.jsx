import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { bringTattoos } from "../../services/apiCalls";
import { TattooCard } from "../../common/TattooCard/TattooCard";
// import { Container, Row, Col } from "react-bootstrap";

export const Gallery = () => {
    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        if (tattoos.length === 0) {
            bringTattoos()
                .then((results) => {
                    console.log('hola desde el then de tattoos');
                    setTattoos(results.data.results);
                })
                .catch((error) => console.log(error));
        }
    }, [tattoos]);

    console.log(tattoos);

    return (
        <div className="galleryDesign">
            {tattoos.length > 0 ? (

                <div className='tattooRoster'>
                    {
                        tattoos.map(
                            tattoo => {
                                return (
                                    <TattooCard
                                        key={tattoo.id}
                                        image={tattoo.img_url}
                                    />
                                )
                            }
                        )
                    }
                    
                </div>
            ) : (
                <div>Tattoos will comming soon...</div>
            )
            }
        </div >
    );
};


// <Container>
//     <div>
//         {tattoos.map((tattoo) => {
//             return (
//                 <div key={tattoo.id}>
//                     {/* {tattoo.name} */}
//                     <img src={tattoo.img_url} />
//                 </div>

//             );
//         })}
//     </div>ƒ
// </Container>

