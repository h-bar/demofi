import React from 'react';

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
      <button className='btn col-lg-2 col-sm-3' key={option} onClick={() => this.handleUpdate(option)}>{option}</button>
    ))
    return (
      <div className='row'>
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
      <div className='row'>
        <textarea className='w-100 h-100' placeholder={this.props.placeholder} onChange={(e) => this.handleUpdate(e.target.value)}></textarea>
      </div>
    )
  }
}

