import { CSSTransition, TransitionGroup } from 'react-transition-group';

type OverlaysProps = {
  children: React.ReactElement | React.ReactElement[],
  active?: string | null,
};
function Overlays({ children, active }: OverlaysProps) {
  let view;
  if (Array.isArray(children)) {
    view = children.find((child) => child.key === active);
  } else if (children.key === active) {
    view = children;
  }

  if (view) {
    // Pass on the `view.key` so that overlays are mounted and unmounted correctly
    // when switching from one to the other.
    view = (
      <CSSTransition
        key={view.key}
        mountOnEnter
        unmountOnExit
        classNames="Overlay"
        timeout={180}
      >
        {view}
      </CSSTransition>
    );
  }

  return (
    <TransitionGroup className="Overlays">
      {view}
    </TransitionGroup>
  );
}

export default Overlays;
