import React from 'react';
import ReactDOM from 'react-dom';
import withProps from 'recompose/withProps';
import List from '@material-ui/core/List';
import Base from '../../../components/MediaList/BaseMediaList';
import MediaRow from './Row';

const MediaList = withProps({
  listComponent: React.forwardRef((props, ref) => (
    <List
      {...props}
      ref={list => (
        ref(list && ReactDOM.findDOMNode(list)) // eslint-disable-line react/no-find-dom-node
      )}
    />
  )),
  rowComponent: MediaRow,
})(Base);

export default MediaList;
