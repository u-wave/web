import Snackbar from '@mui/material/Snackbar';

type ErrorAreaProps = {
  error?: string | null,
  onDismiss: () => void,
};
function ErrorArea({ error, onDismiss }: ErrorAreaProps) {
  return (
    <div className="ErrorArea">
      <Snackbar
        ContentProps={{ className: 'ErrorArea-snackbar' }}
        open={!!error}
        message={error ?? ''}
        onClose={onDismiss}
      />
    </div>
  );
}

export default ErrorArea;
