import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import AddIcon from 'material-ui/svg-icons/content/add';

import Action from './Action';

export default class AddToPlaylist extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  position() {
    const pos = findDOMNode(this.refs.button).getBoundingClientRect();
    return {
      x: pos.left,
      y: pos.top
    };
  }

  render() {
    const { onAdd, ...props } = this.props;
    return (
      <Action
        ref="button"
        {...props}
        onAction={media => onAdd(this.position(), media)}
      >
        <AddIcon color="#fff" />
      </Action>
    );
  }
}
