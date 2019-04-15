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
    const { url, pid, name, status } = this.props;

    return (
      <Tr>
        <Td>{url}</Td>
        <Td>{pid}</Td>
        <Td>{name}</Td>
        <Td>{status}</Td>
      </Tr>
    );
  }
}

export default ProcessItem;
