import React from 'react'

import { OptionBtnIn } from './input'

export class ClassificationDisplay extends React.Component {
  state = {
    selected: null
  }

  handleClick = (e) => {
    this.setState({
      selected: e
    })
  }

  handleEdit = (e, cls) => {
    let content = this.props.content
    content.result[e] = cls

    this.props.onChange(content)
  }

  render() {
    let result = this.props.content.result
    if (result === undefined) return <div></div>

    let byClass = {}
    for (let e in result) {
      let cls = result[e]
      if (!(cls in byClass)) {
        byClass[cls] = []
      }
      byClass[cls].push(<span key={e} className="btn btn-primary mr-1" onClick={() => this.handleClick(e)}>{e}</span>)
    }

    let classRows = []
    for (let cls in byClass) {
      classRows.push(<h4 key={cls}>{cls}: {byClass[cls]} </h4>)
    }
    return (
      <div className='row mb-5'>
        <div className="col-12">
          <blockquote class="blockquote">
            <p class="mb-0">Click a word to modify it's class</p>
          </blockquote>
        </div>
        <div className='col-md-6 col-sm-12'>
          {classRows}  
        </div>
        <div className='col-md-6 col-sm-12'>
          { this.state.selected !== null ? 
            <OptionBtnIn options={this.props.classes} default={result[this.state.selected]} name={this.state.selected} onUpdate={this.handleEdit} ></OptionBtnIn> :
            <div></div>
          }
        </div>
      </div>
    )
  }
}
