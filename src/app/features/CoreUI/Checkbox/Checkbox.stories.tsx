import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';
import '../../App/Root/Root.scss';

storiesOf('Checkbox', module)
  .add('default', () => (
    <div style={{ padding: 16 }}>
      <Checkbox label='Checkbox' onChange={action('changed')} />
    </div>
  ))
  .add('disabled', () => (
    <div style={{ padding: 16 }}>
      <Checkbox label='Checkbox' onChange={action('changed')} disabled />
    </div>
  ));
