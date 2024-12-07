import React from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaServer,
  FaUser,
  FaShieldAlt,
  FaEnvelope,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import "./cardssection.css";

type CardsSectionProps = {
  addBalance: () => Promise<void>;
  renewPlan: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  balance: number;
  activePlans: number;
  dataLeft: number;
  totalDataPurchased: number;
  username: string;
  userId: string;
};

const CardsSection: React.FC<CardsSectionProps> = ({
  addBalance,
  renewPlan,
  balance,
  activePlans,
  dataLeft,
  totalDataPurchased,
  username,
  userId,
}) => {
  // const dataLeftPercentage =
  //   totalDataPurchased > 0 ? ((dataLeft / totalDataPurchased) * 100).toFixed(0) : "0";

  return (
    <div className="container cards-section">
      {/* Welcome Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Welcome {username}</h4>
          <p className="text-muted">Welcome back, were glad to have you.</p>
        </div>
        <button className="btn btn-light shadow-sm read-more-btn">
          <FaShieldAlt className="me-2" /> Residential State/City Targeting{" "}
          <span>Read More &gt;</span>
        </button>
      </div>

      {/* Cards Section */}
      <div className="row gx-4 gy-4">
        {/* Active Balance */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card custom-card text-start">
            <div className="icon-style">
              <FaDollarSign />
            </div>
            <h5 className="card-title">Active Balance</h5>
            <h4 className="card-value">${balance.toFixed(2)}</h4>
            <button
              className="btn btn-outline-success  "
              onClick={addBalance}
            >
              Add Balance
            </button>
            <hr />
            <p className="text-muted">Total Balance Spent: $0.00</p>
          </div>
        </div>

        {/* Active Plans */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card custom-card text-start">
            <div className="icon-style">
              <FaShoppingCart />
            </div>
            <h5 className="card-title">Active Plans</h5>
            <h4 className="card-value">{activePlans}</h4>
            <button
              className="btn btn-outline-primary"
              onClick={renewPlan}
            >
              Purchase Plan
            </button>
            <hr />
            <p className="text-muted">Total Purchased Plans: {activePlans}</p>
          </div>
        </div>

        {/* Data Left */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card custom-card text-start">
            <div className="icon-style">
              <FaServer />
            </div>
            <h5 className="card-title">Data Left</h5>
            <h4 className="card-value">{dataLeft.toFixed(2)} GB</h4>
            {/* <div className="progress-circle mt-2">
              <strong>{dataLeftPercentage}%</strong>
            </div> */}
            <hr />
            <p className="text-muted">
              Total Data Purchased: {totalDataPurchased.toFixed(2)} GB
            </p>
          </div>
        </div>

        {/* User Profile */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card custom-card text-center">
            <div className="icon-style-4">
              <FaUser />
            </div>
            <h5 className="card-title">{username}</h5>
            <p className="text-muted">{userId}</p>
            <div className="d-flex justify-content-center gap-3 mt-6">
              <button className="btn btn-outline-success-icon" title="Shield">
                <FaShieldAlt />
              </button>
              <button className="btn btn-outline-primary-icon" title="Email">
                <FaEnvelope />
              </button>
              <button className="btn btn-outline-secondary" title="Info">
                <FaInfoCircle />
              </button>
              <button className="btn btn-outline-danger" title="Delete">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
