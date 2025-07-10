import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setIsSignedIn, setIsAdmin = () => {} }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const url = isSignUp ? 'http://localhost:8000/api/auth/signup' : 'http://localhost:8000/api/auth/signin';
        const payload = isSignUp
            ? { name, email, password, confirmPassword, role }
            : { email, password, role };

        if (isSignUp) {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                if (isSignUp) {
                    setSuccess('Account created successfully! You can now sign in.');
                    setIsSignUp(false); // Switch to sign-in mode
                } else {
                    setIsSignedIn(true);
                    setIsAdmin(data.role === 'admin');
                    navigate('/');
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div className="sign-in-container">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            {error && <div className="error-message">{error}</div>}
            {success && (
                <div className="success-message enhanced-success">
                    <span className="success-icon">✔️</span>
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {isSignUp && (
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}
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
                <div className="form-group">
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="sign-in-button">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <button
                className="toggle-button"
                onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setSuccess('');
                }}
            >
                {isSignUp ? 'Already have an account? Sign In' : 'Create a new account'}
            </button>
        </div>
    );
};

export default SignIn;