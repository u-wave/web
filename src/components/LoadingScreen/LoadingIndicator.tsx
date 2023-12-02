import CircularProgress from '@mui/material/CircularProgress';
import { mdiAlert } from '@mdi/js';
import SvgIcon from '../SvgIcon';

function LoadingIndicator() {
  return (
    <div className="LoadingIndicator">
      <CircularProgress className="LoadingIndicator-loader" />
      <div className="LoadingIndicator-warning" hidden>
        <SvgIcon path={mdiAlert} />
      </div>
      <p className="LoadingIndicator-notice">
        üWave requires JavaScript to run.
      </p>
    </div>
  );
}

export default LoadingIndicator;
