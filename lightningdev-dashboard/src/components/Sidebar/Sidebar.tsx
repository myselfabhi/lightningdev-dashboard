import React from "react";
import {
  FaHome,
  FaCartPlus,
  FaWallet,
  FaFileInvoice,
  FaServer,
  FaUsers,
  FaQuestionCircle,
  FaBook,
  FaTelegramPlane,
  FaDiscord,
  FaRegNewspaper,
} from "react-icons/fa";
import Link from "next/link";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-wrapper">
      {/* Logo Section */}
      <div className="logo-box">
        <img src="/logo.svg" alt="Lightning Proxies Logo" className="logo" />
      </div>

      {/* Main Menu */}
      <div className="menu-set">
        <h6 className="menu-heading">MAIN MENU</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/">
              <div className="menu-link">
                <FaHome size={18} className="menu-icon" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/purchase-plan">
              <div className="menu-link">
                <FaCartPlus size={18} className="menu-icon" />
                <span>Purchase Plan</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/deposit-balance">
              <div className="menu-link">
                <FaWallet size={18} className="menu-icon" />
                <span>Deposit Balance</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/invoices">
              <div className="menu-link">
                <FaFileInvoice size={18} className="menu-icon" />
                <span>Invoices</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/proxy-usage-log">
              <div className="menu-link">
                <FaServer size={18} className="menu-icon" />
                <span>Proxy Usage Log</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/sub-users">
              <div className="menu-link">
                <FaUsers size={18} className="menu-icon" />
                <span>Sub-Users</span>
                <span className="badge badge-new">New</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Referrals */}
      <div className="menu-set">
        <h6 className="menu-heading">REFERRALS</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/referrals">
              <div className="menu-link">
                <FaUsers size={18} className="menu-icon" />
                <span>Referral</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div className="menu-set">
        <h6 className="menu-heading">SUPPORT</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/faqs">
              <div className="menu-link">
                <FaQuestionCircle size={18} className="menu-icon" />
                <span>FAQs</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/proxy-guide">
              <div className="menu-link">
                <FaBook size={18} className="menu-icon" />
                <span>Proxy Guide</span>
                <span className="badge badge-updated">Updated</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Reseller */}
      <div className="menu-set">
        <h6 className="menu-heading">RESELLER</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/reseller-dashboard">
              <div className="menu-link">
                <FaRegNewspaper size={18} className="menu-icon" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/api-docs">
              <div className="menu-link">
                <FaRegNewspaper size={18} className="menu-icon" />
                <span>API Docs</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Connect With Us */}
      <div className="menu-set">
        <h6 className="menu-heading">CONNECT WITH US</h6>
        <ul className="menu">
          <li className="menu-item">
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <FaDiscord size={18} className="menu-icon" />
              <span>Join Discord Server</span>
            </a>
          </li>
          <li className="menu-item">
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <FaTelegramPlane size={18} className="menu-icon" />
              <span>Join Telegram Channel</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Extension Section */}
      <div className="extension-section">
        <div className="extension-header">
          <img src="/logo-extension.svg" alt="Extension Logo" />
          <span>LightningProxies Extension</span>
          <span className="badge badge-new">NEW</span>
        </div>
        <p className="extension-description">
          A proxy extension enhances online privacy by routing traffic through
          an intermediary server.
        </p>
        <button className="btn btn-primary extension-btn">Add to Chrome</button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <ul className="footer-links">
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
        <ul className="social-icons">
          <li>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane size={20} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
