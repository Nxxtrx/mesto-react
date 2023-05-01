import React from "react"

export const useValidation = (value, validations) => {

  const [isEmpty, setIsEmpty] = React.useState(true)
  const [minLengthError, setMinLengthError] = React.useState(true)
  const [isValid, setIsValid] = React.useState(false)

  React.useEffect(() => {
    for( const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break;

        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break;
      }
    }
  })

  React.useEffect(() => {
    if (isEmpty || minLengthError) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [isEmpty, minLengthError])

  return {isEmpty, minLengthError, isValid, setIsValid}
}
