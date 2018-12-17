import * as React from 'react';
import styled from '../../theme/styled-components';
import { buttonStyle } from 'styled-system';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const StyledButton = styled.button`
  appearance: none;
  display: inline-block;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.primaryColor};
  line-height: 1.75em;
  padding: 0.25em 1em;
  margin: 1em;
  cursor: pointer;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  &:after {
    content: '';
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.9);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  &:hover:after {
    opacity: 1;
  }
  ${buttonStyle}
`;

export const Button: React.FunctionComponent<Props> = props => (
  <StyledButton {...props} />
);

export default Button;

// font-family: 'Rubik', sans-serif;
//   font-size: 1em;
//
//
//   font-weight: 400;
//
//   border: 2px solid green;
//
//   ${props =>
//     props.variant === 'primary' &&
//     css`
//       color: white;
//       background-color: green;
//     `}
//   ${props =>
//     props.variant === 'secondary' &&
//     css`
//       color: green;
//       background-color: white;
//     `}
//   ${buttonStyle};
