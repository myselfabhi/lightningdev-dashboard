import React from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import "./PlanCard.module.css";

type PlanCardProps = {
  title: string;
  price: string;
  details: string[];
  onPurchase: () => void;
};

const PlanCard: React.FC<PlanCardProps> = ({ title, price, details }) => {
  const router = useRouter();

  const handlePurchase = () => {
    router.push({
      pathname: "/checkout",
      query: { title, price }, // Pass plan details as query parameters
    });
  };

  return (
    <div className="card plan-card">
      <h5 className="plan-title">{title}</h5>
      <p className="plan-price">{price}</p>
      <ul className="plan-details">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <button className="btn btn-primary purchase-btn" onClick={handlePurchase}>
        Purchase Plan &gt;
      </button>
      <p className="terms">Terms & conditions apply</p>
    </div>
  );
};

export default PlanCard;
