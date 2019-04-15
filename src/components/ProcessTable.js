import styled from "styled-components";
import axios from "axios";

import React, { Component } from "react";
import ProcessList from "./ProcessList";

const PM2_WEB_URLS = require("../pm2_web_urls.json");

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
      const processes = [];

      for (const url of PM2_WEB_URLS) {
        const res = await axios.get(url);
        res.data.processes.forEach(proc => {
          proc.pm2_web_url = url;
          processes.push(Object.assign({}, proc));
        });
      }

      this.setState({
        processes: processes
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
          <Td>Host</Td>
          <Td>Pid</Td>
          <Td>Name</Td>
          <Td>Status</Td>
        </Tr>
        <ProcessList processes={processes} />
      </div>
    );
  }
}

export default ProcessTable;
