import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main';

const pages = {
  main: Main,
  users: React.lazy(() => import('../../containers/UsersList')),
  bans: React.lazy(() => import('../../containers/BansList')),
  config: React.lazy(() => import('../../containers/ServerConfig')),
};

function CurrentPage({ page, ...props }) {
  const PageComponent = pages[page];

  return <PageComponent {...props} />;
}

CurrentPage.propTypes = {
  page: PropTypes.string.isRequired,
};

export default CurrentPage;
