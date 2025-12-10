import React from 'react';
import FatalError from '../FatalError';

export default class CrashHandler extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      error: null,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error != null) {
      return (
        <FatalError error={error} />
      );
    }

    return children;
  }
}
