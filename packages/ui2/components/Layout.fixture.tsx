import Layout, { Props } from './Layout';
import Button from './Button';

export default {
  component: Layout,
  props: {
    title: '$$$',
    children: (
      <div>
        <p>Fixture ain't afraid of JSX</p>
        <p>Fixture ain't afraid of nothin!</p>
        <Button variant="primary">This is a button</Button>
      </div>
    ),
  } as Props,
};
