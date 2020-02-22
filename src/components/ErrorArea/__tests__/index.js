import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ErrorArea from '..';

describe('<ErrorArea />', () => {
  it('should not show if there is no error', () => {
    expect(shallow((
      <ErrorArea
        error={null}
        onDismiss={() => {}}
      />
    )).childAt(0)).to.have.prop('open', false);
  });

  it('should open if there is an error', () => {
    expect(shallow((
      <ErrorArea
        error="Something is WRONG!"
        onDismiss={() => {}}
      />
    )).childAt(0)).to.have.prop('open', true);
  });

  it('closes when user clicks anywhere on the page', () => {
    const spy = sinon.spy();

    const area = shallow((
      <ErrorArea
        error="Message"
        onDismiss={spy}
      />
    ));

    area.childAt(0).prop('onClose').call();

    expect(spy.calledOnce).to.equal(true);
  });
});
