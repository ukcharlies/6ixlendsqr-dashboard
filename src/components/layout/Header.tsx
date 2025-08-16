import React from "react";
import unionLogo from "../../assets/Union.png";
import profilePic from "../../assets/DP.png";
import "./Header.module.scss";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav className="dashboard__navbar">
      <div className="dashboard__navbar-logo">
        {!isSidebarOpen && (
          <button
            className="dashboard__sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            ☰
          </button>
        )}
        <div className="dashboard__navbar-logo-icon">
          <img src={unionLogo} alt="Logo" />
        </div>
        <span className="dashboard__navbar-logo-text">lendsqr</span>
      </div>

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

      <div className="dashboard__navbar-right">
        <a href="#" className="dashboard__navbar-right-link docs-link">
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
          <span className="dashboard__navbar-right-profile-name">Adedeji</span>
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
  );
};

export default Header;
