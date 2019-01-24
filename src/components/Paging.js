import React, { Component } from "react";

import scrollToComponent from "react-scroll-to-component";

class Paging extends Component {
  state = {};
  render() {
    const { listRef, getPage } = this.props;
    return (
      <div className="paging">
        <button
          onClick={() => {
            getPage();
            scrollToComponent(listRef.current, {
              offset: 0,
              align: "top",
              duration: 200
            });
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Paging;
