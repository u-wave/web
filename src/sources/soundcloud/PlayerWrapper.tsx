import Player from './Player';
import PreviewPlayer from './PreviewPlayer';

type PlayerWrapperProps = {
  mode?: 'preview' | undefined,
} & React.ComponentProps<typeof Player>;
function PlayerWrapper({ mode, ...props }: PlayerWrapperProps) {
  if (mode === 'preview') {
    return <PreviewPlayer {...props} />;
  }
  return <Player {...props} />;
}

export default PlayerWrapper;
