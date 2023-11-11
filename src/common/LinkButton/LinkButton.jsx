
import './LinkButton.css'

import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title}) => {

     const navigate = useNavigate();

     return (
         <div className="linkButtonDesign" onClick={()=>navigate(path)}>
            {title}
         </div>
     )
}