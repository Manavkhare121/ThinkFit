// AdminSignupPage.jsx

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

import './AdminSignUp.css';

import Studentimage from "../../../assets/Student image.webp";

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AdminSignupPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  // ✅ Backend URL
  const BACKEND_URL =
    import.meta.env.VITE_API_BASE ||
    "https://thinkfit.onrender.com";

  const onSubmit = async (data) => {

    try {

      const response = await axios.post(
        `${BACKEND_URL}/api/admin/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password
        }
      );

      console.log(response.data);

      toast.success("Admin account created 🎉");

      navigate("/Admin");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Admin signup failed ❌"
      );
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">
          Create Admin Account!
        </h1>

        <img
          src={Studentimage}
          alt="Signup"
          className="signup-image"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-form"
        >

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Username is required'
              })}
              className={`input-field ${errors.username ? 'input-error' : ''}`}
            />

          </div>

          {errors.username && (
            <p className="error-text">
              {errors.username.message}
            </p>
          )}

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required'
              })}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />

          </div>

          {errors.email && (
            <p className="error-text">
              {errors.email.message}
            </p>
          )}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required'
              })}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
            />

          </div>

          {errors.password && (
            <p className="error-text">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="signup-btn"
          >
            Sign Up
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

        <div className="login-section">

          <p>
            Already have an account?

            <a
              href="/AdminLogin"
              className="login-link-btn"
            >
              {" "}Login
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminSignupPage;