import cx from 'clsx';
import { useCallback, useRef } from 'react';
import { mdiMenuDown } from '@mdi/js';
import * as Popover from '../../../components/Popover';
import { useMediaSources } from '../../../context/MediaSourceContext';
import SvgIcon from '../../SvgIcon';
import SourcePickerElement from './SourcePickerElement';

type SourcePickerProps = {
  className?: string,
  selected: string,
  onChange: (sourceName: string) => void,
};
function SourcePicker({ className, selected, onChange }: SourcePickerProps) {
  const { getMediaSource, getAllMediaSources } = useMediaSources();
  const popoverRef = useRef<Popover.ContentRef | null>(null);

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
      <Popover.Root>
        <Popover.Trigger type="button" className="SourcePicker-active">
          <SourcePickerElement name={selected} source={selectedSource} active />
          <SvgIcon path={mdiMenuDown} className="SourcePicker-arrow" />
        </Popover.Trigger>
        <Popover.Content className="SourcePicker-list" ref={popoverRef}>
          {sources}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default SourcePicker;
