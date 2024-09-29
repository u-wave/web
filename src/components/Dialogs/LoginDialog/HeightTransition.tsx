import { useEffect, useRef } from 'react';

const style = {
  overflow: 'hidden',
  transition: 'height 300ms ease',
};

type HeightTransitionProps = {
  children: React.ReactNode,
};
function HeightTransition({ children }: HeightTransitionProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const activeChild = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChild.current != null && wrapper.current != null) {
      wrapper.current.style.height = `${activeChild.current.scrollHeight}px`;
    }
  }, [children]);

  return (
    <div ref={wrapper} style={style}>
      <div ref={activeChild}>{children}</div>
    </div>
  );
}

export default HeightTransition;
