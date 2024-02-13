import React from 'react';
import Modal from '@mui/material/Modal';
import UserCard from './UserCard';
import type { User } from '../../reducers/users';

// TODO use floating-ui or radix-ui

type UserCardWrapperProps = {
  onClose: () => void,
  position: { x: number, y: number },
  user: User,
};
type UserCardWrapperState = {
  positionDiffX: number,
  positionDiffY: number,
}
class UserCardWrapper extends React.Component<UserCardWrapperProps, UserCardWrapperState> {
  container: HTMLDivElement | null = null;

  shouldFit = true;

  constructor(props: UserCardWrapperProps) {
    super(props);

    this.state = {
      positionDiffX: 0,
      positionDiffY: 0,
    };
  }

  componentDidMount() {
    this.shouldFit = true;
  }

  componentDidUpdate() {
    this.shouldFit = true;
  }

  refContainer = (container: HTMLDivElement | null) => {
    this.container = container;
    if (this.shouldFit && container) {
      this.fitInsideWindow();
    }
  };

  fitInsideWindow() {
    if (!this.container) {
      return;
    }

    const card = this.container.firstChild as HTMLElement;
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
