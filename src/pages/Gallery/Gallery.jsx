import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { bringTattoos } from "../../services/apiCalls";
import { TattooCard } from "../../common/TattooCard/TattooCard";

export const Gallery = () => {
    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        if (tattoos.length === 0) {
            bringTattoos()
                .then((tattoos) => {
                    setTattoos(tattoos.data.allTattoos);
                })
                .catch((error) => console.log(error));
        }
    }, [tattoos]);

    return (
        <div >
            {
                tattoos.length > 0
                    ? (
                        <div>
                            <div className='galleryDesign tattooRoster bg-container-gallery'>
                                {tattoos.map((tattoo) => {
                                    return (
                                        <div key={tattoo.id} className="imageTattoo">
                                            <TattooCard
                                                key={tattoo.id}
                                                id={tattoo.id}
                                                title={tattoo.title}
                                                image={tattoo.img_url}
                                                description={tattoo.description}
                                                price={tattoo.price}
                                                selected={"selectedCard"}
                                            // selectFunction={() => tellMe(tattoo)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                    : (
                        <div>Cargando tattoos...</div>
                    )
            }
        </div>
    )
};
