import * as React from 'react';
import styled from 'styled-components';
import { buttonStyle } from 'styled-system';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'topic';
}

const StyledButton = styled.button`
  border: none;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  ${buttonStyle}
`;

export const Button: React.FunctionComponent<Props> = props => (
  <StyledButton {...props} />
);

export default Button;
