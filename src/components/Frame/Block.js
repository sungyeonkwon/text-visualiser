import React, { Component } from 'react';

const Block = (props) => {

  const gradient = "linear-gradient(#fff, " + props.color[props.type] + ")";
  
  console.log("@@@spread singleSpace", props.singleSpace)
  console.log("@@@spread I", props.i)

  const spread = props.align === 'spread' ? props.singleSpace * props.i : 0
  
  return(
    <span 
      className={`Block shake-lr ${props.type}`}
      style={{
        background: gradient,
        width: props.blockW,
        height: props.blockH,
        transform: `translateX(${spread}px)`
      }}
    ></span>
  )
}

export default Block

