import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;

  ul {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    list-style-type: none;
    padding-left: unset;
    align-items: center;
    letter-spacing: 2px;
    padding: 8px 0;
    height: 100%;
    width: 90px;
    justify-content: space-between;
    background-color: ${(props) => props.theme.sidenav.background};
    -webkit-box-shadow: 6px 0px 42px -9px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 6px 0px 42px -9px rgba(0, 0, 0, 0.4);
    box-shadow: 6px 0px 42px -9px rgba(0, 0, 0, 0.4);

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 56px;
      opacity: 0.6;
      transition: 0.3s;
      z-index: 87;
      user-select: none;
      cursor: pointer;
      a {
        all: unset;
      }
      svg {
        width: 24px;
        height: 24px;
      }
    }

    li:hover {
      opacity: 1;
      .label {
        opacity: 1;
        display: inherit;
      }
    }

    .add-note {
      background-color: black;
      border-radius: 20px;
      box-shadow: 1px 0px 5px 2px rgb(40 40 40 /50%);
      width: 37px;
      height: 37px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.sidenav.background};
    }

    #menu-itens {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    #menu-itens:hover > .label {
      opacity: 1;
      display: inherit;
    }
    .brand {
      img {
        width: 38px;
      }
    }
  }

  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    height: 56px;
    width: 100%;
    ul {
      padding: 8px 12px;
      margin: 0px;
      width: 100%;
      flex-direction: row;
    }
  }
`

export const Label = styled.span`
  position: absolute;
  width: max-content;
  z-index: 88;
  transition: ease-in-out all 0.2s;
  left: 98px;
  background-color: #000000ad;
  color: whitesmoke;
  padding: 6px;
  opacity: 0;
  display: none;
  user-select: none;
  @media (max-width: 767px) {
    display: none;
    visibility: hidden;
  }
`
