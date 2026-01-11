import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import "./LoginPage.css";
import StudentImage from "../../../assets/Student image.webp"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()
  const onSubmit = (data) => {
    console.log('Login attempt with:', data);
    toast.success('Logged in successfully!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to ThinkFit!</h1>

        <img
          src={StudentImage}
          alt="ThinkFit Mascot"
          className="login-image"
          onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Image+Error"; }}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="login-form" autoComplete="off">

          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username or Email"
              {...register('email', { required: 'Email is required' })}
              className={`login-input ${errors.email ? 'error' : ''}`}
            />
          </div>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className={`login-input ${errors.password ? 'error' : ''}`}
            />
          </div>
          <div className="remember-forgot">
            <label className="remember-label">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="checkbox"
              />
              <span>Remember me</span>
            </label>

            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn" onClick={()=>navigate("/user")}>
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
          <p>Don't have an account? <a href="/signup" className="signup-link-btn">Sign up</a></p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;