import { useTranslator } from '@u-wave/react-translate';
import cx from 'clsx';
import formatDuration from 'format-duration';
import Select, { MenuItem } from '../../Select';

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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = Number(event.target.value);
    if (available[newIndex] != null) {
      onChange(available[newIndex]);
    }
  };

  const selectedIndex = available.findIndex(
    (chapter) => chapter.start === start && chapter.end === end,
  );

  // Elements with `ChapterItem-hidden` classes are for browsers that don't support styled select,
  // so it reads like "Chapter (1:22)" instead of "Chapter1:22"

  return (
    <Select
      className={cx('Chapters', className)}
      variant="outlined"
      onChange={handleChange}
      value={String(selectedIndex)}
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
          <span className="ChapterItem-hidden">{' ('}</span>
          <span className="ChapterItem-duration">
            {formatDuration((chapter.end - chapter.start) * 1000)}
          </span>
          <span className="ChapterItem-hidden">)</span>
        </MenuItem>
      ))}
    </Select>
  );
}

export default Chapters;
