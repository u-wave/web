import cx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import Popover, { type PopoverProps } from '@mui/material/Popover';
import { mdiMenuDown } from '@mdi/js';
import { useMediaSources } from '../../../context/MediaSourceContext';
import SvgIcon from '../../SvgIcon';
import SourcePickerElement from './SourcePickerElement';

const popoverPosition = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
} satisfies Partial<PopoverProps>;

type SourcePickerProps = {
  className?: string,
  selected: string,
  onChange: (sourceName: string) => void,
};
function SourcePicker({ className, selected, onChange }: SourcePickerProps) {
  const { getMediaSource, getAllMediaSources } = useMediaSources();
  const [isOpen, setOpen] = useState(false);
  const container = useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleChange = useCallback((sourceName: string) => {
    onChange(sourceName);
    setOpen(false);
  }, [onChange]);

  const sources = Object.entries(getAllMediaSources())
    .filter(([name]) => name !== selected)
    .map(([name, source]) => (
      <button
        type="button"
        className="SourcePicker-item"
        key={name}
        onClick={() => handleChange(name)}
      >
        <SourcePickerElement name={name} source={source} active={false} />
      </button>
    ));
  const selectedSource = getMediaSource(selected)!;

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
        <SourcePickerElement name={selected} source={selectedSource} active />
        <SvgIcon path={mdiMenuDown} className="SourcePicker-arrow" />
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

export default SourcePicker;
