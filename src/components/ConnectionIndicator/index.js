import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader';
import OfflineIcon from './OfflineIcon';

function ConnectionIndicator({ isConnected }) {
  const { t } = useTranslator();

  if (isConnected) {
    return null;
  }

  return (
    <div className="ConnectionIndicator-position">
      <Card>
        <CardHeader
          title={t('server.connectionLost')}
          subheader={t('server.reconnecting')}
          avatar={<OfflineIcon />}
        />
      </Card>
    </div>
  );
}

ConnectionIndicator.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ConnectionIndicator;
