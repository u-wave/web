import clsx from 'clsx';
import formatDuration from 'format-duration';
import { useTranslator } from '@u-wave/react-translate';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../Form/Select';

type Chapter = {
  start: number,
  end: number,
  title: string,
};
type ChaptersProps = {
  className?: string,
  available: Chapter[],
  start: number,
  end: number,
  tabIndex: number,
  onChange: (value: Chapter) => void,
};
function Chapters({
  className,
  available,
  start,
  end,
  tabIndex,
  onChange,
}: ChaptersProps) {
  const { t } = useTranslator();
  const handleChange = (event: React.FormEvent<{ value: number }>) => {
    const newIndex = event.currentTarget.value;
    if (available[newIndex] != null) {
      onChange(available[newIndex]);
    }
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
      tabIndex={tabIndex}
    >
      <MenuItem disabled value={-1}>
        <span className="Chapters-placeholder">
          {t('dialogs.editMedia.chapterCount', { count: available.length })}
        </span>
      </MenuItem>
      {available.map((chapter, index) => (
        <MenuItem className="ChapterItem" value={index} key={`${chapter.start}-${chapter.end}`}>
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

export default Chapters;
