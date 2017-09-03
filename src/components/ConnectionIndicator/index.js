import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import OfflineIcon from './OfflineIcon';

const enhance = translate();

const positionStyle = {
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 55
};

const ConnectionIndicator = enhance(({ isConnected, t }) => (
  isConnected ? null : (
    <div style={positionStyle}>
      <Card>
        <CardHeader
          title={t('server.connectionLost')}
          subtitle={t('server.reconnecting')}
          avatar={<OfflineIcon />}
        />
      </Card>
    </div>
  )
));

ConnectionIndicator.propTypes = {
  t: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired
};

export default ConnectionIndicator;
