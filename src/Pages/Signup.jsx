import { useEffect, useState } from "react";
import FormInput from "../Components/FormInput";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useInputHandler";
import Loader from "../Components/Loader";
import ResponsePopup from "../Components/ResponsePopup";


const fields = [
    {
        name: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
    },
    {
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
    },
];

function Signup() {

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")
    const { data, inputHandler } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    function handleValidation() {

        if (data.firstName === "" || data.lastName === "" || data.email === "" || data.password === "") return setResponse("All fields are required")

        if(data.password.length !== 8) return setResponse("Password must be at least 8 characters.")

        setLoading(true)

        async function saveData() {

            try {
                let response = await fetch(`${API_URL}api/auth/signup`, {
                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify(data)
                })


                let responseData = await response.json();

                if (responseData.statusCode === 200) {
                    localStorage.setItem("email", responseData.data.email)
                    navigate("/verification")
                }

                else if (responseData.statusCode === 409) return  setResponse(responseData.message)
                    
                else if (responseData.statusCode === 500) return setResponse(responseData.message)

            }

            catch (error) {
                setResponse(error.message)
            }

            finally {
                setLoading(false)
            }

        }

        saveData()
    }

    if (loading) {
        return <Loader />
    }

    return (
        <main className="signup-page">

            {
                response ?
                    <ResponsePopup message={response} closePopup={() => setResponse(null)} />
                    : ""
            }

            <div className="signup-card">

                <div className="signup-heading">
                    <h1>Create Account</h1>
                    <p>Enter your details to create your account</p>
                </div>

                <div className="signup-form">

                    {fields.map((field) => (
                        <FormInput
                            key={field.name}
                            {...field}
                            value={data[field.name]}
                            updateValue={inputHandler}
                        />
                    ))}

                    <button
                        className="signup-button"
                        type="submit"
                        onClick={handleValidation}
                    >
                        Create Account
                    </button>

                </div>

                <p className="login-text">
                    Already have an account?
                    <span onClick={() => navigate("/login")}> Login</span>
                </p>

            </div>

        </main>
    );
}

export default Signup;