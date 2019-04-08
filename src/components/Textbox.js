import React from 'react';

const Textbox = (props) => {
  return(
    <div className="container-sqr">
      <button className="btn ctrl" onClick={(e) => props.callbackOnClick(e)}/>
      <input className="Textbox--title" type="text" placeholder="Title Placeholder"/>
      <textarea
        onChange={(e) => props.callbackOnChange(e.target.value)}
        className="Textbox"
        autoFocus>
      </textarea>
    </div>
  )
}

export default Textbox