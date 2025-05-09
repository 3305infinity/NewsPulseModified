// import React, { useState } from 'react';
// import axios from 'axios';
// import img from '../images/imgloginfinal.jpg'
// import '../Style.css'
// import { useNavigate } from 'react-router-dom';
// const Signup = () => {
//     const [step, setStep] = useState(1);
//     // const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const navigate = useNavigate();
//     const [serverOtp, setServerOtp] = useState(null);
//     const [user, setUser] = useState({ name: '', email: '', password: '', cpassword: '' });
//     // Handle input change
//     const onChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };
//     // Send OTP to email
//     const sendOtp = async () => {
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email: user.email });
//             console.log(res.data)
//             if (res.data.otp) {
//                 setServerOtp(res.data.otp);
//                 setStep(2);
//                 alert('OTP sent to your email!');
//             }
//             else {
//                 console.log("No OTP received. Check backend response.")
//             }
//         }
//         catch (error) {
//             // alert('Error sending OTP');
//             console.error('Error:', error.response?.data || error.message);
//             alert(error.response?.data?.error || 'Error sending OTP');
//         }
//     };
//     // Verify OTP
//     const verifyOtp = () => {
//         if (parseInt(otp) === parseInt(serverOtp)) {
//             setStep(3);
//         } else {
//             alert('Invalid OTP. Please try again.');
//         }
//     };
//     // Handle Signup
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         if (user.password !== user.cpassword) {
//             alert('Passwords do not match!');
//             return;
//         }
//         try {
//             const res = await fetch('http://localhost:5000/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: user.name, email: user.email, password: user.password,
//                     otp: otp
//                 }),
//                 // dont forget to send otp here 
//             });
//             const json = await res.json();
//             if (!res.ok) {
//                 throw new Error(json.error || 'Signup failed');
//                 // alert('signup unsuccesful')
//             }
//             alert('Signup successful!');
//             navigate('/login');
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="outersec">
//                 <div className="innersecsignup">
//                     <div className="leftside">
//                         <h2>SignUp</h2>

//                         {step === 1 && (
//                             <div className="innersection1">
//                                 <div className="mb-3 section1">
//                                     <label htmlFor="name" className="form-label">Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         onChange={onChange}
//                                         id="name"
//                                         name="name"
//                                         value={user.name}
//                                         placeholder="Enter your name"
//                                     />
//                                 </div>
//                                 <div className="mb-3 section1">
//                                     <label htmlFor="email" className="form-label">Email Address</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         onChange={onChange}
//                                         id="email"
//                                         name="email"
//                                         value={user.email}
//                                         placeholder="Enter your email"
//                                     />
//                                 </div>
//                                 <button onClick={sendOtp} className="btn btn-primary loginbtn">Send OTP</button>
//                             </div>
//                         )}

//                         {step === 2 && (
//                             <div className='otppart'>
//                                 <b>Enter OTP</b>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     placeholder="Enter OTP"
//                                     required
//                                 />
//                                 <button onClick={verifyOtp} className=" btn btn-success loginbtn">Verify OTP</button>
//                             </div>
//                         )}

//                         {step === 3 && (
//                             <div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         onChange={onChange}
//                                         id="password"
//                                         name="password"
//                                         value={user.password}
//                                         placeholder="Enter your password"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="cpassword" className="form-label">Confirm Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         onChange={onChange}
//                                         id="cpassword"
//                                         name="cpassword"
//                                         value={user.cpassword}
//                                         placeholder="Confirm your password"
//                                     />
//                                 </div>
//                                 <button onClick={handleSignup} className="loginbtn ">Register</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="rightside">
                        
//                                                 <img src={img} className='rightimg'/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaArrowRight } from 'react-icons/fa';
import './Signup.css';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [serverOtp, setServerOtp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const [user, setUser] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        cpassword: '' 
    });

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError('');
    };

    const sendOtp = async () => {
        if (!user.name || !user.email) {
            setError('Please fill all fields');
            return;
        }

        setIsLoading(true);
        try {
            // const res = await axios.post('http://localhost:5000/api/auth/send-otp', { 
            //     email: user.email 
            // });
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email: user.email });
                        console.log(res.data)
            if (res.data.otp) {
                setServerOtp(res.data.otp);
                setStep(2);
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Error sending OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = () => {
        if (!otp) {
            setError('Please enter OTP');
            return;
        }

        if (parseInt(otp) === parseInt(serverOtp)) {
            setStep(3);
            setError('');
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (user.password !== user.cpassword) {
            setError('Passwords do not match!');
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name: user.name,
                email: user.email,
                password: user.password,
                otp: otp
            });

            if (res.data.success) {
                alert('Signup successful!');
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Progress steps
    const steps = [
        { number: 1, title: 'Basic Info' },
        { number: 2, title: 'Verify Email' },
        { number: 3, title: 'Set Password' }
    ];

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-left">
                    <div className="signup-header">
                        <h1>Join <span className="brand-highlight">HackStreak</span></h1>
                        <p className="signup-subtitle">
                            Track coding contests and level up your skills
                        </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="progress-steps">
                        {steps.map((stepItem) => (
                            <div 
                                key={stepItem.number} 
                                className={`step ${step === stepItem.number ? 'active' : ''} ${step > stepItem.number ? 'completed' : ''}`}
                            >
                                <div className="step-number">
                                    {step > stepItem.number ? <FaCheck /> : stepItem.number}
                                </div>
                                <div className="step-title">{stepItem.title}</div>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="signup-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="signup-form">
                        {step === 1 && (
                            <div className="step-content">
                                <div className="input-group">
                                    <label htmlFor="name">
                                        <FaUser className="input-icon" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={user.name}
                                        onChange={onChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">
                                        <FaEnvelope className="input-icon" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        onChange={onChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>

                                <button 
                                    type="button" 
                                    onClick={sendOtp}
                                    className="signup-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send OTP'}
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-content">
                                <div className="input-group">
                                    <label htmlFor="otp">
                                        <FaLock className="input-icon" />
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        required
                                    />
                                    <small className="otp-note">
                                        We've sent a code to {user.email}
                                    </small>
                                </div>

                                <div className="otp-actions">
                                    <button 
                                        type="button" 
                                        onClick={() => setStep(1)}
                                        className="back-button"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={verifyOtp}
                                        className="signup-button"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="step-content">
                                <div className="input-group">
                                    <label htmlFor="password">
                                        <FaLock className="input-icon" />
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={user.password}
                                        onChange={onChange}
                                        placeholder="Create password"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="cpassword">
                                        <FaLock className="input-icon" />
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="cpassword"
                                        name="cpassword"
                                        value={user.cpassword}
                                        onChange={onChange}
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>

                                <div className="password-requirements">
                                    <p>Password must contain:</p>
                                    <ul>
                                        <li>At least 8 characters</li>
                                        <li>One uppercase letter</li>
                                        <li>One number</li>
                                    </ul>
                                </div>

                                <button 
                                    type="submit" 
                                    className="signup-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating account...' : (
                                        <>
                                            Complete Signup <FaArrowRight className="arrow-icon" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="login-redirect">
                        Already have an account?{' '}
                        <Link to="/login" className="login-link">
                            Log in
                        </Link>
                    </div>
                </div>

                <div className="signup-right">
                    <div className="coding-illustration">
                        {/* SVG Illustration */}
                        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                            {/* Monitor */}
                            <rect x="100" y="50" width="200" height="150" rx="10" fill="#1a1a2e" />
                            <rect x="110" y="60" width="180" height="130" rx="5" fill="#6e48aa" opacity="0.2" />
                            
                            {/* Code */}
                            <text x="120" y="100" fontFamily="'Fira Code', monospace" fontSize="14" fill="#4bc0c8">{'</>'}</text>
                            <text x="120" y="120" fontFamily="'Fira Code', monospace" fontSize="14" fill="#ffffff">{'// Join the challenge'}</text>
                            <text x="120" y="140" fontFamily="'Fira Code', monospace" fontSize="14" fill="#ffffff">{'const signup = () => {'}</text>
                            <text x="120" y="160" fontFamily="'Fira Code', monospace" fontSize="14" fill="#6e48aa">{'  return <HackStreak/>;'}</text>
                            <text x="120" y="180" fontFamily="'Fira Code', monospace" fontSize="14" fill="#ffffff">{'}'}</text>
                            
                            {/* Stand */}
                            <rect x="175" y="200" width="50" height="20" fill="#1a1a2e" />
                            <rect x="185" y="220" width="30" height="10" fill="#1a1a2e" />
                        </svg>
                    </div>
                    <div className="signup-quote">
                        <h3>Start Your Coding Journey</h3>
                        <p>Never miss another important contest</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;