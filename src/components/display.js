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
      byClass[cls].push(<button key={e} className="btn" onClick={() => this.handleClick(e)}>{e}</button>)
    }

    let classRows = []
    for (let cls in byClass) {
      classRows.push(<div key={cls}>
        <span>{cls}: </span>{byClass[cls]}
      </div>)
    }
    return (
      <div className='row'>
        <div className='col-6'>
          {classRows}  
        </div>
        <div className='col-6'>
          { this.state.selected !== null ? 
            <OptionBtnIn options={['NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB']} name={this.state.selected} onUpdate={this.handleEdit} ></OptionBtnIn> :
            <div></div>
          }
        </div>
      </div>
    )
  }
}
