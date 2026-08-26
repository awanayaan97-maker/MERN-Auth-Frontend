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

    const navigate = useNavigate()
    const {data, inputHandler} = useForm({email: "", password: ""})

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")


    function handleValidation(){
         console.log(data);
         
        if (data.email === "" ||  data.password === "") {
            setResponse("All fileds are required")
            return
        }

        async function checkUser() {
            
            setLoading(true)

            try {
                
                let response = await fetch(`http://localhost:5000/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })

                let responseData = await response.json();

                if (responseData.statusCode === 200) {
                    localStorage.setItem("token", responseData.token)
                    setResponse("login successfully")
                    navigate("/dashboard")
                }

                if (responseData.statusCode === 404) return setResponse(responseData.message)

                if (responseData.statusCode === 500) return setResponse("Internel server error")

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