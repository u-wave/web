import React from 'react';

const Filter = () => (
  <input type="text" className="AdminUserHeader-filter" />
);

const Header = () => (
  <div className="AdminUserHeader">
    <span>Managing Users:</span>
    <span>
      Filter User:
      <Filter />
    </span>
  </div>
);

export default Header;
