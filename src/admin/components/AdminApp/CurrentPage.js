import mapProps from 'recompose/mapProps';
import componentFromProp from 'recompose/componentFromProp';
import Main from '../Main';
import UsersList from '../../containers/UsersList';
import BansList from '../../containers/BansList';

const pages = {
  main: Main,
  users: UsersList,
  bans: BansList,
};

const enhance = mapProps(({ page }) => ({
  component: pages[page],
}));

const CurrentPage = enhance(componentFromProp('component'));

export default CurrentPage;
