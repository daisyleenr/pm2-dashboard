import React, { Component } from "react";

import styled from "styled-components";

const StyledProcessItem = styled.div`
  background-color: ${({ status }) =>
    status === "online" ? "#badc58" : "#ff7979"};
  padding: 10px;
`;

const ProcessTitle = styled.h4`
  margin: 0;
  padding: 0;
  color: white;
  text-align: center;
`;

const ArgItem = styled.span`
  border-radius: 5px;
  padding: 0 4px;
  background-color: #dff9fb;
  color: #535c68;
  font-size: 12px;
  margin: 5px;
  font-weight: bold;
`;

const ArgList = styled.div`
  display: flex;
  justify-content: center;
`;

class ProcessItem extends Component {
  render() {
    const { hostname, name, status, args } = this.props.process;

    const argList = args.map((arg, i) => <ArgItem key={i}>{arg}</ArgItem>);

    return (
      <StyledProcessItem status={status}>
        <ProcessTitle>
          {hostname}:{name}
        </ProcessTitle>
        <ArgList>{argList}</ArgList>
      </StyledProcessItem>
    );
  }
}

export default ProcessItem;
