import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
 /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

/* RESET CSS */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  -webkit-overflow-scrolling: touch !important;
  overflow-y: scroll;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/* RESET CSS END */


/* GENERAL STYLES */

html{
  box-sizing: border-box;
  font-size: 14px;
}

html, button, input {
  font-family: sofia-pro;
}

button{
  background: white;
  border: none;
  cursor: pointer;
}

a {
  color: inherit;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

`;

export default GlobalStyle;
