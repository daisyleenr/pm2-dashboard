import React, { Component } from "react";
import ProcessItem from "./ProcessItem";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 100px 1fr 1fr 1fr;
  width: 60vw;
  justify-content: center;
`;

const Tr = styled.div`
  border-bottom: 1px solid black;
`;
class ProcessList extends Component {
  ProcessItems = [];
  handleScrollTo = key => {
    this.ProcessItems[key].ref.current.scrollIntoView();
  };

  render() {
    const { processes } = this.props;
    const processList = processes.map((process, i) => (
      <ProcessItem
        key={process.key}
        id={process.key}
        idx={i}
        process={process}
        ref={ref => (this.ProcessItems[i] = ref)}
      />
    ));
    return (
      <Div>
        <Grid>
          <Tr>No.</Tr>
          <Tr>status</Tr>
          <Tr>hostname</Tr>
          <Tr>app name</Tr>
          <Tr>args</Tr>
          {processList}
        </Grid>
      </Div>
    );
  }
}

export default ProcessList;
