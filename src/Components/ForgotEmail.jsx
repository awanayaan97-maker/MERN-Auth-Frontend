

import ResponsePopup from "./ResponsePopup";
import "./ForgotEmail.css";

function ForgotEmail({ email, setEmail, onSubmit, response, setResponse}) {

    return (
        <div className="forgot-page">

            {response ? <ResponsePopup message={response} closePopup={() => setResponse(false)}/> : ""}

            <div className="forgot-card">

                <div className="forgot-heading">
                    <h1>Forgot Password?</h1>

                    <p>
                        Enter your email to receive a verification code
                    </p>
                </div>

                <div className="forgot-form">

                    <div className="forgot-input">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        className="forgot-button"
                        onClick={onSubmit}
                    >
                        Send OTP
                    </button>

                </div>

                <p className="back-login">
                    <span >
                        ← Back to Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default ForgotEmail;