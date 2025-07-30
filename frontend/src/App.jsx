import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctor from "./pages/Doctor"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import About from "./pages/About"
import MyAppointment from "./pages/MyAppointment"
import MyProfile from "./pages/MyProfile"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer, toast } from "react-toastify"

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
