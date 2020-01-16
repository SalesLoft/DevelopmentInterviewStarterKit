import React from 'react'
import styled from 'styled-components'

const NAV_HEIGHT = 46;
const AVATAR_HEIGHT = 40;
const AVATAR_WIDTH = 40;

const NavText = styled.p`
  color: #4a90e2;
  padding-right: 10px;
  padding-left: 10px;
  color: white;
`;

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-content: center;

  margin: 0px;
  padding 0px;
  height: ${NAV_HEIGHT}px;
  width: 100%;
  /*background-color: #fff;*/
`;

const Badge = styled.div`
  margin: 9px;
  display: flex;
  min-width: 120px;
  align-items: center;
  overflow: hidden;
  border-radius: 14px;
  /*border 2px solid #4a90e2;*/
  justify-content: center;
  font-size: 16px;
  /*font-weight: bold;*/
  color: #fff;
  background-color: #ff910e; /*#4a90e2;*/

  :hover {
    box-shadow: 0 0 0 1px #ff910e, 0 2px 24px rgba(0,0,0,0.35);
  }
`;

const Link = styled.a`
  margin: 9px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }
`;

const NavBarLink = props => (
  <Link href={props.href}>{props.label}</Link>
);

const NavBarBadge = props => (
  <Badge>
    <a href={props.href} style={{textDecoration: 'none'}}>
      <NavText>
        {props.children}
      </NavText>
    </a>
  </Badge>
);

const SignInBadge = () => (
  <NavBarBadge href='/users/auth/salesloft'>Login</NavBarBadge>
);

const UserBadge = ({ user }) => (
  <NavBarBadge href='/users/auth/logout'>{user.name}</NavBarBadge>
);

const NavBar = ({ user }) => (
  <StyledNavBar>
    <NavBarLink href='/' label='Home' />
    <NavBarLink href='/people' label='People' />
    {user ? <UserBadge user={user} /> : <SignInBadge />}
  </StyledNavBar>
);

export default NavBar
