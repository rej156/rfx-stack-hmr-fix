import React from 'react';
import { connect } from 'local-rfx-react';

const PostInfo = ({ items }) => (
  <div className="gray">
    <b>{items.length} Items found</b>
  </div>
);

PostInfo.propTypes = {
  items: React.PropTypes.object,
};

export default connect(PostInfo);
