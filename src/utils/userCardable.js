import React from 'react';
import UserCard from '../components/UserCard';

export default function userCardable() {
  return (Component) => {
    class CardableComponent extends React.Component {
      state = {
        open: false,
        user: null,
        position: null,
      };

      handleOpen = (user) => {
        const pos = this.container.getBoundingClientRect();
        this.setState({
          open: true,
          user,
          position: {
            x: pos.left,
            y: pos.top,
          },
        });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      refContainer = (container) => {
        this.container = container;
      };

      render() {
        const { open, position, user } = this.state;
        return (
          <div ref={this.refContainer}>
            {open && (
              <UserCard
                user={user}
                position={position}
                onClose={this.handleClose}
              />
            )}
            <Component
              {...this.props}
              openUserCard={this.handleOpen}
              closeUserCard={this.handleClose}
            />
          </div>
        );
      }
    }

    return CardableComponent;
  };
}
