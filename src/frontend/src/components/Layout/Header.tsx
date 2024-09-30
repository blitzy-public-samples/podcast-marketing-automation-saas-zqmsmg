import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import Button from '../Common/Button';
import useAuth from '../../hooks/useAuth';

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  &:hover {
    color: #1E40AF;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.span`
  font-weight: 500;
`;

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <HeaderContainer>
      <Logo>
        {/* TODO: Replace with actual logo when available */}
        Podcast Marketing Automation
      </Logo>
      <Navigation>
        {/* TODO: Confirm final set of navigation links */}
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
        <NavLink to="/marketing">Marketing</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </Navigation>
      <UserActions>
        {isAuthenticated ? (
          <>
            <UserInfo>{user?.email}</UserInfo>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button as={Link} to="/login">Login</Button>
        )}
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;

// Human tasks:
// 1. Design and provide the logo for the Podcast Marketing Automation SaaS platform
// 2. Confirm the final set of navigation links to be included in the header
// 3. Review and approve the styling of the header component