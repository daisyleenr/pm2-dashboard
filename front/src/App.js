import axios from "axios";

import React, { Component } from "react";
import ProcessList from "./components/ProcessList";
import ProcessStatusChart from "./components/ProcessStatusChart";
import styled from "styled-components";

const Header = styled.header`
  text-align: center;
  color: #525252;
`;

class App extends Component {
  state = {
    processes: [],
    count: 0
  };

  processList = React.createRef();

  handleOnClick = e => {
    this.processList.current.handleScrollTo(e.target.dataset.idx);
  };

  render() {
    const { processes, count } = this.state;
    return (
      <>
        <Header>
          <h1>PM2 Monitoring ({count})</h1>
        </Header>
        <section>
          <ProcessStatusChart
            processes={processes}
            onClick={this.handleOnClick}
          />
          <ProcessList processes={processes} ref={this.processList} />
        </section>
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

export default App;
