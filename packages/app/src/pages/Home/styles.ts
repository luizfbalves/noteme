import styled, { keyframes } from 'styled-components'

const FadeIn = keyframes`
 from {
  opacity: 0;
 }
 to {
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
    animation-duration: 0.8s;
    animation: ${FadeIn};
  }
  .content {
    height: 100%;
    overflow-x: hidden;
  }

  #loader {
    position: relative;
    top: 50%;
    margin: 0 auto;
  }
`
export const Content = styled.div`
  gap: 2rem;
  height: inherit;
  margin-bottom: 53px;
  animation-duration: 0.8s;
  animation: ${FadeIn};
  .greetings {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    strong {
      font-size: 24px;
    }
  }
`
