import React, { Component } from "react";
import styled from "styled-components";

const Arg = styled.span`
  border-radius: 5px;
  padding: 0 4px;
  background-color: #dff9fb;
  color: #535c68;
  font-size: 12px;
  margin: 5px;
  font-weight: bold;
`;

const Status = styled.div`
  color: ${({ status }) => (status === "online" ? "#2ecc71" : "#ff7979")};
  font-weight: bold;
`;

class ProcessItem extends Component {
  ref = React.createRef();

  render() {
    const { idx, process } = this.props;
    const { hostname, name, status, args } = process;

    const argList = args.map((arg, i) => <Arg key={i}>{arg}</Arg>);

    return (
      <>
        <div ref={this.ref}>{idx}</div>
        <Status status={status}>{status}</Status>
        <div>{hostname}</div>
        <div>{name}</div>
        <div>{argList}</div>
      </>
    );
  }
}

export default ProcessItem;
