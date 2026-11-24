/// <reference types="@testing-library/jest-dom/vitest" />
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Accordion, { AccordionDetails, AccordionSummary } from './index';

describe('<Accordion />', () => {
  it('should have group role', () => {
    const result = render(
      (
        <Accordion>
          <AccordionSummary>Heading</AccordionSummary>
          <AccordionDetails>Body</AccordionDetails>
        </Accordion>
      ),
    );
    expect(result.getByRole('group')).toBeInTheDocument();
  });
});
