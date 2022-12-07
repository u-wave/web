import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import PromptDialog from '..';

const cache = createCache({ key: 'emc' });

describe('<PromptDialog />', () => {
  it('should not show if there is no error', async () => {
    const onSubmit = jest.fn((value) => {
      expect(value).toEqual('test');
    });
    const onCancel = jest.fn();

    render((
      <CacheProvider value={cache}>
        <PromptDialog
          open
          title="Test Prompt"
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </CacheProvider>
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
