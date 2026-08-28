
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import ResponsePopup from "../Components/ResponsePopup";

function Dashboard() {

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null)
    const [data, setData] = useState(null)

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) navigate("/login")

        async function getUser() {

            setLoading(true)

            try {

                let response = await fetch(`${API_URL}/api/user`, {
                    method: "GET",

                    headers: { "Authorization": `Bearer ${token}` },
                })

                let data = await response.json()

                console.log(data);
                
                if(data.status === true) return setData(data.data)

                else setResponse(data.message)
            }

            catch (error) {
              setResponse("Something went wrong. Please check your connection and try again.")
            }

            finally {
               setLoading(false)
            }
        }

        getUser()

    }, [])

    if(loading) return <Loader/>
   
   return ( 
        data ? 

        <main className="dashboard-page">

             {response ? <ResponsePopup message={response} closePopup={() => setResponse(false)}/> : ""}


            <header className="dashboard-header">

                <div className="brand">
                    <div className="brand-icon">A</div>

                    <span>Account</span>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>

            </header>

            <section className="dashboard-content">

                <div className="welcome-section">

                    <p className="welcome-label">
                        Dashboard
                    </p>

                    <h1>
                        Welcome, {data.firstName}
                    </h1>

                    <p>
                        Manage your account information and settings.
                    </p>

                </div>

                <div className="user-card">

                    <div className="card-header">

                        <div>
                            <h2>Profile Information</h2>

                            <p>
                                Your account details
                            </p>
                        </div>

                        <div className="profile-avatar">
                            {data?.firstName?.charAt(0).toUpperCase()}
                        </div>

                    </div>


                    <div className="user-details">

                        <div className="detail-item">

                            <span className="detail-label">
                                First Name
                            </span>

                            <span className="detail-value">
                                {data?.firstName}
                            </span>

                        </div>


                        <div className="detail-item">

                            <span className="detail-label">
                                Last Name
                            </span>

                            <span className="detail-value">
                                {data?.lastName}
                            </span>

                        </div>


                        <div className="detail-item">

                            <span className="detail-label">
                                Email Address
                            </span>

                            <span className="detail-value">
                                {data?.email}
                            </span>

                        </div>

                    </div>

                </div>


                <div className="account-status">

                    <div className="status-icon">
                        ✓
                    </div>

                    <div>
                        <h3>Account Verified</h3>

                        <p>
                            Your account is active and verified.
                        </p>
                    </div>

                </div>

                <div className="quick-section">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <button>
                            Profile Settings
                        </button>

                        <button>
                            Change Password
                        </button>

                    </div>

                </div>

            </section>

        </main>

        :

        ""

   )
    
}

export default Dashboard;