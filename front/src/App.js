import React, { Component } from "react";
import ProcessList from "./components/ProcessList";
import axios from "axios";

class App extends Component {
  state = {
    processes: [],
    count: 0
  };

  render() {
    const { processes, count } = this.state;
    return (
      <>
        <header>
          <h1>PM2 Monitoring ({count})</h1>
        </header>
        <section>
          <ProcessList processes={processes} />
        </section>
      </>
    );
  }

  setProcesses = async () => {
    try {
      console.log(process.env.REACT_APP_API_ADDR + "/pm2_web");
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
