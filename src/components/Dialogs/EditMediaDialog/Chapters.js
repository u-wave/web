import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import formatDuration from 'format-duration';
import { useTranslator } from '@u-wave/react-translate';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../Form/Select';

function Chapters({
  className,
  available,
  start,
  end,
  onChange,
  ...props
}) {
  const { t } = useTranslator();
  const handleChange = (event) => {
    const newIndex = event.target.value;
    onChange(available[newIndex]);
  };

  const selectedIndex = available.findIndex(
    (chapter) => chapter.start === start && chapter.end === end,
  );

  return (
    <Select
      className={clsx('Chapters', className)}
      classes={{
        select: 'Chapters-select',
      }}
      onChange={handleChange}
      value={selectedIndex}
      {...props}
    >
      <MenuItem disabled value={-1}>
        <span className="Chapters-placeholder">
          {t('dialogs.editMedia.chapterCount', { count: available.length })}
        </span>
      </MenuItem>
      {available.map((chapter, index) => (
        <MenuItem className="ChapterItem" value={index}>
          <span className="ChapterItem-title">
            {chapter.title}
          </span>
          <span className="ChapterItem-duration">
            {formatDuration((chapter.end - chapter.start) * 1000)}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
}

Chapters.propTypes = {
  className: PropTypes.string,
  available: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Chapters;
