
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

export const Header = () => {


    return (
        <div className='headerDesign'>
            <LinkButton
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                path={"/gallery"}
                title={"Gallery"}
            />
            <LinkButton
                path={"/resgister"}
                title={"Register"}
            />
            <LinkButton
                path={"/login"}
                title={"Login"}
            />
            
        </div>
    )
}