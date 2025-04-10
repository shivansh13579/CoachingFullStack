import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContex";

export default function UserDropdown() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <h3 className="block mr-1 font-medium text-theme-sm">Logout</h3>
      </button>
    </div>
  );
}
