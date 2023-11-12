
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
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                path={"/gallery"}
                title={"Gallery"}
            />
        </div>
    )
}