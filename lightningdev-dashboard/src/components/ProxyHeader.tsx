import React from "react";
import "./ProxyHeader.css";

const ProxyHeader: React.FC = () => {
  return (
    <div className="proxy-header d-flex justify-content-between align-items-center mb-4">
      <div className="plan-info">
        <p>Plan ID: 672576d20a6c581e87249045</p>
        <h4>Current Plan: Residential 5GB</h4>
        <p>Plan Expiry: 31 Jun 2025 03:52</p>
        <button className="btn btn-primary me-2">Plan Settings</button>
        <button className="btn btn-outline-secondary">Auto Renew</button>
      </div>
      <div className="bandwidth-info">
        <h4>Total Bandwidth: 5 GB</h4>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "76%" }}
            aria-valuenow={76}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            76%
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p>Used Bandwidth: 1.2 GB</p>
          <p>Remaining Bandwidth: 3.8 GB</p>
        </div>
        <div className="add-bandwidth">
          <input type="number" className="form-control" placeholder="0" />
          <button className="btn btn-success ms-2">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProxyHeader;
