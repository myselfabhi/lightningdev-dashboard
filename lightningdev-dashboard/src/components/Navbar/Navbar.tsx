import React from "react";
import "./navbar.css";

const Navbar: React.FC = () => {
    return (
        <div className="container-fluid navbar-wrapper">
            <nav className="navbar-container d-flex align-items-center justify-content-between px-3 py-6">
                {/* Left Section */}
                <div className="d-flex align-items-center">
                    <div className="home-icon">
                        <i className="fas fa-home"></i>
                    </div>
                </div>

                {/* Right Section */}
                <div className="d-flex align-items-center">
                    {/* Theme Toggle */}
                    <div className="theme-toggle me-3">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>

                    {/* Balance */}
                    <div className="balance-container me-3">
                        <button className="btn btn-outline-success">
                            <i className="fas fa-wallet me-2"></i> Balance: $0
                        </button>
                    </div>

                    {/* Date & Time */}
                    <div className="date-time me-3">
                        <i className="fas fa-calendar-alt me-2"></i> Dec 2, 2024 | 23:51 PM
                    </div>

                    {/* User Profile */}
                    <div className="user-profile me-3">
                        <button className="btn btn-primary">
                            <i className="fas fa-user me-2"></i> Abhinav_xLWnFL
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="logout-icon">
                        <button className="btn btn-outline-danger">
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
