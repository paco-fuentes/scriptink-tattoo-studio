
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {

    const dispatch = useDispatch();

    const rdxCredentials = useSelector(userData);
    console.log(!rdxCredentials);

    const logOutMe = () => {

        dispatch(logout({ credentials: "" }))

        navigate("/")

    }

    return (
        <div className="headerDesign">
            <LinkButton path={"/"} title={"Home"} />
            <LinkButton path={"/gallery"} title={"Gallery"} />

            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton path={"/login"} title={"Login"} />
                    <LinkButton path={"/register"} title={"Register"} />
                </>
            ) : (
                <>
                    <LinkButton path={"/profile"} title={"Profile, username"} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            )}
        </div>
    );
};


{/* <LinkButton path={"/profile"} title={rdxCredentials.credentials.email} /> */}

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

