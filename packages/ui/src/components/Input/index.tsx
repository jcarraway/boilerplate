import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 1rem;
  color: #0d0d0d;
  border-radius: 4px;
`;

export class Input extends React.PureComponent<any> {
  render() {
    return <StyledInput {...this.props} />;
  }
}
