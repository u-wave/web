import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MuiList from 'material-ui/List';
import List from 'react-list';
import RoomUserRow from './Row';
import GuestsRow from './GuestsRow';

const RoomUserList = ({ className, users, guests }) => {
  const showGuests = guests > 0;
  // The "and X guests" row is implemented somewhat hackily as an extra user
  // row. To render properly at the end of the list, it needs to be rendered as
  // an element of the list--so we tell react-list that we have an extra row
  // when th guests row is shown.
  const length = users.length + (showGuests ? 1 : 0);
  return (
    <div className={cx('UserList', 'UserList--online', className)}>
      <List
        itemsRenderer={(children, ref) => (
          <MuiList
            ref={(list) => {
              ref(list && ReactDOM.findDOMNode(list)); // eslint-disable-line react/no-find-dom-node
            }}
          >
            {children}
          </MuiList>
        )}
        itemRenderer={(index, key) => {
          const rowClass = cx(
            'UserList-row',
            (index % 2 === 0) && 'UserList-row--alternate',
          );
          // The very last row is the guests row
          if (index === users.length) {
            return (
              <GuestsRow
                key={key}
                className={rowClass}
                guests={guests}
              />
            );
          }
          return (
            <RoomUserRow
              key={key}
              className={rowClass}
              user={users[index]}
            />
          );
        }}
        length={length}
        type="uniform"
      />
    </div>
  );
};

RoomUserList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  guests: PropTypes.number.isRequired,
};

export default RoomUserList;
