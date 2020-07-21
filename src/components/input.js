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

  render() {
    const btns = this.props.options.map((option) => (
      <button style={{boxSizing: "content-box"}} className='btn btn-secondary col-lg-2 col-sm-3 col-6 mx-1 my-1' key={option} onClick={() => this.handleUpdate(option)}>{option}</button>
    ))
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

