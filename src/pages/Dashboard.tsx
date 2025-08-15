import React from "react";
import "../styles/dashboard.scss";
import unionLogo from "../assets/Union.png";
import profilePic from "../assets/DP.png";

function Dashboard() {
  // Icons for sidebar menu items
  const renderIcon = (name: string) => {
    // This is a placeholder function for icons
    // In a real application, you'd import and use actual SVG icons
    return (
      <div className="dashboard__sidebar-item-icon">
        {/* Icon placeholder */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="16"
            height="16"
            rx="4"
            fill="#213F7D"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="dashboard__navbar">
        {/* Logo */}
        <div className="dashboard__navbar-logo">
          <div className="dashboard__navbar-logo-icon">
            <img src={unionLogo} alt="Logo" />
          </div>
          <span className="dashboard__navbar-logo-text">lendsqr</span>
        </div>

        {/* Search */}
        <div className="dashboard__navbar-search">
          <input type="text" placeholder="Search for anything" />
          <button>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 9.33333C7.54448 9.33333 9.33333 7.54448 9.33333 5.33333C9.33333 3.12218 7.54448 1.33333 5.33333 1.33333C3.12218 1.33333 1.33333 3.12218 1.33333 5.33333C1.33333 7.54448 3.12218 9.33333 5.33333 9.33333Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.6667 12.6667L8 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right section */}
        <div className="dashboard__navbar-right">
          <a href="#" className="dashboard__navbar-right-link">
            Docs
          </a>

          <div className="dashboard__navbar-right-notification">
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 24C12.6569 24 14 22.6569 14 21H8C8 22.6569 9.34315 24 11 24Z"
                fill="#213F7D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 3C7.13401 3 4 6.13401 4 10V17H18V10C18 6.13401 14.866 3 11 3ZM2 10C2 5.02944 6.02944 1 11 1C15.9706 1 20 5.02944 20 10V19H2V10Z"
                fill="#213F7D"
              />
              <circle cx="19" cy="3" r="3" fill="#E02B2B" />
            </svg>
          </div>

          <div className="dashboard__navbar-right-profile">
            <div className="dashboard__navbar-right-profile-avatar">
              <img src={profilePic} alt="Profile" />
            </div>
            <span className="dashboard__navbar-right-profile-name">
              Adedeji
            </span>
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.39229 4.0516C3.72823 4.42504 4.27511 4.42192 4.60791 4.0516L7.48291 0.856996C7.81885 0.484336 7.68525 0.181995 7.18447 0.181995H0.815667C0.314887 0.181995 0.183627 0.487456 0.517227 0.856996L3.39229 4.0516Z"
                fill="#213F7D"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="dashboard__main">
        {/* Sidebar */}
        <aside className="dashboard__sidebar">
          {/* Organization Switcher */}
          <div className="dashboard__sidebar-select">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12.4444L10.6667 8L6 3.55556"
                stroke="#213F7D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Switch Organization</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M10.5938 1.57L6.29375 5.87C6.13125 6.0325 5.86875 6.0325 5.70625 5.87L1.40625 1.57"
                stroke="#213F7D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Dashboard link */}
          <div className="dashboard__sidebar-item">
            {renderIcon("dashboard")}
            <span>Dashboard</span>
          </div>

          {/* CUSTOMERS section */}
          <div className="dashboard__sidebar-header">CUSTOMERS</div>
          <div className="dashboard__sidebar-item active">
            {renderIcon("users")}
            <span>Users</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("guarantors")}
            <span>Guarantors</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("loans")}
            <span>Loans</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("decision-models")}
            <span>Decision Models</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("savings")}
            <span>Savings</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("loan-requests")}
            <span>Loan Requests</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("whitelist")}
            <span>Whitelist</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("karma")}
            <span>Karma</span>
          </div>

          {/* BUSINESSES section */}
          <div className="dashboard__sidebar-header">BUSINESSES</div>
          <div className="dashboard__sidebar-item">
            {renderIcon("organization")}
            <span>Organization</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("loan-products")}
            <span>Loan Products</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("savings-products")}
            <span>Savings Products</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("fees")}
            <span>Fees and Charges</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("transactions")}
            <span>Transactions</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("services")}
            <span>Services</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("service-account")}
            <span>Service Account</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("settlements")}
            <span>Settlements</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("reports")}
            <span>Reports</span>
          </div>

          {/* SETTINGS section */}
          <div className="dashboard__sidebar-header">SETTINGS</div>
          <div className="dashboard__sidebar-item">
            {renderIcon("preferences")}
            <span>Preferences</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("fees-pricing")}
            <span>Fees and Pricing</span>
          </div>
          <div className="dashboard__sidebar-item">
            {renderIcon("audit-logs")}
            <span>Audit Logs</span>
          </div>
        </aside>

        {/* Main content */}
        <main className="dashboard__content">
          <h1>Dashboard Overview</h1>
          <p>
            Welcome to your dashboard. This is where you'll see statistics and
            manage your account.
          </p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
