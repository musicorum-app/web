import React from 'react'
import tw, { styled } from 'twin.macro'
import { darkerRed } from '../../config/colors'

const Input = styled.input`
  ${tw`px-4 rounded-md`}
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  background: ${p => (p.error ? 'rgba(255, 0, 0, 0.06)' : 'transparent')};
  color: ${p => (p.error ? 'red' : 'currentColor')};
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  border: 2px solid
    ${p => (p.error ? 'rgba(255, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.35)')};
  transition: 0.18s;

  &:hover {
    background: ${p =>
      p.error ? 'rgba(255, 0, 0, 0.08)' : 'rgba(255, 255, 255, .05)'};
    border: 2px solid
      ${p => (p.error ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.5)')};
  }

  &:focus {
    background: ${p =>
      p.error ? 'rgba(255, 0, 0, .1)' : 'rgba(255, 255, 255, .09)'};
    //border: 2px solid ${darkerRed};
    border: 2px solid
      ${p => (p.error ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.65)')};
    outline: none;
  }
`

const ErrorWrapper = styled.div`
  padding-top: ${p => (p.error ? 4 : 0)}px;
  transition: max-height 0.2s, padding-top 0.2s;
  font-size: 13px;
  color: rgb(180, 0, 0);
  max-height: 0px;
  overflow: hidden;
`

const ErrorWrapperShown = styled(ErrorWrapper)`
  max-height: unset !important;
`

const TextInput = React.forwardRef(({ error, ...params }, ref) => {
  const ErrorElement = error ? ErrorWrapperShown : ErrorWrapper

  return (
    <div
      style={{
        maxWidth: '100%',
      }}
    >
      <Input error={error} ref={ref} {...params} />
      <ErrorElement error={error}>{error}</ErrorElement>
    </div>
  )
})

export default TextInput
