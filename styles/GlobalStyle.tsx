import {createGlobalStyle, css} from 'styled-components';
import reset from 'styled-reset';

const globalstyle = css`
  ${reset}
  body {
    font-family: Noto Sans, Noto Sans KR;
  }
  * {
    box-sizing: border-box;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalstyle}
`;

export default GlobalStyle;