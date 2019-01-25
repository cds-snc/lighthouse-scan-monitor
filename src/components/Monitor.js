import React, { Component } from "react";
import { Spinner } from "./";
import { formattedDate } from "../util";

class Monitor extends Component {
  state = { url: "", src: "" };
  async componentDidMount() {
    const { firebase } = this.props;
    const db = firebase.firestore();
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
        const updatedAt = data.updatedAt;
        this.setState({ src, url, updatedAt });
      });
    } catch (e) {
      console.log(e);
    }
  }

  outputHolder() {
    const { url, src, updatedAt } = this.state;
    return (
      <div className="holder">
        <div><h2>Latest Scan:</h2></div>
        <div className="muted">{formattedDate(updatedAt)}</div>
        <div className="url">{url}</div>
        <img alt="screen" src={src} />
      </div>
    );
  }

  render() {
    const { src } = this.state;
    return src ? (
      <div className="site-display">{this.outputHolder()}</div>
    ) : (
      <Spinner />
    );
  }
}

export default Monitor;
