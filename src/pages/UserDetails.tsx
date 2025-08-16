import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../services/db";
import { getUserLocal, saveUserLocal } from "../services/storage";
import type { User } from "../types/user";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import "../styles/userDetails.scss";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("General Details");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Invalid user ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userId = parseInt(id);
        let userData = null;

        // Try local storage first
        const localData = getUserLocal(userId);
        if (localData) {
          userData = localData;
        } else {
          // Fallback to API
          const apiData = await fetchUserById(userId);
          if (apiData) {
            userData = apiData;
            saveUserLocal(apiData);
          }
        }

        if (userData) {
          setUser(userData);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error loading user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBlacklistUser = () => {
    if (user) {
      const updatedUser = { ...user, status: "Blacklisted" };
      setUser(updatedUser);
      saveUserLocal(updatedUser);
    }
  };

  const handleActivateUser = () => {
    if (user) {
      const updatedUser = { ...user, status: "Active" };
      setUser(updatedUser);
      saveUserLocal(updatedUser);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="user-details-page">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="user-details-page__main">
          {isSidebarOpen && (
            <Sidebar toggleSidebar={toggleSidebar} activeItem="users" />
          )}
          <div className="user-details-page__content">
            <div data-testid="loading-state" className="loading-state">
              Loading user details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-details-page">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="user-details-page__main">
          {isSidebarOpen && (
            <Sidebar toggleSidebar={toggleSidebar} activeItem="users" />
          )}
          <div className="user-details-page__content">
            <div className="error-state">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="user-details-page__main">
          {isSidebarOpen && (
            <Sidebar toggleSidebar={toggleSidebar} activeItem="users" />
          )}
          <div className="user-details-page__content">
            <div className="error-state">User not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="user-details-page__main">
        {isSidebarOpen && (
          <Sidebar toggleSidebar={toggleSidebar} activeItem="users" />
        )}

        <div className="user-details-page__content">
          <div className="back-nav">
            <button
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              <span className="back-icon">←</span>
              <span>Back to Users</span>
            </button>
          </div>

          <div className="user-details-header">
            <h1>User Details</h1>
            <div className="action-buttons">
              <button
                data-testid="blacklist-button"
                className="blacklist-button"
                onClick={handleBlacklistUser}
              >
                BLACKLIST USER
              </button>
              <button className="activate-button" onClick={handleActivateUser}>
                ACTIVATE USER
              </button>
            </div>
          </div>

          <div className="user-summary-card">
            <div className="user-summary-top">
              <div className="user-profile">
                <div className="user-avatar">
                  <span className="user-emoji">👤</span>
                </div>
                <div className="user-name-id">
                  <h2 data-testid="user-full-name">{user.fullName}</h2>
                  <p>{`LSQFf${user.id}g90`}</p>
                </div>
              </div>

              {/* Small status element for tests (visible UI unchanged)
              <div
                className="user-status-summary"
                style={{ marginLeft: "auto", textAlign: "right" }}
              >
                <p className="detail-label" style={{ margin: 0 }}>
                  Status
                </p>
                <div>
                  <span
                    data-testid="user-status"
                    className={`status-badge status-${(user.status || "active").toLowerCase()}`}
                  >
                    {user.status || "Active"}
                  </span>
                </div>
              </div> */}

              <div className="user-tier">
                <p>User's Tier</p>
                <div className="tier-stars">
                  <span className="filled">★</span>
                  <span className="empty">★</span>
                  <span className="empty">★</span>
                </div>
              </div>
              <div className="user-balance">
                <h2>{user.monthlyIncome.split(" ")[0]}.00</h2>
                <p>{user.bvn}/Providus Bank</p>
              </div>
            </div>

            <div className="user-summary-tabs">
              <button
                className={activeTab === "General Details" ? "active" : ""}
                onClick={() => setActiveTab("General Details")}
              >
                General Details
              </button>
              <button
                className={activeTab === "Documents" ? "active" : ""}
                onClick={() => setActiveTab("Documents")}
              >
                Documents
              </button>
              <button
                className={activeTab === "Bank Details" ? "active" : ""}
                onClick={() => setActiveTab("Bank Details")}
              >
                Bank Details
              </button>
              <button
                className={activeTab === "Loans" ? "active" : ""}
                onClick={() => setActiveTab("Loans")}
              >
                Loans
              </button>
              <button
                className={activeTab === "Savings" ? "active" : ""}
                onClick={() => setActiveTab("Savings")}
              >
                Savings
              </button>
              <button
                className={activeTab === "App and System" ? "active" : ""}
                onClick={() => setActiveTab("App and System")}
              >
                App and System
              </button>
            </div>
          </div>

          <div className="user-details-card">
            {activeTab === "General Details" && (
              <div className="user-details-content">
                <section className="details-section">
                  <h3>Personal Information</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <p className="detail-label">FULL NAME</p>
                      <p className="detail-value">{user.fullName}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">PHONE NUMBER</p>
                      <p className="detail-value">{user.phoneNumber}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">EMAIL ADDRESS</p>
                      <p className="detail-value">{user.emailAddress}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">BVN</p>
                      <p className="detail-value">{user.bvn}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">GENDER</p>
                      <p className="detail-value">{user.gender}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">MARITAL STATUS</p>
                      <p className="detail-value">{user.maritalStatus}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">CHILDREN</p>
                      <p className="detail-value">{user.children}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">TYPE OF RESIDENCE</p>
                      <p className="detail-value">{user.typeOfResidence}</p>
                    </div>
                  </div>
                </section>

                <section className="details-section">
                  <h3>Education and Employment</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <p className="detail-label">LEVEL OF EDUCATION</p>
                      <p className="detail-value">{user.educationLevel}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">EMPLOYMENT STATUS</p>
                      <p className="detail-value">{user.employmentStatus}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">SECTOR OF EMPLOYMENT</p>
                      <p className="detail-value">{user.sectorOfEmployment}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">DURATION OF EMPLOYMENT</p>
                      <p className="detail-value">
                        {user.durationOfEmployment}
                      </p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">OFFICE EMAIL</p>
                      <p className="detail-value">{user.officeEmail}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">MONTHLY INCOME</p>
                      <p className="detail-value">{user.monthlyIncome}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">LOAN REPAYMENT</p>
                      <p className="detail-value">{user.loanRepayment}</p>
                    </div>
                  </div>
                </section>

                <section className="details-section">
                  <h3>Socials</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <p className="detail-label">TWITTER</p>
                      <p className="detail-value">{user.socials.twitter}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">FACEBOOK</p>
                      <p className="detail-value">{user.socials.facebook}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">INSTAGRAM</p>
                      <p className="detail-value">{user.socials.instagram}</p>
                    </div>
                  </div>
                </section>

                <section className="details-section">
                  <h3>Guarantor</h3>
                  {user.guarantors &&
                    user.guarantors.map((guarantor, index) => (
                      <div key={index} className="guarantor-details">
                        <div className="details-grid">
                          <div className="detail-item">
                            <p className="detail-label">FULL NAME</p>
                            <p className="detail-value">{guarantor.fullName}</p>
                          </div>
                          <div className="detail-item">
                            <p className="detail-label">PHONE NUMBER</p>
                            <p className="detail-value">
                              {guarantor.phoneNumber}
                            </p>
                          </div>
                          <div className="detail-item">
                            <p className="detail-label">EMAIL ADDRESS</p>
                            <p className="detail-value">
                              {guarantor.emailAddress}
                            </p>
                          </div>
                          <div className="detail-item">
                            <p className="detail-label">RELATIONSHIP</p>
                            <p className="detail-value">
                              {guarantor.relationship}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </section>
              </div>
            )}

            {activeTab !== "General Details" && (
              <div className="coming-soon">
                <p>This feature is coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
