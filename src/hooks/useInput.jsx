import React from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue, validation) => {
  const [value, setValue] = React.useState(initialValue)
  const [isDerty, setIsDerty] = React.useState(false)
  const valid = useValidation(value, validation)

  function onChange(e) {
    setValue(e.target.value)
  }

  function onFocus() {
    setIsDerty(true)
  }

  return {value, onChange, onFocus, isDerty, ...valid}
}




