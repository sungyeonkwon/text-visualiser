import React from 'react';

const Textbox = (props) => {

  return(
    <div className="container-sqr">
      <button className="btn icon ctrl" onClick={(e) => props.callbackOnClick(e)}/>
      <input 
        className="Textbox--title" type="text" 
        placeholder={props.poem.title}/>
      <textarea
        placeholder={props.poem.text.join('\n')}
        onChange={(e) => props.callbackOnChange(e.target.value)}
        className="Textbox"
        autoFocus>
      </textarea>
    </div>
  )
}

export default Textbox