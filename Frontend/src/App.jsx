import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/AdminPage/NavbarForAdmin/Navbar.jsx";
import CounsellorNavbarPage from "./Components/CounsellorPage/CounsellorPageNavbar/CounsellorPageNavbar.jsx";
import UserNavbar from "./Components/UserPage/UserNavbar/UserNavbar.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import SignupPage from "./Components/SignUp/SignUp.jsx";
import Mainpage from './Components/Mainpage/Mainpage.jsx'
import Appointment from "./Components/UserPage/BookingAppointment/BookingAppointment.jsx"
import Dashboard from "./Components/AdminPage/DashboardForAdmin/Dashboard.jsx";
import Chatbot from "./Components/UserPage/ChatbotPage/Chatbot.jsx"
import Resource from "./Components/UserPage/ResourcePage/Resource.jsx";
import Chatting from "./Components/UserPage/ChatWithCounsellor/Chatting.jsx"
import CounsellorChatting from './Components/CounsellorPage/CounsellorPageChatting/CounsellorPage.jsx'
import CounsellorBookingPage from './Components/CounsellorPage/CounsellorPageBooking/CounsellorPageBooking.jsx'
import Admin from './Components/AdminPage/NavbarForAdmin/Navbar.jsx'
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

</Route>
      
    </Routes>
  );
}


export default App;

