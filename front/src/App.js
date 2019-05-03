import React, { Component } from "react";
import ProcessMonitoring from "./components/processMonitoring/ProcessMonitoring";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact={true} component={ProcessMonitoring} />
          <Route path="/monitoring/process" component={ProcessMonitoring} />
          <Route path="/monitoring/process2" component={ProcessMonitoring} />
          <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다:</h2>
                <p>{location.pathname}</p>
              </div>
            )}
          />
        </Switch>
      </>
    );
  }
}

export default App;
