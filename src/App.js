import React, { Component, lazy } from "react";
import { Login, List, Spinner } from "./components/";
import firebase from "firebase";
import "./App.css";

const Monitor = lazy(() => import("./components/Monitor"));
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "lighthouse-scanner.firebaseapp.com",
  databaseURL: "https://lighthouse-scanner.firebaseio.com",
  projectId: "lighthouse-scanner",
  storageBucket: "lighthouse-scanner.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID
};

firebase.initializeApp(config);

class App extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  onAuthStateChanged = user => {
    this.setState({ isSignedIn: !!user });
  };

  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        <Login
          firebase={firebase}
          onAuthStateChanged={this.onAuthStateChanged}
          isSignedIn={isSignedIn}
        />
        {isSignedIn ? (
          <React.Fragment>
            <React.Suspense fallback={<Spinner />}>
              <Monitor firebase={firebase} />
            </React.Suspense>
            <List firebase={firebase} />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default App;
