import React from 'react'

import { OptionBtnIn } from './input'

class ResultDisplay extends React.Component {
  state = {
    selected: null
  }

  handleSelection = (item) => {
    this.setState({
      selected: item
    })
  }

  resultUpdate = (item, value) => {
  }

  handleEdit = (item, value) => {
    let result = this.resultUpdate(item, value)
    this.props.onChange(result)
  }

  RenderTitle = () => {
    return false
  }

  RenderDisplay = () => {
    return false
  }

  RenderEdit = () => {
    return false
  }

  render() {
    if (this.props.content.result === undefined) return false
    return (
      <div className='row mb-5'>
        <div className="col-12">
          <this.RenderTitle></this.RenderTitle>
        </div>
        <div className='col-md-6 col-sm-12'>
          <this.RenderDisplay></this.RenderDisplay>
        </div>
        <div className='col-md-6 col-sm-12'>
          { this.state.selected !== null ? <this.RenderEdit></this.RenderEdit> : false }
        </div>
      </div>
    )
  }
}

export class ClassificationDisplay extends ResultDisplay {
  // Data format: {
  //   tokens: [],
  //   labels: [],
  // }
  // This is a very very very very good example of a very long sentence with duplicated words
  resultUpdate = (idx, value) => {
    let result = this.props.content
    result.result.labels[idx] = value

    return result
  }

  RenderTitle = () => {
    return (<blockquote className="blockquote">
      <p className="mb-0">Click a word to modify it's class</p>
    </blockquote>)
  }

  RenderDisplay = () => {
    let result = this.props.content.result

    let byLabel = {}
    for (let i in result.tokens) {
      let t = result.tokens[i]
      let l = result.labels[i]
      if (!(l in byLabel)) {
        byLabel[l] = []
      }
      byLabel[l].push(<span key={i+'-'+t} className="btn btn-primary mr-1 md-1" onClick={() => this.handleSelection(i)}>{t}</span>)
    }

    let labelRows = []
    for (let l in byLabel) {
      labelRows.push(<h4 key={l}>{l}: {byLabel[l]} </h4>)
    }
    return (<div>{labelRows}</div>)
  }

  RenderEdit = () => { 
    let result = this.props.content.result
    let l = result.labels[this.state.selected]
    return <OptionBtnIn options={this.props.labels} default={l} name={this.state.selected} onUpdate={this.handleEdit}></OptionBtnIn> 
  }
}
