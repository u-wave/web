import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import { useMediaSources } from '../../../context/MediaSourceContext';
import SourcePickerElement from './SourcePickerElement';

const popoverPosition = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
};

const {
  useRef,
  useState,
} = React;

function SourcePicker({
  className,
  selected,
  onChange,
}) {
  const {
    getMediaSource,
    getAllMediaSources,
  } = useMediaSources();

  const refContainer = useRef(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setAnchor(refContainer.current);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (sourceName) => {
    setOpen(false);
    onChange(sourceName);
  };

  const sourceNames = Object.keys(getAllMediaSources());
  const sources = sourceNames.filter((name) => name !== selected).map((sourceName) => (
    <button
      type="button"
      className="SourcePicker-item"
      key={sourceName}
      onClick={() => handleChange(sourceName)}
    >
      <SourcePickerElement
        name={sourceName}
        source={getMediaSource(sourceName)}
        active={selected === sourceName}
      />
    </button>
  ));

  return (
    <div
      className={cx('SourcePicker', className)}
      ref={refContainer}
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
        open={open}
        anchorEl={anchor}
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
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SourcePicker;
