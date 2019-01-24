import React, { Component } from "react";
import { ListItem, Paging } from "./";
import { paginate, getData } from "../util/";

class List extends Component {
  state = { snapshot: null, next: null };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getPage = async () => {
    const { firebase } = this.props;
    const { next } = this.state;
    try {
      const { snapshot, next: nextQuery } = await paginate(firebase, next);
      this.setState({ snapshot, next: nextQuery });
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    this.getPage();
  }

  mapItems() {
    const { snapshot } = this.state;
    const divs = snapshot.docs.map(item => {
      const { url, src, time } = getData(item);
      return <ListItem key={url} url={url} src={src} time={time} />;
    });

    return (
      <div className="container">
        <ul ref={this.listRef}>{divs}</ul>
        <Paging getPage={this.getPage} listRef={this.listRef} />
      </div>
    );
  }

  render() {
    const { snapshot } = this.state;
    return snapshot && snapshot.docs ? this.mapItems() : null;
  }
}

export default List;
