import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
      font-size: 16px;
    }
    
    body {
      font-family: ${(props) => props.theme.fonts.main};
      font-weight: 400;
    }

    ::selection {
       // background: ${(props) => props.theme.colors.seddlegray};
    }

    @media ${(props) => props.theme.breakpoints.m} {
    :root {
      font-size: 14px;
    }
  }

`;
