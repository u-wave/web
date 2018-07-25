import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';
import PromptDialog from '..';

describe('<PromptDialog />', () => {
  const dom = new JSDOM();

  before(() => {
    global.window = dom.window;
    global.document = dom.window.document;
  });
  after(() => {
    delete global.window;
    delete global.document;
    dom.window.close();
  });

  it('should not show if there is no error', () => {
    const onSubmit = sinon.spy((value) => {
      expect(value).to.equal('test');
    });
    const onCancel = sinon.spy();

    const dialog = mount((
      <PromptDialog
        open
        title="Test Prompt"
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    ));

    // Type "test" into the prompt input
    const input = dialog.find('input[type="text"]');
    input.instance().value = 'test';
    input.simulate('change', { target: input.instance() });

    const form = dialog.find('form');
    form.simulate('submit');

    expect(onSubmit.calledOnce).to.equal(true);
    expect(onCancel.called).to.equal(false);
  });
});
