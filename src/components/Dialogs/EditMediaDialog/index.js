import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import formatDuration from 'format-duration';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArtistIcon from '@mui/icons-material/Headset';
import TitleIcon from '@mui/icons-material/MusicNote';
import StartIcon from '@mui/icons-material/PlayArrow';
import EndIcon from '@mui/icons-material/Stop';
import SwapArtistTitleIcon from '@mui/icons-material/SwapHoriz';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import TextField from '../../Form/TextField';
import Chapters from './Chapters';

const {
  useCallback,
  useId,
  useState,
} = React;

// naive HH:mm:ss → seconds
const parseDuration = (str) => str.split(':')
  .map((part) => parseInt(part.trim(), 10))
  .reduce((duration, part) => (duration * 60) + part, 0);

const BASE_TAB_INDEX = 1000;

function EditMediaDialog({
  media,
  open,
  bodyClassName,
  contentClassName,
  titleClassName,
  onEditedMedia,
  onCloseDialog,
}) {
  const { t } = useTranslator();
  const id = useId();
  const ariaTitle = `${id}-title`;
  const startFieldId = `${id}-start`;
  const endFieldId = `${id}-end`;

  const [errors, setErrors] = useState(null);
  const [artist, setArtist] = useState(media.artist);
  const [title, setTitle] = useState(media.title);
  const [start, setStart] = useState(formatDuration(media.start * 1000));
  const [end, setEnd] = useState(formatDuration(media.end * 1000));

  const handleSubmit = (e) => {
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

  const handleChangeArtist = useCallback((event) => {
    setArtist(event.target.value);
  }, []);

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeStart = useCallback((event) => {
    setStart(event.target.value);
  }, []);

  const handleChangeEnd = useCallback((event) => {
    setEnd(event.target.value);
  }, []);

  const handleChangeChapter = useCallback((chapter) => {
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
      icon={<ArtistIcon htmlColor="#9f9d9e" />}
      tabIndex={BASE_TAB_INDEX}
      autoFocus
    />
  );
  const artistTitleLabel = (
    <div className="EditMediaDialogGroup-label">
      <IconButton onClick={handleSwapArtistTitle} tabIndex={BASE_TAB_INDEX + 1}>
        <SwapArtistTitleIcon htmlColor="#9f9d9e" />
      </IconButton>
    </div>
  );
  const titleInput = (
    <TextField
      className="EditMediaDialogGroup-field"
      placeholder={t('dialogs.editMedia.titleLabel') ?? t('media.title')}
      value={title}
      onChange={handleChangeTitle}
      icon={<TitleIcon htmlColor="#9f9d9e" />}
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
      icon={<StartIcon htmlColor="#9f9d9e" />}
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
      icon={<EndIcon htmlColor="#9f9d9e" />}
      tabIndex={BASE_TAB_INDEX + 4}
    />
  );

  const chapterCount = media.sourceData?.chapters?.length ?? 0;
  const chapters = chapterCount > 0 ? (
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

EditMediaDialog.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.object,
  bodyClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  onEditedMedia: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default EditMediaDialog;
