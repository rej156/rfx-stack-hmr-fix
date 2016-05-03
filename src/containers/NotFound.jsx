import React, { Component } from 'react';
import { Helmet } from 'local-rfx-react';

export default
class NotFound extends Component {

  static fetchData() {}

  render() {
    return (
      <div>
        <Helmet title="Not Found" />
        <h1>Not Found</h1>
      </div>
    );
  }
}
