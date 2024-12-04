import React from "react";
import "./PlanCard.css";

type PlanCardProps = {
  title: string;
  price: string;
  details: string[];
  onPurchase: () => void;
};

const PlanCard: React.FC<PlanCardProps> = ({ title, price, details, onPurchase }) => {
  return (
    <div className="card plan-card">
      <h5 className="plan-title">{title}</h5>
      <p className="plan-price">{price}</p>
      <ul className="plan-details">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <button className="btn btn-primary purchase-btn" onClick={onPurchase}>
        Purchase Plan &gt;
      </button>
      <p className="terms">Terms & conditions apply</p>
    </div>
  );
};

export default PlanCard;
