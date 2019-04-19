import React, { Component } from 'react';

const Block = (props) => {

  const gradient = "linear-gradient(#fff, " + props.color[props.type] + ")";
  console.log("gradient", gradient)
  return(
    <span 
      className={`Block scale shake-lr ${props.type}`}
      style={{
        background: gradient,
        width: props.blockW,
        height: props.blockH,
      }}
    ></span>
  )
}

export default Block

