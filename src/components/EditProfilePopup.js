import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const [userName, setUserName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser])

  function handleChangeName(e) {
    setUserName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name: userName,
      about: description,
    })
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактирование профиля"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        type="text"
        className="popup__profile-edit popup__profile-edit_type_name"
        id="profile-name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={userName || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error profile-name-error"></span>
      <input
        className="popup__profile-edit popup__profile-edit_type_description"
        type="text"
        id="profile-description"
        name="description"
        placeholder="Описание"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error profile-description-error"></span>
    </PopupWithForm>
  );
}
