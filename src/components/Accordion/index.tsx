import cx from 'clsx';
import {} from 'react';
import SvgIcon from '../SvgIcon';

export type AccordionActionsProps = {
  className?: string,
  children?: React.ReactNode,
};
export function AccordionActions({ className, children }: AccordionActionsProps) {
  return <div className={cx('Accordion-actions', className)}>{children}</div>;
}

export type AccordionDetailsProps = {
  className?: string,
  children?: React.ReactNode,
};
export function AccordionDetails({ className, children }: AccordionDetailsProps) {
  return <div className={cx('Accordion-details', className)}>{children}</div>;
}

/** A CSS class that applies a rotation animation when the Accordion expands. */
export const expandAnimationClass = 'Accordion-expandIconAnimation';

const defaultExpandIcon = (
  <SvgIcon
    className={expandAnimationClass}
    path="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
  />
);

export type AccordionSummaryProps = {
  className?: string,
  children?: React.ReactNode,
  /**
   * Icon to display as the expand indicator.
   *
   * When using a chevron-type indicator, you can apply a rotation animation by
   * adding the {@link expandAnimationClass} CSS class to the icon.
   */
  expandIcon?: React.ReactNode,
};
export function AccordionSummary({
  className,
  children,
  expandIcon = defaultExpandIcon,
}: AccordionSummaryProps) {
  return (
    <summary className={cx('Accordion-summary', className)}>
      <span className="Accordion-summaryContent">
        {children}
      </span>
      {expandIcon ? <span role="presentation" className="Accordion-expandIcon">{expandIcon}</span> : null}
    </summary>
  );
}

export type AccordionProps = {
  className?: string,
  children?: React.ReactNode,
};
/** An uncontrolled Accordion component. */
export default function Accordion({ className, children }: AccordionProps) {
  return (
    <details className={cx('Accordion', className)}>
      {children}
    </details>
  );
}
