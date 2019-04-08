import React, { Component } from 'react';
import ColorSelector from './ColorSelector';
import { ALIGN_OPTS, SHAPE_OPTS, TYPE_OPTS } from '../../constants/constants';

class Control extends Component {

  state = {
    selectedColor: '',
  }

  createBtn = (cls, name=null) => {
    return(
      <button 
        key={cls}
        onClick={() => this.onBtnClick(cls)}
        className={`btn icon ${cls}`}>{name}</button>
    )
  }

  onBtnClick = (name) => {
    this.props.callbackOnBtn(name)
  }

  render() {
    console.log('this.props.color', this.props.color)

    return(
      <div className="Control">
        <div className="ctrl-wrapper--align">
          {ALIGN_OPTS.map(opt => this.createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--shape">
          {SHAPE_OPTS.map(opt => this.createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--color">
          <div className="ctrl-types">
            {TYPE_OPTS.map(opt => this.createBtn(opt, opt))}
          </div>
          <div className="ctrl-colors">
            <ColorSelector color={this.props.color}/>
          </div>        
        </div>

      </div>
    )
  }
}

export default Control