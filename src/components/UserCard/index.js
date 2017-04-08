import React from 'react';
import PropTypes from 'prop-types';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import UserCard from './UserCard';

class UserCardWrapper extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  };

  state = {
    positionDiffX: 0,
    positionDiffY: 0
  };

  componentDidMount() {
    this.fitInsideWindow();
  }

  componentDidUpdate() {
    this.fitInsideWindow();
  }

  fitInsideWindow() {
    const card = this.container.firstChild;
    const rect = card.getBoundingClientRect();
    const offsetBottom = window.innerHeight - rect.bottom;
    if (offsetBottom < 0) {
      this.setState({
        positionDiffY: offsetBottom
      });
    }
  }

  refContainer = (container) => {
    this.container = container;
  };

  render() {
    const {
      onClose,
      position,
      ...props
    } = this.props;
    const { positionDiffX, positionDiffY } = this.state;

    return (
      <RenderToLayer
        open
        componentClickAway={onClose}
        render={() => (
          <div
            style={{
              position: 'absolute',
              left: position.x + positionDiffX,
              top: position.y + positionDiffY
            }}
            ref={this.refContainer}
          >
            <UserCard {...props} />
          </div>
        )}
      />
    );
  }
}

export default UserCardWrapper;
