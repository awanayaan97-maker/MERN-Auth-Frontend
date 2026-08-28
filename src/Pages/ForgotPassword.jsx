

import { useState } from "react";

import ForgotEmail from "../Components/ForgotEmail";
import VerifyOTP from "../Components/VerifyOTP";
import NewPassword from "../Components/NewPassword";

import "./ForgotPassword.css";
import { data, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function ForgotPassword() {
    
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSendOTP() {

        if (!email) return setResponse("Email is required")

        setLoading(true)

        try {

            let response = await fetch(`${API_URL}/api/auth/forget-password-otp`, {
                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ email })
            })

            let data = await response.json()

            if (data.status === true) {
                setResponse(data.message)
                setStep(2)
                return
            }

            else setResponse(data.message)
        }

        catch (error) {
            setResponse("Something went wrong. Please check your connection and try again.")
        }

        finally {
            setLoading(false)
        }

    }


   async function handleVerifyOTP() {

        if(!otp) return setResponse("OTP number is required")

            setLoading(true)

            try {
                
                let response = await fetch(`${API_URL}/api/auth/verify-forgot-password-otp`, {
                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ email, otp })
            })

            let data = await response.json()

            if(data.status === true)  setStep(3)
            
                else setResponse(data.message)
            
            } 
            
            catch (error) {
                setResponse("Something went wrong. Please check your connection and try again.")
            }

            finally{
                setLoading(false)
            }
    }


   async function handleResetPassword() {
    
    if(!password || !confirmPassword) return setResponse("All Feilds are required")

        if (password !== confirmPassword) return setResponse("Passwords do not match")

        setLoading(true)

        try {
            
            let response = await fetch(`${API_URL}/api/auth/resetPassword`, {
                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({email, password})
            })

            let data = await response.json();

            if (data.status === true) {
              setResponse("Your password has been reset successfully")
              navigate("/login")
            }

            else setResponse(data.message)
        } 
        
        catch (error) {
            setResponse("Something went wrong. Please check your connection and try again.")
        }

        finally{
            setLoading(false)
        }


   }

    if (loading) return <Loader />

    return (
        <main className="forgot-password-page">

            {step === 1 && (
                <ForgotEmail
                    email={email}
                    setEmail={setEmail}
                    onSubmit={handleSendOTP}
                    response={response}
                    setResponse={setResponse}
                />
            )}


            {step === 2 && (
                <VerifyOTP
                    email={email}
                    otp={otp}
                    setOtp={setOtp}
                    onSubmit={handleVerifyOTP}
                    response={response}
                    setResponse={setResponse}
                    // onResend={handleResendOTP}
                />
            )}


            {step === 3 && (
                <NewPassword
                    password={password}
                    confirmPassword={confirmPassword}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    onSubmit={handleResetPassword}
                    response={response}
                    setResponse={setResponse}
                />
            )}

        </main>
    );
}

export default ForgotPassword;