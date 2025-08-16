import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.module.scss";

interface SidebarProps {
  toggleSidebar: () => void;
  activeItem?: string;
  isCloseButtonVisible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleSidebar,
  activeItem = "users",
  isCloseButtonVisible = true,
}) => {
  const navigate = useNavigate();
  const icons: Record<string, string> = {
    dashboard: "🏠",
    users: "👥",
    guarantors: "🤝",
    loans: "💰",
    "decision-models": "📊",
    savings: "💵",
    "loan-requests": "📄",
    whitelist: "✅",
    karma: "🌟",
    organization: "🏢",
    "loan-products": "📦",
    "savings-products": "💳",
    fees: "💸",
    transactions: "🔄",
    services: "🛠️",
    "service-account": "🔐",
    settlements: "⚖️",
    reports: "📑",
    preferences: "⚙️",
    "fees-pricing": "💲",
    "audit-logs": "📝",
    "system-messages": "📨",
    logout: "🚪",
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const renderIcon = (name: string) => {
    return (
      <div className="dashboard__sidebar-item-icon">
        <span>{icons[name] || "📋"}</span>
      </div>
    );
  };

  return (
    <aside className="dashboard__sidebar">
      <button
        className={`dashboard__sidebar-close ${!isCloseButtonVisible ? "hidden" : ""}`}
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        ✖
      </button>

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

      <div
        className={`dashboard__sidebar-item ${activeItem === "dashboard" ? "active" : ""}`}
      >
        {renderIcon("dashboard")}
        <span>Dashboard</span>
      </div>

      <div className="dashboard__sidebar-header">CUSTOMERS</div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "users" ? "active" : ""}`}
      >
        {renderIcon("users")}
        <span>Users</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "guarantors" ? "active" : ""}`}
      >
        {renderIcon("guarantors")}
        <span>Guarantors</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "loans" ? "active" : ""}`}
      >
        {renderIcon("loans")}
        <span>Loans</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "decision-models" ? "active" : ""}`}
      >
        {renderIcon("decision-models")}
        <span>Decision Models</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "savings" ? "active" : ""}`}
      >
        {renderIcon("savings")}
        <span>Savings</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "loan-requests" ? "active" : ""}`}
      >
        {renderIcon("loan-requests")}
        <span>Loan Requests</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "whitelist" ? "active" : ""}`}
      >
        {renderIcon("whitelist")}
        <span>Whitelist</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "karma" ? "active" : ""}`}
      >
        {renderIcon("karma")}
        <span>Karma</span>
      </div>

      <div className="dashboard__sidebar-header">BUSINESSES</div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "organization" ? "active" : ""}`}
      >
        {renderIcon("organization")}
        <span>Organization</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "loan-products" ? "active" : ""}`}
      >
        {renderIcon("loan-products")}
        <span>Loan Products</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "savings-products" ? "active" : ""}`}
      >
        {renderIcon("savings-products")}
        <span>Savings Products</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "fees" ? "active" : ""}`}
      >
        {renderIcon("fees")}
        <span>Fees and Charges</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "transactions" ? "active" : ""}`}
      >
        {renderIcon("transactions")}
        <span>Transactions</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "services" ? "active" : ""}`}
      >
        {renderIcon("services")}
        <span>Services</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "service-account" ? "active" : ""}`}
      >
        {renderIcon("service-account")}
        <span>Service Account</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "settlements" ? "active" : ""}`}
      >
        {renderIcon("settlements")}
        <span>Settlements</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "reports" ? "active" : ""}`}
      >
        {renderIcon("reports")}
        <span>Reports</span>
      </div>
      <div className="dashboard__sidebar-header">SETTINGS</div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "preferences" ? "active" : ""}`}
      >
        {renderIcon("preferences")}
        <span>Preferences</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "fees-pricing" ? "active" : ""}`}
      >
        {renderIcon("fees-pricing")}
        <span>Fees and Pricing</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "audit-logs" ? "active" : ""}`}
      >
        {renderIcon("audit-logs")}
        <span>Audit Logs</span>
      </div>
      <div
        className={`dashboard__sidebar-item ${activeItem === "audit-logs" ? "active" : ""}`}
      >
        {renderIcon("system-messages")}
        <span>system-messages</span>
      </div>
      <div className="dashboard__spacer"></div>

      <div className="dashboard__sidebar-divider"></div>

      <div
        className={`dashboard__sidebar-item dashboard__sidebar-logout ${activeItem === "logout" ? "active" : ""}`}
        onClick={handleLogout}
      >
        {renderIcon("logout")}
        <span>Logout</span>
      </div>

      <div className="dashboard__sidebar-version">v1.2.0</div>
    </aside>
  );
};

export default Sidebar;
