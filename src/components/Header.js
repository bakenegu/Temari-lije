import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

// Styled components
const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 0.25rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  object-fit: contain;
  display: block;
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  a {
    color: #ecf0f1;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: color 0.2s;
    padding: 0.5rem 0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #3498db;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #3498db;
      
      &::after {
        width: 100%;
      }
    }
    
    &.active {
      color: #3498db;
      font-weight: 600;
      
      &::after {
        width: 100%;
      }
    }
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    
    a {
      font-size: 1rem;
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  margin-top: 0.5rem;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #2d3748;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
    color: #2b6cb0;
  }
  
  svg {
    color: #718096;
  }
  
  &:hover svg {
    color: #2b6cb0;
  }
`;

const LoginButton = styled(Link)`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #3182ce;
  }
`;

const AdminLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = React.useRef(null);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    if (location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoImage src="/tl-logo.png" alt="Logo" />
          <LogoText>TemariLije</LogoText>
        </Logo>
        <Navigation>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user?.role === 'admin' && (
            <AdminLink to="/admin">
              <FaCog /> Admin
            </AdminLink>
          )}
        </Navigation>
        
        {user ? (
          <UserMenu ref={dropdownRef}>
            <UserButton onClick={() => setShowDropdown(!showDropdown)}>
              <FaUser />
              {user.username}
            </UserButton>
            
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem to="/profile">
                  <FaUser /> Profile
                </DropdownItem>
                <DropdownItem as="button" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <LoginButton to="/login" state={{ from: location }}>
            <FaUser /> Login
          </LoginButton>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
