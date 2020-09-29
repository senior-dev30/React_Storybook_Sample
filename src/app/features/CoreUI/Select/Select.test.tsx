import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './Select';

const Items = [
  { key: 0, label: 'Duplicate' },
  { key: 1, label: 'Delete', type: 'highlight' },
];

describe('Select', () => {
  afterEach(cleanup);

  it('display label', () => {
    const { getByText } = render(
      <Select label='Label' items={Items} type='single' />,
    );
    const element = getByText('Label');
    expect(element).toBeInTheDocument();
  });

  it('handles select event', () => {
    const { getByText } = render(
      <Select label='Label' items={Items} type='single' />,
    );
    expect(getByText('Label')).toBeInTheDocument();
    fireEvent.click(getByText('Duplicate'));
    expect(getByText('Duplicate')).toBeInTheDocument();
    fireEvent.click(getByText('Delete'));
    expect(getByText('Delete')).toBeInTheDocument();
  });

  it('Disabled Select', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Select label='Label' items={Items} type='single' disabled />,
    );
    const element = getByRole('combobox');

    userEvent.click(element);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
