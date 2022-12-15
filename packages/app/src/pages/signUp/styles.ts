import { Form } from 'rsuite'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100vh;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 3rem;
  } //mobile
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
    padding: 3rem;
  } //tablets
  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 2rem;
  } //desktop
`

export const Banner = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 767px) {
    width: 30%;
    height: 30%;
  } //mobile
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 35%;
    height: 35%;
  } //tablets
  @media (min-width: 1024px) {
    width: 50%;
    height: 50%;
  } //desktop
`

export const FormLogin = styled(Form)`
  display: flex;
  flex-direction: column;

  #title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    text-align: center;
  }

  @media (max-width: 767px) {
    width: 100%;
  } //mobile
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
  } //tablets
  @media (min-width: 1024px) {
    width: 300px;
  } //desktop
`
