import React from 'react';
import { FaTimes } from 'react-icons/fa';

type PopupProps = {
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };
  return (
    <div className="popup-overlay" onClick={handleBackdropClick}>
      <div className="popup-content">
        {/* Header Section */}
        <div className="popup-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img
              src="https://lightningproxies.net/assets/images/announcement.svg"
              alt="Announcement Icon"
              className="popup-icon"
            />
            <h5 className="popup-title mb-0">Residential State/City Targeting</h5>
          </div>
          <button className="btn close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Content Section */}
        <div className="popup-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src="https://lightningproxies.net/assets/images/square.svg"
              alt="Warning Icon"
              className="warning-icon"
            />
            <p className="mb-0">Residential State/City Targeting Issue Resolved.</p>
          </div>
          <p>
            We are happy to announce that State/City targeting issue has been resolved and now you
            can continue as before.
          </p>
          <p>Thank you for your understanding!</p>
          <img
            src="https://lightningproxies.net/assets/images/signature.svg"
            alt="Team LightningProxies"
            className="signature"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
