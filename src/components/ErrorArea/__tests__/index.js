import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorArea from '..';

describe('<ErrorArea />', () => {
  it('should not show if there is no error', () => {
    const area = render((
      <ErrorArea
        error={null}
        onDismiss={() => {}}
      />
    ));
    expect(area.queryByRole('alert')).toBeNull();
  });

  it('should open if there is an error', () => {
    const area = render((
      <ErrorArea
        error="Something is WRONG!"
        onDismiss={() => {}}
      />
    ));
    expect(area.queryByRole('alert')).toBeInTheDocument();
  });

  it('closes when user clicks anywhere on the page', async () => {
    const spy = jest.fn();

    const area = render((
      <main>
        <div data-testid="anywhere-else" />
        <ErrorArea
          error="Message"
          onDismiss={spy}
        />
      </main>
    ));

    const snackbar = area.getByRole('alert');

    expect(snackbar).toBeInTheDocument();
    userEvent.click(area.getByTestId('anywhere-else'));

    await waitFor(() => spy.mock.calls.length > 0);
  });
});
