/// <reference types="@testing-library/jest-dom/vitest" />
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SongTitle from './index';

describe('<SongTitle />', () => {
  it('should have hover title text', () => {
    const result = render(<SongTitle artist="Artist" title="Song!" />);
    expect(result.getByTestId('SongTitle')).toHaveAttribute('title', 'Artist – Song!');
  });

  it('should open if there is an error', () => {
    const result = render(<SongTitle artist="Artist" title="Song!" />);
    expect(result.baseElement).toHaveTextContent('Artist – Song!');
  });
});
