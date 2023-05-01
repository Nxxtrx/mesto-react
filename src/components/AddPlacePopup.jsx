import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function clearForms() {
    setName('');
    setLink('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: name,
      link: link
    })

    clearForms()
  }

  function handleChangeNameCard(e) {
    setName(e.target.value)
  }

  function handleChangeLinkCard(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm
      name={"add-item"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
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
      />
      <span className="popup__input-error picture-title-error"></span>
      <input
        className="popup__profile-edit popup__profile-edit_type_src"
        type="url"
        id="picture-url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleChangeLinkCard}
      />
      <span className="popup__input-error picture-url-error"></span>
    </PopupWithForm>
  );
}
