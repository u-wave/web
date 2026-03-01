import cx from 'clsx';

type SwitchProps = React.ComponentPropsWithoutRef<'input'>;
export default function Switch(props: SwitchProps) {
  return (
    <input {...props} type="checkbox" className={cx('Switch', props.className)} />
  );
}
