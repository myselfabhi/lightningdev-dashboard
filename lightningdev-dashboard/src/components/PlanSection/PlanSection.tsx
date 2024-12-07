import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaFilter } from "react-icons/fa";
import "./plansection.css";
import { useRouter } from "next/router";

type Plan = {
  id: string;
  name: string;
  dataLeft: number; // in GB
  totalData: number; // in GB
  expires: string; // Expiry date as a string
};

const PlanSection: React.FC = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Plan[]>("/api/use-plan");
        setPlans(response.data);
      } catch (error) {
        setError("Failed to fetch plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleGenerateProxy = (planId: string) => {
    router.push(`/generate-proxy?planId=${planId}`);
  };

  return (
    <section className="plan-section container">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="section-title">Your Active Plans</h5>
          <p className="section-subtitle">
            Generate proxies with just a click of a button
          </p>
        </div>

      </div>

      {/* Gift Code Section */}
      <div className="d-flex align-items-center justify-content-between mb-4 gift-code-wrapper">
  {/* Left Section */}
  <div className="d-flex align-items-center">
    <input
      type="text"
      className="gift-code-input form-control me-2"
      placeholder="Enter gift code"
    />
    <button className="btn btn-primary gift-code-btn">Get your gift 🎁</button>
    <span className="gift-help-text ms-3">
      How can I get a gift?{" "}
      <a href="#" className="gift-help-link">
        <FaBook />
      </a>
    </span>
  </div>

  {/* Right Section */}
  <button className="btn btn-light filter-btn">
    <FaFilter />
  </button>
</div>

      {/* Display Loading, Error, or No Plans */}
      {loading && <p>Loading plans...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && plans.length === 0 && (
        <p>No active plans available.</p>
      )}

      {/* Plan Cards */}
      {plans.map((plan) => (
  <div key={plan.id} className="plan-card mb-4">
    <div className="d-flex align-items-center">
      {/* Progress Circle */}
      <div className="progress-circle-container">
        <div className="progress-circle bg-primary text-white">
          <strong>
            {((plan.dataLeft / plan.totalData) * 100).toFixed(0)}%
          </strong>
        </div>
      </div>

      {/* Plan Details */}
      <div className="plan-details ms-3 flex-grow-1">
        <h6 className="plan-title">{plan.name}</h6>
        <p className="plan-description">
          Ideal proxies for any use case & purpose. By accessing our
          10M+ IP pool non-subnet linked, bans and blocks are non-existent.
        </p>
      </div>

      {/* Total Data */}
      <div className="plan-data">
        <h6>{plan.totalData.toFixed(2)} GB</h6>
      </div>
    </div>
    <hr />
    <div className="plan-meta-container">
      {/* Plan Meta Details */}
      <div className="plan-meta-item">
        <strong>Plan ID:</strong>
        <span>{plan.id}</span>
      </div>
      <div className="plan-meta-item">
        <strong>Data Left:</strong>
        <span>
          {plan.dataLeft.toFixed(2)} GB / {plan.totalData.toFixed(2)} GB
        </span>
      </div>
      <div className="plan-meta-item">
        <strong>Expires:</strong>
        <span>{plan.expires}</span>
      </div>
      <button
        className="btn btn-outline-primary btn-generate-proxy"
        onClick={() => handleGenerateProxy(plan.id)}
      >
        Generate Proxy →
      </button>
    </div>
  </div>
))}

    </section>
  );
};

export default PlanSection;
