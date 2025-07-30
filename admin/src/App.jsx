import React, { useContext } from "react"
import Login from "./pages/Login"
import { ToastContainer, toast } from "react-toastify"
import { AdminContext } from "./context/AdminContext"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Admin/Dashboard"
import AllAppointments from "./pages/Admin/AllAppointments"
import AddDocotr from "./pages/Admin/AddDoctor"
import DoctorsList from "./pages/Admin/DoctorsList"
import { Routes, Route } from "react-router-dom"
import { DoctorContext } from "./context/DoctorContext"

import DoctorProfile from "./pages/Doctor/doctorProfile"
import DoctorAppointments from "./pages/Doctor/doctorAppointments"
import DoctorDashboard from "./pages/Doctor/doctorDashboard"

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className="bg-[#F9F8FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDocotr />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
