import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import { ITheme } from '.';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F9FBFD
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;
