import * as React from 'react';
import mapProps from 'recompose/mapProps';
import componentFromProp from 'recompose/componentFromProp';
import UsersList from '../../containers/UsersList';
import BansList from '../../containers/BansList';

const pages = {
  main: () => <h1>Admin</h1>,
  users: UsersList,
  bans: BansList
};

const enhance = mapProps(props => ({
  component: pages[props.page]
}));

const CurrentPage = enhance(componentFromProp('component'));

export default CurrentPage;
