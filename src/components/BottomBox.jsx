import React from 'react'
import styled from 'styled-components'

const Box=styled.div`
  background-color:#F0F0F0;
  position:absolute;
  bottom:0px;
  width:100%;
  max-width:420px;
  border-radius:30px 30px 0px 0px;
  color:black;
`

export default function BottomBox(props) {
  return (
    <Box>
      <div style={{padding:'30px',marginBottom:'40px'}}>{props.children}</div>
    </Box>
  )
}
