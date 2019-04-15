import React, { Component } from "react";
import ProcessItem from "./ProcessItem";

class ProcessList extends Component {
  render() {
    const { processes } = this.props;
    const processList = processes.map(proc => (
      <ProcessItem
        key={proc.key}
        hostname={proc.hostname}
        name={proc.name}
        status={proc.status}
      />
    ));
    return processList;
  }
}

export default ProcessList;
