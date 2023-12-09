import cx from 'clsx';

type SourcePickerElementProps = {
  className?: string,
  name: string,
  source: { logo: URL },
  active: boolean,
};
function SourcePickerElement({
  className,
  name,
  source,
  active,
}: SourcePickerElementProps) {
  return (
    <div
      className={cx(
        'SourcePickerElement',
        `SourcePickerElement--${name}`,
        active && 'SourcePickerElement--active',
        className,
      )}
      style={{ backgroundImage: `url(${source.logo})` }}
    />
  );
}

export default SourcePickerElement;
