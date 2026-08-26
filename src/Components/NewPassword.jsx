
import ResponsePopup from "./ResponsePopup";
import "./NewPassword.css";

function NewPassword({
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    onSubmit,
    response,
    setResponse
}) {

    return (
        <div className="forgot-card">

            {response ? <ResponsePopup message={response} closePopup={() => setResponse(false)}/> : ""}


            <div className="forgot-heading">
                <h1>Set New Password</h1>

                <p>
                    Create a new password for your account.
                </p>
            </div>

            <div className="forgot-form">

                <div className="forgot-input">
                    <label htmlFor="password">
                        New Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="forgot-input">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </div>

                <p className="password-hint">
                    Password must be at least 8 characters.
                </p>

                <button
                    className="forgot-button"
                    onClick={onSubmit}
                >
                    Reset Password
                </button>

            </div>

        </div>
    );
}

export default NewPassword;