import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "../styles/dashboard.css";

const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });

type UserInfo = {
    username: string;
    bandwidthUsed: number; // in bytes
    balance: number;       // in dollars
};

const Dashboard: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        axios
            .get<UserInfo>("/api/user-info")
            .then((response) => {
                setUserInfo(response.data);
                if (response.data.balance === 0) setShowToast(true);
            })
            .catch((error) => console.error("Error fetching user info:", error));
    }, []);

    const fetchUserInfo = () => {
        axios
            .get<UserInfo>("/api/user-info")
            .then((response) => setUserInfo(response.data))
            .catch((error) => console.error("Error fetching user info:", error));
    };
    
    const usePlan = () => {
        axios
            .post("/api/use-plan", { usageAmount: 1 })
            .then((response) => {
                if (response.data.success) {
                    console.log("Before Use Plan State:", userInfo);
    
                    setUserInfo((prev) => ({
                        ...prev!,
                        balance: response.data.balance,
                        bandwidthUsed: response.data.bandwidthUsed,
                    }));
    
                    console.log("After Use Plan State:", response.data);
    
                   
                    if (response.data.balance === 0) {
                        setShowToast(true);
                    }
                } else {
                    console.log("API Error:", response.data.message);
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                if (error.response?.status === 400) {
                    alert("Your balance is insufficient. Please renew your plan.");
                    setShowToast(true);
                } else {
                    console.error("Error using plan:", error);
                    alert("An unexpected error occurred. Please try again later.");
                }
            });
    };
    
    
    
    const addBalance = () => {
        axios
            .post("/api/add-balance", { amount: 10 })
            .then((response) => {
                if (response.data.success) {
                    console.log("Before Add Balance State:", userInfo);
    
                    setUserInfo((prev) => ({
                        ...prev!,
                        balance: response.data.newBalance,
                    }));
    
                    console.log("After Add Balance State:", response.data);
    
                   
                    if (response.data.newBalance > 0) {
                        setShowToast(false);
                    }
                }
            })
            .catch((error) => console.error("Error adding balance:", error));
    };
    
    
    const renewPlan = () => {
        axios
            .post("/api/renew-plan")
            .then((response) => {
                if (response.data.success) {
                    console.log("Before Renew Plan State:", userInfo);
    
                    setUserInfo({
                        username: userInfo?.username || "User",
                        balance: response.data.balance,
                        bandwidthUsed: response.data.bandwidthUsed, 
                    });
    
                    console.log("After Renew Plan State:", response.data);
    
                  
                    setShowToast(false);
                }
            })
            .catch((error) => console.error("Error renewing plan:", error));
    };
    
    
    
    
    
    
    
    

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="content">
                <button
                    className="btn btn-primary d-md-none mb-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSidebar"
                    aria-controls="offcanvasSidebar"
                >
                    Menu
                </button>

                <h1 className="dashboard-header">Welcome {userInfo.username}</h1>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5>Active Balance</h5>
                                <p>${userInfo.balance.toFixed(2)}</p>
                                <button className="btn btn-primary" onClick={addBalance}>
                                    Add Balance
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5>Data Left</h5>
                                <p>{(userInfo.bandwidthUsed / 1e9).toFixed(2)} GB</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5>Active Plans</h5>
                                <p>1</p>
                                <button className="btn btn-success" onClick={renewPlan}>
                                    Renew Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card text-center">
                    <div className="card-body">
                        <h5>Simulate Usage</h5>
                        <button className="btn btn-danger" onClick={usePlan}>
                            Use $1 of Plan
                        </button>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className="toast show align-items-center text-bg-warning border-0">
                        <div className="d-flex">
                            <div className="toast-body">
                                Your plan has expired. Please renew your plan to continue using the service.
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setShowToast(false)}
                            ></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
