import cx from 'classnames';
import React from 'react';
import { IDLE, LOADING, LOADED } from '../../../stores/SearchStore';
import Loader from '../../Loader';
import MediaList from '../../MediaList';

export default class SearchResults extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    query: React.PropTypes.string,
    loadingState: React.PropTypes.oneOf([ IDLE, LOADING, LOADED ]),
    results: React.PropTypes.array
  };

  render() {
    const { className, query, results, loadingState } = this.props;

    const list = loadingState === LOADED
      ? <MediaList
          className="PlaylistPanel-media"
          media={results}
        />
      : <div className="PlaylistPanel-loading"> <Loader size="large" /> </div>;

    return (
      <div className={cx('PlaylistPanel', 'SearchResults', className)}>
        <div className="SearchResults-query">
          Search: {query}
        </div>
        {list}
      </div>
    );
  }
}
