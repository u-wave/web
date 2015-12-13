import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import Action from './Action';

export default class AddToPlaylist extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  position() {
    const position = findDOMNode(this.refs.button).getBoundingClientRect();
    return {
      x: position.left,
      y: position.top
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
