import React, { useState, useEffect } from "react";
import "../styles/dashboard.scss";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../services/db";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Pagination from "../components/layout/Pagination";

// Card component for dashboard statistics
interface StatCardProps {
  title: string;
  count: number | string;
  icon: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon,
  iconColor,
}) => (
  <div className="stat-card">
    <div
      className="stat-card__icon"
      style={{ backgroundColor: `${iconColor}10` }}
    >
      <span style={{ color: iconColor }}>{icon}</span>
    </div>
    <div className="stat-card__title">{title.toUpperCase()}</div>
    <div className="stat-card__count">{count}</div>
  </div>
);

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 102, // Mock data for savings
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchAllUsers();
        setUsers(userData);

        setUserStats({
          totalUsers: userData.length,
          activeUsers:
            userData.filter((user) => user.status === "Active").length ||
            Math.floor(userData.length * 0.6),
          usersWithLoans: userData.filter((user) => user.loanRepayment > 0)
            .length,
          usersWithSavings: 102, // Mock data for savings
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading users:", error);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Pagination logic - get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`dashboard ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard__main">
        {(isSidebarOpen || window.innerWidth > 768) && (
          <Sidebar toggleSidebar={toggleSidebar} activeItem="users" />
        )}

        <main className="dashboard__content">
          <h1 className="dashboard__page-title">Users</h1>

          <div className="dashboard__stats">
            <StatCard
              title="users"
              count={loading ? "..." : userStats.totalUsers}
              icon="👥"
              iconColor="#DF18FF"
            />
            <StatCard
              title="active users"
              count={loading ? "..." : userStats.activeUsers}
              icon="👤"
              iconColor="#5718FF"
            />
            <StatCard
              title="users with loans"
              count={loading ? "..." : userStats.usersWithLoans}
              icon="💰"
              iconColor="#F55F44"
            />
            <StatCard
              title="users with savings"
              count={loading ? "..." : userStats.usersWithSavings}
              icon="💵"
              iconColor="#FF3366"
            />
          </div>

          <div className="dashboard__table-wrapper">
            <div className="dashboard__table-container">
              <table className="dashboard__table">
                <thead>
                  <tr>
                    <th>
                      <span>ORGANIZATION</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th>
                      <span>USERNAME</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th>
                      <span>EMAIL</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th>
                      <span>PHONE NUMBER</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th>
                      <span>DATE JOINED</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th>
                      <span>STATUS</span>
                      <button className="filter-btn">⌄</button>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="loading-cell">
                        Loading users...
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.sectorOfEmployment || "N/A"}</td>
                        <td>
                          <Link to={`/users/${user.id}`}>{user.fullName}</Link>
                        </td>
                        <td>{user.emailAddress}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`status-badge status-${(user.status || "active").toLowerCase()}`}
                          >
                            {user.status || "Active"}
                          </span>
                        </td>
                        <td>
                          <button className="options-btn">⋮</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <Pagination
                currentPage={currentPage}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
