import styled, { keyframes } from 'styled-components'

const slideup = keyframes`
  0% {height: 0px; opacity: 0};
  100% {height: 100px; opacity: 1};
`

export const Wrapper = styled.div<{ show: boolean }>`
  position: fixed;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  height: ${(props) => (props.show ? '100px' : '0px')};
  justify-content: center;
  align-items: flex-end;
  bottom: 0;
  width: 100%;
  animation: ${slideup};
  animation-duration: 0.2s;
  background: rgb(253, 112, 127);
  @media (max-width: 767px) {
    bottom: 56px;
  }
`
export const DeleteButton = styled.button`
  all: unset;
  font-size: 4rem;
  opacity: 0.5;
  color: whitesmoke;
`

export const Message = styled.div<{ show: boolean }>`
  position: absolute;
  display: ${(props) => (props.show ? 'block' : 'none')};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  left: 50vw;
  bottom: 50vh;
`
