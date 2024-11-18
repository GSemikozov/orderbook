import { createGlobalStyle } from 'styled-components';

import { theme } from '@ui/theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    font-size: 10px;
    font-family: Roboto, monospace;
  }

  body {
    background-color: ${theme.colors.background};
  }
`;
