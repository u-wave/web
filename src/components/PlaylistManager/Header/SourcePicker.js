import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import { useMediaSources } from '../../../context/MediaSourceContext';
import SourcePickerElement from './SourcePickerElement';

const {
  useCallback,
  useRef,
  useState,
} = React;

const popoverPosition = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
};

function SourcePicker({ className, selected, onChange }) {
  const { getMediaSource, getAllMediaSources } = useMediaSources();
  const [isOpen, setOpen] = useState(false);
  const container = useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleChange = useCallback((sourceName) => {
    onChange(sourceName);
    setOpen(false);
  }, [onChange]);

  const sourceNames = Object.keys(getAllMediaSources());
  const sources = sourceNames
    .filter((name) => name !== selected)
    .map((name) => (
      <button
        type="button"
        className="SourcePicker-item"
        key={name}
        onClick={() => handleChange(name)}
      >
        <SourcePickerElement
          name={name}
          source={getMediaSource(name)}
          active={selected === name}
        />
      </button>
    ));

  return (
    <div
      className={cx('SourcePicker', className)}
      ref={container}
    >
      <button
        type="button"
        className="SourcePicker-active"
        onClick={handleOpen}
      >
        <SourcePickerElement
          name={selected}
          source={getMediaSource(selected)}
          active
        />
        <ArrowIcon className="SourcePicker-arrow" />
      </button>
      <Popover
        classes={{ paper: 'SourcePicker-list' }}
        open={isOpen}
        anchorEl={container.current}
        onClose={handleClose}
        {...popoverPosition}
      >
        {sources}
      </Popover>
    </div>
  );
}

SourcePicker.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SourcePicker;
