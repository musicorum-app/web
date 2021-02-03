import React from 'react'
import tw, {styled} from 'twin.macro'
import { darkerRed } from "../../config/colors"

const Input = styled.input`
  ${tw`px-4 rounded-md`}
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  background: transparent;
  color: currentColor;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  width: ${p => p.fullWidth ? '100%' : 'auto'};
  border: 2px solid rgba(255, 255, 255, 0.35);
  transition: .18s;
  
  &:hover {
    background: rgba(255, 255, 255, .05);
    border: 2px solid rgba(255, 255, 255, 0.5);  
  }
  
  &:focus {
    background: rgba(255, 255, 255, .09);
    //border: 2px solid ${darkerRed};
    border: 2px solid rgba(255, 255, 255, 0.65);
    outline: none;
  }
`

const TextInput = React.forwardRef(({ ...params }, ref) => {
  return <div style={{
    maxWidth: '100%'
  }}>
    <Input ref={ref} {...params}/>
  </div>
})

export default TextInput