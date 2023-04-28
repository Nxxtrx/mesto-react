import React from "react";
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarLink = React.useRef('')


  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarLink.current.value
    })
  }

  return(
    <PopupWithForm name = {'change-avatar'} title = {'Обновить аватар'} isOpen = {isOpen} onClose = {onClose} onSubmit={handleSubmit}>
      <input className="popup__profile-edit popup__profile-edit_type_src" type="url" name="link" id="avatar-url" placeholder="Ссылка на картинку" required ref={avatarLink} />
      <span className="popup__input-error avatar-url-error"></span>
    </PopupWithForm>
  )
}


