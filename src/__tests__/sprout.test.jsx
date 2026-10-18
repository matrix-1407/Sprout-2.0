import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { auditComplianceCopy, sproutCopy, validatePAN } from '../config/sproutStore';

describe('Sprout Module 3 constraints', () => {
  it('has no forbidden compliance copy in English or Hindi', () => {
    const audit = auditComplianceCopy(sproutCopy);
    expect(audit.valid).toBe(true);
    expect(audit.violations).toEqual([]);
  });

  it('renders the sticky compliance disclaimer at 12.5px', () => {
    render(<App />);
    const bar = screen.getByTestId('sticky-compliance-bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({ fontSize: '12.5px' });
    expect(bar).toHaveTextContent('REGULATORY DISCLAIMER');
  });

  it('carries the Next Milestone goal into onboarding', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Next Milestone/ }));
    fireEvent.click(screen.getByRole('button', { name: /Continue with this/ }));
    expect(screen.getByText(/Next Milestone is ready to take root/)).toBeInTheDocument();
    expect(screen.getByText(/Next Milestone • ₹250 \/ week/)).toBeInTheDocument();
  });

  it('switches the complete app to Hindi', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /EN ↔ हिंदी/ }));
    expect(screen.getByRole('heading', { name: /अपना पहला ₹100/ })).toBeInTheDocument();
    expect(screen.getByText(/नियामकीय सूचना/)).toBeInTheDocument();
  });

  it('normalizes and validates PAN edge cases', () => {
    expect(validatePAN('abcde1234f')).toMatchObject({ value: 'ABCDE1234F', valid: true, characterCount: 10 });
    expect(validatePAN('ABCDE123')).toMatchObject({ valid: false, characterCount: 8 });
    expect(validatePAN('ABCDE1234F')).toMatchObject({ valid: true, characterCount: 10 });
  });
});
