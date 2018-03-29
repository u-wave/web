import React from 'react';
import PropTypes from 'prop-types';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import UserCard from './UserCard';

class UserCardWrapper extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    positionDiffX: 0,
    positionDiffY: 0,
  };

  componentDidMount() {
    this.shouldFit = true;
  }

  componentDidUpdate() {
    this.shouldFit = true;
  }

  fitInsideWindow() {
    if (!this.container) {
      return;
    }

    const card = this.container.firstChild;
    const rect = card.getBoundingClientRect();
    const offsetBottom = window.innerHeight - rect.bottom;
    if (offsetBottom < 0) {
      this.setState({
        positionDiffY: offsetBottom - 1,
      });
    }
  }

  refContainer = (container) => {
    this.container = container;
    if (this.shouldFit && container) {
      this.fitInsideWindow();
    }
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
              top: position.y + positionDiffY,
            }}
            ref={this.refContainer}
          >
            <div className="UserCardWrapper">
              <UserCard {...props} />
            </div>
          </div>
        )}
      />
    );
  }
}

export default UserCardWrapper;
