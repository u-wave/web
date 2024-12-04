import { AnimatePresence } from 'motion/react';

type OverlaysProps = {
  children: React.ReactElement | React.ReactElement[],
  active: string | null | undefined,
};
function Overlays({ children, active }: OverlaysProps) {
  let view;
  if (Array.isArray(children)) {
    view = children.find((child) => child.key === active);
  } else if (children.key === active) {
    view = children;
  }
  return (
    <div className="Overlays">
      <AnimatePresence>
        {view}
      </AnimatePresence>
    </div>
  );
}

export default Overlays;
