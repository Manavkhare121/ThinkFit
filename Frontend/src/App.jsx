import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/UserPage/UserNavbar/UserNavbar.jsx";
import CounsellorNavbarPage from "./Pages/CounsellorPage/CounsellorPageNavbar/CounsellorPageNavbar.jsx";
import UserNavbar from "./Pages/UserPage/UserNavbar/UserNavbar.jsx";
import LoginPage from "./Pages/Auth/LoginPage/LoginPage.jsx";
import SignupPage from "./Pages/Auth/SignUp/SignUp.jsx";
import Mainpage from './Components/Mainpage/Mainpage.jsx'
import Appointment from "./Pages/UserPage/BookingAppointment/BookingAppointment.jsx"
import Chatbot from "./Pages/UserPage/ChatbotPage/Chatbot.jsx"
import Resource from "./Pages/UserPage/ResourcePage/Resource.jsx";
import Chatting from "./Pages/UserPage/ChatWithCounsellor/Chatting.jsx"
import CounsellorChatting from './Pages/CounsellorPage/CounsellorPageChatting/CounsellorPage.jsx'
import CounsellorBookingPage from "./Pages/CounsellorPage/CounsellorPageBooking/CounsellorPageBooking.jsx"
import Admin from './Pages/AdminPage/NavbarForAdmin/Navbar.jsx'
import Dashboard from "./Pages/AdminPage/DashboardForAdmin/Dashboard.jsx";
import AdminCounsellorAddingPage from './Pages/AdminPage/BookingStatus/Booking.jsx'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupPage/>}/>
      <Route path="/" element={<Mainpage/>} />
      <Route path="/user/*" element={<UserNavbar />}>
    <Route path="appointment" element={<Appointment />} />
    <Route path="UserDashboard" element={<Dashboard />} />
    <Route path="Chatbot" element={<Chatbot/>}/>
    <Route path="Resource" element={<Resource/>}/>
    <Route path="chatting" element={<Chatting/>}/>
</Route>
      
      <Route path="/counsellor/*" element={<CounsellorNavbarPage/>}>
  <Route path="chatting" element={<CounsellorChatting />} />
  <Route path="booking" element={<CounsellorBookingPage/>}/>
</Route>

<Route path="/Admin" element={<Admin/>}>
<Route path="Adding" element={<AdminCounsellorAddingPage/>} />
</Route>
      
    </Routes>
  );
}


export default App;

