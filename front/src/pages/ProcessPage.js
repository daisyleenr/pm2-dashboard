import axios from "axios";

import React, { Component } from "react";
import ProcessTable from "../components/process/ProcessTable";
import ProcessStatusChart from "../components/process/ProcessStatusChart";
import styled from "styled-components";

const Header = styled.header`
  text-align: center;
  color: #525252;
  margin-top: 50px;
`;

const Main = styled.main`
  margin: 0 50px;
`;

class ProcessMonitoring extends Component {
  state = {
    processes: [],
    count: 0
  };

  processTable = React.createRef();

  handleOnClick = e => {
    this.processTable.current.handleScrollTo(e.target.dataset.idx);
  };

  render() {
    const { processes, count } = this.state;
    return (
      <>
        <Header>
          <h1>PM2 Monitoring ({count})</h1>
        </Header>
        <Main>
          <ProcessStatusChart
            processes={processes}
            onClick={this.handleOnClick}
          />
          <ProcessTable processes={processes} innerRef={this.processTable} />
        </Main>
      </>
    );
  }

  setProcesses = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_ADDR + "/pm2_web"
      );

      this.setState({
        processes: data,
        count: data.length
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.setProcesses();
    this.interval = setInterval(() => this.setProcesses(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default ProcessMonitoring;
