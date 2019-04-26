import React, { Component } from "react";
import ProcessItem from "./ProcessItem";
import styled from "styled-components";

const StyledProcessList = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
`;

class ProcessList extends Component {
  render() {
    const { processes } = this.props;
    const processList = processes.map(process => (
      <ProcessItem key={process.key} process={process} />
    ));
    return <StyledProcessList>{processList}</StyledProcessList>;
  }
}

export default ProcessList;
