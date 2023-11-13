
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {

    const dispatch = useDispatch();

    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {

        dispatch(logout({ credentials: "" }))

        navigate("/")

    }

    return (
        <div className="headerDesign">
            <LinkButton path={"/"} title={"Home"} />

            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton path={"/login"} title={"Login"} />
                    <LinkButton path={"/register"} title={"Register"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title={rdxCredentials.credentials.firstName} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            )}
        </div>
    );
};


// export const Header = () => {
//     return (
//         <div className='headerDesign'>
//             <LinkButton
//                 path={"/"}
//                 title={"Home"}
//             />
//             <LinkButton
//                 path={"/gallery"}
//                 title={"Gallery"}
//             />
//             <LinkButton
//                 path={"/resgister"}
//                 title={"Register"}
//             />
//             <LinkButton
//                 path={"/login"}
//                 title={"Login"}
//             />

//         </div>
//     );
// };

