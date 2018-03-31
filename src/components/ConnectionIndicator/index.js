import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Card from 'material-ui-next/Card/Card'; // eslint-disable-line
import CardHeader from 'material-ui-next/Card/CardHeader'; // eslint-disable-line
import OfflineIcon from './OfflineIcon';

const enhance = translate();

const ConnectionIndicator = ({ isConnected, t }) => (
  isConnected ? null : (
    <div className="ConnectionIndicator-position">
      <Card>
        <CardHeader
          title={t('server.connectionLost')}
          subheader={t('server.reconnecting')}
          avatar={<OfflineIcon />}
        />
      </Card>
    </div>
  )
);

ConnectionIndicator.propTypes = {
  t: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default enhance(ConnectionIndicator);
