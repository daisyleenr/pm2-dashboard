import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
  display: flex;
  background-color: #24292e;
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 14px;
  line-height: 1.5;
  padding: 16px;
`;

const MainMenu = () => {
  return (
    <NavBar>
      <ul>
        <li>
          <Link to="/monitoring/process">프로세스</Link>
        </li>
        <li>
          <Link to="/sample">샘플</Link>
        </li>
      </ul>
    </NavBar>
  );
};

export default MainMenu;
