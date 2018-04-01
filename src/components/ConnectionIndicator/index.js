import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
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
