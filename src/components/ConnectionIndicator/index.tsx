import { useTranslator } from '@u-wave/react-translate';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';

type OfflineIconProps = {
  style?: React.CSSProperties,
};
function OfflineIcon({ style }: OfflineIconProps) {
  return (
    <div
      style={{
        ...style,
        width: 32,
        height: 32,
        display: 'inline-block',
      }}
    >
      <CircularProgress size={32} />
    </div>
  );
}

type ConnectionIndicatorProps = {
  isConnected: boolean,
};
function ConnectionIndicator({ isConnected }: ConnectionIndicatorProps) {
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

export default ConnectionIndicator;
