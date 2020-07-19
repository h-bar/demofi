import React from 'react';
import './App.css';
import { render } from '@testing-library/react';

const appStates = {
  'not_ready': 0,
  'ready':1,
  'submited': 2,
  'responded': 3
}

const server_addr = "http://127.0.0.1:5000"
async function postReq(endPoint, data) {
  let url = server_addr + endPoint
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

async function getReq(endPoint, data) {
  let url = server_addr + endPoint
  const response = await fetch(url)
  return response.json()
}

class OptionBtnIn extends React.Component {
  handleClick = (value) => {
    let data = this.props.data
    data[this.props.cate][this.props.name] = value
    this.props.updateData(data)
  }

  render() {
    const btns = this.props.options.map((option) => (
      <button className="col-3 btn  btn-light"key={option} onClick={() => this.handleClick(option)}>{option}</button>
    ))
    return (
      <div className="row">
        {btns}
      </div>
    )
  }
}

class LongTextIn extends React.Component {
  handleChange = (e) => {
    let data = this.props.data
    data[this.props.cate][this.props.name] = e.target.value
    this.props.updateData(data)
  }

  render() {
    return (
      <div className='row'>
        <textarea style={{width: '100%'}} placeholder={this.props.placeholder} onChange={this.handleChange}></textarea>
      </div>
    )
  }
}

function DataIn(props) {
  return (
    <div>
      <LongTextIn updateData={props.updateData} data={props.data} cate="data" name="content" placeholder="Input Some Data"></LongTextIn>
    </div>)
}

function ParamIn(props) {
  return (
    <div>
      <OptionBtnIn updateData={props.updateData} data={props.data} cate="param" name="testParam" options={["sdfd", "sdsf", "sdfs", "dsfsfdfs", "dsfsdfsdf", "dfsfdfs", "sdfdsf", "dsdfsdf"]}></OptionBtnIn>
    </div>)
}


function SubmitBtn(props) {
  let isDisable = props.appState === appStates.not_ready
  return (
    <button className="btn btn-primary" disabled={isDisable} onClick={props.onClick}>{props.content}</button>
  )
}

function ClassPicker(props) {
  const classes = ['NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB']
  const classPanel = classes.map((cls) => (
    <button key={cls} onClick={() => props.onSelect(props.label, cls)}>{cls}</button>
  ))
  return <div>
    <span>{props.label}</span>
    {classPanel}
  </div>
}

class ClassificationResult extends React.Component {
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
            <ClassPicker label={this.state.selected} onSelect={this.handleEdit}></ClassPicker> :
            <div></div>
          }
        </div>
      </div>
    )
  }
}


function ResultPanel(props) {
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.content));
  return (
    <div>
      <ClassificationResult content={props.content} onChange={props.onChange}></ClassificationResult>
      <a href={dataStr} download="result.json" className="btn btn-primary">Download Result</a>
    </div>
  )
}

class App extends React.Component {
  state = {
    req: {
      data: {},
      param: {}
    },
    state: appStates.not_ready,
    resp: {}
  }
  resp_ori = {}

  dataReady = (data) => {
    for (const k in data) {
      if (data[k] !== '' && data[k] !== null && data[k] !== NaN) {
        return true
      }
    }

    return false
  }

  paramReady = (param) => {
    for (const k in param) {
      if (param[k] !== '' && param[k] !== null && param[k] !== NaN) {
        return true
      }
    }

    return false
  }

  updateData = (data) => {
    this.setState({
      req: data,
      state: this.paramReady(data.param) && this.dataReady(data.data) ? appStates.ready : appStates.not_ready
    })
  }

  sendData = (e) => {
    this.setState({
      state: appStates.submited
    })

    postReq('/api/run', this.state.req)
    .then((resp) => {
      this.setState({
        resp: resp,
        state: appStates.responded
      })
    })
  }

  updateResult = (result) => {
    this.setState({
      resp: result
    })
  }

  render() {
    return (
      <div className="App">
        <div className="jumbotron">
        <h1 className="display-4">Word Tagging Demo</h1>
          <p className="lead">This is a simple Demo for classification and tagging tasks</p>
          <hr className="my-4" />
          <p>Enter a sentense below to get word tagging. Click on the result to edit the tagging result and download!</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Github</a>
          </p>
        </div>
        <div className="container">
          <DataIn updateData={this.updateData} data={this.state.req}></DataIn>
          <ParamIn updateData={this.updateData} data={this.state.req}></ParamIn>
          <SubmitBtn appState={this.state.state} content="Submit" onClick={this.sendData}></SubmitBtn>
          { this.state.state === appStates.responded ? <ResultPanel content={this.state.resp} onChange={this.updateResult}></ResultPanel> : <div></div>}
        </div>
      </div>
    );
  }
}

export default App;
