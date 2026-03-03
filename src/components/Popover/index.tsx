import cx from 'clsx';
import {
  createContext, use, useId, useImperativeHandle, useState, type SetStateAction,
} from 'react';
import MuiPopover from '@mui/material/Popover';
import Paper, { type PaperProps } from '@mui/material/Paper';

type PopoverContext = {
  id: string,
  /** Only used in MUI implementation */
  open: boolean,
  setOpen: (open: SetStateAction<boolean>) => void,
  button: null | HTMLButtonElement,
  setButton: (button: null | HTMLButtonElement) => void,
}
const PopoverContext = createContext<PopoverContext | null>(null);

function usePopoverContext() {
  const context = use(PopoverContext);
  if (context == null) {
    throw new TypeError('Missing PopoverContext');
  }
  return context;
}

type RootProps = {
  children: React.ReactNode,
};
export function Root({ children }: RootProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [button, setButton] = useState<null | HTMLButtonElement>(null);
  const context = {
    id, open, setOpen, button, setButton,
  };

  return <PopoverContext value={context}>{children}</PopoverContext>;
}

type TriggerProps = Omit<React.ComponentPropsWithRef<'button'>, 'popoverTarget'>;
function NativeTrigger(props: TriggerProps) {
  const { id } = usePopoverContext();

  return <button popoverTarget={id} {...props} />;
}

function MuiTrigger(props: TriggerProps) {
  const { setButton, setOpen } = usePopoverContext();

  return (
    <button
      ref={setButton}
      {...props}
      onClick={(event) => {
        setOpen((value) => !value);
        props.onClick?.(event);
      }}
    />
  );
}

export type ContentRef = { hidePopover(): void };

type ContentProps = Omit<PaperProps, 'id' | 'ref'> & {
  ref?: React.RefObject<ContentRef | null>,
  direction?: 'top' | 'bottom',
};
function NativeContent({
  ref,
  className,
  direction = 'bottom',
  ...props
}: ContentProps) {
  const { id } = usePopoverContext();

  return (
    <Paper
      id={id}
      className={cx('Popover', className)}
      data-side={direction}
      popover="auto"
      // Cast the ref object: it's populated by `Paper`, and has _more_ properties
      // than required by `ref`'s type, so it's actually safe.
      ref={ref as React.RefObject<HTMLDivElement | null>}
      {...props}
    />
  );
}

function MuiContent({
  ref,
  className,
  direction = 'bottom',
  ...props
}: ContentProps) {
  const { open, button, setOpen } = usePopoverContext();

  useImperativeHandle(ref, () => {
    return { hidePopover: () => setOpen(false) };
  }, []);

  return (
    <MuiPopover
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: className }}
      anchorEl={button}
      anchorOrigin={{
        vertical: direction,
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: direction === 'top' ? 'bottom' : 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  );
}

const supportsNativePopover = 'popoverTargetElement' in HTMLButtonElement.prototype;

export const Trigger = supportsNativePopover ? NativeTrigger : MuiTrigger;
export const Content = supportsNativePopover ? NativeContent : MuiContent;
