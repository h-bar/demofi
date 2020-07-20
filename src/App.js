import React from 'react';

import { TextAreaIn, OptionBtnIn } from './components/input';
import { ClassificationDisplay } from './components/display';
import { getReq, postReq } from './request'

const appStates = {
  'not_ready': 0,
  'ready':1,
  'submited': 2,
  'responded': 3
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

  updateData = (name, value) => {
    let propPath = name.split('.')
    let propKey = propPath.pop()

    let data = this.state.req
    let prop = data

    for (let propName of propPath) {
      prop = prop[propName]
    }
    prop[propKey] = value

    this.setState({
      req: data,
      state: this.paramReady(data.param) && this.dataReady(data.data) ? appStates.ready : appStates.not_ready
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
          <TextAreaIn onUpdate={this.updateData} name="data.content" placeholder="Input some data"></TextAreaIn>
          <OptionBtnIn onUpdate={this.updateData} name="param.content" options={["sdfd", "sdsf", "sdfs", "dsfsfdfs", "dsfsdfsdf", "dfsfdfs", "sdfdsf", "dsdfsdf"]}></OptionBtnIn>
          <button className="btn btn-primary" disabled={this.state.state === appStates.not_ready} onClick={this.sendData}>Get Tagging</button>
          { this.state.state === appStates.responded ?  
            <div>
                <ClassificationDisplay classes={['NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB'] }content={this.state.resp} onChange={this.updateResult}></ClassificationDisplay>
                <a href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.resp))} download="result.json" className="btn btn-primary">Download Result</a>
            </div> : 
            <div></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
