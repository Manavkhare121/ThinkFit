// CounsellorLoginPage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaGoogle,
  FaTwitter
} from 'react-icons/fa';

import "./CounsellorLoginPage.css";
import StudentImage from "../../../assets/Student image.webp";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CounsellorLoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE ||
    "https://thinkfit.onrender.com";

  const onSubmit = async (data) => {

    try {

      const response = await axios.post(
        `${BACKEND_URL}/api/counsellor/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      toast.success("Counsellor Login successful 🎉");

      localStorage.setItem(
        "isCounsellorLoggedIn",
        true
      );

      navigate("/counsellor");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Invalid email or password ❌"
      );
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">
          Welcome Counsellor!
        </h1>

        <img
          src={StudentImage}
          alt="Login"
          className="login-image"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >

          <div className="input-wrapper">

            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required'
              })}
              className={`login-input ${errors.email ? 'error' : ''}`}
            />

          </div>

          {errors.email && (
            <p className="error-text">
              {errors.email.message}
            </p>
          )}

          <div className="input-wrapper">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required'
              })}
              className={`login-input ${errors.password ? 'error' : ''}`}
            />

          </div>

          {errors.password && (
            <p className="error-text">
              {errors.password.message}
            </p>
          )}

          <div className="remember-forgot">

            <label className="remember-label">

              <input
                type="checkbox"
                {...register('rememberMe')}
              />

              <span>Remember me</span>

            </label>

            <a href="#" className="forgot-link">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-buttons">

          <button className="social-btn facebook">
            <FaFacebookF />
          </button>

          <button className="social-btn google">
            <FaGoogle />
          </button>

          <button className="social-btn twitter">
            <FaTwitter />
          </button>

        </div>

        <div className="signup-section">

          <p>
            Don't have an account?

            <a
              href="/CounsellorSignup"
              className="signup-link-btn"
            >
              {" "}Sign up
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default CounsellorLoginPage;