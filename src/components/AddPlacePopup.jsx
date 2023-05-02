import React from "react"
import { useInput } from "../hooks/useInput";
import PopupWithForm from "./PopupWithForm"

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const namePictureInput = useInput('', {isEmpty: true, minLength: 2})
  const linkPictureInput = useInput(' ', {isEmpty: true, link: true})

  const [errorMessageName, setErrorMesageName] = React.useState('')
  const [errorMessageLink, setErrorMesageLink] = React.useState('')


  React.useEffect(() => {
    setErrorMesageLink('');
    setErrorMesageName('');
    setName('')
    setLink('')
    namePictureInput.setIsValid(false)
    linkPictureInput.setIsValid(false)
  }, [onClose, onAddPlace])


  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: name,
      link: link
    })

  }

  function handleChangeNameCard(e) {
    setName(e.target.value)
    namePictureInput.onChange(e)
    setErrorMesageName(e.target.validationMessage)
  }

  function handleChangeLinkCard(e) {
    setLink(e.target.value)
    linkPictureInput.onChange(e)
    setErrorMesageLink(e.target.validationMessage)
  }

  return (
    <PopupWithForm
      name={"add-item"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!namePictureInput.isValid || !linkPictureInput.isValid}
    >
      <input
        className="popup__profile-edit popup__profile-edit_type_title"
        type="text"
        id="picture-title"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleChangeNameCard}
        onFocus={namePictureInput.onFocus}
      />
      <span className="popup__input-error picture-title-error">
        {((namePictureInput.isDerty && namePictureInput.isEmpty) || (namePictureInput.isDerty && namePictureInput.minLengthError)) ? errorMessageName : ''}
      </span>
      <input
        className="popup__profile-edit popup__profile-edit_type_src"
        type="url"
        id="picture-url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleChangeLinkCard}
        onFocus={linkPictureInput.onFocus}
      />
      <span className="popup__input-error picture-url-error">
        {((linkPictureInput.isDerty && linkPictureInput.isEmpty) || (linkPictureInput.isDerty && linkPictureInput.linkError)) ? errorMessageLink : ''}
      </span>
    </PopupWithForm>
  );
}
