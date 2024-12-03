import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaFilter } from "react-icons/fa";
import "./plansection.css";

type Plan = {
  id: string;
  name: string;
  dataLeft: number; // in GB
  totalData: number; // in GB
  expires: string; // Expiry date as a string
};

const PlanSection: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Plan[]>("/api/use-plan"); // Fetch plans from the API
        console.log("Fetched Plans:", response.data); // Debugging log
        setPlans(response.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch plans. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="plan-section container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="section-title">Your Active Plans</h5>
          <p className="section-subtitle">
            Generate proxies with just a click of a button
          </p>
        </div>
        <button className="btn btn-light filter-btn">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Gift Code Section */}
      <div className="gift-code-container d-flex align-items-center mb-4">
        <input
          type="text"
          className="gift-code-input form-control me-2"
          placeholder="Enter gift code"
        />
        <button className="btn btn-primary gift-code-btn">Get your gift 🎁</button>
        <span className="gift-help-text ms-3">
          How can I get a gift?{" "}
          <a href="#" className="gift-help-link text-decoration-underline">
            <FaBook />
          </a>
        </span>
      </div>

      {/* Display Loading, Error, or No Plans */}
      {loading && <p>Loading plans...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && plans.length === 0 && (
        <p>No active plans available.</p>
      )}

      {/* Plan Cards */}
      {plans.map((plan) => (
        <div key={plan.id} className="plan-card d-flex align-items-center mb-4">
          <div className="progress-circle-container">
            <div className="progress-circle bg-primary text-white">
              <strong>
                {((plan.dataLeft / plan.totalData) * 100).toFixed(0)}%
              </strong>
            </div>
          </div>
          <div className="plan-details ms-3 flex-grow-1">
            <h6 className="plan-title">{plan.name}</h6>
            <p className="plan-description">
              Ideal proxies for any use case & purpose. By accessing our
              10M+ IP pool non-subnet linked, bans and blocks are non-existent.
            </p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <p className="plan-meta">
                  <strong>Plan ID:</strong> {plan.id}
                </p>
                <p className="plan-meta">
                  <strong>Data Left:</strong>{" "}
                  {plan.dataLeft.toFixed(2)} GB / {plan.totalData.toFixed(2)} GB
                </p>
                <p className="plan-meta">
                  <strong>Expires:</strong> {plan.expires}
                </p>
              </div>
              <button className="btn btn-outline-primary btn-generate-proxy">
                Generate Proxy →
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PlanSection;
