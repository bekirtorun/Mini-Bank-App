import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../auth/axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const SIGNIN_URL = '/users/login';
const REGISTER_URL = '/users/register';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }


    const doSignIn = async (element) => {
        const signInErrors = {};
        let signInEmail, signInPassword;

        signInEmail = username.trim().toLowerCase();
        signInPassword = password.trim();

        //check inputs are okay or not
        if (!signInEmail) {
            signInErrors.username = "** Username is required!!! **";
        }
        if (!signInPassword) {
            signInErrors.password = "** Password is required!!! **";
        }
        if (!isEmpty(signInErrors)) {
            setErrors(signInErrors);
        }



        if (signInEmail && isEmpty(signInErrors)) {
            try {
                const response = await axios.post(SIGNIN_URL,
                    {
                        'username': signInEmail,
                        'password': signInPassword,
                    },
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': "application/json" },
                    }
                );
                const access_token = response?.data?.token;
                const userId = response?.data?.id;

                localStorage.setItem('isLoggedMiniBankApp', true);
                localStorage.setItem('username', signInEmail);
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('userId', userId);
                setAuth({ username: signInEmail, access_token });

                setConfirmPassword('');
                setRegisterUsername('');
                setRegisterPassword('');
                navigate("/dashboard");

            } catch (err) {
                localStorage.setItem('isLogged', false);
                if (!err?.response) {
                    signInErrors.server = 'No server response!';
                } else if (err.response?.status === 400) {
                    signInErrors.server = 'Sign In request has been failed with status 400!';
                } else if (err.response?.status === 401) {
                    signInErrors.server = 'Sign In has been failed! Please check your email and password.';
                } else {
                    signInErrors.server = 'Sign In has been failed!';
                }
                setErrors(signInErrors);
            }
        }
    };

    const doRegister = async (element) => {



        const registerErrors = {};
        if (!registerEmail) {
            registerErrors.email = "** Email is required!!! **";
        }
        if (!registerUsername) {
            registerErrors.username = "** Username is required!!! **";
        }
        if (!registerPassword.trim()) {
            registerErrors.password = "** Password is required!!! **";
        }
        if (confirmPassword !== registerPassword) {
            registerErrors.confirmPassword = "** Password not matched!!! **";
        }

        if (!isEmpty(registerErrors)) {
            setErrors(registerErrors);
        } else {
            try {
                const response = await axios.post(REGISTER_URL,
                    {
                        'email': registerEmail,
                        'username': registerUsername,
                        'password': registerPassword,
                    },
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': "application/json" },
                    }
                );
                navigate('/dashboard')

            } catch (err) {
                if (!err?.response) {
                    registerErrors.server = 'No server response!';
                } else if (err.response?.status === 400) {
                    registerErrors.server = 'Register request has been failed with status 400!';
                } else if (err.response?.status === 409) {
                    registerErrors.server = '"' + registerEmail + '" email is already registered!';
                } else {
                    registerErrors.server = 'Register has been failed!';
                }
                setErrors(registerErrors);

            }
        }

    };


    return (
        <div className="login-page">
            <div className="form">
                {isLogin ? (
                    <form className="login-form">
                        <input type="text" placeholder="username" autoComplete="username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                        {errors.username && <span className="error-container">{errors.username}</span>}
                        <input type="password" placeholder="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        {errors.password && <span className="error-container">{errors.password}</span>}
                        <button type="button" onClick={(e) => doSignIn(e.target)}>login</button>
                        <p className="message">
                            Not registered? <a href="#" onClick={toggleForm}>Create an account</a>
                        </p>
                    </form>
                ) : (
                    <form className="register-form">
                        <input type="text" placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)} value={registerUsername} required />
                        {errors.username && <span className="error-container">{errors.username}</span>}
                        <input type="password" placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword} required />
                        {errors.password && <span className="error-container">{errors.password}</span>}
                        <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                        {errors.confirmPassword && <span className="error-container">{errors.confirmPassword}</span>}
                        <input type="text" placeholder="email address" onChange={(e) => setRegisterEmail(e.target.value)} value={registerEmail} required />
                        {errors.email && <span className="error-container">{errors.email}</span>}
                        <button type="button" onClick={(e) => doRegister(e.target)}>register</button>
                        <p className="message">
                            Already registered? <a href="#" onClick={toggleForm}>Sign In</a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}
export default LoginPage;