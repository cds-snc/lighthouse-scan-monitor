import React, { Component } from "react";

class Paging extends Component {
  state = {};
  render() {
    const {  getPage } = this.props;
    return (
      <div className="paging">
        <button
          onClick={() => {
            getPage();
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Paging;
