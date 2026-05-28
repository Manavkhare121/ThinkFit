// AdminLoginPage.jsx

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

import "./AdminLoginPage.css";

import StudentImage from "../../../assets/Student image.webp";

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AdminLoginPage = () => {

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
        `${BACKEND_URL}/api/admin/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      toast.success("Admin Login successful 🎉");

      localStorage.setItem(
        "isAdminLoggedIn",
        true
      );

      navigate("/Admin");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Invalid admin credentials ❌"
      );
    }
  };

  return (
    <div className="admin-login-container">

      <div className="admin-login-card">

        <h1 className="admin-login-title">
          Welcome Admin!
        </h1>

        <img
          src={StudentImage}
          alt="Login"
          className="admin-login-image"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="admin-login-form"
        >

          <div className="admin-input-wrapper">

            <FaUser className="admin-input-icon" />

            <input
              type="text"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required'
              })}
              className={`admin-login-input ${errors.email ? 'error' : ''}`}
            />

          </div>

          {errors.email && (
            <p className="error-text">
              {errors.email.message}
            </p>
          )}

          <div className="admin-input-wrapper">

            <FaLock className="admin-input-icon" />

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required'
              })}
              className={`admin-login-input ${errors.password ? 'error' : ''}`}
            />

          </div>

          {errors.password && (
            <p className="error-text">
              {errors.password.message}
            </p>
          )}

          <div className="admin-remember-forgot">

            <label className="admin-remember-label">

              <input
                type="checkbox"
                {...register('rememberMe')}
              />

              <span>Remember me</span>

            </label>

            <a href="#" className="admin-forgot-link">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="admin-login-btn"
          >
            Login
          </button>

        </form>

        <div className="admin-divider">
          <span>or</span>
        </div>

        <div className="admin-social-buttons">

          <button className="admin-social-btn admin-facebook">
            <FaFacebookF />
          </button>

          <button className="admin-social-btn admin-google">
            <FaGoogle />
          </button>

          <button className="admin-social-btn admin-twitter">
            <FaTwitter />
          </button>

        </div>

        <div className="admin-signup-section">

          <p>
            Don't have an account?

            <a
              href="/AdminSignup"
              className="admin-signup-link-btn"
            >
              {" "}Sign up
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminLoginPage;