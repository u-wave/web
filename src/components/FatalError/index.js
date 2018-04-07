import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
          variant="raised"
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
