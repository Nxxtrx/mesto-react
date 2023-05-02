import React from "react";
import { useInput } from "../hooks/useInput";
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatarLink = React.useRef('')

  const avatarLinkInput = useInput('', {isEmpty: true, link: true})

  const [errorMessageAvatarLink, setErrorMessageAvatarLink] = React.useState('')

  function handleChangeAvatarLink(e) {
    avatarLinkInput.onChange(e)
    setErrorMessageAvatarLink(e.target.validationMessage)
  }

  React.useEffect(() => {
    setErrorMessageAvatarLink('');
    avatarLinkInput.setIsValid(false);
  }, [onClose])

  React.useEffect(() => {
    avatarLink.current.value = null
  }, [onClose])



  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarLink.current.value
    })

  }

  return (
    <PopupWithForm
      name={"change-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!avatarLinkInput.isValid}
    >
      <input
        className="popup__profile-edit popup__profile-edit_type_src"
        type="url"
        name="link"
        id="avatar-url"
        placeholder="Ссылка на картинку"
        required
        ref={avatarLink}
        onChange={handleChangeAvatarLink}
        onFocus={avatarLinkInput.onFocus}
      />
      <span className="popup__input-error avatar-url-error">
        {((avatarLinkInput.isDerty && avatarLinkInput.isEmpty) ||
        (avatarLinkInput.isDerty && avatarLinkInput.linkError))
          ? errorMessageAvatarLink
          : ""}
      </span>
    </PopupWithForm>
  );
}


