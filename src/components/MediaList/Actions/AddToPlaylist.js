import React, { Component, PropTypes } from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';

import Action from './Action';

export default class AddToPlaylist extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  position() {
    const pos = this.button.getBoundingClientRect();
    return {
      x: pos.left,
      y: pos.top
    };
  }

  refButton = button => {
    this.button = button;
  };

  render() {
    const { onAdd, ...props } = this.props;
    return (
      <Action
        ref={this.refButton}
        {...props}
        onAction={media => onAdd(this.position(), media)}
      >
        <AddIcon color="#fff" />
      </Action>
    );
  }
}
