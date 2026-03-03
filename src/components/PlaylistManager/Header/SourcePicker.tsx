import cx from 'clsx';
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { mdiMenuDown } from '@mdi/js';
import { useMediaSources } from '../../../context/MediaSourceContext';
import SvgIcon from '../../SvgIcon';
import SourcePickerElement from './SourcePickerElement';

type SourcePickerProps = {
  className?: string,
  selected: string,
  onChange: (sourceName: string) => void,
};
function SourcePicker({ className, selected, onChange }: SourcePickerProps) {
  const id = useId();
  const { getMediaSource, getAllMediaSources } = useMediaSources();
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleChange = useCallback((sourceName: string) => {
    onChange(sourceName);
    popoverRef.current?.hidePopover();
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
    <div className={cx('SourcePicker', className)}>
      <button
        type="button"
        className="SourcePicker-active"
        popoverTarget={id}
      >
        <SourcePickerElement name={selected} source={selectedSource} active />
        <SvgIcon path={mdiMenuDown} className="SourcePicker-arrow" />
      </button>
      <Paper
        className="SourcePicker-list"
        ref={popoverRef}
        id={id}
        popover="auto"
      >
        {sources}
      </Paper>
    </div>
  );
}

export default SourcePicker;
