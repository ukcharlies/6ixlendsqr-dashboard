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
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const isScrollingDown = currentScrollPosition > lastScrollPosition;

      // Only update if we've scrolled more than 50px
      if (Math.abs(currentScrollPosition - lastScrollPosition) > 50) {
        setIsCloseButtonVisible(!isScrollingDown);
        // On mobile, also close sidebar when scrolling down
        if (isScrollingDown && window.innerWidth <= 768) {
          setIsSidebarOpen(false);
        }
        setLastScrollPosition(currentScrollPosition);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Reset the close button visibility when manually toggling
    setIsCloseButtonVisible(true);
  };

  // Pagination logic - get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Render filter button with modal
  const renderFilterButton = (column: string) => (
    <button
      className="filter-btn"
      data-testid={`filter-btn-${column}`}
      aria-label={`filter-${column}`}
      onClick={() => setActiveFilter(activeFilter === column ? null : column)}
    >
      <span aria-hidden="true">⌄</span>
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
          <Sidebar
            toggleSidebar={toggleSidebar}
            activeItem="users"
            isCloseButtonVisible={isCloseButtonVisible}
          />
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
                        <div data-testid="loading-state">Loading users...</div>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.organization || "N/A"}</td>
                        <td>
                          <Link to={`/users/${user.id}`}>
                            <span data-testid="user-name">{user.fullName}</span>
                          </Link>
                        </td>
                        <td>{user.emailAddress}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`status-badge status-${(user.status || "active").toLowerCase()}`}
                          >
                            <span data-testid="user-status">
                              {user.status || "Active"}
                            </span>
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
                              userId={user.id}
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
