import React from "react";
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatarLink = React.useRef('')

  function clearForms() {
    avatarLink.current.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarLink.current.value
    })

    clearForms()
  }

  return(
    <PopupWithForm name = {'change-avatar'} title = {'Обновить аватар'} isOpen = {isOpen} onClose = {onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <input className="popup__profile-edit popup__profile-edit_type_src" type="url" name="link" id="avatar-url" placeholder="Ссылка на картинку" required ref={avatarLink} />
      <span className="popup__input-error avatar-url-error"></span>
    </PopupWithForm>
  )
}


