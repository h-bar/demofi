import React from 'react';

import { Row, Container, Button } from "reactstrap";
class ComponentIn extends React.Component {
  /*
  Props:
    - onUpdate: function
    - name: string
  */

  constructor(props) {
    super(props)
  }

  handleUpdate = (value) => {
    this.props.onUpdate(this.props.name, value)
  }

  render() {
    return false
  }
}

export class OptionBtnIn extends ComponentIn {
  /*
    Props:
    - onUpdate: function
    - name: string
    - options: list of string
  */
  state = {
    selected: this.props.default
  }
  default = this.props.default

  componentDidMount() {
    this.onClick(this.default)
  }
  
  onClick =(option) => {
    this.setState({
      selected: option
    })
    this.handleUpdate(option)
  }

  render() {
    if (this.default !== this.props.default) {
      this.default = this.props.default
      this.state.selected = this.default
    }
    const btns = this.props.options.map((option) => {
      let btnCls = 'btn-info'
      if (option === this.state.selected) {
        btnCls = 'btn-secondary'
      }
      return (
      <button style={{boxSizing: "content-box"}} className={'btn col-lg-2 col-sm-3 col-6 mx-1 my-1 ' + btnCls} key={option} onClick={() => this.onClick(option)}>{option}</button>
    )})
    return (
      <div style={{maxHeight: '400px'}} className='row align-content-start overflow-auto'>
        {btns}
      </div>
    )
  }
}

export class TextAreaIn extends ComponentIn {
    /*
    Props:
    - onUpdate: function
    - name: string
    - placeholder: string
  */
 
  render() {
    return (
      <Row className='h-100'>
        <textarea className='col-12' placeholder={this.props.placeholder} onChange={(e) => this.handleUpdate(e.target.value)}></textarea>
      </Row>
    )
  }
}

