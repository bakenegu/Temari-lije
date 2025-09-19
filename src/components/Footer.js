import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #2b6cb0;
  background-image: linear-gradient(135deg, #2b6cb0, #4299e1);
  color: white;
  padding: 1.5rem 0;
  width: 100%;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
`;

const Copyright = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s, background-color 0.2s;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  
  &:hover {
    color: white;
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const PoweredBy = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: white;
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="https://temarilije.org" target="_blank" rel="noopener noreferrer">temarilije.org</FooterLink>
        </FooterLinks>
        <Copyright>
          &copy; {currentYear} Temari Lije Learning Platform. All rights reserved.
        </Copyright>
        <Copyright>
          Powered by <PoweredBy href="https://4loop.pro.et" target="_blank" rel="noopener noreferrer">4loop Technologies</PoweredBy>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
