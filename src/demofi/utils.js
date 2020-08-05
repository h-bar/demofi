import React, { useState } from "react";
import ReactModal from 'react-modal';

export const TextInput = props => (
  <div className="row h-100">
    <textarea
      className="col-12"
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
);

export const OptionBtnInput = props => {
  const btns = props.options.map(option => {
    let btnCls = "btn-info";
    if (option === props.selected) {
      btnCls = "btn-secondary";
    }
    return (
      <button
        style={{ boxSizing: "content-box" }}
        className={"btn col-lg-2 col-sm-3 col-6 mx-1 my-1 " + btnCls}
        key={option}
        onClick={() => props.onSelect(option)}
      >
        {option}
      </button>
    );
  });
  return (
    <div
      style={{ maxHeight: "400px" }}
      className="row align-content-start overflow-auto"
    >
      {btns}
    </div>
  );
};

export const ClassificationDisplay = props => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (props.result === null) return null
  let result = props.result
  let byLabel = {}
  for (let i in result.tokens) {
    let t = result.tokens[i]
    let l = result.labels[i]
    if (!(l in byLabel)) {
      byLabel[l] = []
    }
    byLabel[l].push(<span key={i+'-'+t} className="btn btn-primary mr-1 md-1" onClick={() => setSelectedIdx(i)}>{t}</span>)
  }

  let labelRows = []
  for (let l in byLabel) {
    labelRows.push(<h4 key={l}>{l}: {byLabel[l]} </h4>)
  }

  return (
    <div>
      <div className='row mb-5'>
        <div className="col-12">
          <blockquote className="blockquote">
            <p className="mb-0">Click a word to modify it's class</p>
          </blockquote>
        </div>
        <div className='col-sm-12'>
          {labelRows}
        </div>
      </div>
      
      <ReactModal 
        isOpen={selectedIdx !== null} 
        style={{
          coverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },          
          content: {
            top: '200px',
            bottom: 'auto',
            border: '0px',
            backgroundColor: 'unset',
            outline: 'none',
          }}} 
        contentLabel={"Choose a label for" + result.labels[selectedIdx]}
        onRequestClose={() => setSelectedIdx(null)}
      >
        <OptionBtnInput options={props.labels} selected={result.labels[selectedIdx]} onSelect={(value) => { setSelectedIdx(null); props.onEdit(selectedIdx, value)}}></OptionBtnInput>
      </ReactModal>
    </div>
  )
};



const server_addr = "http://127.0.0.1:5000"
export async function postReq(endPoint, data) {
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

export async function getReq(endPoint, data) {
  let url = server_addr + endPoint
  const response = await fetch(url)
  return response.json()
}
