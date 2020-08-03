import React from "react";
import { useSelector } from "react-redux";
import { selectResults } from "../slice";
import { demofiDownloads } from "../../config";
import { compose } from "@reduxjs/toolkit";

const DownloadBtn = props => (
  <a href={"data:text/json;charset=utf-8," + props.downloadString} download={props.label + ".json"} className="btn btn-lg btn-primary mb-5 mx-2">
    {props.label}
  </a>
)

export const Download = props => {
  const results = useSelector(selectResults)
  let downloadBtns = []
  for (let d of demofiDownloads) {
    downloadBtns.push(<DownloadBtn label={d.label} downloadString={d.transform(results)}/>)
  }

  return (
    <div className="w-100 text-center">
      { downloadBtns }
    </div>
  )
}
