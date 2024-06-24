import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaUserAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const Newform = ({ setUserName, setUrlProfile, setUserIdloginPerson }) => {
    const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState(true);
    const [signInInputValue, setSignInInputValue] = useState('');
    const [signEmailValue, setSignEmailValue] = useState('');
    const [signInPasswordValue, setSignInPasswordValue] = useState('');
    const [signVerifyEmailValue, setSignVerifyEmailValue] = useState('');
    const [signVerifyValue, setSignVerifyValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleSignInSignUp = () => {
        setIsSignIn(prevState => !prevState);
        setErrorMessage('');
    };

    const handleNameChange = (e) => {
        setSignInInputValue(e.target.value);
    };

    const handleEmailChange = (e) => {
        setSignEmailValue(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setSignInPasswordValue(e.target.value);
    };

    const emailVerifyChanges = (e) => {
        setSignVerifyEmailValue(e.target.value);
    };

    const passwordVerifyChanges = (e) => {
        setSignVerifyValue(e.target.value);
    };

    const validateSignIn = () => {
        if (!signVerifyEmailValue || !signVerifyValue) {
            setErrorMessage('Please fill out all fields.');
            return false;
        }
        return true;
    };

    const validateSignUp = () => {
        if (!signInInputValue || !signEmailValue || !signInPasswordValue) {
            setErrorMessage('Please fill out all fields.');
            return false;
        }
        return true;
    };

    const dataSubmitted = async () => {
        if (!validateSignUp()) return;

        const formDataDetails = {
            name: signInInputValue,
            email: signEmailValue,
            password: signInPasswordValue,
        };

        try {
            const response = await fetch('http://localhost:5000/userlogined', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataDetails),
            });

            if (response.ok) {
                const data = await response.json();
                setUserName(data.name);
                setUrlProfile('')
                setUserIdloginPerson(data._id)
                navigate('/home');
            } else {
                setErrorMessage('Error in sending data.');
            }
        } catch (e) {
            setErrorMessage('Error in connection backend');
        }
    };

    const verifyinguseraName = async () => {
        if (!validateSignIn()) return;

        const userdetailsSendingForm = {
            email: signVerifyEmailValue,
            password: signVerifyValue,
        };

        try {
            const foundingResponse = await fetch('http://localhost:5000/userdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdetailsSendingForm),
            });

            if (foundingResponse.ok) {
                const foundData = await foundingResponse.json();
                setUserName(foundData.userFound.name);
                setUrlProfile(foundData.userFound.profile)
                setUserIdloginPerson(foundData.userFound._id)
                navigate('/home');
            } else {
                setErrorMessage('User not found in database');
            }
        } catch (e) {
            setErrorMessage('Error in frontend to finding a user');
        }
    };

    return (
        <div className='main-bg-login-page'>
            <div className='main-bf-container-login'>
                {isSignIn ? (
                    <div>
                        <div className='email-box-container'>
                            <FaUserAlt />
                            <input type="email" placeholder='Enter Your Email' required onChange={emailVerifyChanges} value={signVerifyEmailValue} />
                        </div>
                        <div className='email-box-container'>
                            <FaKey />
                            <input type="password" placeholder='Enter Password' required onChange={passwordVerifyChanges} value={signVerifyValue} />
                        </div>
                        <button className='buttons-submited' onClick={verifyinguseraName}>Submit</button>
                    </div>
                ) : (
                    <div>
                        <div className='email-box-container'>
                            <FaUserAlt />
                            <input type="text" placeholder='Enter Your Name' onChange={handleNameChange} value={signInInputValue} required />
                        </div>
                        <div className='email-box-container'>
                            <MdOutlineMailOutline />
                            <input type="email" placeholder='Enter Your Email' required onChange={handleEmailChange} value={signEmailValue} />
                        </div>
                        <div className='email-box-container'>
                            <FaKey />
                            <input type="password" placeholder='Enter Your Password' onChange={handlePasswordChange} value={signInPasswordValue} required />
                        </div>
                        <button className='buttons-submited ' onClick={dataSubmitted}>Submit</button>
                    </div>
                )}
                <button className='button-sign-up ' onClick={toggleSignInSignUp}>{isSignIn ? 'Sign Up' : 'Sign In'}</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default Newform;
