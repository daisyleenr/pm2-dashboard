import React, { Component } from "react";
import ProcessItem from "./ProcessItem";

class ProcessList extends Component {
  render() {
    const { processes } = this.props;
    const processList = processes.map(proc => (
      <ProcessItem
        key={proc.pm2_env.unique_id}
        url={proc.pm2_web_url}
        pid={proc.pid}
        name={proc.name}
        status={proc.pm2_env.status}
        process={proc}
      />
    ));
    return processList;
  }
}

export default ProcessList;
