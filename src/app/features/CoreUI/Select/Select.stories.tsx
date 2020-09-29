import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from './Select';
import '../../App/Root/Root.scss';

const Items = [
  { key: 0, label: 'Duplicate' },
  { key: 1, label: 'Delete', type: 'highlight' },
];

storiesOf('Select', module)
  .add('single select', () => (
    <div style={{ padding: 12 }}>
      <Select label='Label' items={Items} type='single' />
    </div>
  ))
  .add('multi select', () => (
    <div style={{ padding: 12 }}>
      <Select label='Label' items={Items} type='multi' />
    </div>
  ))
  .add('disabled select', () => (
    <div style={{ padding: 12 }}>
      <Select label='Label' items={Items} type='single' disabled />
    </div>
  ));
