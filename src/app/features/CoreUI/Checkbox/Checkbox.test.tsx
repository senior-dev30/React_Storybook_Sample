import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  afterEach(cleanup);

  it('renders in the document', () => {
    const { getByRole } = render(<Checkbox label='checkbox' />);
    const element = getByRole('checkbox');
    expect(element).toBeInTheDocument();
  });

  it('displays label', () => {
    const handleChange = jest.fn();
    const { getByText } = render(<Checkbox label='Check' onChange={handleChange} />);
    const element = getByText('Check');
    expect(element).toBeInTheDocument();
  });

  it('handles onChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('Disabled checkbox', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={handleChange} disabled />);
    const element = getByRole('checkbox');

    userEvent.click(element);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
