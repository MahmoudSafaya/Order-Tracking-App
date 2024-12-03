import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2>OrderTracking</h2>
      <ul className="sidebar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="new-order">New Order</Link>
        </li>
        <li>
          <Link to="orders">Orders</Link>
        </li>
      </ul>
      <div className="logout-box">
        <button onClick={handleLogout}>
         <span>Logout</span> <FiLogOut />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
