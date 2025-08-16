import React, { useRef, useEffect } from "react";
import "./UserMenu.scss";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onBlacklist: () => void;
  onActivate: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onClose,
  userId,
  onBlacklist,
  onActivate,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleViewDetails = () => {
    navigate(`/users/${userId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button onClick={handleViewDetails}>
        <span className="icon">👁️</span>
        View Details
      </button>
      <button onClick={onBlacklist}>
        <span className="icon">⛔</span>
        Blacklist User
      </button>
      <button onClick={onActivate}>
        <span className="icon">✅</span>
        Activate User
      </button>
    </div>
  );
};

export default UserMenu;
