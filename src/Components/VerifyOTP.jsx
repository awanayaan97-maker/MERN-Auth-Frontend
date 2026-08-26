
import ResponsePopup from "./ResponsePopup";
import "./VerifyOTP.css";

function VerifyOTP({ otp, setOtp, email, onSubmit, response, setResponse }) {

    return (
        <div className="forgot-card">

            {response ? <ResponsePopup message={response} closePopup={() => setResponse(null)}/> : ""}

            <div className="forgot-heading">
                <h1>Verify Your Email</h1>

                <p>
                    We've sent a verification code to
                </p>

                <strong>{email}</strong>
            </div>

            <div className="forgot-form">

                <div className="forgot-input">
                    <label htmlFor="otp">Verification Code</label>

                    <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength="6"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <button
                    className="forgot-button"
                    onClick={onSubmit}
                >
                    Verify OTP
                </button>

            </div>

            {/* <p
                className="resend-otp"
                onClick={onResend}
            >
                Resend OTP
            </p> */}

        </div>
    );
}

export default VerifyOTP;