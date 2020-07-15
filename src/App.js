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
      <LongTextIn updateData={props.updateData} data={props.data} cate="data" name="testData" placeholder="Input Some Data"></LongTextIn>
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

function ResultPanel(props) {
  return (
    <div>
      {JSON.stringify(props.content)}
    </div>
  )
}

class ResultEditor extends React.Component {
  handleChange = (e) => {
    let result = JSON.parse(e.target.value)
    this.props.updateReult(result)
  }

  render() {
    let value = JSON.stringify(this.props.value)
    return (
      <div className='row'>
        <textarea placeholder={this.props.placeholder} onChange={this.handleChange} value={value}></textarea>
      </div>
    )
  }
}

function ResultEditPanel(props) {
  let isDisable = props.appState !== appStates.edited
  return (
    <div>
      <ResultEditor updateReult={props.updateResult} value={props.content}></ResultEditor>
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
        <ResultPanel content={this.state.resp}></ResultPanel>
        <ResultEditPanel appState={this.state.state} content={this.state.resp} updateResult={this.updateResult}></ResultEditPanel>
      </div>
    );
  }
}

export default App;
