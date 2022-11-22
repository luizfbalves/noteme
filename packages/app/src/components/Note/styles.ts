import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: space-between;
  border-radius: 10px;
  min-width: 15rem;
  background-color: ${(props) => props.theme.cards.background};
  color: ${(props) => props.theme.cards.font};
  transition: 0.6s ease-in-out all 0.6s;

  .card-header {
    font-size: 19px;
    padding: 0.5rem;
  }
  .content {
    all: inherit;
    padding: 1rem;
  }

   .card-date {
    font-size: 11px;
    letter-spacing: 1px;
    text-align: right;
    font-weight: 600;
    line-height: 1.25rem;
    color: ${(props) => props.theme.cards.font};
  }
`
export const Input = styled.input`
  all: unset;
  width: -webkit-fill-available;
  color: ${(props) => props.theme.cards.font};
`

export const Textarea = styled.div`
  overflow: hidden;
  font-size: 16px;
  outline: none;
  max-width: 300px;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.cards.font};
  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
  &:empty::before {
    position: relative;
    content: attr(placeholder);
    background-color: transparent !important;
    opacity: 0.45;
  }
`

export const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  float: right;
  opacity: 0.7;
  transition: ease-in-out all 0.2s;
  :hover {
    opacity: 1;
  }
`
