import styled from "styled-components";
import axios from "axios";

import React, { Component } from "react";
import ProcessList from "./ProcessList";

const Tr = styled.div`
  display: flex;
`;
const Td = styled.div`
  width: 25%;
  text-align: center;
`;

class ProcessTable extends Component {
  state = {
    processes: []
  };

  setProcesses = async () => {
    try {
      console.log(process.env.REACT_APP_API_ADDR + "/pm2_web");
      const { data } = await axios.get(
        process.env.REACT_APP_API_ADDR + "/pm2_web"
      );

      this.setState({
        processes: data
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

  render() {
    const { processes } = this.state;

    return (
      <div>
        <Tr>
          <Td>hostname</Td>
          <Td>name</Td>
          <Td>status</Td>
        </Tr>
        <ProcessList processes={processes} />
      </div>
    );
  }
}

export default ProcessTable;
