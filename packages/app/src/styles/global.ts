import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    button {
    cursor: pointer;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.font};
    scrollbar-width: none;
    overflow-y: scroll; 
  }::-webkit-scrollbar {
  display: none;
}
`
