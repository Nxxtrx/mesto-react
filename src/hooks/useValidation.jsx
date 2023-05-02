import React from "react"

export const useValidation = (value, validations) => {

  const [isEmpty, setIsEmpty] = React.useState(true)
  const [minLengthError, setMinLengthError] = React.useState(false)
  const [linkError, setLinkError] = React.useState(false)
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

        case 'link':
          const url = /(https?:\/\/[^\s]+)/g;
          url.test(String(value).toLowerCase()) ? setLinkError(false) : setLinkError(true)
          break;
      }
    }
  })

  React.useEffect(() => {
    if (isEmpty || minLengthError || linkError) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [isEmpty, minLengthError, linkError])



  return {isEmpty, minLengthError, linkError, isValid, setIsValid}
}
