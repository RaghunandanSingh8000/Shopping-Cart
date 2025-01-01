import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setIsSignedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-in and sign-up
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password in sign-up
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            // Handle sign-up logic here
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            console.log('Sign Up - Email:', email);
            console.log('Sign Up - Password:', password);
            // Assume sign-up is successful
            setIsSignedIn(true);
            navigate('/');
        } else {
            // Handle sign-in logic here
            console.log('Sign In - Email:', email);
            console.log('Sign In - Password:', password);
            // Assume sign-in is successful
            setIsSignedIn(true);
            navigate('/');
        }
    };

    return (
        <div className="sign-in-container">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isSignUp && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="sign-in-button">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <button
                className="toggle-button"
                onClick={() => setIsSignUp(!isSignUp)}
            >
                {isSignUp ? 'Already have an account? Sign In' : 'Create a new account'}
            </button>
        </div>
    );
};

export default SignIn;