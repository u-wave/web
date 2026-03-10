import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card, { CardActions, CardContent } from '../Card';

function reload() {
  window.location.reload();
}

type FatalErrorProps = {
  error: Error,
};
function FatalError({ error }: FatalErrorProps) {
  return (
    <div className="FatalError">
      <Card
        raised
        className="FatalError-paper"
      >
        <CardContent>
          <Typography variant="h6" component="h1">üWave Crashed</Typography>
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
}

export default FatalError;
