import { fireEvent, render, screen } from '@testing-library/react';

import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  it('renders', () => {
    const { asFragment } = render(<SignUpForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('formats input text correctly on blur and renders the table', async () => {
    render(<SignUpForm />);
    const inputs = screen.getAllByRole('textbox');
    const submitButton = screen.getAllByText('Continue with email');

    expect(submitButton[0]).toBeDisabled();
    fireEvent.change(inputs[0], {target: {value: 'test user'}});
    fireEvent.blur(inputs[0]);
    expect((inputs[0] as HTMLInputElement).value).toBe('test user');
    fireEvent.change(inputs[1], {target: {value: '123 elm st.'}});
    fireEvent.blur(inputs[1]);
    expect((inputs[1] as HTMLInputElement).value).toBe('123 elm st.');
    fireEvent.change(inputs[2], {target: {value: 'san francisco'}});
    fireEvent.blur(inputs[2]);
    expect((inputs[2] as HTMLInputElement).value).toBe('san francisco');
    fireEvent.change(inputs[3], {target: {value: 'ca'}});
    fireEvent.blur(inputs[3]);
    expect((inputs[3] as HTMLInputElement).value).toBe('ca');
    fireEvent.change(inputs[4], {target: {value: '1234567890'}});
    fireEvent.blur(inputs[4]);
    expect((inputs[4] as HTMLInputElement).value).toBe('(123) 456-7890');
    fireEvent.change(inputs[5], {target: {value: '01311984'}});
    fireEvent.blur(inputs[5]);
    expect((inputs[5] as HTMLInputElement).value).toBe('01/31/1984');
    fireEvent.change(inputs[6], {target: {value: 'test@gmail.com'}});
    fireEvent.blur(inputs[6]);
    expect((inputs[6] as HTMLInputElement).value).toBe('test@gmail.com');
    expect(submitButton[0]).not.toBeDisabled();
  });
});
