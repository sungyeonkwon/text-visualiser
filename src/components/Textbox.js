import React, { Component } from 'react';

class Textbox extends Component {

  state = {
    placeholder: this.props.poem.text
  }

  onValueChange = (value) => {
    this.setState({ value })
    this.props.callbackOnChange(value)
  }

  render(){
    const clicked = this.props.showControl ? "clicked" : null

    return(
      <div className="container-sqr">
        <button className={`btn icon ctrl ${clicked}`} onClick={(e) => this.props.callbackOnClick(e)}/>
        <input 
          className="Textbox__title" type="text" 
          placeholder={this.props.poem.title}/>
        <textarea
          placeholder={this.state.placeholder}
          onChange={(e) => this.onValueChange(e.target.value)}
          className="Textbox"
          autoFocus>
        </textarea>
      </div>
    )
  }
}
export default Textbox