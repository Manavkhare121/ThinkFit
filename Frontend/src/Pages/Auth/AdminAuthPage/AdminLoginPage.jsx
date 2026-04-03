import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import "./AdminLoginPage.css"; // reuse same CSS
import StudentImage from "../../../assets/Student image.webp";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login", // ✅ admin endpoint
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      toast.success("Admin Login successful 🎉");

      
      localStorage.setItem("isAdminLoggedIn", true);

     
      navigate("/Admin");

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Invalid admin credentials ❌"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Admin!</h1>

        <img
          src={StudentImage}
          alt="Login"
          className="login-image"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">

          {/* Email */}
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className={`login-input ${errors.email ? 'error' : ''}`}
            />
          </div>

          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className={`login-input ${errors.password ? 'error' : ''}`}
            />
          </div>

          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <div className="remember-forgot">
            <label className="remember-label">
              <input type="checkbox" {...register('rememberMe')} />
              <span>Remember me</span>
            </label>

            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>
        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn facebook"><FaFacebookF /></button>
          <button className="social-btn google"><FaGoogle /></button>
          <button className="social-btn twitter"><FaTwitter /></button>
        </div>

       
        <div className="signup-section">
          <p>
            Don't have an account? 
            <a href="/AdminSignup" className="signup-link-btn"> Sign up</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;