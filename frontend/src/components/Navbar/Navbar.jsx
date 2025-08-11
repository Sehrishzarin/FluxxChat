import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiSearch, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <span className="logo-text">Fluxx Chat</span>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/notifications" className="nav-icon">
          <FiBell />
          <span className="notification-badge">3</span>
        </Link>
        
        {user ? (
          <div className="profile-dropdown">
            <img 
              src={user.profilePic || '/default-profile.png'} 
              alt="Profile" 
              className="profile-pic"
            />
            <div className="dropdown-content">
              <Link to="/profile">My Profile</Link>
              <button onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="nav-icon">
            <FiUser />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;