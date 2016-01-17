import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import FavoritedIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/lib/svg-icons/action/favorite-border';

import Button from './Button';

export default class Favorite extends Component {
  static propTypes = {
    onFavorite: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  position() {
    const pos = findDOMNode(this.refs.button).getBoundingClientRect();
    return {
      x: pos.left,
      y: pos.top
    };
  }

  render() {
    const { rawTheme } = this.context.muiTheme;
    const { active, count, onFavorite } = this.props;
    const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;
    return (
      <Button
        ref="button"
        tooltip="Favorite"
        onClick={() => onFavorite(this.position())}
        count={count}
      >
        <CurrentIcon color={rawTheme.palette.primary1Color} />
      </Button>
    );
  }
}
