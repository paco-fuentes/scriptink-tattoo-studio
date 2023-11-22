import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Gallery } from "../Gallery/Gallery"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { CreateAppointment } from "../createAppointment/createAppointment"
import { MyAppointments } from "../MyAppointments/MyAppointments"
import { EditAppointment } from "../EditAppointment/EditAppointment"
import { Worker } from "../Worker/Worker"
import { Admin } from "../Admin/Admin"
import { WorkerEditAppointment } from "../WorkerEditAppointment/WorkerEditAppointment"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/createappointment/:id" element={<CreateAppointment />} />
                <Route path="/myappointments" element={<MyAppointments />} />
                <Route path="/myappointments/:id" element={<EditAppointment />} />
                <Route path="/myappointment/:id" element={<WorkerEditAppointment />} />
                <Route path="/worker" element={<Worker />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    )
}
