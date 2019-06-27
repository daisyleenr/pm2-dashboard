import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #24292e;
  font-size: 14px;
  line-height: 1.5;
  padding: 16px;

  & a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    font-weight: 900;
    white-space: nowrap;
  }

  & a:hover {
    color: hsla(0, 0%, 100%, 0.7);
  }

  & ul {
    display: flex;
    margin-left: 30px;
  }

  & li {
    margin-right: 30px;
  }
`;

const Logo = styled.span`
  margin: 0 30px;
  font-size: 1.2rem;
  font-weight: 900;
  color: #f39c12;
`;

const MainMenu = () => {
  return (
    <NavBar>
      <Logo>FICCY</Logo>
      <ul>
        <li>
          <Link to="/monitoring/process">Process</Link>
        </li>
      </ul>
    </NavBar>
  );
};

export default MainMenu;
