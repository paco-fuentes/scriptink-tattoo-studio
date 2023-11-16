import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { bringTattoos } from "../../services/apiCalls";
import { TattooCard } from "../../common/TattooCard/TattooCard";
import { Container, Row, Col } from "react-bootstrap";



export const Gallery = () => {
    const [tattoos, setTattoos] = useState([]);
    console.log(bringTattoos);
    useEffect(() => {
        if (tattoos.length === 0) {
            bringTattoos()
                .then((tattoos) => {
                    // console.log(tattoos);
                    setTattoos(tattoos.data.allTattoos);
                })
                .catch((error) => console.log(error));
        }
    }, [tattoos]);



    const tellMe = (argumento) => {
        console.log("argumento ---> " + argumento)
    }

    return (
        <div className='galleryDesign'>
            {
                tattoos.length > 0
                    ? (
                        <Container>
                            <Row>
                                {tattoos.map((tattoo) => {
                                    return (
                                        <Col sm={12} lg={6} xl={2} xxl={2} key={tattoo.id}>
                                            <TattooCard
                                                key={tattoo.id}
                                                name={tattoo.title}
                                                image={tattoo.img_url}
                                                selected={"selectedCard"}
                                                selectFunction={() => tellMe(tattoo)}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    )
                    : (
                        <div>Aún no han venido</div>
                    )
            }
        </div>
    )
};


// <div className='tattooRoster'>
// {
//     tattoos.map(
//         tattoo => {
//             return (
//                 <TattooCard
//                     key={tattoo.id}
//                     name={tattoo.title}
//                     image={tattoo.img_url}
//                     selected={"selectedCard"}
//                     selectFunction={() => tellMe(tattoo)}
//                 />
//             )
//         }
//     )
// }
// </div>

