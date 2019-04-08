import React from 'react';

const Frame = (props) => {

  // receive text from unit and process it.
  // put it to the block.
  // maybe you don't need state here. you don't really.
  // block is just rendering things.

  console.log(props.text)
  console.log(props.edge)

  return(
    <div className="container-sqr">frame</div>
  )
}

export default Frame