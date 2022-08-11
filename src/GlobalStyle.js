import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Mulish', sans-serif;
    height: 100%;
  }

  h2{
    margin: 0 0 8px 0;
  }

  h3{
    margin: 16px 0 8px 0;
  }
`