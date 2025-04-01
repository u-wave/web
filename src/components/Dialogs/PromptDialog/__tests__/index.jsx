import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromptDialog from '..';

describe('<PromptDialog />', () => {
  it('should not show if there is no error', async () => {
    const onSubmit = vi.fn((value) => {
      expect(value).toBe('test');
    });
    const onCancel = vi.fn();

    render((
      <PromptDialog
        open
        title="Test Prompt"
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    ));

    // Type "test" into the prompt input
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    const submit = screen.getByRole('button');
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });
});
