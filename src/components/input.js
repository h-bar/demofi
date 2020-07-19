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

export class OptionBtnsIn extends ComponentIn {
  /*
    Props:
    - onUpdate: function
    - name: string
    - options: list of string
  */

  render() {
    const btns = this.props.options.map((option) => (
      <button key={option} onClick={() => this.handleUpdate(option)}>{option}</button>
    ))
    return (
      <div>
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
      <div>
        <textarea placeholder={this.props.placeholder} onChange={(e) => this.handleUpdate(e.target.value)}></textarea>
      </div>
    )
  }
}

