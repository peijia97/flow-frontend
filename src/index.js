import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Modal } from "components/common/Modal/Modal";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Background } from "components/common/Background/Background";
import reportWebVitals from "reportWebVitals";
import { theme } from "theme";

import "scss/style.scss";

const TheLayout = React.lazy(() =>
  import("components/common/Containers/TheLayout")
);

const loading = (
  <Background style={{ textAlign: "center", height: "100vh" }} color="grey100">
    <CircularProgress color="primary" className="suspense-spinner" />
  </Background>
);

const App = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Suspense fallback={loading}>
          <Modal />
          <Switch>
            <Route
              path="/"
              name="Home"
              render={props => <TheLayout {...props} />}
            />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
