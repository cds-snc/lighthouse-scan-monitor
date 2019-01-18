// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default class Login extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    const { firebase } = this.props;
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.props.onAuthStateChanged(user);
    });

    //
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { firebase, isSignedIn } = this.props;
    if (!isSignedIn) {
      return (
        <div>
          <h1>Lighthouse Scanner Monitor</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div className="sign-out">
        <p>Welcome {firebase.auth().currentUser.displayName}</p>
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </div>
    );
  }
}
