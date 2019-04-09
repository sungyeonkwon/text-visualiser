import React, { Component } from 'react';

class Textbox extends Component {
  state = {
    value: this.props.poem.text.join('\n')
  }

  onValueChange = (value) => {
    this.setState({ value })
    this.props.callbackOnChange(value)
  }

  render(){
    return(
      <div className="container-sqr">
        <button className="btn icon ctrl" onClick={(e) => this.props.callbackOnClick(e)}/>
        <input 
          className="Textbox--title" type="text" 
          placeholder={this.props.poem.title}/>
        <textarea
          value={this.state.value}
          onChange={(e) => this.onValueChange(e.target.value)}
          className="Textbox"
          autoFocus>
        </textarea>
      </div>
    )
  }
}
export default Textbox