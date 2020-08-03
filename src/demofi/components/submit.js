import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectData, selectParam, runModel } from "../slice";

export const Submit = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const para = useSelector(selectParam);

  const handleSubmit = () => {
    for (let d of data.split("\n")) {
      const payload = {
        data: {
          content: d
        },
        param: {
          action: para
        }
      }
      dispatch(runModel(payload))
    }
  }

  return (
    <div className="row justify-content-center mb-4">
      <button className="btn btn-lg btn-primary mb-5" onClick={handleSubmit}>Get Tagging</button>
    </div>
  );
}
