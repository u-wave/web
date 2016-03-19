import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import AddIcon from 'material-ui/svg-icons/content/add';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Action from './Action';

@muiThemeable()
export default class AddToPlaylist extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    muiTheme: PropTypes.object.isRequired
  };

  position() {
    const pos = findDOMNode(this.refs.button).getBoundingClientRect();
    return {
      x: pos.left,
      y: pos.top
    };
  }

  render() {
    const { onAdd, muiTheme, ...props } = this.props;
    return (
      <Action
        ref="button"
        {...props}
        onAction={media => onAdd(this.position(), media)}
      >
        <AddIcon color={muiTheme.palette.textColor} />
      </Action>
    );
  }
}
