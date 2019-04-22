import React, { Component } from 'react';

class Textbox extends Component {

  state = {
    value: this.props.poem.text.join('\n')
  }

  onValueChange = (value) => {
    this.setState({ value })
    this.props.callbackOnChange(value)
  }

  onFocus = () => {
    this.setState({ value: "" })
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
          value={ this.state.value }
          onChange={(e) => this.onValueChange(e.target.value)}
          onFocus={(e) => this.onFocus()}
          className="Textbox"
        >
        </textarea>
      </div>
    )
  }
}
export default Textbox