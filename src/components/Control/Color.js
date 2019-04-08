import React, { Component} from 'react'

const Color = props => {

  const selectColor = (e, color) => {
    props.callbackOnColorSelect(color)
  }

  return(
    <div
      style={{ backgroundColor: props.color}} 
      onClick={(e) => selectColor(e, props.color)} 
      className="Color" >
      iam color
    </div>
  )
}

export default Color

