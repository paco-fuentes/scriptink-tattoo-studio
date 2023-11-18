import { Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Gallery } from "../Gallery/Gallery"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { CreateAppointment } from "../createAppointment/createAppointment"
import { MyAppointments } from "../MyAppointments/MyAppointments"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/createappointment/:id" element={<CreateAppointment />} />
                <Route path="/myappointments" element={<MyAppointments />} />
            </Routes>
        </>
    )
}
