import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ErrorArea, { errorThemeSelector } from '../../../src/components/ErrorArea';

describe('<ErrorArea />', () => {
  it('should not show if there is no error', () => {
    expect(shallow(
      <ErrorArea
        error={null}
        onDismiss={() => {}}
      />,
      { context: testUtils.context }
    ).dive().childAt(0)).to.have.prop('open', false);
  });

  it('should open if there is an error', () => {
    expect(shallow(
      <ErrorArea
        error="Something is WRONG!"
        onDismiss={() => {}}
      />,
      { context: testUtils.context }
    ).dive().childAt(0)).to.have.prop('open', true);
  });

  it('uses the error notification palette overrides', () => {
    const notificationTheme = testUtils.muiTheme.palette.notifications;

    const contextTheme = errorThemeSelector(testUtils.context).muiTheme;

    expect(contextTheme.snackbar).to.have.property('textColor', notificationTheme.errorTextColor);
    expect(contextTheme.snackbar).to.have.property('backgroundColor', notificationTheme.errorBackgroundColor);
  });

  it('closes when user clicks anywhere on the page', () => {
    const spy = sinon.spy();

    const area = shallow(
      (
        <ErrorArea
          error="Message"
          onDismiss={spy}
        />
      ), { context: testUtils.context }
    ).dive();

    area.childAt(0).prop('onRequestClose').call();

    expect(spy.calledOnce).to.equal(true);
  });
});
