import React from 'react';
import './App.css';
import { render } from '@testing-library/react';

const appStates = {
  'not_ready': 0,
  'ready':1,
  'submited': 2,
  'responded': 3,
  'edited': 4
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
      <button className="col-3"key={option} onClick={() => this.handleClick(option)}>{option}</button>
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
        <textarea  placeholder={this.props.placeholder} onChange={this.handleChange}></textarea>
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

class ClassificationResult extends React.Component {
  render() {
    let result = this.props.content.result
    if (result === undefined) return <div></div>

    let byClass = {}
    for (let e in result) {
      let cls = result[e]
      if (!(cls in byClass)) {
        byClass[cls] = []
      }
      byClass[cls].push(<button>{e}</button>)
    }

    let classRows = []
    for (let cls in byClass) {
      classRows.push(<div>
        <span>{cls}: </span>{byClass[cls]}
      </div>)
    }
    return (
      <div>
        {classRows}
      </div>
    )
  }
}


function ResultPanel(props) {
  let isDisable = props.appState !== appStates.edited
  return (
    <div>
      <ClassificationResult content={props.content}></ClassificationResult>
      <button className="btn btn-primary" disabled={isDisable}>Train the model</button>
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
      this.resp_ori = resp
    })
  }

  updateResult = (result) => {
    this.setState({
      resp: result,
      state: this.resp_ori !== result ? appStates.edited : appStates.submited
    })
  }

  render() {
    return (
      <div className="App">
        <DataIn updateData={this.updateData} data={this.state.req}></DataIn>
        <ParamIn updateData={this.updateData} data={this.state.req}></ParamIn>
        <SubmitBtn appState={this.state.state} content="Submit" onClick={this.sendData}></SubmitBtn>
        { this.state.state === appStates.responded ? <ResultPanel content={this.state.resp}></ResultPanel> : <div></div>}
      </div>
    );
  }
}

export default App;
