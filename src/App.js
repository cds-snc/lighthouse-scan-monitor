import React, { Component, lazy } from "react";
import { Spinner } from "./components/";
import "./App.css";

const Layout = lazy(() => import("./components/Layout"));
class App extends Component {
  render() {
    return (
      <React.Suspense fallback={<Spinner />}>
        <Layout />
      </React.Suspense>
    );
  }
}

export default App;
