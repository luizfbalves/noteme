import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
 0% {
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
`

export const NavHeader = styled.nav`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .greetings {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
    strong {
      font-size: 24px;
    }
  }
  .content {
    height: 100%;
    overflow-x: hidden;
  }

  #loader {
    position: fixed;
    left: 50%;
    top: 50%;
  }
`
export const Content = styled.div`
  gap: 2rem;
  height: inherit;
  margin-bottom: 53px;
  animation: 0.5s ease-in-out 0s ${fadeIn};
  .greetings {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    strong {
      font-size: 24px;
    }
  }
`
