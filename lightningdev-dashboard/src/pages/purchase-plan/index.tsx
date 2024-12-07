import React, { useState } from "react";
import Layout from "../../components/Layout/Layout"; // Adjust path if needed
import PlanCard from "../../components/PlanCard"; // Adjust path if needed
import "./PurchasePlan.css";

const residentialPlans = [
  { title: "Residential 1GB", price: "$4.50", details: ["10M+ Real Residential Peers", "IP & User:Pass Authentication", "Country, State, City & ISP Targeting", "Rotating & Sticky Sessions", "Unlimited Concurrent Connections", "HTTP/SOCKS5 Protocol Supported"] },
  { title: "Residential 5GB", price: "$20.00", details: ["10M+ Real Residential Peers", "IP & User:Pass Authentication", "Country, State, City & ISP Targeting", "Rotating & Sticky Sessions", "Unlimited Concurrent Connections", "HTTP/SOCKS5 Protocol Supported"] },
];

const bandwidthPlans = [
  { title: "Residential Day", price: "$300.00", details: ["2M+ Real Residential Peers", "IP & User:Pass Authentication", "Continent Targeting", "Rotating & Sticky Sessions", "Unlimited Bandwidth", "Unlimited Concurrent Connections", "HTTP/SOCKS5 Protocol Supported"] },
  { title: "Residential Week", price: "$1100.00", details: ["2M+ Real Residential Peers", "IP & User:Pass Authentication", "Continent Targeting", "Rotating & Sticky Sessions", "Unlimited Bandwidth", "Unlimited Concurrent Connections", "HTTP/SOCKS5 Protocol Supported"] },
];

const PurchasePlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Residential" | "Bandwidth">("Residential");

  const handlePurchase = (planTitle: string) => {
    console.log(`Purchased plan: ${planTitle}`);
    alert(`You have purchased the ${planTitle}`);
  };

  const renderCards = (plans: any[]) => {
    return plans.map((plan, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <PlanCard
          title={plan.title}
          price={plan.price}
          details={plan.details}
          onPurchase={() => handlePurchase(plan.title)}
        />
      </div>
    ));
  };

  return (
    <Layout>
      <div className="purchase-plan-page">
        <div className="header d-flex justify-content-between align-items-center">
          <h4>Purchase Plan</h4>
          <div className="tabs">
            <button
              className={`btn ${activeTab === "Residential" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("Residential")}
            >
              Residential
            </button>
            <button
              className={`btn ${activeTab === "Bandwidth" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("Bandwidth")}
            >
              Bandwidth
            </button>
          </div>
        </div>
        <div className="row mt-4">
  {activeTab === "Residential" && renderCards(residentialPlans)}
  {activeTab === "Bandwidth" && renderCards(bandwidthPlans)}
</div>

      </div>
    </Layout>
  );
};

export default PurchasePlan;
