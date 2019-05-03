import { css, createGlobalStyle } from "styled-components";

export const baseCSS = css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const BaseCSS = createGlobalStyle`${baseCSS}`;

export default baseCSS;
