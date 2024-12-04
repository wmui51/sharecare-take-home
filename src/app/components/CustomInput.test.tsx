import { render } from '@testing-library/react';

import CustomInput from './CustomInput';

describe('<CustomInput />', () => {
  it('renders', () => {
    const { asFragment } = render(<CustomInput id="test" htmlFor="test" onChange={(event) => {}} label="label" value="test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
