import React from 'react'

const Color = props => {

  const selectColor = (e, color) => {
    props.callbackOnColorSelect(color)
  }

  const selected = props.selectedColor === props.color? "selected" : "" 
  return(
    <div
      style={{ backgroundColor: props.color}} 
      onClick={(e) => selectColor(e, props.color)} 
      className={`Color ${selected}`} >
    </div>
  )
}

export default Color

