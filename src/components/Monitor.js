import React, { Component } from "react";
import { Spinner } from "./";
import { format } from "date-fns";

const formattedDate = date => {
  return format(date, "MM/DD/YYYY");
};

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
        <div>Latest Scan:</div>
        {formattedDate(updatedAt)}
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
