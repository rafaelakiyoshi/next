import { init } from "@rematch/core";
import {} from "../models/models";

export default (initialState = {}) => {
  return init({
    models: {},
    redux: {
      initialState
    }
  });
};
