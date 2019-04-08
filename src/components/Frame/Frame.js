import React from 'react';

const Frame = (props) => {

  console.log("--------")
  console.log(props.text)
  console.log(props.edge)
  console.log(props.color)
  console.log(props.shape)
  console.log(props.align)
  console.log("--------")

  return(
    <div 
      className="container-sqr"
      style={{ backgroundColor: props.color.background}}
    >
      frame
    </div>
  )
}

export default Frame