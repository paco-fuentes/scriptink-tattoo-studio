import { Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Gallery } from "../Gallery/Gallery"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { CreateAppointment } from "../createAppointment/createAppointment"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createappointment" element={<CreateAppointment />} />
            </Routes>
        </>
    )
}
