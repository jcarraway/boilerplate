import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '.';

storiesOf('Button', module)
  .add('primary example', () => (
    <Button variant="primary" onClick={action('primary-button-click')}>
      Primary
    </Button>
  ))
  .add('secondary example', () => (
    <Button variant="secondary" onClick={action('secondary-button-click')}>
      Secondary
    </Button>
  ));
