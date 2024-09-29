import cx from 'clsx';
import { useCallback, useId, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import formatDuration from 'format-duration';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  mdiHeadphones,
  mdiMusicNote,
  mdiPlay,
  mdiStop,
  mdiSwapHorizontal,
} from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import TextField from '../../Form/TextField';
import Chapters from './Chapters';
import type { Media } from '../../../reducers/booth';

// naive HH:mm:ss → seconds
function parseDuration(str: string) {
  return str.split(':')
    .map((part) => parseInt(part.trim(), 10))
    .reduce((duration, part) => (duration * 60) + part, 0);
}

const BASE_TAB_INDEX = 1000;

type Chapter = {
  start: number,
  end: number,
  title: string,
};

function hasChapters(
  sourceData: Record<string, unknown> | null,
): sourceData is { chapters: Chapter[] } {
  return sourceData != null
    && Array.isArray(sourceData.chapters)
    && sourceData.chapters.every((chapter) => (
      typeof chapter === 'object'
        && chapter != null
        && 'start' in chapter
        && typeof chapter.start === 'number'
        && 'end' in chapter
        && typeof chapter.end === 'number'
        && 'title' in chapter
        && typeof chapter.title === 'string'
    ));
}

type EditMediaDialogProps = {
  media: Media,
  open: boolean,
  bodyClassName?: string,
  contentClassName?: string,
  titleClassName?: string,
  onEditedMedia: (update: { artist: string, title: string, start: number, end: number }) => void,
  onCloseDialog: () => void,
};
function EditMediaDialog({
  media,
  open,
  bodyClassName,
  contentClassName,
  titleClassName,
  onEditedMedia,
  onCloseDialog,
}: EditMediaDialogProps) {
  const { t } = useTranslator();
  const id = useId();
  const ariaTitle = `${id}-title`;
  const startFieldId = `${id}-start`;
  const endFieldId = `${id}-end`;

  const [errors, setErrors] = useState<string[] | null>(null);
  const [artist, setArtist] = useState(media.artist);
  const [title, setTitle] = useState(media.title);
  const [start, setStart] = useState(formatDuration(media.start * 1000));
  const [end, setEnd] = useState(formatDuration(media.end * 1000));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startSeconds = parseDuration(start);
    const endSeconds = parseDuration(end);

    const errorLabels = [];
    if (Number.isNaN(startSeconds) || startSeconds < 0) {
      errorLabels.push('invalidStartTime');
    }
    if (Number.isNaN(endSeconds) || endSeconds < 0) {
      errorLabels.push('invalidEndTime');
    } else if (endSeconds < startSeconds) {
      errorLabels.push('endTimeBeforeStart');
    } else if (endSeconds > media.duration) {
      errorLabels.push('endTimeAfterSongEnd');
    }

    if (errorLabels.length > 0) {
      setErrors(errorLabels);
      return;
    }

    onEditedMedia({
      artist,
      title,
      start: startSeconds,
      end: endSeconds,
    });
    onCloseDialog();
  };

  const handleChangeArtist = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setArtist(event.currentTarget.value);
  }, []);

  const handleChangeTitle = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  }, []);

  const handleChangeStart = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setStart(event.currentTarget.value);
  }, []);

  const handleChangeEnd = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setEnd(event.currentTarget.value);
  }, []);

  const handleChangeChapter = useCallback((chapter: Chapter) => {
    setStart(formatDuration(chapter.start * 1000));
    setEnd(formatDuration(chapter.end * 1000));
  }, []);

  const handleSwapArtistTitle = useCallback(() => {
    setArtist(title);
    setTitle(artist);
  }, [artist, title]);

  const artistInput = (
    <TextField
      className="EditMediaDialogGroup-field"
      placeholder={t('dialogs.editMedia.artistLabel') ?? t('media.artist')}
      value={artist}
      onChange={handleChangeArtist}
      icon={<SvgIcon path={mdiHeadphones} />}
      tabIndex={BASE_TAB_INDEX}
      autoFocus
    />
  );
  const artistTitleLabel = (
    <div className="EditMediaDialogGroup-label">
      <Tooltip title={t('dialogs.editMedia.swapArtistTitle')} placement="top">
        <IconButton onClick={handleSwapArtistTitle} tabIndex={BASE_TAB_INDEX + 1} style={{ color: '#9f9d9e' }}>
          <SvgIcon path={mdiSwapHorizontal} />
        </IconButton>
      </Tooltip>
    </div>
  );
  const titleInput = (
    <TextField
      className="EditMediaDialogGroup-field"
      placeholder={t('dialogs.editMedia.titleLabel') ?? t('media.title')}
      value={title}
      onChange={handleChangeTitle}
      icon={<SvgIcon path={mdiMusicNote} />}
      tabIndex={BASE_TAB_INDEX + 2}
    />
  );

  const fromLabel = (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={startFieldId} className="EditMediaDialogGroup-label">
      {t('dialogs.editMedia.playFromLabel')}
    </label>
  );
  const fromInput = (
    <TextField
      id={startFieldId}
      className="EditMediaDialogGroup-field"
      placeholder="0:00"
      value={start}
      onChange={handleChangeStart}
      icon={<SvgIcon path={mdiPlay} />}
      tabIndex={BASE_TAB_INDEX + 3}
    />
  );
  const toLabel = (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label htmlFor={endFieldId} className="EditMediaDialogGroup-label">
      {t('dialogs.editMedia.playToLabel')}
    </label>
  );
  const toInput = (
    <TextField
      id={endFieldId}
      className="EditMediaDialogGroup-field"
      placeholder={formatDuration(media.duration * 1000)}
      value={end}
      onChange={handleChangeEnd}
      icon={<SvgIcon path={mdiStop} />}
      tabIndex={BASE_TAB_INDEX + 4}
    />
  );

  const chapters = hasChapters(media.sourceData) && media.sourceData.chapters.length > 0 ? (
    <FormGroup className="FormGroup--noSpacing EditMediaDialog-chapters">
      <p className="EditMediaDialog-chaptersLabel">
        {t('dialogs.editMedia.chapterLabel')}
      </p>
      <Chapters
        className="EditMediaDialog-chaptersList"
        available={media.sourceData.chapters}
        start={parseDuration(start)}
        end={parseDuration(end)}
        onChange={handleChangeChapter}
        tabIndex={BASE_TAB_INDEX + 5}
      />
    </FormGroup>
  ) : null;

  const form = (
    <Form onSubmit={handleSubmit}>
      {errors && errors.length > 0 && (
        <FormGroup>
          {errors.map((error) => (
            <div>{t(`dialogs.editMedia.errors.${error}`)}</div>
          ))}

        </FormGroup>
      )}

      <div className="EditMediaDialogForm">
        <div className="EditMediaDialogForm-column">
          <FormGroup className="EditMediaDialogGroup">
            {artistInput}
          </FormGroup>
          <FormGroup className="EditMediaDialogGroup">
            {fromLabel}
            {fromInput}
          </FormGroup>
        </div>
        <div className="EditMediaDialogForm-separator">
          <FormGroup className="EditMediaDialogGroup">
            {artistTitleLabel}
          </FormGroup>
          <FormGroup className="EditMediaDialogGroup">
            {toLabel}
          </FormGroup>
        </div>
        <div className="EditMediaDialogForm-column">
          <FormGroup className="EditMediaDialogGroup">
            {titleInput}
          </FormGroup>
          <FormGroup className="EditMediaDialogGroup">
            {toInput}
          </FormGroup>
        </div>
      </div>

      {chapters}

      <FormGroup>
        <Button className="EditMediaDialog-submit" tabIndex={BASE_TAB_INDEX + 6}>
          {t('dialogs.editMedia.save')}
        </Button>
      </FormGroup>
    </Form>
  );

  return (
    <DialogCloseAnimation delay={450}>
      {open ? (
        <Dialog
          classes={{
            paper: cx('Dialog', 'EditMediaDialog', contentClassName),
          }}
          open={open}
          onClose={onCloseDialog}
          aria-labelledby={ariaTitle}
        >
          <DialogTitle id={ariaTitle} className={cx('Dialog-title', titleClassName)}>
            {t('dialogs.editMedia.title')}
          </DialogTitle>
          <DialogContent className={cx('Dialog-body', bodyClassName)}>
            {form}
          </DialogContent>
        </Dialog>
      ) : null}
    </DialogCloseAnimation>
  );
}

export default EditMediaDialog;
