import React, { Component } from 'react';

const Block = (props) => {

  return(
    <span 
      className={`Block ${props.type}`}
      style={{
        backgroundColor: props.color[props.type],
        width: props.blockW,
        height: props.blockH,
      }}
    ></span>
  )
}

export default Block