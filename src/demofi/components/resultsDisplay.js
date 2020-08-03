import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectResults, updateResult } from "../slice";
import { ClassificationDisplay } from "../utils"
import { demofiConfig } from "../../config";

export const ResultsDisplay = () => {
  const results = useSelector(selectResults);
  const dispatch = useDispatch();
  
  let resDispaly = []
  for (let i in results) {
    resDispaly.push(<ClassificationDisplay key={i} labels={demofiConfig.availableLabels} result={results[i]} onEdit={(idx, label) => dispatch(updateResult({resIdx: i, labelIdx: idx, label, label}))}/>)
  }
  return (
    <div>
      {resDispaly}
    </div>
  );
};
