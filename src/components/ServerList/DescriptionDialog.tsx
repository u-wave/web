import { lazy, Suspense } from 'react';
import stripIndent from 'strip-indent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Server } from './';

const Markdown = lazy(() => import('react-markdown'));

type DescriptionDialogProps = {
  server: Server & { description: string },
  isOpen: boolean,
  onCloseDescription: () => void,
};
function DescriptionDialog({ server, isOpen, onCloseDescription }: DescriptionDialogProps) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const contentStyle = {
    width: `${theme.breakpoints.values.sm}px`,
  };

  return (
    <Suspense fallback={null}>
      <Dialog
        className="usl-DescriptionDialog"
        open={isOpen}
        fullScreen={isFullScreen}
        onClose={onCloseDescription}
      >
        <DialogTitle>
          {server.name}
        </DialogTitle>
        <DialogContent>
          <div className="usl-DescriptionDialog-markdown" style={contentStyle}>
            <Markdown>{stripIndent(server.description)}</Markdown>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={onCloseDescription}
          >
            Close
          </Button>
          <Button
            color="primary"
            variant="contained"
            href={server.url}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Suspense>
  );
}

export default DescriptionDialog;
