import { useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput";
import "./Login.css";
import useForm from "../hooks/useInputHandler";
import { useEffect, useState } from "react";
import ResponsePopup from "../Components/ResponsePopup";
import Loader from "../Components/Loader";

const fields = [
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

function Login() {

    const API_URL = import.meta.env.VITE_API_URL;
    console.log(API_URL);
    
    const navigate = useNavigate()
    const {data, inputHandler} = useForm({email: "", password: ""})

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")


    function handleValidation(){
         
        if (data.email === "" ||  data.password === "") return setResponse("All fileds are required")

        async function checkUser() {
            
            setLoading(true)

            try {
                
                let response = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })

                let responseData = await response.json();

                if (responseData.status === true) {
                    localStorage.setItem("token", responseData.token)
                    setResponse("login successfully")
                    navigate("/dashboard")
                }

               else {
                  setResponse(responseData.message)
               }

            } 
            
            catch (error) {
                setResponse(error.message);
            }

            finally{
                setLoading(false)
            }
        }

        checkUser()
        
    
    }
    
    if (loading) {
        return <Loader/>
    }

    return (

        <main className="login-page">

    {response && (
        <ResponsePopup
            message={response}
            closePopup={() => setResponse(null)}
        />
    )}

    <div className="login-card">

        <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Login to your account to continue</p>
        </div>

        <div className="login-form">

            {fields.map((field) => (
                <FormInput
                    key={field.name}
                    {...field}
                    value={data[field.name]}
                    updateValue={inputHandler}
                />
            ))}

            <button
                className="login-button"
                type="submit"
                onClick={handleValidation}
            >
                Login
            </button>

        </div>


        <p
            className="forgot-password"
            onClick={() => navigate("/forget-password")}
        >
            Forgot Password?
        </p>

        <p className="signup-text">
            Don't have an account?
            <span onClick={() => navigate("/")}>
                {" "}Sign Up
            </span>
        </p>

    </div>

</main>
    );
}

export default Login;