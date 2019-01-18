import React, { Component } from "react";
class Monitor extends Component {
  state = { scr: "" };
  async componentDidMount() {
    const { firebase } = this.props;
    let db = firebase.firestore();

    const reposRef = db.collection("scans");

    try {
      const query = reposRef
        .where("data.runtimeError.code", "==", "NO_ERROR")
        .orderBy("updatedAt", "desc")
        .limit(1);

      query.onSnapshot(result => {
        const data = result.docs[0].data();
        const src = data.data.audits["final-screenshot"].details.data;
        const url = data.url;
        this.setState({ src, url });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { src, url } = this.state;
    return (
      <div className="site-display">
        <div className="holder">
          <div>Latest Scan:</div>
          <div className="url">{url}</div>
          <img alt="screen" src={src} />
          
        </div>
      </div>
    );
  }
}

export default Monitor;
