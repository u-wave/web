import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
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

  refContainer = (container) => {
    this.container = container;
    if (this.shouldFit && container) {
      this.fitInsideWindow();
    }
  };

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

  render() {
    const {
      onClose,
      position,
      ...props
    } = this.props;
    const { positionDiffX, positionDiffY } = this.state;

    return (
      <Modal
        open
        BackdropProps={{ invisible: true }}
        onClose={onClose}
      >
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
      </Modal>
    );
  }
}

export default UserCardWrapper;
