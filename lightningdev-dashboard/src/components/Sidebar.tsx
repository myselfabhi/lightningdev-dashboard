import React from "react";

const Sidebar: React.FC = () => {
    return (
        <>
            {/* Sidebar for larger screens */}
            <div className="sidebar d-none d-md-block bg-light">
                <ul className="list-group">
                    <li className="list-group-item"><a href="#">Dashboard</a></li>
                    <li className="list-group-item"><a href="#">Purchase Plan</a></li>
                    <li className="list-group-item"><a href="#">Deposit Balance</a></li>
                    <li className="list-group-item"><a href="#">Invoices</a></li>
                    <li className="list-group-item"><a href="#">Proxy Usage Log</a></li>
                    <li className="list-group-item"><a href="#">Sub-Users</a></li>
                    <li className="list-group-item"><a href="#">Referral</a></li>
                </ul>
            </div>

            {/* Sidebar for mobile */}
            <div className="offcanvas offcanvas-start" id="offcanvasSidebar" tabIndex={-1} aria-labelledby="offcanvasSidebarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group">
                        <li className="list-group-item"><a href="#">Dashboard</a></li>
                        <li className="list-group-item"><a href="#">Purchase Plan</a></li>
                        <li className="list-group-item"><a href="#">Deposit Balance</a></li>
                        <li className="list-group-item"><a href="#">Invoices</a></li>
                        <li className="list-group-item"><a href="#">Proxy Usage Log</a></li>
                        <li className="list-group-item"><a href="#">Sub-Users</a></li>
                        <li className="list-group-item"><a href="#">Referral</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
