import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/UserPage/UserNavbar/UserNavbar.jsx";
import CounsellorNavbarPage from "./Pages/CounsellorPage/CounsellorPageNavbar/CounsellorPageNavbar.jsx";
import UserNavbar from "./Pages/UserPage/UserNavbar/UserNavbar.jsx";
import UserLoginPage from "./Pages/Auth/UserAuthPage/UserLoginPage.jsx";
import UserSignupPage from "./Pages/Auth/UserAuthPage/UserSignUp.jsx";
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
import CounsellorLoginPage from './Pages/Auth/CounsellorAuthPage/CounsellorLoginPage.jsx'
import CounsellorSignupPage from './Pages/Auth/CounsellorAuthPage/CounsellorSignUp.jsx'
import AdminLogin from './Pages/Auth/AdminAuthPage/AdminLoginPage.jsx'
import AdminSignup from './Pages/Auth/AdminAuthPage/AdminSignUp.jsx'
import CounsellorDetails from "./Pages/UserPage/CounsellorDetailPage/counsellorDetails.jsx";
function App() {
  return (
    <Routes>
      <Route path="/AdminLogin" element={<AdminLogin/>}/>
      <Route path="/AdminSignup" element={<AdminSignup/>}/>

      <Route path="/Userlogin" element={<UserLoginPage />} />
      <Route path="/UserSignup" element={<UserSignupPage/>}/>
      <Route path="/Counsellorlogin" element={<CounsellorLoginPage />} />
      <Route path="/CounsellorSignup" element={<CounsellorSignupPage/>}/>
      <Route path="/" element={<Mainpage/>} />
      <Route path="/user/*" element={<UserNavbar />}>
    <Route path="appointment" element={<Appointment />} />
    <Route path="UserDashboard" element={<Dashboard />} />
    <Route path="Chatbot" element={<Chatbot/>}/>
    <Route path="Resource" element={<Resource/>}/>
    <Route path="chatting/:chatId?" element={<Chatting/>}/>
    <Route path="counsellordetails" element={<CounsellorDetails/>}/>
</Route>
      
      <Route path="/counsellor/*" element={<CounsellorNavbarPage/>}>
  <Route path="chatting/:chatId?" element={<CounsellorChatting />} />
  <Route path="booking" element={<CounsellorBookingPage/>}/>
</Route>

<Route path="/Admin" element={<Admin/>}>
<Route path="Adding" element={<AdminCounsellorAddingPage/>} />
</Route>
      
    </Routes>
  );
}


export default App;

