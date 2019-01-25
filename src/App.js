import React, { Component, lazy } from "react";
import { Spinner } from "./components/";
import "./App.css";

const Layout = lazy(() => import("./components/Layout"));
class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <React.Suspense fallback={<Spinner />}>
          <Layout />
        </React.Suspense>
      </React.StrictMode>
    );
  }
}

export default App;
