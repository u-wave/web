import React, { Component, PropTypes } from 'react';
import FavoritedIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';

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
    const pos = this.button.getBoundingClientRect();
    return {
      x: pos.left,
      y: pos.top
    };
  }

  handleFavorite = () => {
    this.props.onFavorite(this.position());
  };

  refButton = button => {
    this.button = button;
  };

  render() {
    const { muiTheme } = this.context;
    const { active, count } = this.props;
    const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;
    return (
      <Button
        ref={this.refButton}
        tooltip="Favorite"
        onClick={this.handleFavorite}
        count={count}
      >
        <CurrentIcon color={muiTheme.palette.primary1Color} />
      </Button>
    );
  }
}
