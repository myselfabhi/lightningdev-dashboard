import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

type UserInfo = {
    username: string;
    bandwidthUsed: number; // in bytes
    balance: number;       // in GB
};

const Dashboard: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Fetch User Info
        axios
            .get<UserInfo>("/api/user-info")
            .then((response) => {
                setUserInfo(response.data);
                if (response.data.balance === 0) setShowToast(true); // Show toast if balance is zero
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="container-fluid dashboard-container">
            {/* Sidebar */}
            <div className="d-flex">
                <button
                    className="btn btn-primary d-md-none mb-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSidebar"
                    aria-controls="offcanvasSidebar"
                >
                    Menu
                </button>
                <div
                    className="offcanvas offcanvas-start"
                    id="offcanvasSidebar"
                    tabIndex={-1}
                    aria-labelledby="offcanvasSidebarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 id="offcanvasSidebarLabel">Menu</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-group">
                            <li className="list-group-item">Dashboard</li>
                            <li className="list-group-item">Purchase Plan</li>
                            <li className="list-group-item">Invoices</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <h1 className="dashboard-header">Welcome {userInfo?.username || "User"}</h1>

            <div className="row mb-4">
                {/* Active Balance */}
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Active Balance</h5>
                            <p>${userInfo?.balance.toFixed(2) || "0.00"}</p>
                            <button className="btn btn-primary">Add Balance</button>
                        </div>
                    </div>
                </div>

                {/* Data Left */}
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Data Left</h5>
                            <p>{((userInfo?.bandwidthUsed || 0) / 1e9).toFixed(2)} GB</p>
                        </div>
                    </div>
                </div>

                {/* Active Plans */}
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Active Plans</h5>
                            <p>{userInfo ? "1" : "0"}</p>
                            <button className="btn btn-success">Purchase Plan</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Plan Details */}
            <div className="card">
                <div className="card-body">
                    <h5>Your Active Plan</h5>
                    <p>Plan ID: 674cb0b5f674e52455084591</p>
                    <p>Data Left: {((userInfo?.bandwidthUsed || 0) / 1e9).toFixed(2)} GB</p>
                    <p>Expires: Jan 1, 2025</p>
                    <button className="btn btn-warning">Renew Plan</button>
                </div>
            </div>

            {/* Toast Notification */}
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
