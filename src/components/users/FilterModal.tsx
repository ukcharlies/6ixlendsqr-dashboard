import React, { useState, useRef, useEffect } from "react";
import "./FilterModal.scss";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: any) => void;
  organizations: string[];
  statuses: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilter,
  organizations,
  statuses,
}) => {
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    onFilter({}); // This will reset to show all users
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only include non-empty values in filter
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    onFilter(activeFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="filter-modal"
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit}>
        <div className="filter-modal__field">
          <label>Organization</label>
          <select
            value={filters.organization}
            onChange={(e) =>
              setFilters({ ...filters, organization: e.target.value })
            }
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-modal__field">
          <label>Username</label>
          <input
            type="text"
            placeholder="User"
            value={filters.username}
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
          />
        </div>

        <div className="filter-modal__field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
        </div>

        <div className="filter-modal__field">
          <label>Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="filter-modal__field">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={(e) =>
              setFilters({ ...filters, phoneNumber: e.target.value })
            }
          />
        </div>

        <div className="filter-modal__field">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Select</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-modal__buttons">
          <button
            type="button"
            className="filter-modal__reset"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="filter-modal__filter">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
