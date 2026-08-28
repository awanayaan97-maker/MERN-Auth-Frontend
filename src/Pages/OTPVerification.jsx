

import "./OTPVerification.css";

import { data, useNavigate } from "react-router-dom";
import "./OTPVerification.css";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import ResponsePopup from "../Components/ResponsePopup";

function OTPVerification() {

    const API_URL = import.meta.env.VITE_API_URL;
    const [otp, setOtp] = useState({otp: ""});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")

   let email = localStorage.getItem("email")
    const navigate = useNavigate()


    function handleOTP(e){
        const value = e.target.value
        const name = e.target.name
       setOtp(prev => ({...prev, [name] : value}) )
    }

        
        async function resendOTP() {
            
            try {
                
                setLoading(true)

                let response = await fetch(`${API_URL}/api/auth/resendOTP`, {
                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({email})
                })


                let data = await response.json()

                if (data.status === true) return setResponse(data.message)

                else setResponse(data.message)
            } 
            
            catch (error) {
                setResponse("Something went wrong. Please check your connection and try again.")
            }

            finally{
                setLoading(false)
            }
        }


    function handleValidation(){

     
        if (otp.otp === "") return setResponse("Enter your OTP number")

            async function verifyOTP() {

                setLoading(true)
                
                let otpData = {email, otp: otp.otp}

                try {
                    
                    let response = await fetch(`${API_URL}/api/auth/verification`, {
                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify(otpData)
                })

                let data = await response.json();

                if (data.status === true) {
                    setResponse("Signup successfully completed")
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

            verifyOTP()

    }
    

    useEffect(() => {

        if (!email) {
            navigate("/")
        }
    }, [])

    if (loading) {
        return <Loader/>
    }
    
    return (
        <div className="verification-page">

            {response ? <ResponsePopup message={response} closePopup={() => setResponse(null)}/> : ""}

            <div className="verification-card">

                <div className="verification-heading">
                    <h1>Verify Your Email</h1>

                    <p>
                        Enter the 6-digit code sent to your email address.
                    </p>
                </div>

                <div className="otp-input-wrapper">

                    <input
                        type="text"
                        name="otp"
                        value={otp.otp}
                        onChange={handleOTP}
                        placeholder="Enter 6-digit OTP"
                        inputMode="numeric"
                        maxLength="6"
                    />

                </div>

                <button className="verify-button" onClick={handleValidation}>
                    Verify OTP
                </button>

                <p className="resend-text">
                    Didn't receive the code?
                    <span onClick={() =>  resendOTP()}> Resend OTP</span>
                </p>

            </div>

        </div>
    );
}

export default OTPVerification;