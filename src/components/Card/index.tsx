import cx from 'clsx';
import Paper, { type PaperProps } from '../Paper';

export interface CardHeaderProps extends Omit<React.ComponentPropsWithRef<'div'>, 'title'> {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
}
function CardHeader({
  title,
  subheader,
  avatar,
  action,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div {...props} className={cx('CardHeader', className)}>
      {avatar ? (
        <div className="CardHeader-avatar">
          {avatar}
        </div>
      ) : null}
      <div className="CardHeader-content">
        <span className={cx(avatar ? 'CardHeader-smallTitle' : 'CardHeader-title')}>
          {title}
        </span>
        {subheader ? (
          <span className="CardHeader-subheader">
            {subheader}
          </span>
        ) : null}
      </div>
      {action ? (
        <div className="CardHeader-action">
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export type CardContentProps = React.ComponentPropsWithRef<'div'>;
function CardContent(props: CardContentProps) {
  return <div {...props} className={cx('CardContent', props.className)} />;
}

export type CardActionsProps = React.ComponentPropsWithRef<'div'>;
function CardActions(props: CardActionsProps) {
  return <div {...props} className={cx('CardActions', props.className)} />;
}

export type CardProps = Omit<PaperProps, 'elevation'> & { raised?: boolean };
function Card({ raised = false, ...props }: CardProps) {
  return (
    <Paper
      {...props}
      elevation={raised ? 8 : undefined}
      className={cx('Card', props.className)}
    />
  );
}

export default Card;
export { CardHeader, CardContent, CardActions };
