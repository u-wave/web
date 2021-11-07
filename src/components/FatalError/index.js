import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function reload() {
  window.location.reload();
}

const FatalError = ({ error }) => (
  <div className="FatalError">
    <Card
      raised
      className="FatalError-paper"
    >
      <CardContent>
        <Typography variant="headline">üWave Crashed</Typography>
        <Typography component="p">
          {error.message}
        </Typography>
        <Typography component="p">
          The admins have been made aware of this issue.
          Please reload the page.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          className="FatalError-reload"
          onClick={reload}
          autoFocus
        >
          Reload
        </Button>
      </CardActions>
    </Card>
  </div>
);

FatalError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default FatalError;
