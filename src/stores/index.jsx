/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { MediaSearchStoreProvider } from './MediaSearchStore';

export function AllStoresProvider({ children }) {
  return (
    <MediaSearchStoreProvider>
      {children}
    </MediaSearchStoreProvider>
  );
}

AllStoresProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
