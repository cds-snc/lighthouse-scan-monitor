import React, { Component } from "react";
import { ListItem, Paging, Spinner } from "./";
import { paginate, getData } from "../util/";
import scrollToComponent from "react-scroll-to-component";
class List extends Component {
  state = { snapshot: null, next: null, loading: false };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getPage = async () => {
    const { firebase } = this.props;
    const { next } = this.state;

    if (next) {
      this.setState({ loading: true });
    }

    try {
      const { snapshot, next: nextQuery } = await paginate(firebase, next);
      this.setState({ snapshot, next: nextQuery, loading: false }, () => {
        scrollToComponent(this.listRef.current, {
          offset: -100,
          align: "top",
          duration: 200,
          ease: "inOutCirc"
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    this.getPage();
  }

  mapItems() {
    const { snapshot, loading } = this.state;

    const divs = snapshot.docs.map(item => {
      const { url, src, time, updatedAt } = getData(item);
      return (
        <ListItem
          updatedAt={updatedAt}
          key={url}
          url={url}
          src={src}
          time={time}
        />
      );
    });

    return (
      <div className="container">
        <div ref={this.listRef}><h2>Recent Scans:</h2></div>
        <ul>{loading ? <Spinner /> : divs}</ul>
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
