import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login-Signup/login';
import './Pages/Login-Signup/css/background.css'
import './Pages/Login-Signup/css/login-signup.css'
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Login-Signup/signup1'; 
import Home from './Pages/Login-Signup/HomePage';
import TopNav from './Pages/InsidePAge/topNav';
import Profile from './Pages/InsidePAge/Profile/profile';
import CurrentReg from './Pages/InsidePAge/Profile/currentReg';
import ApplyDonor from './Pages/InsidePAge/ApplyDonor';
import Application from './Pages/InsidePAge/Application';
function App() {
  return (
    
    <div className="loginSignup">
      <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/userid/:id/home" element={<TopNav />}/>
        <Route path="/userid/:id/profile" element={<Profile />}/>
        <Route path="/userid/:id/currentReg" element={< CurrentReg/>}/>
        <Route path="/userid/:id/apply" element={<ApplyDonor/>}/>
        <Route path="/userid/:id/apply/bankid/:bankid/application" element={<Application/>}/>
        <Route path="/userid/:id/currentReg" element={<CurrentReg />}/>
      </Routes>
  
    </div>
          
          
    
     

  );
}

export default App;
