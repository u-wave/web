import * as React from 'react';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import UserCard from './UserCard';

const UserCardWrapper = ({ onClose, position, ...props }) => (
  <RenderToLayer
    open
    componentClickAway={onClose}
    render={() => (
      <div style={{ position: 'absolute', left: position.x, top: position.y }}>
        <UserCard {...props} />
      </div>
    )}
  />
);

UserCardWrapper.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  position: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }).isRequired
};

export default UserCardWrapper;
