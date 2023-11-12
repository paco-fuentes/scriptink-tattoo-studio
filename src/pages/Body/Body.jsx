import { Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Gallery } from "../Gallery/Gallery"
import { Login } from "../Login/Login"


export const Body = () => {
    return (
        <>
           <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/gallery" element={<Gallery />}/>
               <Route path="/login" element={<Login />}/>
           </Routes>
        </>
    )
}