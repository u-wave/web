import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ErrorArea from '..';

describe('<ErrorArea />', () => {
  it('should not show if there is no error', () => {
    const area = shallow((
      <ErrorArea
        error={null}
        onDismiss={() => {}}
      />
    ));
    expect(area.childAt(0).props()).toHaveProperty('open', false);
  });

  it('should open if there is an error', () => {
    const area = shallow((
      <ErrorArea
        error="Something is WRONG!"
        onDismiss={() => {}}
      />
    ));
    expect(area.childAt(0).props()).toHaveProperty('open', true);
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

    expect(spy.calledOnce).toEqual(true);
  });
});
