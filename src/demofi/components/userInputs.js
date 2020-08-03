import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, updateParam, selectParam, selectData } from "../slice";
import { TextInput, OptionButInput } from "../utils";
import { demofiConfig } from "../../config"

export const UserInputs = () => {
  const data = useSelector(selectData);
  const param = useSelector(selectParam);
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{ height: "200px" }} className="mb-4">
        <TextInput
          onChange={value => dispatch(updateData(value))}
          placeholder={data}
        />
      </div>
      <div className="mb-4">
        <OptionButInput
          onSelect={value => dispatch(updateParam(value))}
          options={demofiConfig.actions}
          selected={param}
        />
      </div>
    </div>
  );
};
