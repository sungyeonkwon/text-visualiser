import React, { Component } from 'react';
import { ALIGN_OPTS, SHAPE_OPTS, TYPE_OPTS } from '../../constants/constants';
import Color from './Color';

const createBtn = (cls, name=null) => {
  return(
    <button key={cls} className={`btn icon ${cls}`}>{name}</button>
  )
}

class Control extends Component {
  render() {
    return(
      <div className="Control">
        <div className="ctrl-wrapper--align">
          {ALIGN_OPTS.map(opt => createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--shape">
          {SHAPE_OPTS.map(opt => createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--color">
          <div className="ctrl-types">
            {TYPE_OPTS.map(opt => createBtn(opt, opt))}
          </div>
          <div className="ctrl-colors">
            <Color/>
          </div>        
        </div>

      </div>
    )
  }
}

export default Control