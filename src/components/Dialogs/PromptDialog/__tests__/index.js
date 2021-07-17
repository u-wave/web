import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import PromptDialog from '..';

const cache = createCache({ key: 'emc' });

describe('<PromptDialog />', () => {
  it('should not show if there is no error', () => {
    const onSubmit = sinon.spy((value) => {
      expect(value).toEqual('test');
    });
    const onCancel = sinon.spy();

    const dialog = render((
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
    const input = dialog.getByRole('textbox');
    userEvent.type(input, 'test');

    const submit = dialog.getByRole('button');
    userEvent.click(submit);

    expect(onSubmit.calledOnce).toEqual(true);
    expect(onCancel.called).toEqual(false);

    dialog.unmount();
  });
});
