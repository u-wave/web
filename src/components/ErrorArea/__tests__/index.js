import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorArea from '..';

describe('<ErrorArea />', () => {
  it('should not show if there is no error', () => {
    render((
      <ErrorArea
        error={null}
        onDismiss={() => {}}
      />
    ));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should open if there is an error', () => {
    render((
      <ErrorArea
        error="Something is WRONG!"
        onDismiss={() => {}}
      />
    ));
    expect(screen.queryByRole('alert')).toBeInTheDocument();
  });

  it('closes when user clicks anywhere on the page', async () => {
    const spy = jest.fn();

    render((
      <main>
        <div data-testid="anywhere-else" />
        <ErrorArea
          error="Message"
          onDismiss={spy}
        />
      </main>
    ));

    const snackbar = screen.getByRole('alert');

    expect(snackbar).toBeInTheDocument();
    userEvent.click(screen.getByTestId('anywhere-else'));

    await waitFor(() => spy.mock.calls.length > 0);
  });
});
