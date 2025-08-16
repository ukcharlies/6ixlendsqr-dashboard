import React, { useState, useEffect } from "react";
import "../styles/dashboard.scss";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../services/db";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Pagination from "../components/layout/Pagination";
import FilterModal from "../components/users/FilterModal";
import UserMenu from "../components/users/UserMenu";

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
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 102, // Mock data for savings
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleFilter = (filters: any) => {
    let filtered = [...users];

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          ?.toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }
    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.fullName?.toLowerCase().includes(filters.username.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.emailAddress?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.phoneNumber) {
      filtered = filtered.filter((user) =>
        user.phoneNumber?.includes(filters.phoneNumber)
      );
    }
    if (filters.status) {
      filtered = filtered.filter(
        (user) => user.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.date) {
      const filterDate = new Date(filters.date).toLocaleDateString();
      filtered = filtered.filter(
        (user) => new Date(user.createdAt).toLocaleDateString() === filterDate
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page
    setActiveFilter(null);
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderFilterButton = (column: string) => (
    <button
      className="filter-btn"
      onClick={() => setActiveFilter(activeFilter === column ? null : column)}
    >
      ⌄
      {activeFilter === column && (
        <FilterModal
          isOpen={true}
          onClose={() => setActiveFilter(null)}
          onFilter={handleFilter}
          organizations={Array.from(new Set(users.map((u) => u.organization)))}
          statuses={["Active", "Inactive", "Pending", "Blacklisted"]}
        />
      )}
    </button>
  );

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
                      {renderFilterButton("organization")}
                    </th>
                    <th>
                      <span>USERNAME</span>
                      {renderFilterButton("username")}
                    </th>
                    <th>
                      <span>EMAIL</span>
                      {renderFilterButton("email")}
                    </th>
                    <th>
                      <span>PHONE NUMBER</span>
                      {renderFilterButton("phoneNumber")}
                    </th>
                    <th>
                      <span>DATE JOINED</span>
                      {renderFilterButton("dateJoined")}
                    </th>
                    <th>
                      <span>STATUS</span>
                      {renderFilterButton("status")}
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
                        <td>{user.organization || "N/A"}</td>
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
                        <td style={{ position: "relative" }}>
                          <button
                            className="options-btn"
                            onClick={() =>
                              setActiveMenu(
                                activeMenu === user.id ? null : user.id
                              )
                            }
                          >
                            ⋮
                          </button>
                          {activeMenu === user.id && (
                            <UserMenu
                              isOpen={true}
                              onClose={() => setActiveMenu(null)}
                              onViewDetails={() => {
                                /* implement */
                              }}
                              onBlacklist={() => {
                                /* implement */
                              }}
                              onActivate={() => {
                                /* implement */
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
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
