import React, { Component } from "react";
import ProcessStatusChartItem from "./ProcessStatusChartItem";
import styled from "styled-components";

const StyledProcessStatusChart = styled.div`
  display: grid;
  grid-gap: 7px;
  place-content: center;
  grid-template-columns: repeat(auto-fit, 20px);

  margin: 20px;
`;

class ProcessStatusChart extends Component {
  render() {
    const { processes, onClick } = this.props;
    const items = processes.map((process, i) => (
      <ProcessStatusChartItem
        key={process.key}
        idx={i}
        process={process}
        onClick={onClick}
      />
    ));
    return <StyledProcessStatusChart>{items}</StyledProcessStatusChart>;
  }
}

export default ProcessStatusChart;
