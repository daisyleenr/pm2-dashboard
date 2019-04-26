import React, { Component } from "react";

import styled from "styled-components";

const Tr = styled.div`
  display: flex;
`;
const Td = styled.div`
  width: 25%;
  text-align: center;
`;

class ProcessItem extends Component {
  render() {
    const { hostname, name, status } = this.props;

    return (
      <Tr>
        <Td>{hostname}</Td>
        <Td>{name}</Td>
        <Td>{status}</Td>
      </Tr>
    );
  }
}

export default ProcessItem;
