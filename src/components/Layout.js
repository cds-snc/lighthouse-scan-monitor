import React, { Component } from "react";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { Login, List, Monitor } from "./";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "lighthouse-scanner.firebaseapp.com",
  databaseURL: "https://lighthouse-scanner.firebaseio.com",
  projectId: "lighthouse-scanner",
  storageBucket: "lighthouse-scanner.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID
};

firebase.initializeApp(config);

export default class Layout extends Component {
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
            <Monitor firebase={firebase} />
            <List firebase={firebase} />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
