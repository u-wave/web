import React from 'react';
import sinon from 'sinon';
import expect from 'expect';
import { mount } from 'enzyme';
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

    const dialog = mount((
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
    const input = dialog.find('input[type="text"]');
    input.instance().value = 'test';
    input.simulate('change', { target: input.instance() });

    const form = dialog.find('form');
    form.simulate('submit');

    expect(onSubmit.calledOnce).toEqual(true);
    expect(onCancel.called).toEqual(false);

    dialog.unmount();
  });
});
