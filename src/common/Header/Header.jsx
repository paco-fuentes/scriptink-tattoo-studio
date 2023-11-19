
import './Header.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { LinkButton } from '../LinkButton/LinkButton'

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/")
    }

    return (
        <div className="headerDesign txtHead">
            <LinkButton path={"/"} title={"Home"} />
            <LinkButton path={"/gallery"} title={"Galería"} />
            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton path={"/login"} title={"Login"} />
                    <LinkButton path={"/register"} title={"Regístrate"} />

                </>
            ) : (rdxCredentials.credentials.role === "user" && (
                <>
                    <LinkButton path={"/profile"} title={rdxCredentials.credentials.username} />
                    <LinkButton path={"/myappointments"} title={'Mis citas'} />

                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log Out"} />
                    </div>
                </>
            )) || (rdxCredentials.credentials.role === "worker" && (
                <>
                    <LinkButton path={"/worker"} title={"Worker"} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log Out"} />
                    </div>
                </>
            )) || (rdxCredentials.credentials.role === "admin" && (
                <>
                    <LinkButton path={"/admin"} title={"Admin"} />
                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log Out"} />
                    </div>
                </>
            ))
            }
        </div>
    );
};
