
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rdxCredentials = useSelector(userData);
    console.log(rdxCredentials.credentials.role);

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
            ) : (rdxCredentials.credentials.role === "user" && (
                <>
                    <LinkButton path={"/profile"} title={rdxCredentials.credentials.username} />
                    <LinkButton path={"/myappointments"} title={'My Appointments'} />

                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            ))
            || (rdxCredentials.credentials.role === "worker" && (
                <>
                    <LinkButton path={"/worker"} title={"Worker"} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            )
            )
            || (rdxCredentials.credentials.role === "admin" && (
                <>
                    <LinkButton path={"/admin"} title={"Admin"} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"log out"} />
                    </div>
                </>
            )
            )
            }
        </div>
    );
};
// && rdxCredentials.credentials.role === "user"
