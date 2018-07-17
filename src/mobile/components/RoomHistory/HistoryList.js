import React from 'react';
import ReactDOM from 'react-dom';
import withProps from 'recompose/withProps';
import List from '@material-ui/core/List';
import Base from '../../../components/MediaList/BaseMediaList';
import HistoryRow from './Row';

const HistoryList = withProps({
  className: 'RoomHistory-list',
  listComponent: React.forwardRef((props, ref) => (
    <List
      {...props}
      ref={list => (
        ref(list && ReactDOM.findDOMNode(list)) // eslint-disable-line react/no-find-dom-node
      )}
    />
  )),
  rowComponent: HistoryRow,
})(Base);

export default HistoryList;
