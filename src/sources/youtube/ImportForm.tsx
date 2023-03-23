import { useRef, useTransition } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { mdiPlaylistPlay } from '@mdi/js';
import { useDispatch } from '../../hooks/useRedux';
import ImportSourceBlock from '../../components/PlaylistManager/Import/ImportSourceBlock';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/Group';
import TextField from '../../components/Form/TextField';
import Button from '../../components/Form/Button';
import SvgIcon from '../../components/SvgIcon';
import { importFromChannel, importFromPlaylist } from './reducer';

type YoutubeImportFormProps = {
  onHideImportPanel: () => void,
  onShowImportPanel: () => void,
}
function YoutubeImportForm({
  onHideImportPanel,
  onShowImportPanel,
}: YoutubeImportFormProps) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const refChannel = useRef<HTMLInputElement>(null);
  const refPlaylist = useRef<HTMLInputElement>(null);

  const handleImportChannel = (event: React.FormEvent) => {
    event.preventDefault();
    const url = refChannel.current.value;
    startTransition(() => {
      onShowImportPanel();
      dispatch(importFromChannel({ url }));
    });
  };

  const handleImportPlaylist = (event: React.FormEvent) => {
    event.preventDefault();
    const url = refPlaylist.current.value;
    startTransition(() => {
      onShowImportPanel();
      dispatch(importFromPlaylist({ url }));
    });
  };

  return (
    <ImportSourceBlock
      title={t('youtube.name')}
      sourceType="youtube"
    >
      <Form onSubmit={handleImportChannel}>
        <FormGroup>
          <TextField
            ref={refChannel}
            placeholder={t('youtube.channelUrl')}
            icon={<SvgIcon path={mdiPlaylistPlay} />}
          />
        </FormGroup>
        <FormGroup>
          <Button>{t('youtube.importChannel')}</Button>
        </FormGroup>
      </Form>
      <Form onSubmit={handleImportPlaylist}>
        <FormGroup>
          <TextField
            ref={refPlaylist}
            placeholder={t('youtube.playlistUrl')}
            icon={<SvgIcon path={mdiPlaylistPlay} />}
          />
        </FormGroup>
        <FormGroup>
          <Button>{t('youtube.importPlaylist')}</Button>
        </FormGroup>
      </Form>
    </ImportSourceBlock>
  );
}

export default YoutubeImportForm;
