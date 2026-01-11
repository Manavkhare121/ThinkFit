import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import './SignUp.css';
import Studentimage from "../../../assets/Student image.webp";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');
    const navigate=useNavigate();
    const onSubmit = (data) => {
        console.log('Signup attempt with:', data);
        toast.success('Signed up successfully!');
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="signup-title">Create your account!</h1>

                <img
                    src={Studentimage}
                    alt="ThinkFit Mascot"
                    className="signup-image"
                    onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Image+Error"; }}
                />

                <form onSubmit={handleSubmit(onSubmit)} className="signup-form" autoComplete="off">
                    
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Username or Email"
                            {...register('email', { required: 'Email is required' })}
                            className={`input-field ${errors.email ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required' })}
                            className={`input-field ${errors.password ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', {
                                required: 'Confirm password is required',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                            className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                        />
                    </div>

                    <button type="submit" className="signup-btn" onClick={()=>{navigate("/user")}}>
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
                    <p>Already have an account? <a href="/login" className="login-link-btn">Login</a></p>
                </div>
                

            </div>
        </div>
    );
};

export default SignupPage;