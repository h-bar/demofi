import { configureStore } from "@reduxjs/toolkit";
import { demofiReducer } from "./demofi/slice";

export default configureStore({
  reducer: {
    demofi: demofiReducer
  }
});
