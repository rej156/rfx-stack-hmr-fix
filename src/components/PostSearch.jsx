import React from 'react';
import { connect, dispatch } from 'local-reflex-react';

// styles
// import styles from '../styles/post.search.css';

const handleSearch = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.search', val);
};

const resetSearch = (e) => {
  e.preventDefault();
  dispatch('post.search', null);
};

const PostSearch = ({ search }) => (
  <form>
    <input
      className="field rounded-left"
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
    />
    <button
      onClick={resetSearch}
      className="btn rounded-right border black bg-silver"
    >X</button>
  </form>
);

PostSearch.propTypes = {
  search: React.PropTypes.string,
};

export default connect(PostSearch);
