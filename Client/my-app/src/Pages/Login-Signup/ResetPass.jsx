import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
// import './css/resetPass.css'
function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/resetPassword", {
                token,
                newPassword,
                confirmPassword,
            });

            if (response.data.success) {
                setMessage("Your password has been reset successfully.");
                navigate("/login"); // Redirect to login page
            } else {
                setMessage("Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.log(error)
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;