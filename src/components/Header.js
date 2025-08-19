import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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

// Main Header component
const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage 
            src={`${process.env.PUBLIC_URL}/tl-logo.png`} 
            alt="temari lije Logo"
          />
        </Link>
        
        <Navigation>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
