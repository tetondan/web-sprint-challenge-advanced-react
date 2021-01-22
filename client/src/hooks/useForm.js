// write your custom hook here to control your checkout form
import React, { useState } from "react";

export const useForm = (initialValues) => {
  let [state, setState] = useState(initialValues);

  return [state, setState];
};
