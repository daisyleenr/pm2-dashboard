import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MainMenu from "./components/main/MainMenu";
import ProcessPage from "./pages/ProcessPage";
import SamplePage from "./pages/SamplePage";
import { ResetCSS } from "./lib/styles/reset";
import { BaseCSS } from "./lib/styles/base";

class App extends Component {
  render() {
    return (
      <>
        <ResetCSS />
        <BaseCSS />

        <MainMenu />
        <Switch>
          <Route path="/" exact={true} component={ProcessPage} />
          <Route path="/monitoring/process" component={ProcessPage} />
          <Route path="/sample" component={SamplePage} />
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
